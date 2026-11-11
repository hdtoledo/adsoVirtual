/**
 * Catálogo ADSO Virtual · Fuente única de verdad
 * ---------------------------------------------------------------------------
 * Lo consumen el portal (index.html → portal.js) y todas las presentaciones
 * (presenter.js). Para publicar una evidencia nueva basta con:
 *   1. Agregar o actualizar su objeto en `evidencias`.
 *   2. Definir `session` con el archivo HTML de la presentación.
 * El orden del arreglo define el orden de la ruta de aprendizaje y la
 * navegación "sesión anterior / siguiente" dentro de las diapositivas.
 */
window.ADSO_CATALOGO = {
  instructor: "Ing. Hector David Toledo García",
  centro: "Centro Agroempresarial y Desarrollo Pecuario del Huila (CADPH Garzón)",
  zajuna: "https://zajuna.sena.edu.co",
  guias: [
    {
      id: "guia-06",
      name: "Guía 06",
      title: "Guía de Aprendizaje 06",
      status: "activa",
      fase: "Ejecución",
      competencia: "220501096",
      hours: 192,
      pdf: "guias/Guia_aprendizaje_6.pdf",
      folder: "guias/guia-06/",
      generalSession: {
        file: "proyeccion.html",
        slides: 16,
        title: "Visión General & Lanzamiento de Fase Ejecución",
        blurb: "Apertura formal de la guía: 192 horas técnicas, cronograma oficial, arquitectura de 13 evidencias y checklist."
      },
      activities: [
        {
          id: "AA1",
          title: "Crear un modelo de base de datos, con base a los requerimientos del cliente",
          hours: 64
        },
        {
          id: "AA2",
          title: "Manipular datos en el Sistema Administrador de Bases de Datos (SMBD), de acuerdo con el diseño",
          hours: 48
        },
        {
          id: "AA3",
          title: "Crear interfaces gráficas de usuario en aplicaciones de escritorio, web y móviles, de acuerdo con el diseño",
          hours: 48
        },
        {
          id: "AA4",
          title: "Generar plantillas y estilos, de acuerdo con el diseño",
          hours: 48
        }
      ]
    },
    {
      id: "guia-05",
      name: "Guía 05",
      title: "Guía de Aprendizaje 05",
      status: "anterior",
      fase: "Análisis",
      competencia: "220501095",
      folder: "guias/guia-05/",
      activities: []
    },
    {
      id: "guia-07",
      name: "Guía 07",
      title: "Guía de Aprendizaje 07",
      status: "proxima",
      fase: "Ejecución",
      competencia: "220501096",
      folder: "guias/guia-07/",
      activities: []
    }
  ],
  categorias: {
    sql: {
      name: "Bases de Datos SQL",
      icon: "database",
      badge: "bg-blue-50 text-blue-700 border-blue-200"
    },
    nosql: {
      name: "NoSQL MongoDB",
      icon: "leaf",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    uiux: {
      name: "Prototipado UI/UX",
      icon: "pen-tool",
      badge: "bg-purple-50 text-purple-700 border-purple-200"
    },
    frontend: {
      name: "Frontend Web",
      icon: "code",
      badge: "bg-amber-50 text-amber-800 border-amber-200"
    },
    backend: {
      name: "Backend & APIs",
      icon: "server",
      badge: "bg-indigo-50 text-indigo-700 border-indigo-200"
    },
    uml: {
      name: "Arquitectura UML",
      icon: "workflow",
      badge: "bg-cyan-50 text-cyan-800 border-cyan-200"
    }
  },
  evidencias: [
    {
      id: "ev-01",
      guia: "guia-06",
      guiaName: "Guía 06",
      fase: "Ejecución",
      code: "GA6-220501096-AA1-EV01",
      activity: "AA1: Modelo de Base de Datos",
      category: "sql",
      catName: "Bases de Datos SQL",
      type: "Conocimiento",
      hours: "16 Horas",
      title: "Resolución de problemas aplicando el modelo relacional, cardinalidad y normalización",
      format: "PDF",
      instrument: "IE-GA6-220501096-AA1-EV01",
      summary: "Aplicación práctica de reglas de normalización (1FN, 2FN, 3FN) sobre casos de estudio de facturación o gestión para eliminar anomalías.",
      steps: [
        "Analizar el caso de estudio propuesto con datos planos desnormalizados.",
        "Aplicar 1FN: eliminar grupos repetitivos y garantizar atomicidad en cada columna.",
        "Aplicar 2FN: comprobar dependencia funcional total respecto a la clave primaria.",
        "Aplicar 3FN: eliminar dependencias transitivas entre campos no clave.",
        "Definir reglas de cardinalidad (1:1, 1:N, N:M) y documentar claves foráneas."
      ],
      criteria: "Define esquemas de seguridad y normalización en la base de datos para mantener la integridad de la información.",
      checklist: [
        "Documento con portada formal, introducción y objetivos claros.",
        "Tabla en estado 0FN con identificación de redundancias.",
        "Desglose paso a paso de la transformación a 1FN, 2FN y 3FN.",
        "Diagrama resultante con claves primarias (PK) y foráneas (FK)."
      ],
      activityId: "AA1",
      session: {
        file: "proyeccion-evidencia-01.html",
        slides: 20,
        title: "Evidencia 01: Normalización de Datos & MySQL Workbench",
        blurb: "Taller paso a paso: anomalías en 0FN, paso a 1FN, 2FN, 3FN, descarga de MySQL en Windows y Forward Engineering."
      }
    },
    {
      id: "ev-02",
      guia: "guia-06",
      guiaName: "Guía 06",
      fase: "Ejecución",
      code: "GA6-220501096-AA1-EV02",
      activity: "AA1: Modelo de Base de Datos",
      category: "sql",
      catName: "Bases de Datos SQL",
      type: "Producto",
      hours: "16 Horas",
      title: "Modelo entidad relación de caso",
      format: "PDF / Diagrama",
      instrument: "IE-GA6-220501096-AA1-EV02",
      summary: "Diseño conceptual MER y lógico MR para el sistema de información del proyecto formativo, con diccionario de datos exhaustivo.",
      steps: [
        "Identificar entidades, atributos y relaciones a partir de requerimientos de software.",
        "Elaborar el diagrama conceptual MER con notación Chen o Crow's Foot.",
        "Transformar el MER en modelo lógico relacional (MR).",
        "Construir el diccionario de datos detallando tipo de dato, longitud, nulabilidad y restricciones."
      ],
      criteria: "Modela la base de datos a partir de las especificaciones y requerimientos del sistema.",
      checklist: [
        "Diagrama MER conceptual legible y completo.",
        "Transformación lógica a Modelo Relacional (MR).",
        "Diccionario de datos diligenciado con tipos y restricciones.",
        "Alineación total con los requerimientos del proyecto formativo."
      ],
      activityId: "AA1",
      session: {
        file: "proyeccion-evidencia-02.html",
        slides: 10,
        title: "Evidencia 02: Modelo Entidad-Relación (MER) & Diccionario",
        blurb: "100% en español: Chen a Pata de Gallo, 3 reglas de cardinalidad (1:1, 1:N, N:M), Diccionario de Datos SENA y ejemplo resuelto."
      }
    },
    {
      id: "ev-03",
      guia: "guia-06",
      guiaName: "Guía 06",
      fase: "Ejecución",
      code: "GA6-220501096-AA1-EV03",
      activity: "AA1: Modelo NoSQL",
      category: "nosql",
      catName: "NoSQL MongoDB",
      type: "Conocimiento",
      hours: "16 Horas",
      title: "Creación de los objetos de la base de datos NoSQL",
      format: "PDF",
      instrument: "IE-GA6-220501096-AA1-EV03",
      summary: "Diseño estructural de colecciones y documentos en MongoDB con decisiones de incrustación (embedding) vs referenciación.",
      steps: [
        "Seleccionar el módulo del sistema adecuado para almacenamiento documental NoSQL.",
        "Definir la estructura de colecciones y documentos JSON/BSON.",
        "Justificar técnicamente el uso de incrustación vs referenciación de documentos.",
        "Documentar patrones de acceso de lectura y escritura optimizados."
      ],
      criteria: "Construye la base de datos NoSQL de acuerdo con los requerimientos del sistema.",
      checklist: [
        "Estructura JSON formal de los documentos de cada colección.",
        "Justificación de elecciones arquitectónicas (embedding vs referencing).",
        "Estrategia de índices y consultas más frecuentes identificadas."
      ],
      activityId: "AA1",
      session: {
        file: "proyeccion-evidencia-03.html",
        slides: 14,
        title: "Evidencia 03: Objetos NoSQL MongoDB Compass & MONGOSH",
        blurb: "NoSQL documental: Incrustación vs Referenciación, botón Create Database en Compass, inserción de documentos y comandos shell."
      }
    },
    {
      id: "ev-04",
      guia: "guia-06",
      guiaName: "Guía 06",
      fase: "Ejecución",
      code: "GA6-220501096-AA1-EV04",
      activity: "AA1: Modelo NoSQL",
      category: "nosql",
      catName: "NoSQL MongoDB",
      type: "Producto",
      hours: "16 Horas",
      title: "Elaboración de las bases de datos",
      format: "Video (MP4)",
      instrument: "IE-GA6-220501096-AA1-EV04",
      summary: "Sustentación exclusiva en video explicativo (formato MP4) demostrando en vivo la creación y manipulación de la base de datos NoSQL y la colección \"parque\", cumpliendo con los 8 requerimientos exactos de la guía de aprendizaje.",
      steps: [
        "1. Crear una base de datos NoSQL en MongoDB Compass o terminal mongosh (use parqueadero_db).",
        "2. Crear una colección de datos llamada exactamente \"parque\".",
        "3. Insertar cinco (5) documentos con la estructura JSON creada en la evidencia EV03 (vehículos con placas, tipos, modelos y propietarios).",
        "4. Actualizar los datos del primer y último registro utilizando updateOne() con el operador atómico $set.",
        "5. Listar la colección completa con db.parque.find() comprobando los 5 documentos en pantalla.",
        "6. Borrar el tercer documento de la colección parque mediante deleteOne() especificando su placa.",
        "7. Listar la colección de datos completa verificando en vivo que ahora restan cuatro (4) registros.",
        "8. Crear la sentencia que permita obtener un documento específico según su número de placa (db.parque.findOne({ placa: \"...\" }))."
      ],
      criteria: "Elabora y manipula bases de datos NoSQL según los requerimientos técnicos de la guía de aprendizaje.",
      checklist: [
        "Producto único entregado: Archivo de video en formato MP4 (o enlace accesible en YouTube / Google Drive / OneDrive SENA).",
        "Presentación verbal del aprendiz indicando nombre, ficha ADSO y evidencia técnica.",
        "Demostración en video del Paso 1: Creación de la base de datos NoSQL.",
        "Demostración en video del Paso 2: Creación de la colección \"parque\".",
        "Demostración en video del Paso 3: Inserción de los 5 documentos JSON.",
        "Demostración en video del Paso 4: Actualización del primer y último registro con $set.",
        "Demostración en video del Paso 5: Listado completo inicial con db.parque.find().",
        "Demostración en video del Paso 6: Borrado puntual del tercer documento con deleteOne().",
        "Demostración en video del Paso 7: Listado completo demostrando que restan 4 registros.",
        "Demostración en video del Paso 8: Sentencia para obtener un documento según número de placa."
      ],
      activityId: "AA1",
      session: {
        file: "proyeccion-evidencia-04.html",
        slides: 12,
        title: "Evidencia 04: Elaboración de las bases de datos",
        blurb: "Sustentación en video (MP4): creación de BD NoSQL, colección \"parque\", 5 documentos JSON, actualización del 1° y último, listados, borrado del 3° y consulta por placa."
      }
    },
    {
      id: "ev-05",
      guia: "guia-06",
      guiaName: "Guía 06",
      fase: "Ejecución",
      code: "GA6-220501096-AA2-EV01",
      activity: "AA2: Manipulación SMBD SQL",
      category: "sql",
      catName: "Bases de Datos SQL",
      type: "Conocimiento",
      hours: "32 Horas",
      title: "Destrezas y conocimientos en el manejo de sentencias DDL y DML de SQL",
      format: "Documento (PDF)",
      instrument: "IE-GA6-220501096-AA2-EV01",
      summary: "Informe técnico en PDF (extensión libre) dando solución punto a punto al taller oficial sobre la tabla \"libreta\" en MySQL: creación de tabla (DDL), visualización (SHOW TABLES), estructura (DESCRIBE), inserción de registros (DML), consulta (SELECT *), actualización con condición WHERE, 5 registros más y conteo final con COUNT(*).",
      steps: [
        "1. Crear la tabla \"libreta\" con campos: nombre (varchar 20), domicilio (varchar 30) y telefono (varchar 11).",
        "2. Visualizar las tablas existentes para verificar la creación de \"libreta\" (SHOW TABLES).",
        "3. Visualizar la estructura de la tabla \"libreta\" (DESCRIBE libreta).",
        "4. Ingresar los registros iniciales: (\"Alberto Mores\", \"Colon 123\", \"4234567\") y (\"Juan Torres\", \"Avellaneda 135\", \"4458787\").",
        "5. Seleccionar y mostrar todos los registros de la tabla (SELECT * FROM libreta).",
        "6. Construir las sentencias que actualicen los datos que se acaban de insertar (UPDATE libreta SET ... WHERE ...).",
        "7. Insertar 5 registros más en la tabla libreta.",
        "8. Contar cuántos registros se ingresan en total (SELECT COUNT(*) FROM libreta)."
      ],
      criteria: "Aplica el lenguaje de consulta estructurado SQL (DDL y DML) según requerimientos del taller técnico.",
      checklist: [
        "Documento técnico formal en formato PDF con portada, introducción y objetivos.",
        "Punto 1: Sentencia CREATE TABLE libreta con campos nombre, domicilio y telefono.",
        "Punto 2: Comando SHOW TABLES evidenciando la creación de la tabla.",
        "Punto 3: Comando DESCRIBE libreta mostrando tipos de datos VARCHAR.",
        "Punto 4: Sentencias INSERT con los dos registros iniciales solicitados.",
        "Punto 5: Consulta SELECT * FROM libreta con captura de la cuadrícula de resultados.",
        "Punto 6: Sentencias UPDATE modificando los datos con la cláusula condicional WHERE.",
        "Punto 7: Inserción de 5 registros adicionales completando 7 filas.",
        "Punto 8: Consulta SELECT COUNT(*) evidenciando el conteo de 7 registros.",
        "Capturas de pantalla nítidas de MySQL Workbench con confirmación de ejecución verde."
      ],
      activityId: "AA2",
      session: {
        file: "proyeccion-evidencia-05.html",
        slides: 14,
        title: "Evidencia 05: Sentencias DDL y DML de SQL",
        blurb: "Taller oficial con la tabla \"libreta\": creación de tabla, visualización, estructura, inserciones, consulta, actualización y conteo."
      }
    },
    {
      id: "ev-06",
      guia: "guia-06",
      guiaName: "Guía 06",
      fase: "Ejecución",
      code: "GA6-220501096-AA2-EV02",
      activity: "AA2: Lenguaje SQL",
      category: "sql",
      catName: "Bases de Datos SQL",
      type: "Desempeño",
      hours: "16 Horas",
      title: "Creación de la estructura de la BD y aplicación de restricciones",
      format: "Archivo Comprimido (.ZIP)",
      instrument: "IE-GA6-220501096-AA2-EV02",
      summary: "Creación de la estructura física de la base de datos para el software del proyecto formativo en MySQL Workbench (modelo .mwb), determinando tipos de datos precisos, llaves primarias, llaves foráneas y restricciones de integridad. Se entrega un paquete comprimido en ZIP con el documento formal en Word (portada, introducción, objetivos, descripción estructural y restricciones), el archivo .mwb de Workbench y el script SQL DDL ejecutable.",
      steps: [
        "1. Analizar los requerimientos del software a desarrollar en el proyecto formativo de negocio/empresa real.",
        "2. Crear el modelo gráfico Entidad-Relación en MySQL Workbench (archivo .mwb) con sus tablas y tipos de datos precisos.",
        "3. Definir llaves primarias (PK AUTO_INCREMENT), obligatoriedad (NOT NULL) y campos únicos (UNIQUE).",
        "4. Trazar relaciones de integridad referencial con llaves foráneas (FK) configurando políticas ON DELETE y ON UPDATE.",
        "5. Incorporar restricciones de dominio CHECK (ej. precios > 0, cantidades > 0, stock >= 0).",
        "6. Realizar Forward Engineering en MySQL Workbench para compilar y validar el script DDL en el servidor local.",
        "7. Ejecutar pruebas de inserción válida y violación forzada de restricciones documentando los códigos de error.",
        "8. Redactar el documento formal en Word con normas básicas y empaquetar el Word + .mwb + .sql en formato .ZIP."
      ],
      criteria: "Crea la estructura física de la base de datos relacional y aplica restricciones de integridad según los requerimientos del proyecto formativo.",
      checklist: [
        "Archivo comprimido en formato .ZIP con nomenclatura oficial de la evidencia.",
        "Documento técnico formal en Word (.docx) con portada, introducción y objetivos.",
        "Descripción detallada de la estructura de la base de datos, entidades y atributos.",
        "Diccionario de datos con tipos de datos justificados (DECIMAL para moneda, DATETIME, INT, VARCHAR).",
        "Archivo nativo de MySQL Workbench (.mwb) con el diagrama EER completo.",
        "Script SQL (.sql) ejecutable y libre de errores de sintaxis.",
        "Restricciones PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE y CHECK implementadas.",
        "Políticas ON DELETE (RESTRICT/CASCADE) y ON UPDATE configuradas con justificación de negocio.",
        "Capturas de pantalla de MySQL Workbench evidenciando el diseño y la ejecución sin errores."
      ],
      activityId: "AA2",
      session: {
        file: "proyeccion-evidencia-06.html",
        slides: 14,
        title: "Evidencia 06: Estructura BD y Restricciones",
        blurb: "Caso práctico en MySQL Workbench (modelo .mwb), llaves primarias, foráneas, CHECK, integridad referencial y paquete ZIP con Word."
      }
    },
    {
      id: "ev-07",
      guia: "guia-06",
      guiaName: "Guía 06",
      fase: "Ejecución",
      code: "GA6-220501096-AA2-EV03",
      activity: "AA2: Lenguaje SQL",
      category: "sql",
      catName: "Bases de Datos SQL",
      type: "Producto",
      hours: "16 Horas",
      title: "Script bases de datos del proyecto",
      format: "Archivo Comprimido (.ZIP)",
      instrument: "IE-GA6-220501096-AA2-EV03",
      summary: "Generación, exportación y prueba del script SQL maestro del modelo físico de la base de datos correspondiente a los diseños hechos en MySQL Workbench para el software del proyecto formativo. El script incluye encabezado de sesión, borrado limpio idempotente (DROP/CREATE), bloque DDL con restricciones (PK, FK, CHECK), datos semilla iniciales DML (Seeders) y consultas de verificación con INNER JOIN. Entrega en archivo comprimido ZIP.",
      steps: [
        "1. Abrir el modelo físico (.mwb) realizado en la evidencia EV02 en MySQL Workbench.",
        "2. Verificar que la estructura cubra la totalidad de los requisitos del software del proyecto formativo.",
        "3. Exportar el script DDL mediante Forward Engineer (File > Export > Forward Engineer SQL CREATE Script).",
        "4. Estructurar el script maestro con directivas idempotentes (SET NAMES, SET FOREIGN_KEY_CHECKS, DROP/CREATE DATABASE).",
        "5. Incorporar el bloque DDL ordenado jerárquicamente por dependencias de llaves foráneas.",
        "6. Redactar el bloque DML con datos semilla (roles, usuarios administrativos, catálogos e ítems de prueba).",
        "7. Agregar consultas de verificación DQL con INNER JOIN al final del script para comprobar la consistencia.",
        "8. Probar la ejecución completa con cero errores en MySQL Workbench y empaquetar en formato .ZIP."
      ],
      criteria: "Verifica la estructura y funcionamiento del script físico de base de datos del proyecto formativo.",
      checklist: [
        "Archivo comprimido en formato .ZIP con nomenclatura oficial (GA6-220501096-AA2-EV03_Nombre_Apellido.zip).",
        "Script SQL ejecutable de principio a fin sin errores de sintaxis (Action Output con checks verdes).",
        "Bloque DDL con definición de tablas, tipos de datos, llaves primarias, foráneas y restricciones CHECK.",
        "Idempotencia: incluye DROP DATABASE IF EXISTS y CREATE DATABASE con codificación utf8mb4.",
        "Bloque DML con datos semilla (seeders) coherentes y representativos del negocio real.",
        "Consultas DQL con INNER JOIN demostrando integridad referencial y cruce de datos.",
        "Archivo fuente nativo de MySQL Workbench (.mwb) incluido como respaldo técnico.",
        "Archivo LEAME.txt con instrucciones de instalación para el evaluador."
      ],
      activityId: "AA2",
      session: {
        file: "proyeccion-evidencia-07.html",
        slides: 14,
        title: "Evidencia 07: Script Bases de Datos del Proyecto",
        blurb: "Script maestro SQL ejecutable (DDL + datos semilla DML + consultas JOIN de verificación) y empaquetado en formato ZIP."
      }
    },
    {
      id: "ev-08",
      guia: "guia-06",
      guiaName: "Guía 06",
      fase: "Ejecución",
      code: "GA6-220501096-AA3-EV01",
      activity: "AA3: Prototipado UI/UX",
      category: "uiux",
      catName: "Prototipado UI/UX",
      type: "Conocimiento",
      hours: "12 Horas",
      title: "Selección herramientas para prototipado",
      format: "Documento Word (.docx) / ZIP",
      instrument: "IE-GA6-220501096-AA3-EV01",
      summary: "Selección técnica y justificación de herramientas de prototipado vigentes en la industria (Figma, Canva, Penpot, Framer). El aprendiz analiza los componentes de arquitectura móvil y web, elabora un cuadro comparativo y presenta un documento formal en Word con normas básicas y pantallazos de la exploración de las herramientas probadas. (El diseño completo de prototipos del proyecto se evaluará en la siguiente evidencia).",
      steps: [
        "1. Revisar los componentes formativos de Arquitectura Móvil Nativa, Desarrollo Híbrido y Desarrollo Web HTML/CSS/JS.",
        "2. Evaluar y comparar las 4 herramientas de prototipado vigentes (Figma, Canva, Penpot, Framer) según licenciamiento, colaboración, fidelidad y estándares web.",
        "3. Seleccionar la herramienta más adecuada y justificar su elección para las necesidades del proyecto formativo.",
        "4. Realizar pruebas prácticas de exploración dentro de las herramientas en el lienzo de trabajo.",
        "5. Tomar capturas de pantalla nítidas y organizadas evidenciando la interacción real con las herramientas.",
        "6. Redactar el documento técnico formal en Word (.docx) con normas básicas: 1. Portada, 2. Introducción y Objetivos, 3. Cuadro Comparativo y Justificación, 4. Pantallazos de las herramientas.",
        "7. Realizar la entrega formal del documento en el espacio asignado en Zajuna LMS."
      ],
      criteria: "Selecciona herramientas de diseño de interfaces según necesidades del proyecto formativo.",
      checklist: [
        "Documento formal en Word (.docx) o comprimido en .ZIP con nomenclatura oficial.",
        "Portada formal institucional con datos de la ficha ADSO 228118 y centro CADPH Garzón.",
        "Introducción sobre arquitecturas móviles y web, y objetivos claros de la actividad.",
        "Cuadro comparativo técnico de las 4 herramientas de prototipado vigentes.",
        "Justificación técnica de la selección de herramientas para el proyecto formativo.",
        "Pantallazos nítidos y propios de la exploración práctica en las herramientas de prototipado.",
        "Entrega formal en el espacio asignado en Zajuna LMS."
      ],
      activityId: "AA3",
      session: {
        file: "proyeccion-evidencia-08.html",
        slides: 13,
        title: "Evidencia 08: Selección de Herramientas para Prototipado",
        blurb: "Ecosistema de prototipado vigente (Figma, Canva, Penpot, Framer), matriz comparativa y documento formal con capturas de exploración."
      }
    },
    {
      id: "ev-09",
      guia: "guia-06",
      guiaName: "Guía 06",
      fase: "Ejecución",
      code: "GA6-220501096-AA3-EV02",
      activity: "AA3: Prototipado UI/UX",
      category: "uiux",
      catName: "Prototipado UI/UX",
      type: "Desempeño",
      hours: "12 Horas",
      title: "Crear el diseño del sitio web y/o móviles utilizando sus componentes y tecnologías respectivas",
      format: "Carpeta ZIP (Word + Prototipo)",
      instrument: "IE-GA6-220501096-AA3-EV02",
      summary: "Mockups de navegación web y/o móvil del software del proyecto formativo, construidos en Figma con componentes reutilizables y conectados en modo Prototype para demostrar la funcionalidad. Se explica junto con la EV03 a partir del caso AromaSur Café S.A.S. (Login ↔ Registro en móvil y escritorio). Entrega: ZIP con el documento Word y el archivo del prototipo.",
      steps: [
        "Identificar en los requerimientos de tu software las pantallas y el flujo de navegación que vas a prototipar (mínimo Login ↔ Registro y el flujo principal de tu proyecto).",
        "Crear el archivo en Figma con páginas organizadas (Estilos, Móvil, Web) y los frames iPhone 16 (393×852) y Desktop (1440×1024).",
        "Construir los componentes reutilizables con Auto Layout: botón primario/secundario y campo de texto con estados.",
        "Maquetar los mockups móvil y escritorio de cada pantalla respetando la guía de estilos.",
        "En la pestaña Prototype, conectar los elementos con On click → Navigate to y una animación (Smart animate / Slide in), en ambos sentidos.",
        "Definir el Flow starting point de cada flujo y probar con Present (Ctrl + Alt + Enter) o la app de Figma en el celular.",
        "Redactar el Word: portada, introducción, objetivo, pantallazos de los mockups y descripción de cada interfaz.",
        "Exportar el .fig (menú principal → File → Save local copy) o el enlace del prototipo y comprimir todo en un ZIP."
      ],
      criteria: "Crea interfaces de usuario aplicando buenas prácticas de usabilidad y accesibilidad.",
      checklist: [
        "ZIP con nomenclatura oficial: GA6-220501096-AA3-EV02_Nombre_Apellido.zip.",
        "Word con portada, introducción, objetivo, pantallazos de los mockups y descripción de cada interfaz.",
        "Mockups de navegación en vista móvil y/o web basados en los requerimientos de tu software.",
        "Prototipo con navegación funcional entre pantallas (conexiones On click → Navigate to en ambos sentidos).",
        "Archivo .fig o archivo de texto con el enlace del prototipo, verificado en una ventana de incógnito.",
        "Entrega formal en el espacio de la evidencia en Zajuna LMS."
      ],
      activityId: "AA3",
      session: {
        file: "proyeccion-evidencia-09-10.html",
        slides: 24,
        title: "AA3-EV02 + EV03: Login y Registro en Figma (móvil y web)",
        blurb: "Una sola sesión para las dos evidencias: caso AromaSur Café S.A.S., sistema de diseño (colores, tipografía, usabilidad), frames móvil y escritorio, componentes con Auto Layout y prototipo conectado Login ↔ Registro, paso a paso en los menús de Figma."
      }
    },
    {
      id: "ev-10",
      guia: "guia-06",
      guiaName: "Guía 06",
      fase: "Ejecución",
      code: "GA6-220501096-AA3-EV03",
      activity: "AA3: Prototipado UI/UX",
      category: "uiux",
      catName: "Prototipado UI/UX",
      type: "Producto",
      hours: "12 Horas",
      title: "Interfaces gráficas según requerimientos del proyecto",
      format: "Carpeta ZIP (interfaz gráfica + archivos)",
      instrument: "IE-GA6-220501096-AA3-EV03",
      summary: "Tomando como referencia el prototipo de la EV02, diseñar la interfaz gráfica web y/o móvil del software definiendo colores, usabilidad, estilos y menús según sus necesidades. Se explica junto con la EV02 en una sola sesión (caso AromaSur Café S.A.S.). Entrega: ZIP con la interfaz gráfica y sus archivos.",
      steps: [
        "Partir del prototipo de la EV02 y de los requerimientos de tu software.",
        "Definir la paleta de color (primario, secundario, neutros y estados) verificando contraste WCAG AA (4.5:1 en texto).",
        "Crear en Figma los estilos de color y de texto (escala tipográfica) y aplicarlos en todas las pantallas.",
        "Aplicar criterios de usabilidad: etiquetas visibles, áreas táctiles de 48 px, mensajes de error claros y un único botón principal por pantalla.",
        "Diseñar los menús de navegación de tu software (barra superior en web, barra inferior o menú en móvil).",
        "Exportar cada pantalla en PNG (2x) y la hoja de estilos, y guardar el .fig.",
        "Comprimir la interfaz gráfica con sus archivos en un ZIP y entregarlo en Zajuna."
      ],
      criteria: "Crea interfaces de usuario aplicando buenas prácticas de usabilidad y accesibilidad.",
      checklist: [
        "ZIP con nomenclatura oficial: GA6-220501096-AA3-EV03_Nombre_Apellido.zip.",
        "Interfaz gráfica coherente con el prototipo de la EV02 y con los requerimientos del software.",
        "Paleta de color definida como estilos en Figma, con contraste AA verificado.",
        "Estilos de texto (jerarquía tipográfica) aplicados de forma consistente.",
        "Menús de navegación diseñados para las vistas web y/o móvil.",
        "Pantallas exportadas (PNG 2x) + archivo .fig o enlace al diseño.",
        "Entrega formal en el espacio de la evidencia en Zajuna LMS."
      ],
      activityId: "AA3",
      session: {
        file: "proyeccion-evidencia-09-10.html",
        slides: 24,
        title: "AA3-EV02 + EV03: Login y Registro en Figma (móvil y web)",
        blurb: "Una sola sesión para las dos evidencias: caso AromaSur Café S.A.S., sistema de diseño (colores, tipografía, usabilidad), frames móvil y escritorio, componentes con Auto Layout y prototipo conectado Login ↔ Registro, paso a paso en los menús de Figma."
      }
    },
    {
      id: "ev-11",
      guia: "guia-06",
      guiaName: "Guía 06",
      fase: "Ejecución",
      code: "GA6-220501096-AA4-EV01",
      activity: "AA4: Frontend Web",
      category: "frontend",
      catName: "Frontend Web",
      type: "Conocimiento",
      hours: "16 Horas",
      title: "Desarrollo de interfaces web con HTML5, CSS3 y JavaScript",
      format: "PDF",
      instrument: "IE-GA6-220501096-AA4-EV01",
      summary: "Guía técnica y desarrollo práctico de maquetación semántica con HTML5, hojas de estilos CSS3 (Flexbox/Grid) y dinamismo con JavaScript vanilla.",
      steps: [
        "Estudiar las etiquetas semánticas de HTML5 (header, nav, main, section, article, aside, footer).",
        "Aplicar modelos de caja, selectores avanzados y sistemas de layout modernos (Flexbox y Grid).",
        "Implementar scripts JS para manipulación del DOM y captura de eventos.",
        "Consolidar ejemplos y capturas en el documento entregable."
      ],
      criteria: "Aplica conceptos de maquetación semántica y diseño adaptable con CSS y JavaScript.",
      checklist: [
        "Explicación conceptual de la semántica HTML5.",
        "Ejemplos de maquetación con Flexbox y CSS Grid documentados.",
        "Scripts JS para manipulación del DOM probados.",
        "Documento en formato PDF formal."
      ],
      activityId: "AA4",
      session: null
    },
    {
      id: "ev-12",
      guia: "guia-06",
      guiaName: "Guía 06",
      fase: "Ejecución",
      code: "GA6-220501096-AA4-EV02",
      activity: "AA4: Frontend Web",
      category: "frontend",
      catName: "Frontend Web",
      type: "Desempeño",
      hours: "16 Horas",
      title: "Maquetación de interfaces web responsive",
      format: "ZIP / Repositorio Git",
      instrument: "IE-GA6-220501096-AA4-EV02",
      summary: "Codificación frontend adaptable a dispositivos móviles, tablets y escritorio mediante Media Queries, diseño responsive y accesibilidad WCAG.",
      steps: [
        "Estructurar el layout del proyecto siguiendo enfoque Mobile-First.",
        "Configurar Media Queries para breakpoints estándar (sm: 640px, md: 768px, lg: 1024px).",
        "Verificar contrastes cromáticos y accesibilidad para lectores de pantalla.",
        "Comprobar adaptabilidad en modo responsive de las herramientas de desarrollador."
      ],
      criteria: "Construye interfaces web responsive garantizando usabilidad en múltiples pantallas.",
      checklist: [
        "Código HTML5 semántico validado por W3C.",
        "Hojas de estilo CSS con Media Queries activas.",
        "Adaptación fluida sin desbordamientos en móvil y escritorio.",
        "Archivos organizados y comprimidos en formato ZIP."
      ],
      activityId: "AA4",
      session: null
    },
    {
      id: "ev-13",
      guia: "guia-06",
      guiaName: "Guía 06",
      fase: "Ejecución",
      code: "GA6-220501096-AA4-EV03",
      activity: "AA4: Frontend Web",
      category: "frontend",
      catName: "Frontend Web",
      type: "Producto",
      hours: "16 Horas",
      title: "Diseño front-end que cumpla con los requerimientos del proyecto formativo",
      format: "ZIP / GitHub Pages",
      instrument: "IE-GA6-220501096-AA4-EV03",
      summary: "Código fuente frontend funcional completo del proyecto formativo, maquetado fielmente a los prototipos de Figma, responsive y publicado.",
      steps: [
        "Codificar las vistas clave del sistema (Inicio, Login, Dashboard de módulos y formularios).",
        "Aplicar diseño responsive adaptable a móviles, tablets y monitores de escritorio.",
        "Implementar validaciones de formulario en el lado del cliente con feedback visual.",
        "Publicar el sitio web en GitHub Pages o desplegar en hosting estático."
      ],
      criteria: "Genera plantillas y estilos de acuerdo con el diseño establecido.",
      checklist: [
        "Vistas maquetadas y funcionales según prototipo de alta fidelidad.",
        "Diseño responsive sin desbordamientos horizontales.",
        "Código modular, limpio y documentado.",
        "Enlace activo a GitHub Pages o carpeta ZIP completa con todos los assets."
      ],
      activityId: "AA4",
      session: null
    },
    {
      id: "ev-ga5-01",
      guia: "guia-05",
      guiaName: "Guía 05",
      fase: "Análisis",
      code: "GA5-220501095-AA1-EV01",
      activity: "AA1: Requisitos de Software",
      category: "uml",
      catName: "Arquitectura UML",
      type: "Producto",
      hours: "16 Horas",
      title: "Especificación de los requisitos funcionales y no funcionales del software",
      format: "PDF (Estándar IEEE 830)",
      instrument: "IE-GA5-220501095-AA1-EV01",
      summary: "Documento formal de especificación de requisitos de software (SRS) clasificando requerimientos funcionales, no funcionales y reglas de negocio según IEEE 830.",
      steps: [
        "Realizar levantamiento de requerimientos a partir de las necesidades del cliente.",
        "Clasificar requerimientos funcionales (RF) con codificación única y priorización MoSCoW.",
        "Documentar requerimientos no funcionales (RNF) de rendimiento, seguridad y disponibilidad.",
        "Definir criterios de aceptación y matriz de trazabilidad de requisitos."
      ],
      criteria: "Especifica los requisitos del software según estándares de ingeniería y necesidades del cliente.",
      checklist: [
        "Estructura bajo estándar formal IEEE 830.",
        "Mínimo 15 requerimientos funcionales codificados con detalle.",
        "Requerimientos no funcionales y métricas de calidad.",
        "Matriz de trazabilidad validada por el equipo."
      ],
      activityId: "AA1",
      session: null
    },
    {
      id: "ev-ga5-02",
      guia: "guia-05",
      guiaName: "Guía 05",
      fase: "Análisis",
      code: "GA5-220501095-AA1-EV02",
      activity: "AA1: Modelado del Negocio",
      category: "uml",
      catName: "Arquitectura UML",
      type: "Desempeño",
      hours: "16 Horas",
      title: "Diagramas de casos de uso y modelo de dominio del sistema",
      format: "PDF / StarUML",
      instrument: "IE-GA5-220501095-AA1-EV02",
      summary: "Construcción de diagramas de casos de uso del sistema con sus respectivas descripciones narrativas detalladas (actores, precondiciones, flujo básico y alternos).",
      steps: [
        "Identificar los actores del sistema (roles humanos y sistemas externos).",
        "Modelar los casos de uso principales con relaciones de inclusión (<<include>>) y extensión (<<extend>>).",
        "Elaborar la ficha descriptiva de cada caso de uso con flujo normal y flujos de excepción.",
        "Diagramar el modelo de dominio conceptual con clases de negocio asociadas."
      ],
      criteria: "Elabora diagramas de casos de uso representando las interacciones del sistema con usuarios.",
      checklist: [
        "Diagrama general de casos de uso por módulo.",
        "Fichas de especificación textual de casos de uso diligenciadas.",
        "Uso correcto de relaciones <<include>> y <<extend>>.",
        "Diagrama de dominio conceptual."
      ],
      activityId: "AA1",
      session: null
    },
    {
      id: "ev-ga5-03",
      guia: "guia-05",
      guiaName: "Guía 05",
      fase: "Planeación",
      code: "GA5-220501095-AA2-EV01",
      activity: "AA2: Arquitectura del Software",
      category: "uml",
      catName: "Arquitectura UML",
      type: "Producto",
      hours: "16 Horas",
      title: "Diagrama de clases y arquitectura general del software",
      format: "PDF / PlantUML",
      instrument: "IE-GA5-220501095-AA2-EV01",
      summary: "Diseño estructural orientado a objetos modelando clases, atributos, métodos, multiplicidades, herencia, interfaces y dependencias arquitectónicas.",
      steps: [
        "Mapear entidades del dominio a clases de software con visibilidad (+, -, #).",
        "Definir tipos de relaciones: asociación, agregación, composición y generalización.",
        "Incorporar patrones de arquitectura (MVC, capas, repositorio).",
        "Generar diagrama en herramienta CASE (StarUML, Visual Paradigm o PlantUML)."
      ],
      criteria: "Diseña la estructura del sistema aplicando los principios del paradigma orientado a objetos.",
      checklist: [
        "Diagrama de clases con especificación de atributos y métodos.",
        "Relaciones con cardinalidades explícitas en ambos extremos.",
        "Separación clara de responsabilidades por capas arquitectónicas.",
        "Documento explicativo del patrón adoptado."
      ],
      activityId: "AA2",
      session: null
    },
    {
      id: "ev-ga7-01",
      guia: "guia-07",
      guiaName: "Guía 07",
      fase: "Ejecución",
      code: "GA7-220501096-AA1-EV01",
      activity: "AA1: Servicios Web",
      category: "backend",
      catName: "Backend & APIs",
      type: "Producto",
      hours: "24 Horas",
      title: "Construcción de API RESTful con Node.js / Express o Spring Boot",
      format: "ZIP / Repositorio Git",
      instrument: "IE-GA7-220501096-AA1-EV01",
      summary: "Desarrollo de servicios backend con endpoints REST (GET, POST, PUT, DELETE), control de rutas, middlewares y códigos de estado HTTP estándar.",
      steps: [
        "Configurar el proyecto backend con estructura modular (controladores, servicios, modelos, rutas).",
        "Implementar operaciones CRUD completas sobre las entidades principales.",
        "Aplicar middlewares de manejo de errores, parseo de JSON y CORS.",
        "Verificar respuestas con códigos de estado HTTP semánticos (200, 201, 400, 404, 500)."
      ],
      criteria: "Construye servicios web backend aplicando el estilo arquitectónico RESTful.",
      checklist: [
        "Código backend limpio con dependencias instaladas y configuradas.",
        "Rutas RESTful estructuradas respetando plurales y métodos HTTP.",
        "Manejo global de excepciones sin caída del servidor.",
        "Enlace a repositorio Git o carpeta ZIP comprimida."
      ],
      activityId: "AA1",
      session: null
    },
    {
      id: "ev-ga7-02",
      guia: "guia-07",
      guiaName: "Guía 07",
      fase: "Ejecución",
      code: "GA7-220501096-AA1-EV02",
      activity: "AA1: Persistencia Backend",
      category: "backend",
      catName: "Backend & APIs",
      type: "Desempeño",
      hours: "20 Horas",
      title: "Integración del backend con base de datos mediante ORM/ODM",
      format: "Código Fuente / ZIP",
      instrument: "IE-GA7-220501096-AA1-EV02",
      summary: "Conexión de la API a MySQL o MongoDB utilizando capas de acceso a datos (Prisma / Mongoose / Sequelize), validaciones y transacciones seguras.",
      steps: [
        "Configurar variables de entorno y cadena de conexión a la base de datos.",
        "Definir esquemas de datos del ORM/ODM con tipos y validaciones de campo.",
        "Implementar consultas de persistencia (creación, lectura, actualización y borrado).",
        "Probar concurrencia e integridad transaccional en operaciones complejas."
      ],
      criteria: "Integra la capa de persistencia de datos con los servicios del backend mediante mapeadores objeto-relacional.",
      checklist: [
        "Conexión exitosa a motor de base de datos relacional o NoSQL.",
        "Uso de ORM (Prisma / Sequelize) u ODM (Mongoose) documentado.",
        "Operaciones asíncronas con promesas o async/await gestionadas.",
        "Capturas de base de datos con registros creados desde los endpoints."
      ],
      activityId: "AA1",
      session: null
    },
    {
      id: "ev-ga7-03",
      guia: "guia-07",
      guiaName: "Guía 07",
      fase: "Ejecución",
      code: "GA7-220501096-AA2-EV01",
      activity: "AA2: Pruebas y Documentación",
      category: "backend",
      catName: "Backend & APIs",
      type: "Producto",
      hours: "16 Horas",
      title: "Documentación y pruebas de endpoints con Postman y Swagger/OpenAPI",
      format: "JSON / PDF",
      instrument: "IE-GA7-220501096-AA2-EV01",
      summary: "Especificación de contratos de API con Swagger UI / OpenAPI 3.0 y batería de pruebas automáticas de peticiones y respuestas en Postman.",
      steps: [
        "Integrar Swagger UI en la aplicación backend con anotaciones OpenAPI.",
        "Exportar la colección de pruebas de Postman con variables de entorno.",
        "Escribir tests automáticos en Postman verificando status codes y payloads JSON.",
        "Generar informe de pruebas con evidencias de ejecución exitosa."
      ],
      criteria: "Documenta y valida los servicios web aplicando herramientas de prueba y especificación de contratos.",
      checklist: [
        "Interfaz Swagger accesible en ruta local /api-docs.",
        "Colección de Postman exportada en formato JSON v2.1.",
        "Tests automáticos de aserción (pm.test) implementados.",
        "Informe PDF con resultados de pruebas y tiempos de respuesta."
      ],
      activityId: "AA2",
      session: null
    }
  ]
};
