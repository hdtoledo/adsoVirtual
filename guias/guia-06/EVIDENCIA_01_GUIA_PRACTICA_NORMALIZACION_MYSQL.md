# Guía Práctica Evidencia 1: Normalización de Bases de Datos y Modelado en MySQL Workbench
## Evidencia Oficial: `GA6-220501096-AA1-EV01`
### Formación ADSO Virtual · SENA Regional Huila (CADPH Garzón)

---

## 📌 Contenido de esta Guía
1. **Panorama de los SGBD / DBMS (Sistemas Gestores de Bases de Datos)**
2. **Caso de Negocio: Sistema de Facturación de Ventas**
3. **Paso a Paso de Normalización (0FN → 1FN → 2FN → 3FN)**
4. **Cardinalidades y Reglas de Negocio**
5. **Tutorial Paso a Paso en MySQL Workbench (Diseño EER y Forward Engineering)**
6. **Script SQL DDL Maestro Ejecutable**
7. **Estructura para la Entrega Oficial de la Evidencia (Lista de Chequeo)**

---

## 1. Panorama de los SGBD / DBMS (Database Management Systems)

Un **DBMS / SGBD** es el software que actúa como intermediario entre los usuarios/aplicaciones y los datos físicos almacenados en disco. Proporciona interfaces para definición de datos (DDL), manipulación de datos (DML), control de concurrencia, seguridad, integridad referencial y transacciones ACID.

```
+-------------------------------------------------------------+
|               APLICACIÓN / USUARIO (ADSO)                   |
+-------------------------------------------------------------+
                              |
                     Sentencias SQL / BSON
                              v
+-------------------------------------------------------------+
|                   SGBD / DBMS ENGINE                        |
|  [Optimizador de Consultas]  [Gestor de Transacciones ACID] |
|  [Mecanismos de Bloqueo]     [Seguridad & Restricciones]    |
+-------------------------------------------------------------+
                              |
                    Lectura / Escritura
                              v
+-------------------------------------------------------------+
|             ALMACENAMIENTO FÍSICO EN DISCO                  |
+-------------------------------------------------------------+
```

### Clasificación Principal de los DBMS

| Familia | Tipo de Modelo | Principales DBMS | Casos de Uso Recomendados | Ventajas Clave |
|---|---|---|---|---|
| **RDBMS (Relacionales)** | Tablas, filas, columnas, álgebra relacional y SQL estricto. | **MySQL**, **PostgreSQL**, **MariaDB**, **Oracle Database**, **Microsoft SQL Server**, **SQLite**. | Sistemas transaccionales (ERP, e-commerce, facturación, banca, reservas). | Integridad referencial estricta, soporte ACID completo, consistencia inmediata, consultas complejas con `JOIN`. |
| **NoSQL Documental** | Documentos semi-estructurados en BSON / JSON agrupados en colecciones. | **MongoDB**, **CouchDB**, **Amazon DocumentDB**. | Catálogos de productos con atributos variables, perfiles de usuario, bitácoras, carritos de compra. | Esquema flexible dinámico (*schemaless*), escalabilidad horizontal (*sharding*), lectura rápida de documentos anidados. |
| **NoSQL Clave-Valor** | Pares `key-value` ultra veloces en memoria RAM. | **Redis**, **Memcached**, **Amazon DynamoDB**. | Caching de sesiones, colas de mensajes, contadores en tiempo real, tablas de tokens JWT. | Latencias menores a un milisegundo, alta tasa de peticiones por segundo. |
| **NoSQL Columnar** | Familias de columnas orientadas a análisis de grandes volúmenes. | **Apache Cassandra**, **HBase**, **ScyllaDB**. | Análisis masivo de eventos, IoT, logs de telemetría de alta frecuencia. | Escrituras masivas ultra veloces, distribución geográfica masiva. |
| **NoSQL Grafos** | Nodos, aristas (relaciones) y propiedades. | **Neo4j**, **Amazon Neptune**, **ArangoDB**. | Redes sociales, motores de recomendación, detección de fraudes financieros y rutas logísticas. | Consultas de relaciones interconectadas complejas sin sobrecosto de múltiples `JOINs`. |

---

## 2. Caso de Negocio para la Evidencia 1: "Factura de Venta"

Imagina que un minimercado almacena todas sus operaciones en una **única hoja de cálculo plana**. Esta tabla representa el estado **0FN (Cero Forma Normal / No Normalizada)**:

