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
    (5, 'Bolívar', 'BOL'),
    (6, 'Boyacá', 'BOY'),
    (7, 'Caldas', 'CAL'),
    (8, 'Caquetá', 'CAQ'),
    (9, 'Casanare', 'CAS'),
    (10, 'Cauca', 'CAU'),
    (11, 'Cesar', 'CES'),
    (12, 'Chocó', 'CHO'),
    (13, 'Córdoba', 'COR'),
    (14, 'Cundinamarca', 'CUN'),
    (15, 'Guainía', 'GUA'),
    (16, 'Guaviare', 'GUV'),
    (17, 'Huila', 'HUI'),
    (18, 'La Guajira', 'LAG'),
    (19, 'Magdalena', 'MAG'),
    (20, 'Meta', 'MET'),
    (21, 'Nariño', 'NAR'),
    (22, 'Norte de Santander', 'N/STDER'),
    (23, 'Putumayo', 'PUT'),
    (24, 'Quindío', 'QUI'),
    (25, 'Risaralda', 'RIS'),
    (26, 'San Andrés y Providencia', 'SAP'),
    (27, 'Santander', 'STDER'),
    (28, 'Sucre', 'SUC'),
    (29, 'Tolima', 'TOL'),
    (30, 'Valle del Cauca', 'V/Cau'),
    (31, 'Vaupés', 'VAU'),
    (32, 'Vichada', 'VIC');

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
    (28, 'Bogotá', 15),
    (29, 'Inírida', 16),
    (30, 'San José del Guaviare', 17),
    (31, 'Neiva', 18),
    (32, 'Riohacha', 19),
    (33, 'Santa Marta', 20),
    (34, 'Villavicencio', 21),
    (35, 'Pasto', 22),
    (36, 'Cúcuta', 23),
    (37, 'Mocoa', 24),
    (38, 'Armenia', 25),
    (39, 'Pereira', 26),
    (40, 'Bucaramanga', 27),
    (41, 'Sincelejo', 28),
    (42, 'Ibagué', 29),
    (43, 'Cali', 30),
    (44, 'Mitú', 31),
    (45, 'Puerto Carreño', 32);

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