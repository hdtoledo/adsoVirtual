# Guía de Aprendizaje 06: Evidencias Paso a Paso
## Análisis y Desarrollo de Software (ADSO) - Modalidad Virtual
### SENA · Regional Huila · Centro Agroempresarial y Desarrollo Pecuario del Huila (CADPH)

---

> **Código de Programa:** 228118 · **Fase del Proyecto:** Ejecución  
> **Actividad de Proyecto (AP6):** Desarrollar la estructura de datos y la interfaz de usuario del software.  
> **Duración Total:** 288 Horas (Técnica: 192h | Transversal: 48h | Clave: 48h)

Este documento es la **hoja de ruta maestra** para instructores y aprendices de la formación virtual ADSO. Describe en detalle cada una de las **20 evidencias de aprendizaje**, sus especificaciones técnicas, paso a paso de desarrollo, formatos de entrega y criterios de evaluación oficial.

---

## Tabla de Contenido de Evidencias

| # | Código de Evidencia | Tipo | Nombre de la Evidencia | Área / Competencia | Horas | Formato |
|---|---|---|---|---|---|---|
| **01** | `GA6-220501096-AA1-EV01` | Conocimiento | Resolución de problemas aplicando modelo relacional y normalización | Técnica (BD SQL) | 16h | PDF |
| **02** | `GA6-220501096-AA1-EV02` | Desempeño | Modelo Entidad-Relación de caso | Técnica (BD SQL) | 16h | PDF / Diagrama |
| **03** | `GA6-220501096-AA1-EV03` | Desempeño | Creación de los objetos de la base de datos NoSQL | Técnica (BD NoSQL) | 16h | PDF / JSON |
| **04** | `GA6-220501096-AA1-EV04` | Producto | Elaboración de las bases de datos en MongoDB | Técnica (BD NoSQL) | 16h | ZIP / Script Mongo |
| **05** | `GA6-220501096-AA2-EV01` | Desempeño | Destrezas y conocimientos en sentencias DDL y DML de SQL | Técnica (SQL) | 16h | PDF / Script .sql |
| **06** | `GA6-220501096-AA2-EV02` | Desempeño | Creación de estructura BD y aplicación de restricciones | Técnica (SQL) | 16h | Script .sql + PDF |
| **07** | `GA6-220501096-AA2-EV03` | Producto | Script oficial de base de datos del proyecto formativo | Técnica (SQL) | 16h | Archivo .sql |
| **08** | `GA6-220501096-AA3-EV01` | Conocimiento | Selección de herramientas para prototipado | Técnica (UI/UX) | 8h | ZIP (Word + Prototipo) |
| **09** | `GA6-220501096-AA3-EV02` | Desempeño | Crear diseño web/móvil con componentes y tecnologías | Técnica (UI/UX) | 12h | ZIP (Mockup + Doc) |
| **10** | `GA6-220501096-AA3-EV03` | Producto | Interfaces gráficas según requerimientos del proyecto | Técnica (UI/UX) | 12h | ZIP (Figma / Web) |
| **11** | `GA6-220501096-AA4-EV01` | Conocimiento | Fundamentos de componentes front-end (HTML, CSS, JS) | Técnica (Frontend) | 16h | ZIP / Enlace Web |
| **12** | `GA6-220501096-AA4-EV02` | Desempeño | Establecer componentes front-end de la aplicación web | Técnica (Frontend) | 16h | ZIP (Doc técnico) |
| **13** | `GA6-220501096-AA4-EV03` | Producto | Diseño front-end que cumpla con el proyecto formativo | Técnica (Frontend) | 16h | ZIP (Código Frontend) |
| **14** | `GA6-230101507-AA1-EV01` | Desempeño | Foro: Técnicas de coordinación motriz | Transversal (Física) | 12h | Plataforma LMS |
| **15** | `GA6-230101507-AA2-EV01` | Producto | Infografía: Estilos de vida saludable y ergonomía | Transversal (Física) | 12h | PDF / Imagen |
| **16** | `GA6-230101507-AA3-EV01` | Producto | Ficha antropométrica y plan de acondicionamiento | Transversal (Física) | 12h | PDF / Excel |
| **17** | `GA6-230101507-AA4-EV01` | Producto | Folleto de lesiones comunes y pausas activas | Transversal (Física) | 12h | PDF |
| **18** | `GA6-240202501-AA1-EV01` | Conocimiento | Documento escrito: Personal Statement en inglés | Clave (Inglés) | 16h | PDF |
| **19** | `GA6-240202501-AA1-EV02` | Producto | Video presentación de perfil y funciones en inglés | Clave (Inglés) | 16h | MP4 / Enlace Video |
| **20** | `GA6-240202501-AA1-EV03` | Desempeño | Foro de discusión en inglés (Rúbrica TIGRE) | Clave (Inglés) | 16h | Plataforma LMS |

