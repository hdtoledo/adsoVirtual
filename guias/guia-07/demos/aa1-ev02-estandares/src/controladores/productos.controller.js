/**
 * Capa de controlador: traduce HTTP a llamadas de negocio y de vuelta a HTTP.
 *
 * Valida la entrada, delega en el repositorio y nunca expone error.stack ni
 * error.message al cliente: los errores inesperados pasan a next(error) para
 * que el middleware de errores responda un 500 genérico.
 */

const PATRON_CODIGO_PRODUCTO = /^[A-Z]{3}-[A-Z]{3}-\d{3}$/;

/**
 * @param {{ productosRepo: ReturnType<import('../repositorios/productos.repo.js').crearProductosRepo> }} dependencias
 */
export function crearProductosController({ productosRepo }) {
  return {
    async obtenerPorCodigo(req, res, next) {
      try {
        const codigo = String(req.params.codigo ?? '').trim().toUpperCase();
        if (!PATRON_CODIGO_PRODUCTO.test(codigo)) {
          return res.status(400).json({ mensaje: 'El código de producto no es válido' });
        }

        const producto = await productosRepo.buscarPorCodigo(codigo);
        if (!producto) {
          return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        return res.status(200).json({ datos: producto });
      } catch (error) {
        return next(error);
      }
    },
  };
}
