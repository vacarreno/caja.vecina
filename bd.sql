-- ===========================================
--  BASE DE DATOS: caja_vecina
-- ===========================================
-- Crear BD (solo si lo harás manual; en Render se crea desde panel)
-- CREATE DATABASE caja_vecina;

-- Cambiar al schema público
SET search_path TO public;

-- ===========================================
-- 1. TABLA ADMINISTRADORES
-- ===========================================
CREATE TABLE admins (
    id              SERIAL PRIMARY KEY,
    nombre          VARCHAR(120) NOT NULL,
    email           VARCHAR(150) UNIQUE NOT NULL,
    telefono        VARCHAR(20),
    password_hash   TEXT NOT NULL,
    rol             VARCHAR(30) DEFAULT 'admin',
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- Trigger actualización automática
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ===========================================
-- 2. TABLA VECINOS
-- ===========================================
CREATE TABLE vecinos (
    id              SERIAL PRIMARY KEY,
    nombre          VARCHAR(120) NOT NULL,
    rut             VARCHAR(12) UNIQUE NOT NULL,
    direccion       TEXT,
    telefono        VARCHAR(20),
    foto_url        TEXT,
    saldo_asignado  NUMERIC(12,2) DEFAULT 0,
    saldo_disponible NUMERIC(12,2) DEFAULT 0,
    qr_secret_key   TEXT NOT NULL,           -- base del QR temporal
    qr_last_gen     TIMESTAMP,               -- última regeneración
    estado          BOOLEAN DEFAULT TRUE,    -- activo/inactivo
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TRIGGER tg_vecinos_update
BEFORE UPDATE ON vecinos
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- ===========================================
-- 3. TABLA TRANSACCIONES
-- ===========================================
CREATE TABLE transacciones (
    id              SERIAL PRIMARY KEY,
    vecino_id       INT NOT NULL REFERENCES vecinos(id),
    comercio_id     INT,                     -- si agregas tabla comercios
    monto_gastado   NUMERIC(12,2) NOT NULL,
    monto_antes     NUMERIC(12,2) NOT NULL,
    monto_despues   NUMERIC(12,2) NOT NULL,
    boleta_url      TEXT,                    -- foto de boleta subida al server
    fecha           TIMESTAMP DEFAULT NOW(),
    origen          VARCHAR(20) DEFAULT 'qr', -- qr / manual / admin / etc.
    estado          VARCHAR(20) DEFAULT 'ok'
);

-- Índices
CREATE INDEX idx_trans_vecino ON transacciones(vecino_id);

-- ===========================================
-- 4. TABLA COMERCIANTES (APP COMERCIANTE)
-- ===========================================
CREATE TABLE comerciantes (
    id              SERIAL PRIMARY KEY,
    nombre          VARCHAR(120) NOT NULL,
    rut             VARCHAR(12) UNIQUE NOT NULL,
    telefono        VARCHAR(20),
    direccion       TEXT,
    foto_url        TEXT,
    email           VARCHAR(150) UNIQUE,
    password_hash   TEXT NOT NULL,
    estado          BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TRIGGER tg_comerciantes_update
BEFORE UPDATE ON comerciantes
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- ===========================================
-- 5. TABLA QR USADOS (SEGURIDAD)
-- Se usa para evitar reutilización de códigos QR al vuelo
-- ===========================================
CREATE TABLE qr_tokens (
    id              SERIAL PRIMARY KEY,
    vecino_id       INT REFERENCES vecinos(id),
    token           TEXT NOT NULL,
    generado_en     TIMESTAMP DEFAULT NOW(),
    expiracion      TIMESTAMP NOT NULL,
    usado           BOOLEAN DEFAULT FALSE,
    usado_en        TIMESTAMP
);

CREATE INDEX idx_qr_token ON qr_tokens(token);

-- ===========================================
-- 6. AUDITORÍA (Cambios críticos)
-- ===========================================
CREATE TABLE auditoria (
    id              SERIAL PRIMARY KEY,
    usuario_tipo    VARCHAR(20),        -- admin/comerciante/sistema
    usuario_id      INT,
    accion          TEXT NOT NULL,
    ip_origen       VARCHAR(50),
    detalle_json    JSONB,
    fecha           TIMESTAMP DEFAULT NOW()
);
