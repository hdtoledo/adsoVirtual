# Guía de Aprendizaje 07 · Evidencias paso a paso
**Programa:** Análisis y Desarrollo de Software (228118) · **Fase:** Ejecución · **AP7:** Codificar los módulos del software
**Proyecto:** Construcción de software integrador de tecnologías orientadas a servicios
**Competencia:** `220501096` - Desarrollar la solución de software de acuerdo con el diseño y metodologías de desarrollo.
**Resultados de aprendizaje:**
- `220501096-01`: planear actividades de construcción del software de acuerdo con el diseño establecido.
- `220501096-04`: codificar el software de acuerdo con el diseño establecido.

**Duración:** 498 horas técnicas. Guía oficial: [Guia_aprendizaje_7.pdf](guias/Guia_aprendizaje_7.pdf).

> Las entregas calificadas se hacen siempre en **Zajuna LMS**. En el curso trabajaremos todas las evidencias de la Guía 07 sobre el proyecto base **AromaSur Café S.A.S.** con el stack unificado de **Bases de datos relacionales (MySQL / PostgreSQL) + Node.js + Express + React (JavaScript)**. Este documento resume la guía oficial; ante cualquier diferencia de lineamientos formales, prevalece el PDF.

---

## Resumen de evidencias

| # | Código | Tipo | Evidencia | Entrega |
|---|---|---|---|---|
| 01 | `GA7-220501096-AA1-EV01` | Conocimiento | Informe técnico de plan de trabajo para construcción de software | PDF |
| 02 | `GA7-220501096-AA1-EV02` | Desempeño | Definir estándares de codificación, de acuerdo con la plataforma de desarrollo elegida | PDF |
| 03 | `GA7-220501096-AA1-EV03` | Conocimiento | Identifica herramientas de versionamiento | PDF |
| 04 | `GA7-220501096-AA1-EV04` | Desempeño | Instalación y configuración de herramienta de versionamiento (local/web) | PDF |
| 05 | `GA7-220501096-AA1-EV05` | Producto | Herramientas de versionamiento (GIT) instalada y configurada | Video MP4 |
| 06 | `GA7-220501096-AA2-EV01` | Desempeño | Codificación de módulos del software | ZIP / RAR |
| 07 | `GA7-220501096-AA2-EV02` | Producto | Módulos de software codificados y probados | ZIP / RAR |
| 08 | `GA7-220501096-AA3-EV01` | Desempeño | Codificación de módulos del software stand-alone, web y móvil | ZIP / RAR |
| 09 | `GA7-220501096-AA3-EV02` | Producto | Módulos de software stand-alone, web y móvil codificados y probados | ZIP / RAR |
| 10 | `GA7-220501096-AA4-EV01` | Conocimiento | Taller sobre componentes front-end | PDF |
| 11 | `GA7-220501096-AA4-EV02` | Desempeño | Verificación de procedimientos para la definición de componentes front-end de la aplicación | PDF |
| 12 | `GA7-220501096-AA4-EV03` | Producto | Componente front-end del proyecto formativo y proyectos de clase | ZIP / RAR |
| 13 | `GA7-220501096-AA5-EV01` | Desempeño | Diseño y desarrollo de servicios web - caso | ZIP / RAR |
| 14 | `GA7-220501096-AA5-EV02` | Producto | API | ZIP / RAR |
| 15 | `GA7-220501096-AA5-EV03` | Desempeño | Diseño y desarrollo de servicios web - proyecto | ZIP / RAR |
| 16 | `GA7-220501096-AA5-EV04` | Producto | API del proyecto | ZIP / RAR |

**Entregas en ZIP o RAR:** incluyen los archivos del proyecto y un archivo con el enlace del repositorio. La carpeta se nombra con el aprendiz y el número de la evidencia, por ejemplo `NOMBRE_APELLIDO_AA3_EV01`. La guía tiene dos diferencias en esa nomenclatura que conviene conocer:
- En la AA2 escribe el nombre sin guion bajo: `NOMBREAPELLIDO_AA2_EV01`.
- En la AA5-EV03 y la AA5-EV04 repite los números EV01 y EV02.

Usa siempre el número real de la evidencia que entregas.

---

## Actividad GA7-220501096-AA1 · Configurar herramientas de versionamiento para control de código (40 h)
Material de formación: *Aplicación del paradigma orientado a objetos en el lenguaje de programación* e *Integración continua*.

### 1. `GA7-220501096-AA1-EV01` · Informe técnico de plan de trabajo para construcción de software
- **Diapositivas:** [guias/guia-07/proyeccion-evidencia-01.html](guias/guia-07/proyeccion-evidencia-01.html) (21 slides, caso AromaSur Café S.A.S.).
- **Descripción oficial:**
  > *"Con base en las características del software a desarrollar, realice un informe técnico especificando herramientas y tecnologías de versionamiento a utilizar, según lo visto en los componentes formativos. Se deben seguir las normas básicas de presentación de un documento escrito, es decir, el documento debe tener como mínimo una portada, introducción, objetivo, selección de herramientas de versionamiento a utilizar."*
