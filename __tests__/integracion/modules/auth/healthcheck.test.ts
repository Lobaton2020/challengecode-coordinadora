import { app as serverApp } from '../../../mock/app'
import { Application } from 'express-serve-static-core';
import request from 'supertest'
import { Server } from '../../../../src/infraestructure/server/Server';

describe("Test de healthcheck", ()=>{
    let app: Application;
    let prefix: string;
    let server: Server;
    beforeAll(async () => {
        server = serverApp;
        app = server.app
        prefix = server.prefix;
    })

    it("Debe retornar un 200 para el healthcheck", async ()=>{
        const r = await request(app).get(`${prefix}/healthcheck`)
        expect(r.status).toBe(200)
        expect(r.body).toStrictEqual({
            ok: "ok"
        })
    })
})