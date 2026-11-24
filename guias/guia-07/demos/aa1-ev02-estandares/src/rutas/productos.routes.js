/**
 * Capa de rutas: solo declara endpoints REST (plural, kebab-case, versionados)
 * y los enlaza con el controlador. No contiene lógica ni SQL.
 *
 * Se montará en AA2/AA5 así: app.use('/api/v1/productos', crearProductosRouter(controlador));
 * Requiere `npm install express`; app.js no la importa para que la demo corra sin dependencias.
 */
import { Router } from 'express';

/**
 * @param {ReturnType<import('../controladores/productos.controller.js').crearProductosController>} controlador
 */
export function crearProductosRouter(controlador) {
  const router = Router();
  router.get('/:codigo', controlador.obtenerPorCodigo);
  return router;
}
