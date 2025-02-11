import { inject, injectable } from "inversify";
import pgPromise, { IDatabase, IMain } from "pg-promise";
import { CommonTypes } from "../../../modules/_common/dependencies/Types";
import { ILogger } from "../../../modules/_common/domain/repositories/ILogger";
import { IEnvioRepository } from "../../../modules/envios/domain/repositories/IEnvioRepository";
import { ICrearEnvioDto } from "../../../modules/envios/application/dtos/in/ICrearEnvioDto";
import { ICrearEnvioResponse } from "../../../modules/envios/application/dtos/out/ICrearEnvioResponse";
import { DbException } from "../../common/exceptions/exceptions";
import { CONSULTA_JORNADAS_DISPONIBLES_ASIGANCION_ENVIO, CONSULTA_TRASNPORTISTAS_ACTIVOS, CONSULTA_VEHICULOS_DISPONIBLES, INSERT_DIRECCIONES, INSERT_ENVIOS, INSERT_ESTADOS, INSERT_PAQUETES, INSERT_TRANSPORTISTA_JORNADA, INSERT_TRANSPORTISTA_JORNADA_ENVIOS, QUERY_LISTA_ORDENES_ENVIO, QUERY_LISTA_ORDENES_ENVIO_COUNT } from "../queries/EnviosDaoQuery";
import { EstadosEnvio } from "../../../modules/envios/domain/enum/EstadosEnvio";
import { IRastreoGuiaResponse } from "../../../modules/envios/application/dtos/out/IRastreoGuiaResponse";
import { CacheRepository } from "../../../modules/_common/domain/repositories/CacheRepository";
import { keyDetalleGuia } from "../../cache/keys";
import { IConsultaTransportistasDto } from "../../../modules/envios/application/dtos/out/IConsultaTransportistasDto";
import { IConsultaJonadaGuiaResponse } from "../../../modules/envios/application/dtos/out/IConsultaJonadaGuiaResponse";
import { IConsultaVehiculosResponse } from "../../../modules/envios/application/dtos/out/IConsultaVehiculosResponse";
import { IAsignarEnvioDto } from "../../../modules/envios/application/dtos/in/IAsignarEnvioDto";
import { ICapacidadPaqueteDto } from "../../../modules/envios/application/dtos/in/ICapacidadPaqueteDto";
import { IConsultarOrdenesEnvioDto } from "../../../modules/envios/application/dtos/in/IConsultarOrdenesEnvioDto";
import { IConsultaEnviosResponse } from "../../../modules/envios/application/dtos/out/IConsultaEnviosResponse";

@injectable()
export class EnvioDao implements IEnvioRepository {
    @inject(CommonTypes.Logger) private logger: ILogger;
    @inject(CommonTypes.CacheRepository) private cache: CacheRepository;
    @inject(CommonTypes.Bd) private db: IDatabase<IMain>;

    private aplicarFiltros(stringInicial: string, filtros: IConsultarOrdenesEnvioDto) {
        let query = stringInicial;
        const params: Record<string, string | number> = {};
        if (filtros.numero_guia) {
            query += ` AND p.numero_guia ILIKE $/numero_guia/`;
            params.numero_guia = `${filtros.numero_guia}%`;
        }

        if (filtros.id_estado_envio) {
            query += ` AND eoe.id_estado_envio = $/id_estado_envio/`;
            params.id_estado_envio = filtros.id_estado_envio;
        }

        if (filtros.id_transportista) {
            query += ` AND t.id_transportista = $/id_transportista/`;
            params.id_transportista = filtros.id_transportista;
        }

        if (filtros.fecha_estado) {
            const fechas = filtros.fecha_estado.split(",");
            query += ` AND eoe.fecha_creacion BETWEEN $/fecha_inicio/ AND $/fecha_fin/`;
            params.fecha_inicio = fechas[0];
            params.fecha_fin = fechas[1];
        }
        return { query, params }
    }

