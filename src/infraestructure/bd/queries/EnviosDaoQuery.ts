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

export const CONSULTA_TRASNPORTISTAS_ACTIVOS = `SELECT t.id_transportista,
    u.nombre,
    t.telefono
    FROM transportistas t
        LEFT JOIN usuarios u ON t.id_usuario = u.id_usuario
        LEFT JOIN transportistas_jornada tj ON t.id_transportista = tj.id_transportista
        LEFT JOIN jornadas j ON tj.id_jornada = j.id_jornada AND j.fecha = CURRENT_DATE
    WHERE j.id_jornada IS NULL
    AND t.esta_activo = TRUE;`

export const CONSULTA_JORNADAS_DISPONIBLES_ASIGANCION_ENVIO = `SELECT j.id_jornada,
        r.id_ruta,
        CAST(c_origen.id_ciudad AS TEXT) || ' - ' || c_origen.nombre AS ciudad_remitente,
        CAST(c_destino.id_ciudad AS TEXT) || ' - ' || c_destino.nombre AS ciudad_destino,
        j.hora_inicio,
        j.hora_fin
    FROM paquetes p
        JOIN orden_envios oe ON p.id_paquete = oe.id_paquete
        JOIN direcciones d_remitente ON oe.id_direccion_remitente = d_remitente.id_direccion
        JOIN direcciones d_destino ON oe.id_direccion_destino = d_destino.id_direccion
        JOIN ciudades c_origen ON d_remitente.id_ciudad = c_origen.id_ciudad
        JOIN ciudades c_destino ON d_destino.id_ciudad = c_destino.id_ciudad
        JOIN rutas r ON r.id_ciudad_remitente = c_origen.id_ciudad OR r.id_ciudad_destino = c_destino.id_ciudad
        JOIN jornadas j ON r.id_ruta = j.id_ruta
    WHERE p.numero_guia = $/numero_guia/ AND j.fecha = CURRENT_DATE`;

export const CONSULTA_VEHICULOS_DISPONIBLES = `SELECT v.id_vehiculo,
        j.fecha,
        v.capacidad_peso_g AS capacidad_total_peso_g,
        v.capacidad_volumen_m3 AS capacidad_total_volumen,
        (v.capacidad_peso_g - COALESCE(SUM(p.peso_g), 0)) AS peso_disponible,
        (v.capacidad_volumen_m3 - COALESCE(SUM((p.alto_cm / 100) * (p.largo_cm / 100) * (p.largo_cm / 100)), 0)) AS volumen_disponible
        FROM vehiculos v
        LEFT JOIN transportistas_jornada tj ON v.id_vehiculo = tj.id_vehiculo
        LEFT JOIN jornadas j ON tj.id_jornada = j.id_jornada
        LEFT JOIN rutas r ON j.id_ruta = r.id_ruta
        LEFT JOIN transportistas_jornada_orden_envio tjoe ON tj.id_transportista_jornada = tjoe.id_transportista_jornada
        LEFT JOIN orden_envios oe ON tjoe.id_orden_envio = oe.id_orden_envio
        LEFT JOIN paquetes p ON p.id_paquete = oe.id_paquete
        WHERE (r.id_ruta IS NOT NULL AND j.fecha = CURRENT_DATE AND r.id_ruta = $/id_ruta/) OR (r.id_ruta is null)
        GROUP BY v.id_vehiculo, j.id_ruta,j.fecha, v.capacidad_peso_g, v.capacidad_volumen_m3, r.id_ruta
        HAVING (v.capacidad_peso_g - COALESCE(SUM(p.peso_g), 0)) > 0
        OR (v.capacidad_volumen_m3 - COALESCE(SUM((p.alto_cm / 100) * (p.largo_cm / 100) * (p.largo_cm / 100)), 0)) > 0
`;

export const INSERT_TRANSPORTISTA_JORNADA = `INSERT INTO transportistas_jornada (
        id_transportista,
        id_jornada,
        id_vehiculo
    ) VALUES
    (
        $/id_transportista/,
        $/id_jornada/,
        $/id_vehiculo/
    ) RETURNING id_transportista_jornada
`;

