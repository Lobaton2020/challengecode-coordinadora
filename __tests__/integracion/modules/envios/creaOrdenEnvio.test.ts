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
import { EstadosEnvio } from '../../../../src/modules/envios/domain/enum/EstadosEnvio';

describe("Se debe crear una nueva orde de evio sobre un paquete", () => {
  let app: Application;
  let prefix: string;
  let server: Server;
  const db = creacionMockDb();
  let token: string;

  const payload = {
    "id_tipo_producto": 8,
    "es_fragil": false,
    "direccion_remitente": {
      "id_tipo_via": 5,
      "id_ciudad": 6,
      "via": "21",
      "numero": "01",
      "detalle": "Zona industrial"
    },
    "direccion_destino": {
        "id_tipo_via": 5,
        "id_ciudad": 7,
        "via": "26d",
        "numero": "32",
        "detalle": "Cerca del parque la floresta"
    },
    "contenido": "Plancha de cabello para risos",
    "largo_cm": 20,
    "ancho_cm": 10,
    "alto_cm": 30,
    "peso_g": 250,
  };

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
    const data = structuredClone(payload)
    data.id_tipo_producto = 1000;
    const r = await request(app)
      .post(`${prefix}/envios`)
      .set(headers)
      .send(data);

    expect(r.status).toBe(HttpCode.BAD_REQUEST);
    expect(r.body.is_error).toStrictEqual(true);
    expect(r.body.message).toStrictEqual('El id del tipo de producto es invalido');
  });

  it("Debe generar el error 400 por la ciudad de destino es invalida", async () => {
    const headers = {
        Authorization: `Bearer ${token}`,
      }
    const data = structuredClone(payload)
    data.direccion_destino.id_ciudad = 1000;
    const r = await request(app)
      .post(`${prefix}/envios`)
      .set(headers)
      .send(data);

    expect(r.status).toBe(HttpCode.BAD_REQUEST);
    expect(r.body.is_error).toStrictEqual(true);
    expect(r.body.message).toStrictEqual("El id de la ciudad destino es invalido");
  });


  it("Debe crear una nueva orden de envio asociado a un paquete de ecommerce", async () => {
    const headers = {
        Authorization: `Bearer ${token}`,
      }
    const sqlEstadoOrden = `SELECT DISTINCT ON(eoe.id_orden_envio) eoe.id_estado_envio,
            ee.nombre
        FROM orden_envios oe
        inner join paquetes p on p.id_paquete = oe.id_paquete
        inner join estados_orden_envios eoe on eoe.id_orden_envio = oe.id_orden_envio
        inner join estados_envios ee on ee.id_estado_envio = eoe.id_estado_envio
        where p.numero_guia = $1
        order by eoe.id_orden_envio, eoe.fecha_creacion DESC`
    const r = await request(app)
      .post(`${prefix}/envios`)
      .set(headers)
      .send(payload);

    expect(r.status).toBe(HttpCode.CREATED);
    expect(r.body.is_error).toStrictEqual(false);
    expect(r.body.data).toEqual(expect.objectContaining({
        numero_guia: expect.any(String),
    }))
    const { id_estado_envio } = await db.one(sqlEstadoOrden, [r.body.data.numero_guia]);
    expect(id_estado_envio).toEqual(EstadosEnvio.EN_ESPERA);
  });
});