    async consultarOrdenesEnvio(filtros: IConsultarOrdenesEnvioDto): Promise<IConsultaEnviosResponse[]> {
        const keyRedis = new URLSearchParams(filtros as any).toString() + '&data=true'
        const cachedData = await this.cache.get<IConsultaEnviosResponse[]>(keyRedis)
        if (cachedData) {
            return cachedData;
        }
        try {
            const params: Record<string, string | number> = {};
            const { query: q, params: p } = this.aplicarFiltros(QUERY_LISTA_ORDENES_ENVIO, filtros)
            let query = q
            query += ` ORDER BY oe.id_orden_envio, eoe.fecha_creacion DESC`;
            query += ` LIMIT $/cantidad_pagina/ OFFSET $/offset/`
            params.cantidad_pagina = filtros.cantidad_pagina;
            params.offset = (filtros.pagina - 1) * params.cantidad_pagina;
            const data = await this.db.query(query, { ...params, ...p })
            await this.cache.setEx(keyRedis, 60, data)
            return data;
        } catch (error) {
            throw new DbException(
                "Error al realizar lista de ordenes de envio",
                error.message
            );
        }
    }
    async consultarOrdenesEnvioCount(filtros: IConsultarOrdenesEnvioDto): Promise<number> {
        const keyRedis = new URLSearchParams(filtros as any).toString() + '&count=true'
        const cachedData = await this.cache.get<number>(keyRedis)
        if (cachedData) {
            return cachedData;
        }
        try {
            const { query: q, params } = this.aplicarFiltros('', filtros)
            const query = QUERY_LISTA_ORDENES_ENVIO_COUNT.replace(":resto_condiciones:", q)
            const { count } = await this.db.one(query, { ...params })
            await this.cache.setEx(keyRedis, 60, parseInt(count))
            return parseInt(count);
        } catch (error) {
            this.logger.error(error);
            throw new DbException(
                "Error al realizar lista de ordenes de envio coun",
                error.message
            );
        }
    }

    async asignarEnvio(data: IAsignarEnvioDto): Promise<void> {
        await this.db.tx(async (t) => {
            try {
                const { id_transportista_jornada } = await t.one(INSERT_TRANSPORTISTA_JORNADA, data);
                const payloadEstado = {
                    id_orden_envio: data.id_orden_envio,
                    id_estado_envio: EstadosEnvio.EN_TRANSITO,
                    anotaciones: 'Se asigna un conductor por lo que se pone en transito'
                };
                await t.batch([
                    t.none(INSERT_ESTADOS, payloadEstado),
                    t.none(INSERT_TRANSPORTISTA_JORNADA_ENVIOS, {
                        id_transportista_jornada,
                        id_orden_envio: data.id_orden_envio
                    })
                ])
            } catch (error: any) {
                this.logger.error(error);
                throw new DbException(
                    "Error al realizar transaccion de asignacion de un envio a una ruta jornada etc",
                    error.message
                );
            }
        })

    }
    async consultarCapacidadEnvio(numero_guia: string): Promise<ICapacidadPaqueteDto | null> {
        try {
            const query = `select numero_guia,
                            peso_g,
                            (p.alto_cm / 100) * (p.ancho_cm / 100) * (p.largo_cm / 100) as volumen_m3,
                            oe.id_orden_envio
                from paquetes p
                JOIN orden_envios oe on oe.id_paquete = p.id_paquete
                WHERE numero_guia = $/numero_guia/`;
            return this.db.oneOrNone(query, { numero_guia });
        } catch (error) {
            this.logger.error(error);
            throw new DbException(
                "Error al realizar consulta del paquete para su detalle",
                error.message
            );
        }
    }
    async consultaVehiculos(idRuta: number): Promise<IConsultaVehiculosResponse[]> {
        try {
            return this.db.query(CONSULTA_VEHICULOS_DISPONIBLES, { id_ruta: idRuta });
        } catch (error) {
            this.logger.error(error);
            throw new DbException(
                "Error al realizar consulta veniculos",
                error.message
            );
        }
    }
    async consultaJornadaGuia(numero_guia: string): Promise<IConsultaJonadaGuiaResponse[]> {
        try {
            return this.db.query(CONSULTA_JORNADAS_DISPONIBLES_ASIGANCION_ENVIO, { numero_guia });
        } catch (error) {
            this.logger.error(error);
            throw new DbException(
                "Error al realizar consulta de jornadas de la guia",
                error.message
            );
        }
    }
    async consultaTransportistas(): Promise<IConsultaTransportistasDto[]> {
        try {
            return this.db.query(CONSULTA_TRASNPORTISTAS_ACTIVOS);
        } catch (error) {
            this.logger.error(error);
            throw new DbException(
                "Error al realizar consulta de transportistas disponibles",
                error.message
            );
        }
    }

