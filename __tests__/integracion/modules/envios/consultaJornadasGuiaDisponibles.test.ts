import { app as serverApp } from '../../../mock/app'
import { Application } from 'express-serve-static-core';
import request from 'supertest'
import { Server } from '../../../../src/infraestructure/server/Server';
import { CommonTypes } from '../../../../src/modules/_common/dependencies/Types';
import { DEPENDENCIES_INJECTION } from '../../../../src/modules/_common/dependencies/Dependencies';
import { creacionMockDb } from '../../../mock/pg-mem';
import { AuthTypes } from "../../../../src/modules/auth/dependencies/Types";
import { credentials } from "../../../mock/config";
import { ValidacionUsuarioUseCase } from "../../../../src/modules/auth/application/usecases/ValidacionUsuarioUseCase";
import { HttpCode } from '../../../../src/infraestructure/common/enum/HttpCode';
import { CrearEnvioUseCase } from '../../../../src/modules/envios/application/usecases/CrearEnvioUseCase';
import { EnvioTypes } from '../../../../src/modules/envios/dependencies/Types';
import { payload  } from "./creaOrdenEnvio.test";

describe("Se debe consular consulta jornadas de envio disponibles", () => {
  let app: Application;
  let prefix: string;
  let server: Server;
  const db = creacionMockDb();
  let token: string;
  let numero_guia: string;
  beforeAll(async () => {
    server = serverApp;
    app = server.app;
    prefix = server.prefix;
    DEPENDENCIES_INJECTION.rebind(CommonTypes.Bd).toConstantValue(db);
    const r = await DEPENDENCIES_INJECTION.get<ValidacionUsuarioUseCase>(
      AuthTypes.ValidarUsuarioUseCase
    ).execute(credentials);

    const p = await DEPENDENCIES_INJECTION.get<CrearEnvioUseCase>(
      EnvioTypes.CrearEnvioUseCase
    ).execute({ id: 1, id_rol: 1, correo: 'any' }, payload as any);

    numero_guia = p.numero_guia
    token = r.access_token;
  });

  it("Debe consultar lista de jornadas de envio", async () => {
    const headers = {
        Authorization: `Bearer ${token}`,
      }
    const r = await request(app)
      .get(`${prefix}/envios/rutas/${numero_guia}`)
      .set(headers)

    expect(r.status).toBe(HttpCode.OK);
    expect(r.body.is_error).toStrictEqual(false);
    expect(Array.isArray(r.body.data)).toStrictEqual(true);
  });
});