---

# FASE I: Competencia Técnica (220501096)
### *Desarrollar la solución de software de acuerdo con el diseño y metodologías de desarrollo*

---

### Actividad de Aprendizaje GA6-220501096-AA1
**Crear un modelo de base de datos, con base a los requerimientos del cliente (64 Horas)**

#### 1. Evidencia `GA6-220501096-AA1-EV01`
**Nombre:** Resolución de problemas aplicando el modelo relacional, cardinalidad y normalización.  
- **Tipo:** Evidencia de Conocimiento.
- **Instrumento de Evaluación:** `IE-GA6-220501096-AA1-EV01` (Lista de chequeo).
- **Descripción:** El aprendiz debe resolver ejercicios prácticos de normalización sobre tablas no normalizadas (0FN) y transformarlas secuencialmente a:
  - **1FN (Primera Forma Normal):** Eliminación de grupos repetitivos, valores atómicos y definición de llave primaria.
  - **2FN (Segunda Forma Normal):** Cumplir 1FN y asegurar que los atributos no clave dependan totalmente de la llave primaria completa (dependencia funcional total).
  - **3FN (Tercera Forma Normal):** Cumplir 2FN y eliminar dependencias transitivas (ningún atributo no clave depende de otro atributo no clave).
- **Paso a Paso:**
  1. Tomar el caso de estudio propuesto (ej. Facturación de ventas o control de pedidos).
  2. Identificar anomalías de inserción, modificación y eliminación.
  3. Descomponer la tabla plana en tablas normalizadas con claves primarias (`PK`) y foráneas (`FK`).
  4. Redactar las reglas de cardinalidad (1:1, 1:N, N:M).
- **Formato de Entrega:** Documento PDF con portada, análisis del problema, tablas antes y después, y justificación de cada forma normal.

---

#### 2. Evidencia `GA6-220501096-AA1-EV02`
**Nombre:** Modelo entidad relación de caso.  
- **Tipo:** Evidencia de Desempeño.
- **Instrumento de Evaluación:** `IE-GA6-220501096-AA1-EV02`.
- **Descripción:** Diseñar el modelo entidad-relación (MER conceptual) y el modelo relacional (MR lógico) para el caso de estudio del proyecto formativo de software.
- **Paso a Paso:**
  1. Identificar entidades principales (ej. Usuario, Rol, Producto, Venta, DetalleVenta).
  2. Determinar atributos, tipos de datos y restricciones de obligatoriedad (`NOT NULL`).
  3. Definir claves primarias simples o compuestas y claves foráneas.
  4. Graficar en herramienta especializada (*MySQL Workbench*, *draw.io*, *dbdiagram.io* o *StarUML*).
  5. Crear el diccionario de datos documentando nombre de tabla, campos, tipo de dato, longitud, descripción y restricciones.
- **Formato de Entrega:** Documento PDF que contenga el diagrama de alta resolución y el diccionario de datos completo.

---