### 📋 Tabla No Normalizada (0FN): `Reporte_Facturacion`

| NumeroFactura | Fecha | DocCliente | NombreCliente | DireccionCliente | CiudadCliente | IdProducto | DescripcionProducto | PrecioUnitario | Cantidad | SubtotalLinea | TotalFactura |
|:---:|:---:|:---:|---|---|---|:---:|---|:---:|:---:|:---:|:---:|
| **F-101** | 2026-09-15 | 10752001 | Carlos Dussán | Calle 5 # 10-20 | Garzón | P-01<br>P-02 | Teclado Mecánico<br>Mouse Óptico | $150.000<br>$60.000 | 1<br>2 | $150.000<br>$120.000 | $270.000 |
| **F-102** | 2026-09-15 | 10752002 | Andrea Peña | Cra 8 # 14-35 | Neiva | P-02 | Mouse Óptico | $60.000 | 1 | $60.000 | $60.000 |
| **F-103** | 2026-09-16 | 10752001 | Carlos Dussán | Calle 5 # 10-20 | Garzón | P-03 | Cable HDMI 4K | $25.000 | 3 | $75.000 | $75.000 |

### ⚠️ Anomalías Críticas Detectadas en 0FN:
1. **Anomalía de Inserción:** Si queremos registrar un nuevo producto que aún no ha sido vendido, no podemos ingresarlo sin inventar un número de factura y un cliente ficticio.
2. **Anomalía de Modificación:** Si el cliente *Carlos Dussán* cambia de dirección, debemos actualizar decenas de filas en la tabla; si olvidamos una sola, la base de datos queda corrupta e inconsistente.
3. **Anomalía de Eliminación:** Si eliminamos la factura `F-102`, se borran por completo los datos de la clienta *Andrea Peña*, perdiendo su historial de contacto.
4. **Grupos Repetitivos:** La fila de la factura `F-101` contiene múltiples valores en las columnas de productos (viola la atomicidad).

---

## 3. Proceso de Normalización Paso a Paso

### 🥇 Paso 1: Primera Forma Normal (1FN)

> **Regla de la 1FN:**
> 1. Cada columna debe contener **valores atómicos** (indivisibles, un único valor por celda).
> 2. No deben existir grupos repetitivos de columnas ni arrays incrustados en una sola celda.
> 3. Debe definirse una **clave primaria (PK)** única que identifique cada tupla.

#### Descomposición a 1FN:
Separamos los ítems de la factura `F-101` en filas individuales y establecemos una **clave primaria compuesta**: `(NumeroFactura, IdProducto)`.

| NumeroFactura (PK) | IdProducto (PK) | Fecha | DocCliente | NombreCliente | DireccionCliente | CiudadCliente | DescripcionProducto | PrecioUnitario | Cantidad |
|:---:|:---:|:---:|:---:|---|---|---|---|:---:|:---:|
| **F-101** | **P-01** | 2026-09-15 | 10752001 | Carlos Dussán | Calle 5 # 10-20 | Garzón | Teclado Mecánico | $150.000 | 1 |
| **F-101** | **P-02** | 2026-09-15 | 10752001 | Carlos Dussán | Calle 5 # 10-20 | Garzón | Mouse Óptico | $60.000 | 2 |
| **F-102** | **P-02** | 2026-09-15 | 10752002 | Andrea Peña | Cra 8 # 14-35 | Neiva | Mouse Óptico | $60.000 | 1 |
| **F-103** | **P-03** | 2026-09-16 | 10752001 | Carlos Dussán | Calle 5 # 10-20 | Garzón | Cable HDMI 4K | $25.000 | 3 |

*Nota:* Eliminamos campos calculados como `SubtotalLinea` (`Cantidad * PrecioUnitario`) y `TotalFactura` porque violan los principios de almacenamiento relacional (se calculan al consultar).

---

### 🥈 Paso 2: Segunda Forma Normal (2FN)

> **Regla de la 2FN:**
> 1. Debe estar en **1FN**.
> 2. **Eliminación de dependencias funcionales parciales:** Todos los atributos que no forman parte de la clave primaria deben depender de la **totalidad** de la clave primaria compuesta, no de una parte de ella.

