import { app as serverApp } from '../../../mock/app'
import { Application } from 'express-serve-static-core';
import request from 'supertest'
import { Server } from '../../../../src/infraestructure/server/Server';
import { CommonTypes } from '../../../../src/modules/_common/dependencies/Types';
import { DEPENDENCIES_INJECTION } from '../../../../src/modules/_common/dependencies/Dependencies';
import { creacionMockDb } from '../../../mock/pg-mem';
describe("Se debe consultar los tipos producto del maestro", ()=>{
    let app: Application;
    let prefix: string;
    let server: Server;
    const db = creacionMockDb();

    beforeAll(async () => {
        server = serverApp;
        app = server.app
        prefix = server.prefix;
        DEPENDENCIES_INJECTION.rebind(CommonTypes.Bd).toConstantValue(db);
    })

    it("Se debe consultar los tipos producto del maestro segun BD", async ()=>{
        const r = await request(app)
            .get(`${prefix}/maestros/tipos-producto`);
        const { count } = await db.one(`SELECT count(*) as count FROM tipos_producto`)
        expect(r.status).toBe(200)
        expect(r.body.data.length).toEqual(count)
        expect(r.body.is_error).toStrictEqual(false)
    })

})