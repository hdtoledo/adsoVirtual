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
        ├── proyeccion-evidencia-01.html # Presentación interactiva de 20 diapositivas para Evidencia 1
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
* **Buscador en Tiempo Real:** Filtrado reactivo instantáneo por código de evidencia (ej. `AA1-EV01`), título, resumen o tecnologías.
* **Paginación Dinámica:** Paginación calibrada a **6 evidencias por página** con navegación previa/siguiente, botones numerados y contador contextual (`Mostrando X a Y de Z evidencias`).
* **Modales Detallados:** Cada evidencia despliega un modal con paso a paso detallado, criterios oficiales de evaluación y checklist interactivo con persistencia local en navegador (`localStorage`).

---

## 📽️ Presentación Interactiva de la Evidencia 1 (`proyeccion-evidencia-01.html`)

Presentación especializada de **20 diapositivas interactivas** diseñada para proyectar en sesiones virtuales sincrónicas la **Evidencia Técnica 01: Resolución de problemas aplicando el modelo relacional, cardinalidad y normalización (GA6-220501096-AA1-EV01)**:

### 📗 Bloque 1: Fundamentos y Caso Real de 0FN a 3FN (Slides 01 a 10)
* **Slide 01 - 02:** Portada institucional SENA CADPH Garzón y especificación oficial de la Guía 6 (`IE-GA6-220501096-AA1-EV01`).
* **Slide 03:** Ecosistema de DBMS: Motores RDBMS relacionales vs NoSQL, y por qué MySQL para transacciones ACID.
* **Slide 04:** El Caso Real en Bruto: Planilla desnormalizada en 0FN con violación de atomicidad y celdas compuestas.
* **Slide 05:** Diagnóstico Forense: Demostración detallada de las 3 anomalías de Edgar F. Codd (Inserción, Modificación y Eliminación).
* **Slide 06:** Primera Forma Normal (1FN): Desglose atómico, eliminación de listas repetitivas y Clave Primaria Compuesta.
* **Slide 07:** Segunda Forma Normal (2FN): Dependencia funcional completa y división en tablas `Factura`, `Producto` y `DetalleFactura`.
* **Slide 08:** Tercera Forma Normal (3FN): Eliminación de dependencias transitivas y creación de las 4 tablas normalizadas con `Cliente`.
* **Slide 09:** Diccionario de Datos del Modelo: Tipos de datos SQL (`INT`, `VARCHAR`, `DECIMAL`), restricciones (`PK`, `FK`, `NOT NULL`) y longitudes.
* **Slide 10:** Análisis de Cardinalidades: Desglose semántico mínimo/máximo de relaciones 1:N y resolución de la relación N:M.

### 📘 Bloque 2: MySQL Workbench, Descarga, Setup y Taller EER (Slides 11 a 18)
* **Slide 11:** Descarga Oficial de Oracle (`dev.mysql.com/downloads/installer/`) y prerrequisito crítico de *Microsoft Visual C++ 2015-2022 Redistributable (x64)*.
* **Slide 12:** Instalación paso a paso en Windows: Selección de productos (Server 8.0 y Workbench 8.0), configuración de puerto `3306`, contraseña de `root` y servicio `MySQL80`.
* **Slide 13:** Primeros pasos en Workbench: Creación de modelo EER (`File > New Model`), lienzo `Add Diagram` y esquema de base de datos.
* **Slide 14:** Herramienta Tabla (<kbd>T</kbd>), configuración de columnas y banderas (`PK`, `NN`, `UQ`, `AI`, `UN`).
* **Slide 15:** Trazado de relaciones foráneas: La **Regla de Oro de Workbench** (*clic primero en la tabla que recibe la foránea / tabla hija, luego en la tabla padre*).
* **Slide 16:** Integridad Referencial: Configuración de políticas `ON DELETE RESTRICT / NO ACTION` y `ON DELETE CASCADE`.
* **Slide 17:** Forward Engineering (<kbd>Ctrl + G</kbd>): Opciones `Generate DROP Statements` y exportación a script SQL físico.
* **Slide 18:** Live Testing: Poblado con datos de prueba y reconstrucción íntegra de la factura mediante consulta `INNER JOIN`.

### 📙 Bloque 3: Aplicación a Proyectos Propios y Rúbrica Zajuna (Slides 19 a 20)
* **Slide 19:** Adaptación del ejercicio a los proyectos formativos individuales de los aprendices con ejemplos por sector:
  * *Veterinaria / Salud Animal:* Consulta médica, propietario, mascota, veterinario y fármacos.
  * *E-Commerce / Ferretería:* Orden de compra, cliente, producto, categoría y renglones de detalle.
  * *Taller Mecánico / Mantenimiento:* Orden de servicio, vehículo, mecánico y repuestos.
  * *Restaurante / Bar:* Comanda de mesa, mesero, platos y bebidas.
* **Slide 20:** Estructura obligatoria del documento PDF entregable (portada institucional, planteamiento del problema, análisis de anomalías, normalización 1FN a 3FN, diccionario de datos, diagrama EER y script SQL) y lista de chequeo de calificación en **Zajuna LMS**.

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
