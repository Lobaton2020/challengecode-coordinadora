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

describe("Se debe consular por numero guia el rastreo de una guia", () => {
  let app: Application;
  let prefix: string;
  let server: Server;
  const db = creacionMockDb();
  let token: string;
  beforeAll(async () => {
    server = serverApp;
    app = server.app;
    prefix = server.prefix;
    DEPENDENCIES_INJECTION.rebind(CommonTypes.Bd).toConstantValue(db);
    const r = await DEPENDENCIES_INJECTION.get<ValidacionUsuarioUseCase>(
      AuthTypes.ValidarUsuarioUseCase
    ).execute(credentials);
    token = r.access_token;
  });

  it("Debe rechazar el proceso por que el id del tipo del producto es invalido", async () => {
    const headers = {
        Authorization: `Bearer ${token}`,
      }
    const r = await request(app)
      .get(`${prefix}/envios/rastreo/51060507701`)
      .set(headers)

    expect(r.status).toBe(HttpCode.OK);
    expect(r.body.is_error).toStrictEqual(false);
    expect(r.body.data.destino.id_ciudad).toEqual(7);
    expect(r.body.data.remitente.id_ciudad).toEqual(6);
    expect(r.body.data.estado_actual.id_estado).toEqual(2);
  });
});