export const INSERT_TRANSPORTISTA_JORNADA_ENVIOS = `INSERT INTO transportistas_jornada_orden_envio (
        id_orden_envio,
        id_transportista_jornada
    ) VALUES
    (
        $/id_orden_envio/,
        $/id_transportista_jornada/
    );
    `;

export const QUERY_LISTA_ORDENES_ENVIO = `SELECT DISTINCT ON (oe.id_orden_envio)
                oe.id_orden_envio,
                p.numero_guia,
                tp.nombre AS tipo_producto,
                p.peso_g,
                eoe.id_estado_envio,
                ee.nombre AS estado_envio,
                eoe.fecha_creacion AS fecha_estado,
                u.id_usuario AS id_creador,
                u.nombre AS creador,
                t.id_transportista,
                u_t.nombre AS transportista,
                v.placa AS vehiculo,
                j.fecha AS fecha_jornada,
                j.hora_inicio,
                j.hora_fin,
                r.id_ruta,
                r.nombre AS ruta,
                r.tiempo_entrega_estimado_horas
            FROM orden_envios oe
            JOIN paquetes p ON oe.id_paquete = p.id_paquete
            JOIN tipos_producto tp ON p.id_tipo_producto = tp.id_tipo_producto
            JOIN estados_orden_envios eoe ON oe.id_orden_envio = eoe.id_orden_envio
            JOIN estados_envios ee ON eoe.id_estado_envio = ee.id_estado_envio
            JOIN usuarios u ON oe.id_usuario_creador = u.id_usuario
            LEFT JOIN transportistas_jornada_orden_envio tjo ON oe.id_orden_envio = tjo.id_orden_envio
            LEFT JOIN transportistas_jornada tj ON tjo.id_transportista_jornada = tj.id_transportista_jornada
            LEFT JOIN transportistas t ON tj.id_transportista = t.id_transportista
            LEFT JOIN usuarios u_t ON t.id_usuario = u_t.id_usuario
            LEFT JOIN vehiculos v ON tj.id_vehiculo = v.id_vehiculo
            LEFT JOIN jornadas j ON tj.id_jornada = j.id_jornada
            LEFT JOIN rutas r ON j.id_ruta = r.id_ruta
            WHERE 1=1
`;

export const QUERY_LISTA_ORDENES_ENVIO_COUNT = `--sql
    WITH lista_data AS (
    SELECT
        DISTINCT ON(eoe.id_orden_envio)
        oe.id_orden_envio,
        p.numero_guia,
        tp.nombre AS tipo_producto,
        p.peso_g,
        eoe.id_estado_envio,
        ee.nombre AS estado_envio,
        eoe.fecha_creacion AS fecha_estado,
        u.id_usuario AS id_creador,
        u.nombre AS creador,
        t.id_transportista,
        u_t.nombre AS transportista,
        v.placa AS vehiculo,
        j.fecha AS fecha_jornada,
        j.hora_inicio,
        j.hora_fin,
        r.id_ruta,
        r.nombre AS ruta,
        r.tiempo_entrega_estimado_horas
    FROM orden_envios oe
    JOIN paquetes p ON oe.id_paquete = p.id_paquete
    JOIN tipos_producto tp ON p.id_tipo_producto = tp.id_tipo_producto
    JOIN estados_orden_envios eoe ON oe.id_orden_envio = eoe.id_orden_envio
    JOIN estados_envios ee ON eoe.id_estado_envio = ee.id_estado_envio
    JOIN usuarios u ON oe.id_usuario_creador = u.id_usuario
    LEFT JOIN transportistas_jornada_orden_envio tjo ON oe.id_orden_envio = tjo.id_orden_envio
    LEFT JOIN transportistas_jornada tj ON tjo.id_transportista_jornada = tj.id_transportista_jornada
    LEFT JOIN transportistas t ON tj.id_transportista = t.id_transportista
    LEFT JOIN usuarios u_t ON t.id_usuario = u_t.id_usuario
    LEFT JOIN vehiculos v ON tj.id_vehiculo = v.id_vehiculo
    LEFT JOIN jornadas j ON tj.id_jornada = j.id_jornada
    LEFT JOIN rutas r ON j.id_ruta = r.id_ruta
    WHERE 1=1 :resto_condiciones:
    ORDER by eoe.id_orden_envio, eoe.fecha_creacion DESC
    )
    select COUNT(*) from lista_data`;