#### 3. Evidencia `GA6-220501096-AA1-EV03`
**Nombre:** Creación de los objetos de la base de datos NoSQL.  
- **Tipo:** Evidencia de Desempeño.
- **Instrumento de Evaluación:** `IE-GA6-220501096-AA1-EV03`.
- **Descripción:** Estructurar el modelo orientado a documentos para bases de datos NoSQL (MongoDB), definiendo colecciones, esquemas BSON/JSON y relaciones mediante embedding (documentos embebidos) o referencing (referencias manuales/ObjectId).
- **Paso a Paso:**
  1. Analizar qué módulos del sistema se benefician de almacenamiento no relacional (ej. logs, catálogos con atributos variables, auditorías, carritos temporales).
  2. Diseñar los esquemas JSON de las colecciones.
  3. Definir validadores de esquema de MongoDB (`$jsonSchema`).
  4. Documentar las decisiones de diseño arquitectural (incrustar vs referenciar).
- **Formato de Entrega:** Documento PDF o archivo comprimido con especificación técnica de las colecciones y esquemas JSON.

---

#### 4. Evidencia `GA6-220501096-AA1-EV04`
**Nombre:** Elaboración de las bases de datos en MongoDB.  
- **Tipo:** Evidencia de Producto.
- **Instrumento de Evaluación:** `IE-GA6-220501096-AA1-EV04`.
- **Descripción:** Implementar de forma real la base de datos en el gestor MongoDB (Community Server o MongoDB Atlas en la nube), creando la base de datos, colecciones e insertando documentos de prueba.
- **Paso a Paso:**
  1. Iniciar el servicio MongoDB o configurar un cluster gratuito en MongoDB Atlas.
  2. Crear la base de datos con `use nombre_bd;`.
  3. Ejecutar sentencias `db.createCollection()` con validación de esquemas.
  4. Insertar al menos 5 documentos representativos por colección usando `insertMany()`.
  5. Ejecutar consultas con filtros (`$gt`, `$in`), proyecciones y agregaciones (`$match`, `$group`, `$sort`).
  6. Exportar el script de inicialización (`init-mongo.js`) o archivo JSON dump.
- **Formato de Entrega:** Archivo comprimido ZIP que contenga el script ejecutable de MongoDB y un informe en PDF con capturas de MongoDB Compass o MongoShell demostrando la inserción y consulta de datos.

---

### Actividad de Aprendizaje GA6-220501096-AA2
**Manipular datos en el Sistema Administrador de Bases de Datos (SMBD), de acuerdo con el diseño (48 Horas)**

#### 5. Evidencia `GA6-220501096-AA2-EV01`
**Nombre:** Destrezas y conocimientos en el manejo de sentencias DDL y DML de SQL.  
- **Tipo:** Evidencia de Desempeño.
- **Instrumento de Evaluación:** `IE-GA6-220501096-AA2-EV01`.
- **Descripción:** Demostrar dominio en la escritura de sentencias SQL para definición (`CREATE`, `ALTER`, `DROP`) y manipulación (`INSERT`, `SELECT`, `UPDATE`, `DELETE`) sobre un motor relacional (MySQL, PostgreSQL o MariaDB).
- **Paso a Paso:**
  1. Implementar sentencias de manipulación para poblar tablas.
  2. Construir consultas avanzadas con cláusulas `WHERE`, operadores lógicos (`AND`, `OR`, `BETWEEN`, `LIKE`).
  3. Aplicar funciones de agregación: `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()` acompañadas de `GROUP BY` y `HAVING`.
  4. Realizar cruce de información mediante `INNER JOIN`, `LEFT JOIN` y subconsultas.
- **Formato de Entrega:** Script `.sql` documentado con comentarios y PDF con capturas del motor SQL demostrando la ejecución exitosa de cada consulta.

---