#### Análisis de Dependencias en nuestra tabla 1FN:
- Clave Primaria Compuesta: `(NumeroFactura, IdProducto)`
- `Fecha`, `DocCliente`, `NombreCliente`, `DireccionCliente`: Dependen únicamente de `NumeroFactura` (dependencia parcial).
- `DescripcionProducto`, `PrecioUnitario`: Dependen únicamente de `IdProducto` (dependencia parcial).
- `Cantidad`: Depende **de ambos** (`NumeroFactura` e `IdProducto`), porque indica cuántas unidades de *ese* producto se compraron en *esa* factura en específico.

#### Tablas Resultantes en 2FN:

1. **`Factura`** (Clave Primaria: `NumeroFactura`):
   - `NumeroFactura (PK)`, `Fecha`, `DocCliente`, `NombreCliente`, `DireccionCliente`, `CiudadCliente`.
2. **`Producto`** (Clave Primaria: `IdProducto`):
   - `IdProducto (PK)`, `DescripcionProducto`, `PrecioUnitario`.
3. **`DetalleFactura`** (Clave Primaria Compuesta: `NumeroFactura + IdProducto`):
   - `NumeroFactura (PK, FK)`, `IdProducto (PK, FK)`, `Cantidad`.

---

### 🥉 Paso 3: Tercera Forma Normal (3FN)

> **Regla de la 3FN:**
> 1. Debe estar en **2FN**.
> 2. **Eliminación de dependencias transitivas:** Ningún atributo no clave debe depender de otro atributo no clave ($X \to Y$ donde $Y \to Z$).

#### Análisis de Dependencias Transitivas en la tabla `Factura`:
En la tabla `Factura`:
- `NumeroFactura (PK)` $\to$ `DocCliente`
- Pero a su vez: `DocCliente` $\to$ `NombreCliente`, `DireccionCliente`, `CiudadCliente`.
- Por tanto: `NombreCliente`, `DireccionCliente` y `CiudadCliente` dependen transitivamente de `NumeroFactura` a través de `DocCliente`. Si el cliente no compra nada, perdemos sus datos.

#### Separación a 3FN Definitiva:

1. **Tabla `Cliente`**:
   - `doc_cliente (PK)`
   - `nombre_completo`
   - `direccion`
   - `ciudad`
2. **Tabla `Factura`**:
   - `numero_factura (PK)`
   - `fecha_emision`
   - `doc_cliente (FK)` $\to$ apunta a `Cliente(doc_cliente)`
3. **Tabla `Producto`**:
   - `id_producto (PK)`
   - `descripcion`
   - `precio_unitario`
4. **Tabla `Detalle_Factura`**:
   - `id_detalle (PK Auto-incremental o PK Compuesta)`
   - `numero_factura (FK)` $\to$ apunta a `Factura(numero_factura)`
   - `id_producto (FK)` $\to$ apunta a `Producto(id_producto)`
   - `cantidad`
   - `precio_venta_historico` *(Recomendación profesional: guardar el precio al momento de la venta para soportar cambios futuros de catálogo).*

---

## 4. Cardinalidades y Modelo Relacional Resultante

```
+-------------------+        1 : N        +-------------------+
|      CLIENTE      | ------------------- |      FACTURA      |
|-------------------|                     |-------------------|
| * doc_cliente(PK) |                     | * num_factura(PK) |
|   nombre_completo |                     |   fecha_emision   |
|   direccion       |                     |   doc_cliente(FK) |
|   ciudad          |                     +-------------------+
+-------------------+                               |
                                                    | 1 : N
                                                    v
+-------------------+        1 : N        +-------------------+
|     PRODUCTO      | ------------------- |  DETALLE_FACTURA  |
|-------------------|                     |-------------------|
| * id_producto(PK) |                     | * id_detalle (PK) |
|   descripcion     |                     |   num_factura(FK) |
|   precio_unitario |                     |   id_producto(FK) |
+-------------------+                     |   cantidad        |
                                          |   precio_historico|
                                          +-------------------+
```

### Reglas de Cardinalidad:
- **Cliente a Factura (1 : N):** Un cliente puede tener **muchas (0 a N)** facturas registradas a su nombre; cada factura pertenece a **un único (1:1)** cliente.
- **Factura a Detalle_Factura (1 : N):** Una factura contiene **uno o más (1 a N)** renglones de detalle; cada renglón de detalle pertenece a **una única (1:1)** factura.
- **Producto a Detalle_Factura (1 : N):** Un producto puede aparecer en **múltiples (0 a N)** renglones de venta; cada renglón de detalle referencia a **un solo (1:1)** producto.

---

