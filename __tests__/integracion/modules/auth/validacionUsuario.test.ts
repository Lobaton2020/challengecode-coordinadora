import { app as serverApp } from '../../../mock/app'
import { Application } from 'express-serve-static-core';
import request from 'supertest'
import { Server } from '../../../../src/infraestructure/server/Server';
import jwt from 'jsonwebtoken';
import { DEPENDENCIES_INJECTION } from '../../../../src/modules/_common/dependencies/Dependencies';
import { CommonTypes } from '../../../../src/modules/_common/dependencies/Types';
import { creacionMockDb } from '../../../mock/pg-mem';
import { Roles } from '../../../../src/modules/auth/domain/enum/Roles';

describe("Se debe validar credenciales de un usuario", ()=>{
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

    it("Se debe loguear el usuario con correo y contraseña", async ()=>{
        const correo = "andres@gmail.com";
        const r = await request(app)
            .post(`${prefix}/auth/login`)
            .send({
                "contrasena": "12345678",
                "correo": correo
              });
        const data = jwt.decode(r.body.data.access_token) as any;
        expect(r.status).toBe(200)
        expect(r.body.is_error).toEqual(false)
        expect(data?.id_rol).toEqual(Roles.ADMIN)
        expect(data?.correo).toStrictEqual(correo)
    })

    it("No depe permitir uniciar sesion por que no existe el correo", async ()=>{
        const correo = "andres12@example.com";
        const r = await request(app)
            .post(`${prefix}/auth/login`)
            .send({
                "contrasena": "12345678",
                "correo": correo
              });
        expect(r.status).toBe(404)
        expect(r.body.is_error).toEqual(true)
    })
})