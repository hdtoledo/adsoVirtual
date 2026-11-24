/**
 * Café del catálogo mayorista de AromaSur.
 *
 * Encapsula sus datos con campos privados (#) y solo permite cambiar el stock
 * a través de {@link Producto#descontarStock}.
 */
export class Producto {
  // 1. Constantes de clase (UPPER_SNAKE_CASE)
  static STOCK_MINIMO = 5;

  // 2. Campos privados (encapsulamiento real en ES2022+)
  #codigo;
  #nombre;
  #precioCop;
  #cantidadDisponible;

  // 3. Constructor con validaciones tempranas (guard clauses)
  constructor({ codigo, nombre, precioCop, cantidadDisponible }) {
    if (typeof codigo !== 'string' || !codigo.trim()) {
      throw new TypeError('El código del producto es obligatorio');
    }
    if (typeof nombre !== 'string' || !nombre.trim()) {
      throw new TypeError('El nombre del producto es obligatorio');
    }
    if (!Number.isInteger(precioCop) || precioCop <= 0) {
      throw new RangeError('El precio en COP debe ser un entero mayor que cero');
    }
    if (!Number.isInteger(cantidadDisponible) || cantidadDisponible < 0) {
      throw new RangeError('El stock inicial debe ser un entero mayor o igual a cero');
    }

    this.#codigo = codigo.trim();
    this.#nombre = nombre.trim();
    this.#precioCop = precioCop;
    this.#cantidadDisponible = cantidadDisponible;
  }

  // 4. Métodos públicos de negocio (verbos en camelCase)
  /**
   * Comprueba si hay unidades disponibles para atender una solicitud.
   * @param {number} cantidadSolicitada - Unidades requeridas (entero > 0)
   * @returns {boolean}
   */
  tieneStock(cantidadSolicitada) {
    return Number.isInteger(cantidadSolicitada)
      && cantidadSolicitada > 0
      && this.#cantidadDisponible >= cantidadSolicitada;
  }

  /**
   * Indica si el inventario llegó al umbral de reposición.
   * @returns {boolean}
   */
  esStockBajo() {
    return this.#cantidadDisponible <= Producto.STOCK_MINIMO;
  }

  /**
   * Descuenta unidades del inventario tras validar cantidad y disponibilidad.
   * @param {number} cantidad - Unidades a descontar
   * @throws {RangeError} Si la cantidad no es un entero positivo
   * @throws {Error} Si no hay stock suficiente
   */
  descontarStock(cantidad) {
    this.#validarCantidad(cantidad);
    if (!this.tieneStock(cantidad)) {
      throw new Error(`Stock insuficiente para el producto ${this.#codigo}`);
    }
    this.#cantidadDisponible -= cantidad;
  }

  // 5. Getters de solo lectura (sin setters públicos)
  get codigo() {
    return this.#codigo;
  }

  get nombre() {
    return this.#nombre;
  }

  get precioCop() {
    return this.#precioCop;
  }

  get cantidadDisponible() {
    return this.#cantidadDisponible;
  }

  // 6. Métodos privados al final
  #validarCantidad(cantidad) {
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new RangeError('La cantidad debe ser un entero mayor que cero');
    }
  }
}