## 5. Tutorial de Creación en MySQL Workbench

Sigue estos pasos en tu computadora:

### Paso 1: Crear un nuevo Modelo Relacional (EER Diagram)
1. Abre **MySQL Workbench**.
2. En la pantalla de inicio, haz clic en el ícono de **Modelos** (icono de diagrama EER) o ve al menú superior: `File` > `New Model` (o atajo `Ctrl + N`).
3. En la ventana del modelo, haz doble clic sobre el ícono **Add Diagram** (un lienzo con cuadrícula se abrirá).

### Paso 2: Crear las Tablas y Definir Atributos
1. En la barra de herramientas lateral izquierda, haz clic en el ícono **Place a New Table** (tecla `T`) y luego haz clic en el lienzo.
2. Haz doble clic sobre la tabla recién creada para abrir el editor inferior.
3. Configura la tabla `cliente`:
   - **Table Name:** `cliente`
   - Columnas:
     - `doc_cliente`: Type `VARCHAR(20)`, marca las casillas **PK** (Primary Key) y **NN** (Not Null).
     - `nombre_completo`: Type `VARCHAR(120)`, marca **NN**.
     - `direccion`: Type `VARCHAR(150)`, marca **NN**.
     - `ciudad`: Type `VARCHAR(60)`, marca **NN**.
4. Repite el proceso para `producto`:
   - `id_producto`: Type `VARCHAR(15)`, marca **PK** y **NN**.
   - `descripcion`: Type `VARCHAR(120)`, marca **NN**.
   - `precio_unitario`: Type `DECIMAL(12,2)`, marca **NN**.
5. Configura `factura`:
   - `numero_factura`: Type `VARCHAR(20)`, marca **PK** y **NN**.
   - `fecha_emision`: Type `DATETIME`, marca **NN**.
   - `doc_cliente`: Type `VARCHAR(20)`, marca **NN**.
6. Configura `detalle_factura`:
   - `id_detalle`: Type `INT`, marca **PK**, **NN** y **AI** (Auto Increment).
   - `numero_factura`: Type `VARCHAR(20)`, marca **NN**.
   - `id_producto`: Type `VARCHAR(15)`, marca **NN**.
   - `cantidad`: Type `INT`, marca **NN**.
   - `precio_historico`: Type `DECIMAL(12,2)`, marca **NN**.

### Paso 3: Trazar las Relaciones (Foreign Keys)
1. En la barra izquierda de herramientas, selecciona la herramienta **1:n Non-Identifying Relationship** (línea discontinua con pata de gallo).
2. Para relacionar `factura` con `cliente`:
   - Haz clic primero sobre la tabla hija (`factura`).
   - Luego haz clic sobre la tabla padre (`cliente`).
   - MySQL Workbench vinculará automáticamente las claves foráneas.
3. Para relacionar `detalle_factura` con `factura`:
   - Haz clic sobre `detalle_factura`, luego sobre `factura`.
4. Para relacionar `detalle_factura` con `producto`:
   - Haz clic sobre `detalle_factura`, luego sobre `producto`.
5. En la pestaña inferior **Foreign Keys**, verifica que la acción en `On Delete` esté configurada según las reglas de negocio (ej. `RESTRICT` para evitar borrar clientes con facturas activas).

### Paso 4: Exportar el Diagrama en Alta Resolución
- Ve al menú: `File` > `Export` > `Export as PNG...` (o PDF).
- Guarda la imagen para insertarla en el documento de tu evidencia.

### Paso 5: Forward Engineering (Generar el Script SQL Automático)
1. Ve al menú superior: `Database` > `Forward Engineer...` (o presiona `Ctrl + G`).
2. Selecciona tu conexión local a MySQL (ej. `Local instance MySQL80`).
3. En las opciones, marca:
   - `Generate DROP Statements Before Each CREATE Statement`.
   - `Generate INSERT Statements for Tables`.
4. Haz clic en **Next** hasta llegar a la pantalla de previsualización del script SQL.
5. Haz clic en **Copy to Clipboard** o **Save to File**.

---

## 6. Script SQL DDL Maestro Ejecutable

Puedes copiar y ejecutar este código directamente en el editor SQL de MySQL Workbench (`Ctrl + T`) para crear la base de datos completa:

