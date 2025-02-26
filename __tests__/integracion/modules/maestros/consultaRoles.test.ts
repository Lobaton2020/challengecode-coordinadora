import { app as serverApp } from '../../../mock/app'
import { Application } from 'express-serve-static-core';
import request from 'supertest'
import { Server } from '../../../../src/infraestructure/server/Server';
import { CommonTypes } from '../../../../src/modules/_common/dependencies/Types';
import { DEPENDENCIES_INJECTION } from '../../../../src/modules/_common/dependencies/Dependencies';
import { creacionMockDb } from '../../../mock/pg-mem';
import { AuthTypes } from "../../../../src/modules/auth/dependencies/Types";
import { IUseCase } from "../../../../src/modules/_common/domain/repositories/IUseCase";
import { ValidacionUsuarioUseCase } from "../../../../src/modules/auth/application/usecases/ValidacionUsuarioUseCase";
import { credentials } from "../../../mock/config";

describe("Se debe consultar los roles del maestro", () => {
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

  it("Se debe consultar los roles del maestro segun BD", async () => {
    const r = await request(app)
      .get(`${prefix}/maestros/roles`)
      .set({
        Authorization: `Bearer ${token}`,
      });
    const { count } = await db.one(`SELECT count(*) as count FROM roles`);
    expect(r.status).toBe(200);
    expect(r.body.data.length).toEqual(count);
    expect(r.body.is_error).toStrictEqual(false);
  });
});