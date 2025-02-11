import { inject, injectable } from "inversify";
import { IDatabase, IMain } from "pg-promise";
import { CommonTypes } from "../../../modules/_common/dependencies/Types";
import { ILogger } from "../../../modules/_common/domain/repositories/ILogger";
import { IEnvioRepository } from "../../../modules/envios/domain/repositories/IEnvioRepository";
import { ICrearEnvioDto } from "../../../modules/envios/application/dtos/in/ICrearEnvioDto";
import { ICrearEnvioResponse } from "../../../modules/envios/application/dtos/out/ICrearEnvioResponse";
import { DbException } from "../../common/exceptions/exceptions";
import { CONSULTA_JORNADAS_DISPONIBLES_ASIGANCION_ENVIO, CONSULTA_TRASNPORTISTAS_ACTIVOS, CONSULTA_VEHICULOS_DISPONIBLES, INSERT_DIRECCIONES, INSERT_ENVIOS, INSERT_ESTADOS, INSERT_PAQUETES, INSERT_TRANSPORTISTA_JORNADA, INSERT_TRANSPORTISTA_JORNADA_ENVIOS } from "../queries/EnviosDaoQuery";
import { EstadosEnvio } from "../../../modules/envios/domain/enum/EstadosEnvio";
import { IRastreoGuiaResponse } from "../../../modules/envios/application/dtos/out/IRastreoGuiaResponse";
import { CacheRepository } from "../../../modules/_common/domain/repositories/CacheRepository";
import { keyDetalleGuia } from "../../cache/keys";
import { IConsultaTransportistasDto } from "../../../modules/envios/application/dtos/out/IConsultaTransportistasDto";
import { IConsultaJonadaGuiaResponse } from "../../../modules/envios/application/dtos/out/IConsultaJonadaGuiaResponse";
import { IConsultaVehiculosResponse } from "../../../modules/envios/application/dtos/out/IConsultaVehiculosResponse";
import { IAsignarEnvioDto } from "../../../modules/envios/application/dtos/in/IAsignarEnvioDto";
import { ICapacidadPaqueteDto } from "../../../modules/envios/application/dtos/in/ICapacidadPaqueteDto";

@injectable()
export class EnvioDao implements IEnvioRepository {
    @inject(CommonTypes.Logger) private logger: ILogger;
    @inject(CommonTypes.CacheRepository) private cache: CacheRepository;
    @inject(CommonTypes.Bd) private db: IDatabase<IMain>;

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