```sql
-- =============================================================================
-- SERVICIO NACIONAL DE APRENDIZAJE - SENA ADSO
-- GUÍA DE APRENDIZAJE 06 · EVIDENCIA GA6-220501096-AA1-EV01
-- Script DDL: Sistema Normalizado de Facturación de Ventas (3FN)
-- Motor: MySQL 8.0+ / MariaDB 10.4+
-- =============================================================================

-- 1. Crear Base de Datos con codificación internacional UTF-8
CREATE DATABASE IF NOT EXISTS `sistema_facturacion_adso`
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `sistema_facturacion_adso`;

-- 2. Eliminar tablas previas en orden inverso de dependencias para evitar bloqueos
DROP TABLE IF EXISTS `detalle_factura`;
DROP TABLE IF EXISTS `factura`;
DROP TABLE IF EXISTS `producto`;
DROP TABLE IF EXISTS `cliente`;

-- 3. Tabla: CLIENTE (Entidad Fuerte - 3FN)
CREATE TABLE `cliente` (
  `doc_cliente` VARCHAR(20) NOT NULL COMMENT 'Cédula o NIT del cliente',
  `nombre_completo` VARCHAR(120) NOT NULL COMMENT 'Nombres y apellidos completos',
  `direccion` VARCHAR(150) NOT NULL COMMENT 'Dirección de residencia o despacho',
  `ciudad` VARCHAR(60) NOT NULL COMMENT 'Ciudad del cliente',
  `telefono` VARCHAR(20) NULL COMMENT 'Teléfono o WhatsApp de contacto',
  `email` VARCHAR(100) NULL COMMENT 'Correo electrónico para facturación',
  CONSTRAINT `pk_cliente` PRIMARY KEY (`doc_cliente`)
) ENGINE = InnoDB COMMENT = 'Almacena la información de los clientes sin redundancias';

-- 4. Tabla: PRODUCTO (Entidad Fuerte - 3FN)
CREATE TABLE `producto` (
  `id_producto` VARCHAR(15) NOT NULL COMMENT 'Código de barra o SKU único',
  `descripcion` VARCHAR(120) NOT NULL COMMENT 'Nombre o detalle del producto',
  `precio_unitario` DECIMAL(12,2) NOT NULL COMMENT 'Precio actual de venta',
  `stock_disponible` INT NOT NULL DEFAULT 0 COMMENT 'Existencias en inventario',
  CONSTRAINT `pk_producto` PRIMARY KEY (`id_producto`),
  CONSTRAINT `chk_precio_positivo` CHECK (`precio_unitario` > 0),
  CONSTRAINT `chk_stock_no_negativo` CHECK (`stock_disponible` >= 0)
) ENGINE = InnoDB COMMENT = 'Catálogo maestro de productos';

-- 5. Tabla: FACTURA (Cabecera de Venta - 3FN)
CREATE TABLE `factura` (
  `numero_factura` VARCHAR(20) NOT NULL COMMENT 'Prefijo y número de factura fiscal',
  `fecha_emision` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de generación',
  `doc_cliente` VARCHAR(20) NOT NULL COMMENT 'Clave foránea que referencia al cliente',
  `estado` ENUM('PAGADA', 'PENDIENTE', 'ANULADA') NOT NULL DEFAULT 'PAGADA',
  CONSTRAINT `pk_factura` PRIMARY KEY (`numero_factura`),
  CONSTRAINT `fk_factura_cliente` 
    FOREIGN KEY (`doc_cliente`) 
    REFERENCES `cliente` (`doc_cliente`) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
) ENGINE = InnoDB COMMENT = 'Cabecera de transacciones comerciales';

-- 6. Tabla: DETALLE_FACTURA (Renglones de Venta - Rompe la relación N:M)
CREATE TABLE `detalle_factura` (
  `id_detalle` INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del renglón',
  `numero_factura` VARCHAR(20) NOT NULL COMMENT 'Factura asociada',
  `id_producto` VARCHAR(15) NOT NULL COMMENT 'Producto adquirido',
  `cantidad` INT NOT NULL COMMENT 'Número de unidades vendidas',
  `precio_historico` DECIMAL(12,2) NOT NULL COMMENT 'Precio congelado al momento de la venta',
  CONSTRAINT `pk_detalle_factura` PRIMARY KEY (`id_detalle`),
  CONSTRAINT `fk_detalle_factura` 
    FOREIGN KEY (`numero_factura`) 
    REFERENCES `factura` (`numero_factura`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT `fk_detalle_producto` 
    FOREIGN KEY (`id_producto`) 
    REFERENCES `producto` (`id_producto`) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  CONSTRAINT `chk_cantidad_positiva` CHECK (`cantidad` > 0),
  CONSTRAINT `chk_precio_hist_positivo` CHECK (`precio_historico` > 0)
) ENGINE = InnoDB COMMENT = 'Items vendidos por factura con soporte de auditoría';

-- =============================================================================
-- 7. DATOS DE PRUEBA (SEEDERS) PARA VALIDAR INTEGRIDAD REFERENCIAL
-- =============================================================================

INSERT INTO `cliente` (`doc_cliente`, `nombre_completo`, `direccion`, `ciudad`, `telefono`, `email`) 
VALUES 
  ('10752001', 'Carlos Dussán', 'Calle 5 # 10-20', 'Garzón', '3101234567', 'carlos.dussan@email.com'),
  ('10752002', 'Andrea Peña', 'Cra 8 # 14-35', 'Neiva', '3209876543', 'andrea.pena@email.com');

INSERT INTO `producto` (`id_producto`, `descripcion`, `precio_unitario`, `stock_disponible`) 
VALUES 
  ('P-01', 'Teclado Mecánico RGB', 150000.00, 25),
  ('P-02', 'Mouse Óptico Inalámbrico', 60000.00, 40),
  ('P-03', 'Cable HDMI 4K 2 Metros', 25000.00, 100);

-- Insertar Factura F-101 de Carlos Dussán
INSERT INTO `factura` (`numero_factura`, `fecha_emision`, `doc_cliente`, `estado`) 
VALUES ('F-101', '2026-09-15 10:30:00', '10752001', 'PAGADA');

INSERT INTO `detalle_factura` (`numero_factura`, `id_producto`, `cantidad`, `precio_historico`) 
VALUES 
  ('F-101', 'P-01', 1, 150000.00),
  ('F-101', 'P-02', 2, 60000.00);

-- Insertar Factura F-102 de Andrea Peña
INSERT INTO `factura` (`numero_factura`, `fecha_emision`, `doc_cliente`, `estado`) 
VALUES ('F-102', '2026-09-15 14:15:00', '10752002', 'PAGADA');

INSERT INTO `detalle_factura` (`numero_factura`, `id_producto`, `cantidad`, `precio_historico`) 
VALUES ('F-102', 'P-02', 1, 60000.00);

-- =============================================================================
-- 8. CONSULTA DE AUDITORÍA: RECONSTRUCCIÓN DE LA FACTURA ORIGINAL CON JOINS
-- =============================================================================
SELECT 
  f.numero_factura AS Factura,
  DATE_FORMAT(f.fecha_emision, '%Y-%m-%d %H:%i') AS Fecha,
  c.nombre_completo AS Cliente,
  c.ciudad AS Ciudad,
  p.descripcion AS Producto,
  df.cantidad AS Cantidad,
  df.precio_historico AS PrecioUnitario,
  (df.cantidad * df.precio_historico) AS SubtotalLinea
FROM factura f
INNER JOIN cliente c ON f.doc_cliente = c.doc_cliente
INNER JOIN detalle_factura df ON f.numero_factura = df.numero_factura
INNER JOIN producto p ON df.id_producto = p.id_producto
ORDER BY f.numero_factura ASC;
```

---

## 7. Estructura para la Entrega Oficial de la Evidencia en PDF

Para obtener la calificación **Aprobado (A)** según el instrumento `IE-GA6-220501096-AA1-EV01`, tu documento debe incluir:

1. **Portada Institucional:** Nombre del aprendiz, ficha ADSO, nombre del instructor, centro de formación y fecha.
2. **Introducción:** Breve explicación de por qué la normalización previene la corrupción de datos y optimiza los recursos de un sistema de software.
3. **Desarrollo del Caso de Estudio:**
   - Presentación de la tabla inicial no normalizada (0FN).
   - Identificación explícita de anomalías.
   - Paso a 1FN (tabla y justificación).
   - Paso a 2FN (identificación de dependencias parciales y tablas resultantes).
   - Paso a 3FN (identificación de dependencias transitivas y modelo final).
4. **Diagrama EER de MySQL Workbench:** Captura de pantalla en alta definición del diagrama relacional generado en la herramienta.
5. **Script SQL:** Código de creación de tablas con restricciones.
6. **Conclusiones:** Reflexión sobre la importancia del modelado previo antes de comenzar la codificación de un software.
