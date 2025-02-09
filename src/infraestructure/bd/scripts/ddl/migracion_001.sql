CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    esta_activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    id_rol INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    esta_activo BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

CREATE TABLE tipos_producto (
    id_tipo_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    esta_activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE paquetes (
    id_paquete SERIAL PRIMARY KEY,
    id_tipo_producto INT NOT NULL,
    numero_guia VARCHAR(255) UNIQUE NOT NULL,
    peso_kg INT NOT NULL,
    alto_cm INT NOT NULL,
    ancho_cm INT NOT NULL,
    largo_cm INT NOT NULL,
    contenido VARCHAR(400) NOT NULL,
    es_fragil BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_tipo_producto) REFERENCES tipos_producto(id_tipo_producto)
);

CREATE TABLE orden_envios (
    id_orden_envio SERIAL PRIMARY KEY,
    id_usuario_creador INT NOT NULL,
    id_paquete INT NOT NULL,
    direccion_destino VARCHAR(400) NOT NULL,
    direccion_remitente VARCHAR(400) NOT NULL,
    FOREIGN KEY (id_usuario_creador) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_paquete) REFERENCES paquetes(id_paquete)
);

CREATE TABLE estados_orden_envios (
    id_estado_orden_envio SERIAL PRIMARY KEY,
    id_orden_envio INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descripcion TEXT NULL,
    FOREIGN KEY (id_orden_envio) REFERENCES orden_envios(id_orden_envio)
);
