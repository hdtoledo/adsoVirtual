/**
 * Ciclo de vida de un pedido mayorista en AromaSur Café.
 *
 * Las constantes globales y sus valores se declaran en UPPER_SNAKE_CASE
 * y se congelan con Object.freeze para impedir mutaciones accidentales.
 */
export const ESTADOS_PEDIDO = Object.freeze({
  PENDIENTE: 'PENDIENTE',
  CONFIRMADO: 'CONFIRMADO',
  DESPACHADO: 'DESPACHADO',
  CANCELADO: 'CANCELADO',
});
