/**
 * Capa de repositorio: única capa que conoce SQL.
 *
 * Las consultas usan parámetros (?) para evitar inyección SQL; nunca se
 * concatenan valores recibidos del cliente dentro del texto de la consulta.
 */

const CONSULTA_PRODUCTO_POR_CODIGO = `
  SELECT id, codigo, nombre, precio_cop, cantidad_disponible
  FROM productos
  WHERE codigo = ?
  LIMIT 1
`;

/**
 * Crea el repositorio de productos sobre un pool de conexiones.
 * @param {{ execute: Function }} pool - Pool de mysql2/promise (o compatible)
 */
export function crearProductosRepo(pool) {
  return {
    /**
     * Busca un producto por su código.
     * @param {string} codigo - Código del café (ej. CAF-HUI-500)
     * @returns {Promise<object | null>} Fila con claves en camelCase o null
     */
    async buscarPorCodigo(codigo) {
      const [filas] = await pool.execute(CONSULTA_PRODUCTO_POR_CODIGO, [codigo]);
      const fila = filas[0];
      if (!fila) {
        return null;
      }
      return {
        id: fila.id,
        codigo: fila.codigo,
        nombre: fila.nombre,
        precioCop: fila.precio_cop,
        cantidadDisponible: fila.cantidad_disponible,
      };
    },
  };
}