#### 6. Evidencia `GA6-220501096-AA2-EV02`
**Nombre:** Creación de la estructura de la BD y aplicación de restricciones.  
- **Tipo:** Evidencia de Desempeño.
- **Instrumento de Evaluación:** `IE-GA6-220501096-AA2-EV02`.
- **Descripción:** Crear físicamente la base de datos relacional aplicando integridad referencial estricta mediante restricciones: `PRIMARY KEY`, `FOREIGN KEY` (con políticas `ON DELETE CASCADE` o `ON UPDATE RESTRICT`), `UNIQUE`, `CHECK`, `DEFAULT` y `NOT NULL`.
- **Paso a Paso:**
  1. Redactar el script DDL con `CREATE DATABASE IF NOT EXISTS`.
  2. Crear tablas respetando el orden jerárquico de dependencias de llaves foráneas.
  3. Añadir restricciones de dominio (ej. `CHECK (precio > 0)`, `CHECK (edad >= 18)`).
  4. Probar violaciones de integridad referencial para evidenciar que el motor rechaza datos inconsistentes.
- **Formato de Entrega:** Archivo `.sql` con la definición estructural completa y PDF que evidencie la creación de tablas y el testeo de restricciones.

---

#### 7. Evidencia `GA6-220501096-AA2-EV03`
**Nombre:** Script bases de datos del proyecto formativo.  
- **Tipo:** Evidencia de Producto.
- **Instrumento de Evaluación:** `IE-GA6-220501096-AA2-EV03`.
- **Descripción:** Entrega del script maestro final de la base de datos del proyecto formativo que el aprendiz está desarrollando. Debe ser completamente reproducible y autónomo (creación de base de datos, tablas, llaves, índices, y datos semilla o *seeders*).
- **Paso a Paso:**
  1. Consolidar todas las tablas requeridas por el software del proyecto.
  2. Incluir cabecera con metadatos: Nombre de proyecto, aprendices, versión, fecha y motor utilizado.
  3. Incluir sentencias `DROP TABLE IF EXISTS` en orden inverso para permitir re-ejecución limpia.
  4. Incorporar inserciones de datos iniciales (usuarios administradores, roles, catálogos base).
- **Formato de Entrega:** Archivo con extensión `.sql` listo para importar en MySQL Workbench, phpMyAdmin o terminal SQL.

---

### Actividad de Aprendizaje GA6-220501096-AA3
**Prototipar las interfaces gráficas de usuario, de acuerdo con las especificaciones del diseño (32 Horas)**

#### 8. Evidencia `GA6-220501096-AA3-EV01`
**Nombre:** Selección herramientas para prototipado.  
- **Tipo:** Evidencia de Conocimiento.
- **Instrumento de Evaluación:** `IE-GA6-220501096-AA3-EV01`.
- **Descripción:** Cuadro comparativo y análisis técnico de herramientas de prototipado del mercado (Figma, Adobe XD, Penpot, Balsamiq, Marvel, Sketch).
- **Paso a Paso:**
  1. Comparar criterios: Tipo de licencia (gratuita/paga/open-source), curva de aprendizaje, colaboración en tiempo real, soporte de plugins, componentes interactivos y exportación de especificaciones de diseño (*Design Tokens*).
  2. Argumentar técnicamente la herramienta seleccionada para el proyecto formativo.
  3. Incluir un prototipo de prueba elemental desarrollado en la herramienta elegida.
- **Formato de Entrega:** Carpeta ZIP que contenga documento en Word/PDF y el archivo de diseño o enlace público editable de la herramienta.

---

#### 9. Evidencia `GA6-220501096-AA3-EV02`
**Nombre:** Crear el diseño del sitio web y/o móviles utilizando sus componentes y tecnologías respectivas.  
- **Tipo:** Evidencia de Desempeño.
- **Instrumento de Evaluación:** `IE-GA6-220501096-AA3-EV02`.
- **Descripción:** Elaboración de los *wireframes* y flujos de navegación interactivos (Mockups de media fidelidad) que representen la arquitectura de información del software.
- **Paso a Paso:**
  1. Diseñar el mapa de navegación (Home, Login, Dashboard, Módulos CRUD, Reportes, Perfil).
  2. Definir layout responsive (Mobile first y versión escritorio).
  3. Conectar pantallas mediante transiciones interactivas (clic en botón login lleva al dashboard).
  4. Redactar documento con descripción de componentes y experiencia de usuario esperada.
