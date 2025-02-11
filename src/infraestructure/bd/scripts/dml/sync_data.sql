INSERT INTO
    roles (id_rol, nombre, esta_activo)
VALUES
    (1, 'Admin', TRUE),
    (2, 'Backoffice', TRUE),
    (3, 'Cliente', TRUE),
    (4, 'Transportista', TRUE);


INSERT INTO usuarios (
        nombre,
        correo,
        contrasena,
        id_rol,
        fecha_creacion
    )
VALUES (
        'Andres Lobaton',
        'andres@gmail.com',
        '$2b$10$WJUhy76Bto821JoRaNixXuWJ8IqB/8hCQatT8xOpr0hMysYl1xB1S',
        1,
        '2025-02-07 16:35:40.521'
    );

INSERT INTO
    usuarios (
        nombre,
        correo,
        contrasena,
        id_rol,
        fecha_creacion
    )
VALUES
    (
        'Juan Pérez',
        'juanperez@gmail.com',
        '$2b$12$93tXVZdPLWAKO0Hyo6Tew.u4nBR1Q8Y2s5bG25dDuf.KFxbjytoCS',
        4,
        NOW()
    );

INSERT INTO
    usuarios (
        nombre,
        correo,
        contrasena,
        id_rol,
        fecha_creacion
    )
VALUES
    (
        'JOSE',
        'jose@gmail.com',
        '$2b$12$93tXVZdPLWAKO0Hyo6Tew.u4nBR1Q8Y2s5bG25dDuf.KFxbjytoCS',
        4,
        NOW()
    );

INSERT INTO
    usuarios (
        nombre,
        correo,
        contrasena,
        id_rol,
        fecha_creacion
    )
VALUES
    (
        'María González',
        'mariagonzalez@gmail.com',
        '$2b$12$93tXVZdPLWAKO0Hyo6Tew.u4nBR1Q8Y2s5bG25dDuf.KFxbjytoCS',
        4,
        NOW()
    );

INSERT INTO
    usuarios (
        nombre,
        correo,
        contrasena,
        id_rol,
        fecha_creacion
    )
VALUES
    (
        'Carlos Ramírez',
        'carlosramirez@gmail.com',
        '$2b$12$93tXVZdPLWAKO0Hyo6Tew.u4nBR1Q8Y2s5bG25dDuf.KFxbjytoCS',
        4,
        NOW()
    );

INSERT INTO
    usuarios (
        nombre,
        correo,
        contrasena,
        id_rol,
        fecha_creacion
    )
VALUES
    (
        'Ana Torres',
        'anatorres@gmail.com',
        '$2b$12$93tXVZdPLWAKO0Hyo6Tew.u4nBR1Q8Y2s5bG25dDuf.KFxbjytoCS',
        4,
        NOW()
    );

INSERT INTO
    usuarios (
        nombre,
        correo,
        contrasena,
        id_rol,
        fecha_creacion
    )
VALUES
    (
        'Luis Herrera',
        'luisherrera@gmail.com',
        '$2b$12$93tXVZdPLWAKO0Hyo6Tew.u4nBR1Q8Y2s5bG25dDuf.KFxbjytoCS',
        4,
        NOW()
    );

INSERT INTO tipos_producto (id_tipo_producto, nombre, esta_activo) VALUES
    (1, 'Documentos y sobres', TRUE),
    (2, 'Electrónicos pequeños (celulares, tablets, accesorios)', TRUE),
    (3, 'Ropa y calzado', TRUE),
    (4, 'Medicamentos y productos farmacéuticos', TRUE),
    (5, 'Alimentos empacados y no perecederos', TRUE),
    (6, 'Artículos para el hogar (vajillas, decoración, pequeños electrodomésticos)', TRUE),
    (7, 'Herramientas y ferretería', TRUE),
    (8, 'Juguetes y juegos', TRUE),
    (9, 'Belleza y cuidado personal (maquillaje, cremas, perfumes)', TRUE),
    (10, 'Productos deportivos y de fitness (pesas, ropa deportiva, suplementos)', TRUE),
    (11, 'Repuestos automotrices y motocicletas', TRUE),
    (12, 'Papelería y artículos de oficina', TRUE),
    (13, 'Productos de ecommerce (artículos de tiendas online, dropshipping)', TRUE),
    (14, 'Bicicletas y accesorios', TRUE),
    (15, 'Lentes y gafas de sol', TRUE),
    (16, 'Dispositivos de computación (laptops, teclados, ratones, discos duros)', TRUE),
    (17, 'Instrumentos musicales pequeños (guitarras, teclados, accesorios)', TRUE),
    (18, 'Productos para bebés (pañales, biberones, juguetes para bebés)', TRUE),
    (19, 'Productos veterinarios y para mascotas', TRUE),
    (20, 'Librería y libros', TRUE);

