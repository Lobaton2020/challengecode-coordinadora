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
    peso_g INT NOT NULL,
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
-- Script ajustes para coreccion
CREATE TABLE tipos_via (
    id_tipo_via SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    esta_activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE direcciones (
    id_direccion SERIAL PRIMARY KEY,
    id_tipo_via INT NOT NULL,
    via VARCHAR(255) NOT NULL,
    numero VARCHAR(255) NOT NULL,
    detalle VARCHAR(255),
    FOREIGN KEY (id_tipo_via) REFERENCES tipos_via(id_tipo_via)
);

ALTER TABLE
    orden_envios
ADD
    COLUMN id_direccion_destino INT;

ALTER TABLE
    orden_envios
ADD
    COLUMN id_direccion_remitente INT;

ALTER TABLE
    orden_envios
ADD
    CONSTRAINT fk_direccion_destino FOREIGN KEY (id_direccion_destino) REFERENCES direcciones(id_direccion);

ALTER TABLE
    orden_envios
ADD
    CONSTRAINT fk_direccion_remitente FOREIGN KEY (id_direccion_remitente) REFERENCES direcciones(id_direccion);

ALTER TABLE
    orden_envios DROP COLUMN direccion_destino;

ALTER TABLE
    orden_envios DROP COLUMN direccion_remitente;

-- Ajustes ciudades y departamento
CREATE TABLE departamentos (
    id_departamento SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    esta_activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    abreviado VARCHAR(255)
);

CREATE TABLE ciudades (
    id_ciudad SERIAL PRIMARY KEY,
    id_departamento INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    esta_activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_departamento) REFERENCES departamentos(id_departamento) ON DELETE CASCADE
);

ALTER TABLE
    direcciones
ADD
    COLUMN id_ciudad INT;

ALTER TABLE
    direcciones
ADD
    CONSTRAINT fk_ciudad FOREIGN KEY (id_ciudad) REFERENCES ciudades(id_ciudad);

CREATE TABLE estados_envios (
    id_estado_envio SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    esta_activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE
    estados_orden_envios
    DROP COLUMN IF EXISTS nombre,
    DROP COLUMN IF EXISTS descripcion,
    ADD COLUMN id_estado_envio INT NOT NULL,
    ADD COLUMN anotaciones TEXT NULL,
    ADD
        CONSTRAINT fk_estado_envio FOREIGN KEY (id_estado_envio) REFERENCES    estados_envios(id_estado_envio);

-- Modulo de asigancion de transportista
CREATE TABLE tipo_vehiculos (
    id_tipo_vehiculo SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    esta_activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vehiculos (
    id_vehiculo SERIAL PRIMARY KEY,
    placa VARCHAR(50) UNIQUE NOT NULL,
    color VARCHAR(50),
    capacidad_peso_g NUMERIC(10, 2) NOT NULL,
    capacidad_volumen_m3 NUMERIC(10, 2) NOT NULL,
    id_tipo_vehiculo INT REFERENCES tipo_vehiculos(id_tipo_vehiculo)
);

CREATE TABLE transportistas (
    id_transportista SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios(id_usuario),
    telefono VARCHAR(100),
    esta_activo boolean default true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE jornadas (
    id_jornada SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rutas (
    id_ruta SERIAL PRIMARY KEY,
    id_ciudad_destino INT REFERENCES ciudades(id_ciudad),
    id_ciudad_remitente INT REFERENCES ciudades(id_ciudad),
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500),
    tiempo_entrega_estimado_horas INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transportistas_jornada (
    id_transportista_jornada SERIAL PRIMARY KEY,
    id_transportista INT REFERENCES transportistas(id_transportista),
    id_jornada INT REFERENCES jornadas(id_jornada),
    id_vehiculo INT REFERENCES vehiculos(id_vehiculo),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transportistas_jornada_orden_envio (
    id_transportista_jornada_orden_envio SERIAL PRIMARY KEY,
    id_transportista_jornada INT REFERENCES transportistas_jornada(id_transportista_jornada),
    id_orden_envio INT REFERENCES orden_envios(id_orden_envio),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ciudades_paraderos (
    id_ciudad_paradero SERIAL PRIMARY KEY,
    id_ruta INT REFERENCES rutas(id_ruta),
    id_ciudad INT REFERENCES ciudades(id_ciudad),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE
    jornadas
ADD
    COLUMN id_ruta INT REFERENCES rutas(id_ruta);

-- Optmizacion para consultas con indices

CREATE INDEX idx_orden_envio ON estados_orden_envios(id_orden_envio);
CREATE INDEX idx_transportista_jornada ON transportistas_jornada_orden_envio(id_transportista_jornada);
CREATE INDEX idx_paquete ON paquetes(id_paquete);
CREATE INDEX idx_ruta ON rutas(id_ruta);
