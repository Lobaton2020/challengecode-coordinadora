import { app as serverApp } from '../../../mock/app'
import { Application } from 'express-serve-static-core';
import request from 'supertest'
import { Server } from '../../../../src/infraestructure/server/Server';
import { Roles } from '../../../../src/modules/auth/domain/enum/Roles';
import { CommonTypes } from '../../../../src/modules/_common/dependencies/Types';
import { DEPENDENCIES_INJECTION } from '../../../../src/modules/_common/dependencies/Dependencies';
import { creacionMockDb } from '../../../mock/pg-mem';

describe("Se debe poder registrar un usuario", ()=>{
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

    it("Se debe registrar usuario con correo y contraseña", async ()=>{
        const nombre = "Andres Lobaton", correo = "andrespipe@example.com";
        const r = await request(app)
            .post(`${prefix}/auth/registro`)
            .send({
                nombre,
                correo,
                "contrasena": "12345678",
                "id_rol": Roles.ADMIN,
              })
        const result = await db.one(`SELECT nombre FROM usuarios WHERE correo = $1`, [correo])
        expect(r.status).toBe(201)
        expect(r.body.data).toStrictEqual(null)
        expect(r.body.is_error).toStrictEqual(false)
        expect(result.nombre).toStrictEqual(nombre)
    })


    it("No debe dejar registrar por que contaseña tiene menos de 8 caracteres", async ()=>{
        const nombre = "Andres Lobaton", correo = "andrespipe@example.com";
        const r = await request(app)
            .post(`${prefix}/auth/registro`)
            .send({
                nombre,
                correo,
                "contrasena": "12345678",
                "id_rol": Roles.ADMIN,
              })
        expect(r.status).toBe(400)
        expect(r.body.is_error).toStrictEqual(true)
    })

    it("No debe dejar registrar por que el correo ya esta registrado", async ()=>{
        const nombre = "Andres Lobatones", correo = "andres@gmail.com";
        const r = await request(app)
            .post(`${prefix}/auth/registro`)
            .send({
                nombre,
                correo,
                "contrasena": "12345678",
                "id_rol": Roles.ADMIN,
              })
        expect(r.status).toBe(400)
        expect(r.body.is_error).toStrictEqual(true)
        expect(r.body.message).toStrictEqual('El correo del usuario ya se encuentra registrado')
    })
})