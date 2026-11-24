import { ESTADOS_PEDIDO } from './estado-pedido.js';
import { Producto } from './producto.js';

/**
 * Pedido mayorista realizado por una cafetería o tienda aliada.
 *
 * Mientras está PENDIENTE solo se verifica disponibilidad; el inventario se
 * descuenta al confirmar, para que un pedido abandonado no deje stock perdido.
 * Despacho y cancelación se modelan en AA2 junto con la persistencia.
 */
export class Pedido {
  #numeroPedido;
  #clienteNit;
  #lineas;
  #estado;

  constructor({ numeroPedido, clienteNit }) {
    if (typeof numeroPedido !== 'string' || !numeroPedido.trim()) {
      throw new TypeError('El número de pedido es obligatorio');
    }
    if (typeof clienteNit !== 'string' || !clienteNit.trim()) {
      throw new TypeError('El NIT del cliente es obligatorio');
    }
    this.#numeroPedido = numeroPedido.trim();
    this.#clienteNit = clienteNit.trim();
    this.#lineas = [];
    this.#estado = ESTADOS_PEDIDO.PENDIENTE;
  }

  /**
   * Agrega un producto al pedido sin tocar todavía el inventario.
   * @param {Producto} producto
   * @param {number} cantidad - Unidades (entero > 0)
   * @throws {TypeError} Si producto no es una instancia de Producto
   * @throws {Error} Si el pedido no está pendiente o no hay stock suficiente
   */
  agregarProducto(producto, cantidad) {
    if (!(producto instanceof Producto)) {
      throw new TypeError('Se requiere una instancia válida de Producto');
    }
    this.#validarPendiente();
    const cantidadAcumulada = this.#cantidadDe(producto) + cantidad;
    if (!producto.tieneStock(cantidad) || !producto.tieneStock(cantidadAcumulada)) {
      throw new Error(`Stock insuficiente para el producto ${producto.codigo}`);
    }
    this.#lineas.push({ producto, cantidad, precioCop: producto.precioCop });
  }

  /**
   * Confirma el pedido y descuenta el inventario de todas sus líneas.
   * @throws {Error} Si el pedido está vacío o ya no está pendiente
   */
  confirmar() {
    this.#validarPendiente();
    if (this.#lineas.length === 0) {
      throw new Error('No se puede confirmar un pedido sin productos');
    }
    this.#lineas.forEach(({ producto, cantidad }) => producto.descontarStock(cantidad));
    this.#estado = ESTADOS_PEDIDO.CONFIRMADO;
  }

  calcularTotalCop() {
    return this.#lineas.reduce((acumulado, linea) => acumulado + linea.precioCop * linea.cantidad, 0);
  }

  get numeroPedido() {
    return this.#numeroPedido;
  }

  get clienteNit() {
    return this.#clienteNit;
  }

  get estado() {
    return this.#estado;
  }

  get items() {
    return Object.freeze(this.#lineas.map(({ producto, cantidad, precioCop }) => Object.freeze({
      codigoProducto: producto.codigo,
      nombreProducto: producto.nombre,
      precioCop,
      cantidad,
      subtotalCop: precioCop * cantidad,
    })));
  }

  #validarPendiente() {
    if (this.#estado !== ESTADOS_PEDIDO.PENDIENTE) {
      throw new Error('El pedido ya no está pendiente');
    }
  }

  #cantidadDe(producto) {
    return this.#lineas
      .filter((linea) => linea.producto === producto)
      .reduce((total, linea) => total + linea.cantidad, 0);
  }
}
