import { inject, injectable } from "inversify";
import { IDatabase, IMain } from "pg-promise";
import { CommonTypes } from "../../../modules/_common/dependencies/Types";
import { ILogger } from "../../../modules/_common/domain/repositories/ILogger";
import { IEnvioRepository } from "../../../modules/envios/domain/repositories/IEnvioRepository";
import { ICrearEnvioDto } from "../../../modules/envios/application/dtos/in/ICrearEnvioDto";
import { ICrearEnvioResponse } from "../../../modules/envios/application/dtos/out/ICrearEnvioResponse";
import { DbException } from "../../common/exceptions/exceptions";
import { INSERT_DIRECCIONES, INSERT_ENVIOS, INSERT_ESTADOS, INSERT_PAQUETES } from "../queries/EnviosDaoQuery";
import { EstadosEnvio } from "../../../modules/envios/domain/enum/EstadosEnvio";
import { IRastreoGuiaResponse } from "../../../modules/envios/application/dtos/out/IRastreoGuiaResponse";

@injectable()
export class EnvioDao implements IEnvioRepository {
    @inject(CommonTypes.Bd) private db: IDatabase<IMain>;
    @inject(CommonTypes.Logger) private logger: ILogger;

    async consultaRastreoGuia(numeroGuia: string): Promise<IRastreoGuiaResponse | null> {
        try{
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
            this.db.manyOrNone(queryEstados,[numeroGuia]),
            this.db.oneOrNone(queryCiudades,[numeroGuia]),
        ])
        if(!estados || !ciudad){
            return null;
        }

        return {
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
        } catch (error: any) {
            this.logger.error(error);
            throw new DbException(
              "Error al realizar consulta rastreo guia",
              error.message
            );
        }
    }
    async crearEnvio(idUser: number, data: ICrearEnvioDto): Promise<ICrearEnvioResponse> {
        return await this.db.tx(async (t)=>{
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