INSERT INTO
    tipos_via (id_tipo_via, nombre)
VALUES
    (1, 'Autopista'),
    (2, 'Avenida'),
    (3, 'Avenida Calle'),
    (4, 'Avenida Carrera'),
    (5, 'Calle'),
    (6, 'Carrera'),
    (7, 'Circular'),
    (8, 'Circunvalar'),
    (9, 'Diagonal'),
    (10, 'Transversal'),
    (11, 'Barrio'),
    (12, 'Conjunto'),
    (13, 'Exterior'),
    (14, 'Variante'),
    (15, 'Vereda'),
    (16, 'Carretera'),
    (17, 'Otra Dirección'),
    (18, 'Kilómetro'),
    (19, 'Manzana'),
    (20, 'Vía');

INSERT INTO
    departamentos (id_departamento, nombre, abreviado)
VALUES
    (1, 'Amazonas', 'AMA'),
    (2, 'Antioquia', 'ANT'),
    (3, 'Arauca', 'ARA'),
    (4, 'Atlántico', 'ATL'),
(5, 'Bogotá D.C.', 'BOG'),
(6, 'Bolívar', 'BOL'),
(7, 'Boyacá', 'BOY'),
(8, 'Caldas', 'CAL'),
(9, 'Caquetá', 'CAQ'),
(10, 'Casanare', 'CAS'),
(11, 'Cauca', 'CAU'),
(12, 'Cesar', 'CES'),
(13, 'Chocó', 'CHO'),
(14, 'Córdoba', 'COR'),
(15, 'Cundinamarca', 'CUN'),
(16, 'Guainía', 'GUA'),
(17, 'Guaviare', 'GUV'),
(18, 'Huila', 'HUI'),
(19, 'La Guajira', 'LAG'),
(20, 'Magdalena', 'MAG'),
(21, 'Meta', 'MET'),
(22, 'Nariño', 'NAR'),
(23, 'Norte de Santander', 'NSA'),
(24, 'Putumayo', 'PUT'),
(25, 'Quindío', 'QUI'),
(26, 'Risaralda', 'RIS'),
(27, 'San Andrés y Providencia', 'SAP'),
(28, 'Santander', 'STN'),
(29, 'Sucre', 'SUC'),
(30, 'Tolima', 'TOL'),
(31, 'Valle del Cauca', 'VCA'),
(32, 'Vaupés', 'VAU'),
(33, 'Vichada', 'VIC');

INSERT INTO
    ciudades (id_ciudad, nombre, id_departamento)
VALUES
    (1, 'Leticia', 1),
    (2, 'Puerto Nariño', 1),
    (3, 'Medellín', 2),
    (4, 'Bello', 2),
    (5, 'Envigado', 2),
    (6, 'Itagüí', 2),
    (7, 'Turbo', 2),
    (8, 'Apartadó', 2),
    (9, 'Arauca', 3),
    (10, 'Tame', 3),
    (11, 'Barranquilla', 4),
    (12, 'Soledad', 4),
    (13, 'Malambo', 4),
    (14, 'Sabanalarga', 4),
    (15, 'Bogotá', 5),
    (16, 'Cartagena', 6),
    (17, 'Magangué', 6),
    (18, 'Tunja', 7),
    (19, 'Duitama', 7),
    (20, 'Sogamoso', 7),
    (21, 'Manizales', 8),
    (22, 'Florencia', 9),
    (23, 'Yopal', 10),
    (24, 'Popayán', 11),
    (25, 'Valledupar', 12),
    (26, 'Quibdó', 13),
    (27, 'Montería', 14),
