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

@injectable()
export class EnvioDao implements IEnvioRepository {
    @inject(CommonTypes.Bd) private db: IDatabase<IMain>;
    @inject(CommonTypes.Logger) private logger: ILogger;

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