- **Criterio:** interpreta el informe de diseño para definir el plan de trabajo en la construcción del software. **Instrumento:** `IE-GA7-220501096-AA1-EV01`.
- **Paso a paso:**
  1. Revisar los artefactos de diseño del proyecto (requisitos, diagramas, prototipos y front-end) y describir el software y sus módulos.
  2. Explicar los tipos de control de versiones (local, centralizado y distribuido) y los conceptos de Git.
  3. Comparar plataformas remotas (GitHub, GitLab, Bitbucket) y clientes (Git, VS Code, GitHub Desktop) con una matriz ponderada de criterios propios.
  4. Presentar la tabla de selección: herramienta elegida y justificación.
  5. Definir el plan de trabajo:
     - estrategia de ramas;
     - convenciones de commits y versiones;
     - estructura del repositorio, con `.gitignore` y `.env.example`;
     - stack por capa;
     - etapas alineadas con las AA2–AA5.
  6. Redactar el informe con portada, introducción, objetivo, desarrollo, conclusiones y referencias, y exportarlo a **PDF**.
- **Entrega:** documento informe técnico, extensión libre, formato PDF. Espacio en Zajuna: *Informe técnico de plan de trabajo para construcción de software. GA7-220501096-AA1-EV01.*

### 2. `GA7-220501096-AA1-EV02` · Definir estándares de codificación, de acuerdo con la plataforma de desarrollo elegida
- **Diapositivas:** [guias/guia-07/proyeccion-evidencia-02.html](guias/guia-07/proyeccion-evidencia-02.html) (21 slides, caso AromaSur Café S.A.S. en JavaScript: BD relacional, Express, React y Node.js, con validador de nombres y auditor de código interactivos).
- **Demo de referencia:** [guias/guia-07/demos/aa1-ev02-estandares/](guias/guia-07/demos/aa1-ev02-estandares/README.md) (modelo Node.js ES Modules ejecutable `estado-pedido.js`, `producto.js`, `pedido.js` y `app.js`; capa HTTP de referencia `productos.routes.js` → `productos.controller.js` → `productos.repo.js`; `package.json` y `.editorconfig`).
- **Descripción oficial:**
  > *"Con base en las características del software a desarrollar, realice un informe técnico con el estándar de codificación a utilizar para el desarrollo del software según lo visto en los componentes formativos. Se deben seguir las normas básicas de presentación de un documento escrito, es decir, el documento debe tener como mínimo una portada, introducción, objetivo, estándares de codificación como nombramiento de variables, declaración de clases, declaración de métodos, etc."*
- **Criterio:** define estándares de codificación de acuerdo con las reglas de la plataforma de desarrollo seleccionada. **Instrumento:** `IE-GA7-220501096-AA1-EV02`.
- **Paso a paso:**
  1. Retomar la plataforma de AromaSur (**Base de datos relacional SQL + Node.js + Express + React**) y declarar las guías oficiales adoptadas (Airbnb JavaScript Style Guide, React Docs, Express Best Practices y SQL Style Guide).
  2. Definir las convenciones de nombramiento para carpetas, archivos (`kebab-case.js` / `PascalCase.jsx`), variables (`const`/`let`), booleanos, constantes (`UPPER_SNAKE_CASE`), clases, funciones, hooks (`use*`) y SQL (`snake_case`) con ejemplos **correctos e incorrectos**.
  3. Especificar las reglas de declaración de clases JS (campos privados `#`, orden interno), funciones (verbos, longitud acotada, guard clauses, desestructuración) y controladores Express.
  4. Documentar formato (2 espacios, 100 columnas, `===` estricto, llaves, UTF-8/LF), comentarios útiles con JSDoc, manejo de errores y reglas de codificación segura (`.env`, SQL parametrizado, `bcrypt`, prevención XSS).
  5. Documentar las herramientas de verificación automática (`.editorconfig`, ESLint y Prettier) e incluir un ejemplo real de AromaSur (antes y después).
  6. Redactar el informe con portada, introducción, objetivo, desarrollo, conclusiones y referencias, y exportarlo a **PDF**.
- **Entrega:** documento informe técnico, extensión libre, formato PDF. Espacio en Zajuna: *Definir estándares de codificación, de acuerdo con la plataforma de desarrollo elegida. GA7-220501096-AA1-EV02.*

### 3. `GA7-220501096-AA1-EV03` · Identifica herramientas de versionamiento
Documento con tablas de diferencias y características entre Git local y Git remoto, y una tabla con la descripción de sus comandos básicos. Debe tener portada, introducción y objetivo. Se entrega en PDF.

### 4. `GA7-220501096-AA1-EV04` · Instalación y configuración de herramienta de versionamiento (local/web)
Paso a paso con pantallazos de la instalación y configuración de las herramientas de versionamiento, local y remota. Debe tener portada, introducción y objetivo. Se entrega en PDF.