(28, 'Fusagasugá', 15),
(29, 'Girardot', 15),
(30, 'Zipaquirá', 15),
(31, 'Inírida', 16),
(32, 'San José del Guaviare', 17),
(33, 'Neiva', 18),
(34, 'Riohacha', 19),
(35, 'Santa Marta', 20),
(36, 'Villavicencio', 21),
(37, 'Pasto', 22),
(38, 'Cúcuta', 23),
(39, 'Mocoa', 24),
(40, 'Armenia', 25),
(41, 'Pereira', 26),
(42, 'San Andrés', 27),
(43, 'Bucaramanga', 28),
(44, 'Sincelejo', 29),
(45, 'Ibagué', 30),
(46, 'Cali', 31),
(47, 'Mitú', 32),
(48, 'Puerto Carreño', 33);

INSERT INTO
    estados_envios (id_estado_envio, nombre)
VALUES
    (1, 'En espera'),
    (2, 'En tránsito'),
    (3, 'Entregado');
-- Test case HU4
INSERT INTO
    direcciones (id_tipo_via, via, numero, detalle, id_ciudad)
VALUES
    (5, '21', '01', 'Zona industrial', 6),
    (
        5,
        '26d',
        '32',
        'Cerca del parque la floresta',
        7
    );

INSERT INTO
    paquetes (
        id_paquete,
        id_tipo_producto,
        numero_guia,
        peso_g,
        alto_cm,
        ancho_cm,
        largo_cm,
        contenido,
        es_fragil
    )
VALUES
    (
        100,
        8,
        '51060507701',
        250,
        30,
        10,
        20,
        'Plancha de cabello para risos',
        false
    );

INSERT INTO
    orden_envios (
        id_orden_envio,
        id_usuario_creador,
        id_paquete,
        id_direccion_destino,
        id_direccion_remitente
    )
VALUES
    (100, 1, 100, 2, 1);

INSERT INTO
    estados_orden_envios (
        id_orden_envio,
        fecha_creacion,
        id_estado_envio,
        anotaciones
    )
VALUES
    (
        100,
        '2025-02-09 21:11:32.857',
        1,
        'Inicia proceso envio'
    );

INSERT INTO
    estados_orden_envios (
        id_orden_envio,
        fecha_creacion,
        id_estado_envio,
        anotaciones
    )
VALUES
    (
        100,
        '2025-02-09 21:12:28.648',
        2,
        'Se lo llevo el carro'
    );
INSERT INTO
    tipo_vehiculos (nombre, esta_activo, fecha_creacion)
VALUES
    ('Camión Liviano', true, '2025-02-10 12:48:41.802'),
    ('Camión Pesado', true, '2025-02-10 12:48:41.802'),
    ('Furgoneta', true, '2025-02-10 12:48:41.802'),
    ('Moto', true, '2025-02-10 12:48:41.802'),
    ('Tráiler', true, '2025-02-10 12:48:41.802');

INSERT INTO
    rutas (
        id_ciudad_destino,
        id_ciudad_remitente,
        nombre,
        descripcion,
        tiempo_entrega_estimado_horas
    )
VALUES
    (
        3,
        5,
        'Ruta Medellín - Envigado',
        'Ruta que conecta Medellín con Envigado pasando por Itagüí.',
        1
    ),
    (
        11,
        12,
        'Ruta Barranquilla - Soledad',
        'Ruta entre Barranquilla y Soledad, pasando por Malambo.',
        1
    ),
    (
        16,
        17,
        'Ruta Cartagena - Magangué',
        'Ruta entre Cartagena y Magangué, pasando por Sabanalarga.',
        2
    ),
    (
        21,
        23,
        'Ruta Manizales - Yopal',
        'Ruta de Manizales a Yopal, pasando por Sogamoso y Tunja.',
        4
    ),
    (
        34,
        38,
        'Ruta Villavicencio - Cúcuta',
        'Ruta entre Villavicencio y Cúcuta, pasando por Bucaramanga.',
        5
    ),
    (
        42,
        46,
        'Ruta Ibagué - Cali',
        'Ruta entre Ibagué y Cali, atravesando Armenia y Pereira.',
        3
    );