    async consultaRastreoGuia(numeroGuia: string): Promise<IRastreoGuiaResponse | null> {
        try {
            const redisKey = keyDetalleGuia(numeroGuia)
            const cachedData = await this.cache.get<IRastreoGuiaResponse>(redisKey);
            if (cachedData) {
                return cachedData;
            }
            const queryEstados = `SELECT eoe.id_estado_envio as id_estado,
                    ee.nombre,
                    eoe.fecha_creacion
                FROM orden_envios oe
                inner join paquetes p on p.id_paquete = oe.id_paquete
                inner join estados_orden_envios eoe on eoe.id_orden_envio = oe.id_orden_envio
                inner join estados_envios ee on ee.id_estado_envio = eoe.id_estado_envio
                where p.numero_guia = $1
                order by eoe.fecha_creacion asc`
            const queryCiudades = `SELECT cd.id_ciudad AS id_ciudad_destino,
                cd.nombre AS ciudad_destino,
                dpd.abreviado AS abreviado_destino,
                cr.id_ciudad AS id_ciudad_remitente,
                cr.nombre AS ciudad_remitente,
                dpr.abreviado AS abreviado_remitente
            FROM orden_envios oe
            join paquetes p on p.id_paquete = oe.id_paquete
            JOIN direcciones dd ON dd.id_direccion = oe.id_direccion_destino
            JOIN ciudades cd ON cd.id_ciudad = dd.id_ciudad
            JOIN departamentos dpd ON dpd.id_departamento = cd.id_departamento
            JOIN direcciones dr ON dr.id_direccion = oe.id_direccion_remitente
            JOIN ciudades cr ON cr.id_ciudad = dr.id_ciudad
            JOIN departamentos dpr ON dpr.id_departamento = cr.id_departamento
            where p.numero_guia = $1
        `;

            const [estados, ciudad] = await Promise.all([
                this.db.manyOrNone(queryEstados, [numeroGuia]),
                this.db.oneOrNone(queryCiudades, [numeroGuia]),
            ])
            if (!estados || !ciudad) {
                return null;
            }

            const data = {
                destino: {
                    id_ciudad: ciudad.id_ciudad_destino,
                    nombre_ciudad: ciudad.ciudad_destino,
                    abreviado_departamento: ciudad.abreviado_destino,
                },
                remitente: {
                    id_ciudad: ciudad.id_ciudad_remitente,
                    nombre_ciudad: ciudad.ciudad_remitente,
                    abreviado_departamento: ciudad.abreviado_remitente,
                },
                estado_actual: estados.at(-1),
                estados_historial: estados
            } as IRastreoGuiaResponse
            await this.cache.setEx(redisKey, 60 * 2, data);
            return data
        } catch (error: any) {
            this.logger.error(error);
            throw new DbException(
                "Error al realizar consulta rastreo guia",
                error.message
            );
        }
    }
    async crearEnvio(idUser: number, data: ICrearEnvioDto): Promise<ICrearEnvioResponse> {
        return await this.db.tx(async (t) => {
            try {
                const numero_guia = Math.floor(10000000000 + Math.random() * 90000000000);
                const [dRemitente, dDestinatario, paquete] = await Promise.all([
                    t.one(INSERT_DIRECCIONES, data.direccion_remitente),
                    t.one(INSERT_DIRECCIONES, data.direccion_destino),
                    t.one(INSERT_PAQUETES, {
                        ...data,
                        numero_guia
                    })
                ])
                const payloadOrdenEnvio = {
                    id_usuario_creador: idUser,
                    id_paquete: paquete.id_paquete,
                    id_direccion_destino: dDestinatario.id_direccion,
                    id_direccion_remitente: dRemitente.id_direccion,
                };
                const { id_orden_envio } = await t.one(INSERT_ENVIOS, payloadOrdenEnvio);
                const payloadEstado = {
                    id_orden_envio,
                    id_estado_envio: EstadosEnvio.EN_ESPERA,
                    anotaciones: 'Inicia proceso envio'
                };
                await t.none(INSERT_ESTADOS, payloadEstado);
                return {
                    numero_guia: `${numero_guia}`,
                }
            } catch (error: any) {
                this.logger.error(error);
                throw new DbException(
                    "Error al realizar transaccion de registro de envio de paquete",
                    error.message
                );
            }
        })
    }
}
