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
