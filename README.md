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
        ├── proyeccion-evidencia-03.html # Presentación interactiva de 10 diapositivas para Evidencia 3 (NoSQL MongoDB)
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
* **Buscador en Tiempo Real:** Filtrado reactivo instantáneo por código de evidencia (ej. `AA1-EV01`, `AA1-EV02`, `AA1-EV03`), título, resumen o tecnologías.
* **Paginación Dinámica:** Paginación calibrada a **6 evidencias por página** con navegación previa/siguiente, botones numerados y contador contextual (`Mostrando X a Y de Z evidencias`).
* **Modales Detallados:** Cada evidencia despliega un modal con paso a paso detallado, llamada directa a diapositivas interactivas, criterios oficiales de evaluación y checklist interactivo con persistencia local en navegador (`localStorage`).

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
* **10 Diapositivas Directas al Grano (100% en Español):**
  * **Slide 01 - 02:** Portada institucional y qué son las Bases de Datos No Relacionales (NoSQL) con las 4 familias tecnológicas (Documentales, Clave-Valor, Columnas Anchas y Grafos).
  * **Slide 03 - 04:** Tabla de equivalencias conceptuales directa (Tabla $\rightarrow$ Colección, Fila $\rightarrow$ Documento, Columna $\rightarrow$ Campo, PK $\rightarrow$ `_id`) y anatomía de un documento JSON vs BSON.
  * **Slide 05 - 06:** La decisión arquitectónica crítica: **Incrustar (Subdocumentos)** vs **Referenciar (Por ID)**, y el paso a paso metodológico para estructurar las colecciones del proyecto individual.
  * **Slide 07:** Validación formal de esquemas en MongoDB mediante reglas `$jsonSchema` (campos requeridos, tipos de datos y rangos).
  * **Slide 08:** Ejemplo completo resuelto para un sistema de ventas (colección `pedidos` con cliente referenciado e ítems de compra incrustados) y notas de adaptación para Salud/Veterinaria, Talleres y Restaurantes.
  * **Slide 09 - 10:** Herramientas oficiales (*MongoDB Compass*, *MongoDB Atlas* clúster gratuito y *mongosh*), estructura obligatoria del informe PDF y lista de chequeo de 5 puntos para calificación Aprobada ('A') en **Zajuna LMS**.

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
