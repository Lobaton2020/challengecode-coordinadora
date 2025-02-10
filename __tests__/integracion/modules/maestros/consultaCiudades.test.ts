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
describe("Se debe consultar las ciudades maestro", () => {
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

  it("Se debe consulta las ciudades del maestro segun BD", async () => {
    const r = await request(app)
      .get(`${prefix}/maestros/ciudades`)
      .set({
        Authorization: `Bearer ${token}`,
      });
      const { count } = await db.one(
        `SELECT count(*) as count FROM ciudades c INNER JOIN departamentos d on d.id_departamento = c.id_departamento`
      );
      expect(r.status).toBe(200);
      expect(r.body.data.length).toEqual(count);
      expect(r.body.is_error).toStrictEqual(false);
      r.body.data.forEach((ciudad: any) => {
        expect(ciudad).toEqual(expect.objectContaining({
          id: expect.anything(),
          nombre: expect.anything(),
          nombre_departamento: expect.anything(),
          abreviado_departamento: expect.anything(),
          esta_activo: expect.anything()
        }))
      });
  });
});