### 5. `GA7-220501096-AA1-EV05` · Herramientas de versionamiento (GIT) instalada y configurada
Video MP4 en el que se ejecuta y se explica este ejercicio:
1. Crear el repositorio público `Programa-Git`.
2. Agregarlo como remoto (`git remote add github url`) y listarlo con `git remote -v`.
3. Subir los cambios con `git push` y verificar el historial en la plataforma.
4. Crear `kotlin.txt` con el nombre y el correo del aprendiz.
5. Ejecutar `git add .`, `git commit -m "Añadido datos."` y `git push`.

El video empieza con una presentación del aprendiz y de los ejercicios.

---

## Actividad GA7-220501096-AA2 · Aplicar estándares de codificación, de acuerdo con el diseño (96 h)
Stack de trabajo AromaSur: *Node.js + Express (JavaScript)* y *Bases de datos relacionales (MySQL / PostgreSQL)*.

### 6. `GA7-220501096-AA2-EV01` · Codificación de módulos del software
- Módulo de AromaSur en **Node.js** con conexión a base de datos relacional mediante pool y consultas parametrizadas.
- Debe tener inserción, consulta, actualización y eliminación (CRUD).
- Cumple el estándar de codificación JavaScript en el nombramiento de variables, funciones, clases y archivos.
- Proyecto creado con control de versiones.

### 7. `GA7-220501096-AA2-EV02` · Módulos de software codificados y probados
- Módulo web de AromaSur con **Node.js + Express**: formularios HTML, rutas GET y POST y vistas dinámicas conectadas a la base de datos relacional.
- Proyecto creado con control de versiones.

---

## Actividad GA7-220501096-AA3 · Codificar los módulos del software stand-alone, web y móvil (122 h)

### 8. `GA7-220501096-AA3-EV01` · Codificación de módulos del software stand-alone, web y móvil
- Módulo del proyecto (web o móvil) construido con uno de los frameworks vistos.
- Código comentado y con estándares de codificación.
- Proyecto creado con control de versiones.

### 9. `GA7-220501096-AA3-EV02` · Módulos de software stand-alone, web y móvil codificados y probados
- Pruebas según las historias de usuario o casos de uso.
- Documento con un pantallazo por requisito y con las pruebas de validación: fechas, números, textos, caracteres especiales y longitudes.
- Video con toda la funcionalidad del módulo.
- La carpeta incluye el proyecto, el Word, el video y el enlace del repositorio.

---

## Actividad GA7-220501096-AA4 · Codificar el front-end utilizando framework (96 h)

### 10. `GA7-220501096-AA4-EV01` · Taller sobre componentes front-end
Documento en PDF que responde cuatro puntos y presenta las principales características del framework:
1. Diferencia entre React y JSX.
2. Qué son las clases en React.
3. Principales eventos de React.
4. Mapa conceptual de React.

### 11. `GA7-220501096-AA4-EV02` · Verificación de procedimientos para la definición de componentes front-end
Documento en PDF con los componentes de React que usará el proyecto, cada uno con su justificación.

### 12. `GA7-220501096-AA4-EV03` · Componente front-end del proyecto formativo y proyectos de clase
- Módulo front-end del proyecto.
- Código comentado y con estándares de codificación.
- Proyecto creado con control de versiones.

---

## Actividad GA7-220501096-AA5 · Crear servicios web, de acuerdo con el diseño (144 h)

### 13. `GA7-220501096-AA5-EV01` · Diseño y desarrollo de servicios web - caso
- Servicio de registro e inicio de sesión que recibe usuario y contraseña.
- Responde "autenticación satisfactoria" o un error de autenticación.
- Código comentado y versionado.
- La contraseña se guarda con hash, nunca en texto plano.

### 14. `GA7-220501096-AA5-EV02` · API
Testing en **Postman** de la API de la AA5-EV01. La carpeta incluye:
- el proyecto;
- un video del testing;
- un documento con pantallazos de las pruebas;
- un archivo con los endpoints;
- el enlace del repositorio.

### 15. `GA7-220501096-AA5-EV03` · Diseño y desarrollo de servicios web - proyecto
- Las API que necesita el software del proyecto, con la documentación de cada servicio.
- Proyecto creado con control de versiones.

### 16. `GA7-220501096-AA5-EV04` · API del proyecto
Testing en Postman de las API del proyecto, con el mismo contenido de entrega de la AA5-EV02.

---

## Criterios de evaluación
| Actividad | Criterio |
|---|---|
| AA1 | Interpreta el informe de diseño para definir el plan de trabajo en la construcción del software. Define estándares de codificación de acuerdo con las reglas de la plataforma de desarrollo seleccionada. Selecciona y configura herramientas de versionamiento para el control de cambios en el código. |
| AA2 – AA4 | Codifica los módulos del software stand-alone, web y móvil, de acuerdo con las especificaciones del diseño y el estándar de codificación. |
| AA5 | Crea servicios web para disponer de métodos reutilizables en el software. |
