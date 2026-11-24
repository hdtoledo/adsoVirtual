# Demo AA1-EV02 · Estándares de codificación en JavaScript (AromaSur Café)

Ejemplo mínimo y ejecutable en **Node.js (JavaScript ES Modules)** que aplica el estándar explicado en la sesión [proyeccion-evidencia-02.html](../../proyeccion-evidencia-02.html) para la evidencia `GA7-220501096-AA1-EV02`, alineado con el stack del proyecto: **Bases de datos relacionales (MySQL / PostgreSQL) + Node.js + Express + React**.

## Estructura

```text
aa1-ev02-estandares/
├── .editorconfig
├── package.json
└── src/
    ├── app.js                     # Punto de entrada ejecutable con Node.js
    ├── modelo/
    │   ├── estado-pedido.js       # Constantes congeladas (UPPER_SNAKE_CASE)
    │   ├── pedido.js              # Clase Pedido con campos privados (#) y guard clauses
    │   └── producto.js            # Clase Producto con encapsulamiento y JSDoc
    ├── repositorios/
    │   └── productos.repo.js      # Única capa con SQL (consultas parametrizadas)
    ├── controladores/
    │   └── productos.controller.js # Valida entrada, delega y responde 400/404/200
    └── rutas/
        └── productos.routes.js    # Router Express: solo declara endpoints
```

Las capas siguen la cadena de la sesión: **rutas → controladores → (servicios) → repositorios**. La capa de servicios se incorpora en AA2, cuando aparecen reglas que combinan varios repositorios.

`app.js` solo ejercita el modelo de dominio, así que la demo corre sin dependencias. La capa HTTP (`rutas/`, `controladores/`, `repositorios/`) es código de referencia: para montarla se necesita `npm install express mysql2` y un pool de conexiones, lo que se hace en AA2/AA5.

## Cómo ejecutar en PowerShell (Windows)

Requiere Node.js 22 o superior; se recomienda Node.js 24 LTS (`node -v`). No necesita `npm install`. Desde esta carpeta:

```powershell
node src/app.js
```

### Salida esperada

```text
Pedido: PED-2026-001
Estado: CONFIRMADO
Total: $ 308.000
Stock restante: 4
¿Stock bajo?: true
```

`Intl.NumberFormat('es-CO')` separa `$` y la cifra con un espacio duro (` `); tenlo en cuenta si comparas la salida en una prueba.
