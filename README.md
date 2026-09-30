# Repositorio Técnico y Descarga de Guías · ADSO Virtual
### Tecnólogo en Análisis y Desarrollo de Software (ADSO) - SENA
**Regional Huila · Centro Agroempresarial y Desarrollo Pecuario del Huila (CADPH Garzón)**  
**Desarrollado por:** Ingeniero Hector David Toledo García — *Instructor del Área de Desarrollo de Software*

---

> [!IMPORTANT]
> **PLATAFORMA OFICIAL OBLIGATORIA: ZAJUNA LMS**  
> La plataforma oficial y principal del SENA para el seguimiento formativo, publicación de cronogramas, foros institucionales y **entrega calificada de todas las evidencias** es siempre **[Zajuna LMS](https://zajuna.sena.edu.co)**.  
> Este repositorio constituye un **recurso pedagógico y técnico complementario** creado para apoyar las **sesiones sincrónicas virtuales**, descargar las guías de aprendizaje oficiales y consultar la explicación técnica paso a paso de las evidencias mediante interfaces visuales interactivas.

> [!NOTE]
> **ALCANCE EXCLUSIVO: COMPETENCIAS TÉCNICAS DE SOFTWARE**  
> Este repositorio está enfocado exclusivamente en las **competencias técnicas específicas de desarrollo de software** (ej. Modelado de Bases de Datos Relacionales SQL y NoSQL MongoDB, Prototipado UI/UX en Figma, Maquetación Frontend Web HTML5/CSS3/JS, Arquitectura UML y Servicios Backend REST). **No abarca las competencias transversales** (Cultura Física, Inglés, Ética, Comunicación, etc.), las cuales son orientadas por sus respectivos instructores en Zajuna.

---

## 🎯 Guía Activa: Guía de Aprendizaje 06 (En Ejecución)
* **Código de Programa:** 228118
* **Fase del Proyecto:** Ejecución
* **Competencia Técnica Principal:** `220501096` - Desarrollar la solución de software de acuerdo con el diseño y metodologías de desarrollo.
* **Carga Horaria Técnica:** 192 Horas de Formación Técnica en Desarrollo de Software.
* **Evidencias Técnicas Cubiertas:** 13 Entregables Técnicos Oficiales (Bases de Datos Relacionales SQL, NoSQL MongoDB, Figma y Maquetación Frontend Web).

---

## 📂 Estructura del Repositorio

```text
repoVirtual/
├── .nojekyll                           # Despliegue continuo en GitHub Pages sin procesamiento Jekyll
├── 404.html                            # Página de redirección institucional amigable
├── README.md                           # Documentación técnica, alcance y guía del repositorio
├── index.html                          # Portal principal: Descarga de Guías y Explorador Multi-Guía con Paginación
├── GUIA_06_EVIDENCIAS_PASO_A_PASO.md   # Referencia documental de evidencias y criterios
├── assets/
│   ├── logo_green.png                  # Logo institucional SENA (Verde)
│   ├── logo_sena.png                   # Variante de logotipo SENA
│   ├── css/
│   │   └── presenter.css               # Estilos visuales optimizados para proyección en aula
│   └── js/
│       └── presenter.js                # Motor interactivo de diapositivas para sesiones virtuales
└── guias/
    ├── Guia_aprendizaje_6.pdf          # PDF oficial emitido por la Dirección de Formación SENA
    └── guia-06/
        ├── proyeccion-evidencia-01.html # Presentación interactiva de 20 diapositivas para Evidencia 1 (Normalización)
        ├── proyeccion-evidencia-02.html # Presentación interactiva de 10 diapositivas para Evidencia 2 (MER y Diccionario)
        ├── proyeccion-evidencia-03.html # Presentación interactiva de 14 diapositivas para Evidencia 3 (NoSQL MongoDB Compass)
        ├── proyeccion-evidencia-04.html # Presentación interactiva de 12 diapositivas para Evidencia 4 (Bases de Datos en MongoDB)
        ├── proyeccion-evidencia-05.html # Presentación interactiva de 14 diapositivas para Evidencia 5 (Sentencias SQL DDL y DML)
        └── proyeccion.html             # Modo Proyección General en Aula (Guía 06)
```

---

## 💻 Características del Portal Web Principal (`index.html`)

### 1. Centro de Descarga de Guías de Aprendizaje
* Acceso centralizado y descarga directa en un clic de la **Guía de Aprendizaje 06 (PDF Oficial SENA)**.
* Tarjetas informativas de fase con desglose de horas técnicas y competencias curriculares.
* Módulos preparados para la integración de las guías subsiguientes (**Guía 05** y **Guía 07**).

### 2. Explorador General Multi-Guía con Filtros y Paginación Dinámica
* **Orientación Multi-Guía:** Permite filtrar y explorar evidencias de distintas guías de formación ADSO:
  * **Guía 05:** Análisis de Requerimientos y Modelado de Arquitectura UML (3 evidencias).
  * **Guía 06 (Activa):** Bases de Datos Relacionales/NoSQL, Prototipado Figma y Frontend Web (13 evidencias).
  * **Guía 07:** Servicios Backend, APIs REST, ORM/ODM y documentación Swagger/Postman (3 evidencias).
* **Filtros por Área Técnica:** Selector por categorías (`Bases de Datos SQL`, `NoSQL MongoDB`, `Prototipado UI/UX Figma`, `Frontend Web`, `Backend & APIs`, `Arquitectura UML`).
* **Buscador en Tiempo Real:** Filtrado reactivo instantáneo por código de evidencia (ej. `AA1-EV01`, `AA1-EV02`, `AA1-EV03`, `AA1-EV04`), título, resumen o tecnologías.
* **Paginación Dinámica:** Paginación calibrada a **6 evidencias por página** con navegación previa/siguiente, botones numerados y contador contextual (`Mostrando X a Y de Z evidencias`).
* **Estado de Disponibilidad de Diapositivas:**
  * **🟢 Diapositivas Disponibles:** Insignia verde para las evidencias con presentación interactiva activa (EV01, EV02, EV03, EV04, EV05), permitiendo proyección directa inmediata.
  * **🟡 En Preparación:** Insignia ámbar para evidencias en desarrollo curricular. Si el aprendiz o docente intenta proyectarlas, el sistema despliega una ventana modal explicativa indicando que el material será orientado en la sesión sincrónica virtual correspondiente por el **Ing. Hector David Toledo García**, guiando al aprendiz hacia el PDF de la guía y los requerimientos preliminares.
* **Modales Detallados:** Cada evidencia despliega un modal con paso a paso detallado, criterios oficiales de evaluación y checklist interactivo con persistencia local en navegador (`localStorage`).
* **Estabilidad Visual y Cero Saltos de Diseño (Anti-CLS):** Estandarización de cabeceras fijas (`h-16`), paddings simétricos (`px-4 sm:px-6`), canal de scroll reservado (`scrollbar-gutter: stable`) y dimensiones predefinidas para iconos SVG, garantizando transiciones suaves y fluidas entre páginas sin saltos de elementos.

---

## 📽️ Presentaciones Interactivas en Diapositivas (Modo Videobeam)

### 🟢 Evidencia 1: Normalización de Bases de Datos & MySQL Workbench (`proyeccion-evidencia-01.html`)
* **Código Oficial:** `GA6-220501096-AA1-EV01` (16 Horas de Formación Técnica).
* **20 Diapositivas:** Fundamentos de Edgar F. Codd, análisis forense de anomalías en 0FN, paso a 1FN, 2FN y 3FN, descarga oficial e instalación en Windows de MySQL Server 8.0 y Workbench, modelado EER, integridad referencial (`ON DELETE CASCADE / RESTRICT`), Forward Engineering y consultas SQL `INNER JOIN`.

### 🟢 Evidencia 2: Modelo Entidad-Relación de Caso & Diccionario de Datos (`proyeccion-evidencia-02.html`)
* **Código Oficial:** `GA6-220501096-AA1-EV02` (16 Horas de Formación Técnica).
* **10 Diapositivas Directas al Grano (100% en Español):**
  * **Slide 01 - 02:** Portada institucional y entregables exactos requeridos por la lista de chequeo oficial en Zajuna LMS.
  * **Slide 03 - 04:** Paso 1 y 2: Identificación de entidades, atributos, Llaves Primarias y trazado del Diagrama Conceptual (MER) con notación Chen y cardinalidades.
  * **Slide 05 - 06:** Paso 3 y 4: Las 3 reglas de oro para convertir el MER en tablas (1:1, 1:N y N:M con tabla intermedia) y ficha oficial del **Diccionario de Datos SENA** (8 columnas en español).
  * **Slide 07:** Paso 5: Cómo diagramar en MySQL Workbench con notación Pata de Gallo y generar el script SQL mediante ingeniería hacia adelante (<kbd>Ctrl + G</kbd>).
  * **Slide 08:** Ejemplo real resuelto de inicio a fin: Las 5 tablas completas (`CLIENTES`, `PRODUCTOS`, `CATEGORIAS`, `VENTAS`, `DETALLE_VENTAS`) con sus llaves y adaptación a otros sectores (Salud, Taller, Restaurante).
  * **Slide 09 - 10:** Estructura oficial del documento PDF entregable, nomenclatura de archivo y lista de chequeo de 5 puntos para asegurar calificación Aprobada ('A') en **Zajuna LMS**.

### 🟢 Evidencia 3: Creación de Objetos en Base de Datos NoSQL MongoDB (`proyeccion-evidencia-03.html`)
* **Código Oficial:** `GA6-220501096-AA1-EV03` (16 Horas de Formación Técnica).
* **14 Diapositivas Directas al Grano (100% en Español):**
  * **Slide 01 - 02:** Portada institucional y qué son las Bases de Datos No Relacionales (NoSQL) con las 4 familias tecnológicas (Documentales, Clave-Valor, Columnas Anchas y Grafos).
  * **Slide 03 - 04:** Tabla de equivalencias conceptuales directa (Tabla $\rightarrow$ Colección, Fila $\rightarrow$ Documento, Columna $\rightarrow$ Campo, PK $\rightarrow$ `_id`) y anatomía de un documento JSON vs BSON.
  * **Slide 05 - 06:** La decisión arquitectónica crítica: **Incrustar (Subdocumentos)** vs **Referenciar (Por ID)**, y el paso a paso metodológico para estructurar las colecciones del proyecto individual.
  * **Slide 07:** Validación formal de esquemas en MongoDB mediante reglas `$jsonSchema` (campos requeridos, tipos de datos y rangos).
  * **Slide 08:** Ejemplo completo resuelto para un sistema de ventas (colección `pedidos` con cliente referenciado e ítems de compra incrustados) y notas de adaptación para Salud/Veterinaria, Talleres y Restaurantes.
  * **Slide 09 - 10:** Herramientas oficiales (*MongoDB Compass*, *MongoDB Atlas* clúster gratuito y *mongosh*), estructura obligatoria del informe PDF y lista de chequeo de 5 puntos para calificación Aprobada ('A') en **Zajuna LMS**.

### 🟢 Evidencia 4: Elaboración de las Bases de Datos en MongoDB (`proyeccion-evidencia-04.html`)
* **Código Oficial:** `GA6-220501096-AA1-EV04` (16 Horas de Formación Técnica).
* **Único Producto a Entregar según la Guía:** **Video la creación y manipulación de bases de datos NoSQL** (Extensión: **MP4**). *No se piden más archivos ni informes escritos.*
* **12 Diapositivas Directas al Grano (100% en Español):**
  * **Slide 01 - 02:** Portada institucional y **Requerimientos Oficiales de la Guía** (lectura textual de los 8 pasos exactos sobre la colección `"parque"` y lineamiento del video MP4 como único entregable).
  * **Slide 03:** Entorno de trabajo (*MongoDB Compass* interfaz gráfica y terminal integrada `_MONGOSH` o consola del sistema).
  * **Slide 04:** **Pasos 1 y 2 de la Guía:** Creación de la base de datos NoSQL (`use parqueadero_db;`) y de la colección de datos llamada exactamente `"parque"` (`db.createCollection("parque")`).
  * **Slide 05:** **Paso 3 de la Guía:** Inserción de cinco (5) documentos con la estructura JSON creada en la EV03 (`db.parque.insertMany([...])` con placas, modelos, colores y propietarios).
  * **Slide 06:** **Paso 4 de la Guía:** Actualización de los datos del primer y último registro con `updateOne()` y el operador atómico `$set`.
  * **Slide 07:** **Paso 5 de la Guía:** Listar la colección completa (`db.parque.find()`), verificando en pantalla la existencia de los 5 documentos iniciales y sus modificaciones.
  * **Slide 08:** **Paso 6 de la Guía:** Borrado puntual del tercer documento de la colección parque (`db.parque.deleteOne({ placa: "..." })`).
  * **Slide 09:** **Paso 7 de la Guía:** Listar nuevamente la colección completa (`db.parque.find()`), demostrando en vivo que ahora restan cuatro (4) registros tras el borrado.
  * **Slide 10:** **Paso 8 de la Guía:** Sentencia que permite obtener un documento según su número de placa (`db.parque.findOne({ placa: "..." })`).
  * **Slide 11:** **Lineamientos Oficiales del Video:** Grabación de pantalla con audio nítido del aprendiz (OBS, Clipchamp, Loom), duración sugerida (4 a 8 min), opciones de envío en Zajuna (subida directa de archivo MP4 o enlace público en YouTube/Drive).
  * **Slide 12:** **Lista de Chequeo Final:** Verificación interactiva de los 8 requerimientos oficiales antes de enviar para obtener calificación Aprobada ('A') en **Zajuna LMS**.

### 🟢 Evidencia 5: Destrezas y conocimientos en el manejo de sentencias DDL y DML de SQL (`proyeccion-evidencia-05.html`)
* **Código Oficial:** `GA6-220501096-AA2-EV01` (32 Horas de Formación Técnica).
* **Taller Oficial de la Guía:** Problema - Trabaje con la tabla `"Libreta"`.
* **Producto a Entregar según la Guía:** **Documento técnico en formato PDF (Extensión Libre)** con portada, introducción, objetivo y desarrollo punto a punto.
* **14 Diapositivas Directas al Grano (100% en Español):**
  * **Slide 01 - 02:** Portada institucional y **Fundamentos Teóricos DDL vs DML** en SQL (definición de estructuras con auto-commit vs manipulación de registros y transacciones).
  * **Slide 03:** **Requerimientos Oficiales de la Guía:** Lectura textual de los 8 puntos del taller sobre la tabla `"libreta"` y lineamientos formales del documento PDF.
  * **Slide 04:** **Entorno de Trabajo:** Preparación de esquema en *MySQL Workbench* / consola CLI (`CREATE DATABASE agenda_adso; USE agenda_adso;`) y consejos para capturas nítidas con panel Output visible.
  * **Slide 05:** **Punto 1 del Taller (DDL):** Creación de la tabla `libreta` con campos `nombre varchar(20)`, `domicilio varchar(30)` y `telefono varchar(11)` explicando el ahorro de espacio en disco con `VARCHAR`.
  * **Slide 06:** **Puntos 2 y 3 del Taller (Metadatos):** Verificación de existencia con `SHOW TABLES;` e inspección detallada de columnas y tipos con `DESCRIBE libreta;`.
  * **Slide 07:** **Punto 4 del Taller (DML):** Inserción de los registros iniciales solicitados (Alberto Mores y Juan Torres) explicando comillas simples y correspondencia de columnas.
  * **Slide 08:** **Punto 5 del Taller (DML):** Consulta general con `SELECT * FROM libreta;` y visualización de la cuadrícula de resultados con las dos filas activas.
  * **Slide 09:** **Punto 6 del Taller (DML):** Actualización de datos insertados mediante `UPDATE` y **advertencia crítica sobre el uso indispensable de la cláusula WHERE** y el modo *Safe Updates* en MySQL.
  * **Slide 10:** **Punto 7 del Taller (DML):** Inserción en bloque de 5 contactos nuevos acumulando un histórico de 7 registros en la libreta.
  * **Slide 11:** **Punto 8 del Taller (Agregación):** Conteo de registros con `SELECT COUNT(*) AS total_contactos FROM libreta;` certificando exactamente 7 filas.
  * **Slide 12 - 13:** **Estructura Formal del Documento PDF:** Plantilla institucional (Portada, Introducción, Objetivo, Sentencias punto a punto con capturas de pantalla, Conclusiones) y buenas prácticas de recorte y formato.
  * **Slide 14:** **Lista de Chequeo Final:** Autoevaluación interactiva de los 8 puntos del taller antes de subir el PDF a **Zajuna LMS**.

---

## ⌨️ Atajos de Navegación en el Modo Proyección
| Atajo | Función |
|---|---|
| <kbd>Espacio</kbd> o <kbd>→</kbd> | Avanzar a la siguiente diapositiva |
| <kbd>←</kbd> o <kbd>RePág</kbd> | Retroceder a la diapositiva anterior |
| <kbd>F</kbd> | Alternar modo pantalla completa |
| <kbd>M</kbd> | Abrir / Cerrar el menú lateral con el índice de 20 diapositivas |
| <kbd>T</kbd> | Iniciar / Pausar el temporizador de la sesión virtual |
| <kbd>?</kbd> | Abrir ventana modal de ayuda y atajos |

---

## 👨‍🏫 Información Institucional y Autoría
* **Entidad:** Servicio Nacional de Aprendizaje (SENA)
* **Regional:** Huila
* **Centro de Formación:** Centro Agroempresarial y Desarrollo Pecuario del Huila (CADPH)
* **Sede:** Garzón
* **Programa:** Tecnología en Análisis y Desarrollo de Software (ADSO Virtual - Ficha 228118)
* **Instructor del Área de Desarrollo de Software:** Ing. Hector David Toledo García
* **Plataforma Oficial de Calificación y Entrega:** [Zajuna LMS](https://zajuna.sena.edu.co)