- **Formato de Entrega:** Archivo comprimido ZIP con documento formal (portada, objetivos, capturas y enlace interactivo al prototipo).

---

#### 10. Evidencia `GA6-220501096-AA3-EV03`
**Nombre:** Interfaces gráficas según requerimientos del proyecto formativo.  
- **Tipo:** Evidencia de Producto.
- **Instrumento de Evaluación:** `IE-GA6-220501096-AA3-EV03`.
- **Descripción:** Prototipo navegable de alta fidelidad (UI Design) del proyecto formativo completo, aplicando sistema de diseño formal, guía de estilos, tipografía, paleta cromática accesible (WCAG) y componentes reusables.
- **Paso a Paso:**
  1. Definir sistema de diseño: Tokens de color (primario, secundario, neutrales, alertas), tipografía, espaciados e iconografía.
  2. Diseñar todas las pantallas principales y casos borde (estados vacíos, modales, alertas de error).
  3. Configurar micro-interacciones (hover, estados activos, loaders).
  4. Validar contraste de colores según norma WCAG 2.1 AA.
- **Formato de Entrega:** Carpeta ZIP con especificación técnica y enlace con permisos de previsualización al prototipo en Figma o Penpot.

---

### Actividad de Aprendizaje GA6-220501096-AA4
**Generar plantillas y estilos, de acuerdo con el diseño (48 Horas)**

