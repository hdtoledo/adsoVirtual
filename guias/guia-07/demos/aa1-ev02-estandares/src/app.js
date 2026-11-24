import { Pedido } from './modelo/pedido.js';
import { Producto } from './modelo/producto.js';

const formatoCop = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

function ejecutarDemostracion() {
  const cafeHuila = new Producto({
    codigo: 'CAF-HUI-500',
    nombre: 'Café Especial Garzón 500 g',
    precioCop: 38500,
    cantidadDisponible: 12,
  });

  const pedido = new Pedido({
    numeroPedido: 'PED-2026-001',
    clienteNit: '901234567-8',
  });

  pedido.agregarProducto(cafeHuila, 8);
  pedido.confirmar();

  console.log(`Pedido: ${pedido.numeroPedido}`);
  console.log(`Estado: ${pedido.estado}`);
  console.log(`Total: ${formatoCop.format(pedido.calcularTotalCop())}`);
  console.log(`Stock restante: ${cafeHuila.cantidadDisponible}`);
  console.log(`¿Stock bajo?: ${cafeHuila.esStockBajo()}`);
}

ejecutarDemostracion();