INSERT INTO
    ciudades_paraderos (id_ruta, id_ciudad)
VALUES
    (1, 6),
    (1, 4),
    (2, 13),
    (3, 14),
    (4, 18),
    (4, 20),
    (5, 43),
    (6, 40),
    (6, 41);

INSERT INTO
    vehiculos (
        placa,
        color,
        capacidad_peso_g,
        capacidad_volumen_m3,
        id_tipo_vehiculo
    )
VALUES
    ('ABC123', 'Blanco', 3000000, 10.5, 1),
    ('DEF456', 'Rojo', 5000000, 20.0, 2),
    ('GHI789', 'Azul', 1500000, 5.0, 3),
    ('JKL101', 'Negro', 180000, 0.5, 4),
    ('MNO112', 'Gris', 25000000, 60.0, 5);

INSERT INTO
    transportistas (
        id_transportista,
        id_usuario,
        telefono,
        fecha_creacion
    )
VALUES
    (1, 2, '3001234567', NOW()),
    (2, 3, '3019876543', NOW()),
    (3, 4, '3025678901', NOW()),
    (4, 5, '3101112233', NOW()),
    (5, 6, '3159998877', NOW());

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        1,
        '2025-02-11',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        1
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        2,
        '2025-02-12',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        1
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        3,
        '2025-02-13',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        1
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        4,
        '2025-02-14',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        1
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        5,
        '2025-02-15',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        1
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        6,
        '2025-02-16',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        1
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        7,
        '2025-02-17',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        1
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        8,
        '2025-02-18',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        1
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        9,
        '2025-02-19',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        1
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        10,
        '2025-02-20',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        1
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        11,
        '2025-02-11',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        2
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        12,
        '2025-02-12',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        2
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        13,
        '2025-02-13',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        2
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        14,
        '2025-02-14',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        2
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        15,
        '2025-02-15',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        2
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        16,
        '2025-02-16',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        2
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        17,
        '2025-02-17',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        2
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        18,
        '2025-02-18',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        2
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        19,
        '2025-02-19',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        2
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        20,
        '2025-02-20',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        2
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        21,
        '2025-02-11',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        3
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        22,
        '2025-02-12',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        3
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        23,
        '2025-02-13',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        3
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        24,
        '2025-02-14',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        3
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        25,
        '2025-02-15',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        3
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        26,
        '2025-02-16',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        3
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        27,
        '2025-02-17',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        3
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        28,
        '2025-02-18',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        3
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        29,
        '2025-02-19',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        3
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        30,
        '2025-02-20',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        3
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        31,
        '2025-02-11',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        4
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        32,
        '2025-02-12',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        4
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        33,
        '2025-02-13',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        4
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        34,
        '2025-02-14',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        4
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        35,
        '2025-02-15',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        4
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        36,
        '2025-02-16',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        4
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        37,
        '2025-02-17',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        4
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        38,
        '2025-02-18',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        4
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        39,
        '2025-02-19',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        4
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        40,
        '2025-02-20',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        4
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        41,
        '2025-02-11',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        5
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        42,
        '2025-02-12',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        5
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        43,
        '2025-02-13',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        5
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        44,
        '2025-02-14',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        5
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        45,
        '2025-02-15',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        5
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        46,
        '2025-02-16',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        5
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        47,
        '2025-02-17',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        5
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        48,
        '2025-02-18',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        5
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        49,
        '2025-02-19',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        5
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        50,
        '2025-02-20',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        5
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        51,
        '2025-02-11',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        6
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        52,
        '2025-02-12',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        6
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        53,
        '2025-02-13',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        6
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        54,
        '2025-02-14',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        6
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        55,
        '2025-02-15',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        6
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        56,
        '2025-02-16',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        6
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        57,
        '2025-02-17',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        6
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        58,
        '2025-02-18',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        6
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        59,
        '2025-02-19',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        6
    );

INSERT INTO
    jornadas (
        id_jornada,
        fecha,
        hora_inicio,
        hora_fin,
        fecha_creacion,
        id_ruta
    )
VALUES
    (
        60,
        '2025-02-20',
        '06:00:00',
        '18:00:00',
        '2025-02-10 13:02:46.943',
        6
    );