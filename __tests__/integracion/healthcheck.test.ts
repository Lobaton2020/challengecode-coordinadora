import { Application } from './../../node_modules/@types/express-serve-static-core/index.d';
import { bootstrap } from '../../src/app'
import request from 'supertest'
import { Server } from '../../src/infraestructure/server/Server';

describe("Test de healthcheck", ()=>{
    let app: Application;
    let prefix: string;
    let server: Server;
    beforeAll(async () => {
        server = await bootstrap();
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