#### 11. Evidencia `GA6-220501096-AA4-EV01`
**Nombre:** Fundamentos en la implementación de componentes front-end, HTML, CSS, JS.  
- **Tipo:** Evidencia de Conocimiento.
- **Instrumento de Evaluación:** `IE-GA6-220501096-AA4-EV01`.
- **Descripción:** Elaborar una página web interactiva que funcione como un tutorial práctico sobre una temática tecnológica de libre elección, aplicando etiquetas semánticas de HTML5, estilos CSS3 modernos y dinamismo básico con JavaScript.
- **Paso a Paso:**
  1. Estructurar semántica HTML5: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`.
  2. Implementar una lista ordenada con enlaces internos ancla (`href="#tema1"`).
  3. Diseñar tarjetas para cada tema con título, imagen descriptiva y contenido.
  4. Aplicar diseño responsive con CSS Flexbox o Grid.
  5. Agregar interactividad con JavaScript (ej. modo oscuro, filtro interactivo o acordeón).
- **Formato de Entrega:** Carpeta comprimida ZIP con los archivos fuente (`index.html`, `styles.css`, `script.js` e imágenes) o enlace a repositorio en GitHub Pages.

---

#### 12. Evidencia `GA6-220501096-AA4-EV02`
**Nombre:** Establecer los componentes front-end de la aplicación web.  
- **Tipo:** Evidencia de Desempeño.
- **Instrumento de Evaluación:** `IE-GA6-220501096-AA4-EV02`.
- **Descripción:** Documento de especificación arquitectónica del frontend donde se cataloga cada uno de los componentes de interfaz que se usarán en el proyecto formativo (Navbar, Sidebar, Cards, Tablas de datos, Formularios, Modales, Botones).
- **Paso a Paso:**
  1. Listar los componentes requeridos por módulo de negocio.
  2. Especificar las propiedades (props/atributos) y estados esperados de cada componente.
  3. Definir la tecnología base (HTML semántico, Tailwind CSS / Vanilla CSS, JavaScript).
  4. Documentar normas de accesibilidad aplicadas (atributos `aria-*`, roles y accesibilidad por teclado).
- **Formato de Entrega:** Documento técnico en PDF comprimido en ZIP.

---

#### 13. Evidencia `GA6-220501096-AA4-EV03`
**Nombre:** Diseño front-end que cumpla con los requerimientos del proyecto formativo.  
- **Tipo:** Evidencia de Producto.
- **Instrumento de Evaluación:** `IE-GA6-220501096-AA4-EV03`.
- **Descripción:** Código fuente funcional del frontend del proyecto formativo, maquetado fielmente a partir de los prototipos aprobados en la actividad AA3, responsive, interactivo y listo para integrarse con servicios backend.
- **Paso a Paso:**
  1. Maquetar las vistas principales del sistema (Landing, Login, Dashboard, Tablas y Formularios).
  2. Garantizar adaptabilidad en pantallas móviles, tablets y monitores de escritorio.
  3. Validar entradas de usuario en formularios mediante validación nativa y JavaScript.
  4. Organizar la estructura de carpetas (`assets/`, `css/`, `js/`, `views/`).
- **Formato de Entrega:** Repositorio en GitHub publicado en GitHub Pages o archivo ZIP con todo el código fuente listo para ejecución.

---

# FASE II: Competencia Transversal (230101507)
### *Generar hábitos saludables de vida mediante la aplicación de programas de actividad física en los contextos productivos y sociales (48 Horas)*

---

#### 14. Evidencia `GA6-230101507-AA1-EV01`
**Nombre:** Foro temático - Identificar y establecer las técnicas de coordinación motriz.  
- **Tipo:** Evidencia de Desempeño.
- **Instrumento:** `IE-GA6-230101507-AA1-EV01`.
- **Contenido Requerido:** Responder a las 5 preguntas orientadoras en la plataforma virtual:
  1. ¿Cuáles músculos del cuerpo humano posibilitan la coordinación motriz en su labor diaria como desarrollador?
  2. ¿Qué papel juegan los huesos en la coordinación motriz?
  3. Definición personal de motricidad.
  4. Diferencia clara entre motricidad fina y motricidad gruesa.
  5. Ejemplo de motricidad gruesa en el entorno laboral tecnológico.
  6. Replicar constructivamente a mínimo 2 compañeros.
- **Entrega:** Intervención directa en el foro LMS.

---

#### 15. Evidencia `GA6-230101507-AA2-EV01`
**Nombre:** Infografía – Estilos de vida saludable.  
- **Tipo:** Evidencia de Producto.
- **Instrumento:** `IE-GA6-230101507-AA2-EV01`.
- **Contenido Requerido:** Infografía visual (Canva, Illustrator o Genially) que responda:
  1. Interpretación de necesidades energéticas diarias.
  2. Cálculo de requerimiento calórico y balance de macronutrientes (carbohidratos, proteínas, grasas e hidratación).
  3. Esquema ilustrado del puesto de trabajo ergonómico ideal para desarrolladores de software (altura de silla, ángulo de brazos, distancia de monitor a 50-70 cm, soporte lumbar).
  4. Factores clave para estilo de vida saludable: higiene del sueño, pausas activas y manejo del estrés.
- **Entrega:** Archivo PDF o imagen PNG en alta definición.

---

#### 16. Evidencia `GA6-230101507-AA3-EV01`
**Nombre:** Ficha antropométrica de valoración de la condición física y plan de acondicionamiento.  
- **Tipo:** Evidencia de Producto.
- **Instrumento:** `IE-GA6-230101507-AA3-EV01`.
- **Contenido Requerido:**
  1. Diligenciamiento de datos personales, peso, talla, Índice de Masa Corporal (IMC) y perímetro de cintura.
  2. Registro de test físicos:
     - Test de resistencia cardiovascular (Burpee test o Test de Ruffier).
     - Test de fuerza abdominal en 1 minuto.
     - Test de fuerza de miembros inferiores (sentadillas en 1 min).
     - Test de flexo-extensiones de brazos en 1 min.
     - Frecuencia cardíaca en reposo y post-esfuerzo.
  3. Plan de acción semanal personalizado para compensar el sedentarismo del teletrabajo.
- **Entrega:** Documento PDF con ficha diligenciada y plan de entrenamiento propuesto.

---

#### 17. Evidencia `GA6-230101507-AA4-EV01`
**Nombre:** Folleto de lesiones más comunes en el trabajo o vida cotidiana y pausas activas.  
- **Tipo:** Evidencia de Producto.
- **Instrumento:** `IE-GA6-230101507-AA4-EV01`.
- **Contenido Requerido:** Tríptico o folleto informativo que documente:
  1. Lesiones ocupacionales comunes en desarrolladores de software: Síndrome del túnel carpiano, tendinitis de Quervain, cervicalgia, dorsalgia, fatiga visual digital (*CVS*).
  2. Métodos de prevención postural.
  3. Rutina fotográfica o gráfica de pausas activas cada 2 horas (estiramiento de cuello, muñecas, espalda baja y descanso ocular regla 20-20-20).
- **Entrega:** Documento en PDF listo para imprimir o visualizar en doble cara.

---

# FASE III: Competencia Clave (240202501)
### *Interactuar en lengua inglesa de forma oral y escrita dentro de contextos sociales y laborales (48 Horas)*

---

#### 18. Evidencia `GA6-240202501-AA1-EV01`
**Nombre:** Documento escrito (Personal Statement).  
- **Tipo:** Evidencia de Conocimiento.
- **Instrumento:** `IE-GA6-240202501-AA1-EV01`.
- **Contenido Requerido:** Redacción de una carta de presentación personal y profesional (*Personal Statement*) en idioma inglés orientada al perfil de *Junior Software Developer*:
  - Extensión: 1 a 2 páginas.
  - Estructura: Encabezado profesional, introducción de metas profesionales, habilidades técnicas (*tech stack*), habilidades blandas (*soft skills*), experiencia o proyectos académicos y conclusión formal.
  - Gramática aplicada: Tiempos verbales pasados, presentes y futuros perfectos, conectores formales.
- **Entrega:** Documento PDF con normas de redacción en inglés.

---

#### 19. Evidencia `GA6-240202501-AA1-EV02`
**Nombre:** Video de presentación de funciones ocupacionales en inglés.  
- **Tipo:** Evidencia de Producto.
- **Instrumento:** `IE-GA6-240202501-AA1-EV02`.
- **Contenido Requerido:** Video expositivo en inglés con cámara activa:
  - Duración: 2 a 5 minutos.
  - Descripción de las funciones cotidianas de un desarrollador de software (análisis de requerimientos, diseño de bases de datos, desarrollo frontend/backend, pruebas y despliegue).
  - Uso correcto de vocabulario técnico, pronunciación clara y fluidez adecuada al nivel MCERL B1/B2.
  - El aprendiz debe aparecer en pantalla con vestimenta adecuada y audio nítido.
- **Entrega:** Enlace a video en YouTube (oculto o público), Google Drive o Vimeo con permisos abiertos, pegado en un documento PDF.

---

#### 20. Evidencia `GA6-240202501-AA1-EV03`
**Nombre:** Foro en inglés sobre experiencia laboral y proyecciones.  
- **Tipo:** Evidencia de Desempeño.
- **Instrumento:** `IE-GA6-240202501-AA1-EV03`.
- **Contenido Requerido:** Participación interactiva en el foro de la plataforma LMS aplicando la **Rúbrica TIGRE**:
  - **T**ítulo significativo.
  - **I**lación con aportes previos.
  - **G**eneración de discusión constructiva.
  - **R**edacción y ortografía en inglés sin traductores automáticos literales.
  - **E**nriquecimiento del tema.
- **Entrega:** Publicación del hilo inicial y mínimo 2 comentarios fundamentados a otros compañeros.

---

## Recomendaciones para Aprendices

1. **Gestión del tiempo:** Dedica bloques de trabajo enfocados; las evidencias de bases de datos (`AA1` y `AA2`) son el cimiento de la formación y requieren práctica directa en MySQL y MongoDB.
2. **Control de versiones:** Aloja todos tus ejercicios de frontend y bases de datos en repositorios personales de GitHub con commits descriptivos.
3. **Calidad antes que cantidad:** Verifica siempre la lista de chequeo (`IE-...`) de cada evidencia antes de subirla a la plataforma del SENA.
