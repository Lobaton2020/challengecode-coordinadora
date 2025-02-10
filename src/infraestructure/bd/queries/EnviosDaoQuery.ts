export const INSERT_PAQUETES = `INSERT INTO paquetes (
        id_tipo_producto,
        numero_guia,
        peso_g,
        alto_cm,
        ancho_cm,
        largo_cm,
        contenido,
        es_fragil
    ) VALUES (
        $/id_tipo_producto/,
        $/numero_guia/,
        $/peso_g/,
        $/alto_cm/,
        $/ancho_cm/,
        $/largo_cm/,
        $/contenido/,
        $/es_fragil/
    )
    RETURNING id_paquete
`;

export const INSERT_ENVIOS = `INSERT INTO orden_envios (
    id_usuario_creador,
    id_paquete,
    id_direccion_destino,
    id_direccion_remitente
) VALUES(
    $/id_usuario_creador/,
    $/id_paquete/,
    $/id_direccion_destino/,
    $/id_direccion_remitente/
) RETURNING id_orden_envio`;

export const INSERT_DIRECCIONES = `INSERT INTO direcciones (
    id_tipo_via,
    id_ciudad,
    via,
    numero,
    detalle
) VALUES (
    $/id_tipo_via/,
    $/id_ciudad/,
    $/via/,
    $/numero/,
    $/detalle/
) RETURNING id_direccion`;

export const INSERT_ESTADOS = `INSERT INTO estados_orden_envios (
    id_orden_envio,
    id_estado_envio,
    anotaciones
) VALUES (
    $/id_orden_envio/,
    $/id_estado_envio/,
    $/anotaciones/
)`;