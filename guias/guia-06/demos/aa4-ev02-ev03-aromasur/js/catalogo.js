/* ==========================================================================
   CATÁLOGO · RF05 (consultar y filtrar cafés), RF06 (armar el pedido) y
   RF07 (confirmar el pedido)
   1. Datos      → en el proyecto real llegan de la API con fetch()
   2. Render     → crea las tarjetas a partir de la plantilla <template>
   3. Filtros    → perfil (chips) + búsqueda por texto
   4. Pedido     → contador, diálogo de resumen y confirmación
   ========================================================================== */

/* 1. DATOS ---------------------------------------------------------------- */
const PRODUCTOS = [
  { id: 'huila-supremo', nombre: 'Huila Supremo', origen: 'Pitalito, Huila', notas: 'Caramelo, panela y cítricos', perfil: 'balanceado', precio: 145000 },
  { id: 'garzon-floral', nombre: 'Garzón Floral', origen: 'Garzón, Huila', notas: 'Jazmín, durazno y miel', perfil: 'suave', precio: 162000 },
  { id: 'acevedo-intenso', nombre: 'Acevedo Intenso', origen: 'Acevedo, Huila', notas: 'Chocolate amargo y nuez', perfil: 'intenso', precio: 138000 },
  { id: 'la-plata-honey', nombre: 'La Plata Honey', origen: 'La Plata, Huila', notas: 'Miel y frutos rojos', perfil: 'suave', precio: 175000 },
  { id: 'tarqui-clasico', nombre: 'Tarqui Clásico', origen: 'Tarqui, Huila', notas: 'Cacao y avellana', perfil: 'balanceado', precio: 132000 },
  { id: 'espresso-casa', nombre: 'Espresso de la Casa', origen: 'Mezcla del Huila', notas: 'Chocolate y caramelo tostado', perfil: 'intenso', precio: 128000 },
];

const PERFILES = { suave: 'Suave', balanceado: 'Balanceado', intenso: 'Intenso' };
const pesos = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

/* Estado de la pantalla: una sola fuente de verdad */
const estado = {
  perfil: 'todos',
  busqueda: '',
  pedido: new Map(), // id del producto → cantidad
};

/* 2. RENDER --------------------------------------------------------------- */
const rejilla = document.querySelector('#rejilla-productos');
const plantilla = document.querySelector('#plantilla-producto');
const resultado = document.querySelector('#resultado-filtro');

function crearTarjeta(producto) {
  const tarjeta = plantilla.content.cloneNode(true); // copia del <template> definido en el HTML
  const img = tarjeta.querySelector('img');
  img.src = `img/bolsa-${producto.perfil}.svg`;
  img.alt = `Bolsa de café ${producto.nombre}`;
  tarjeta.querySelector('.tarjeta-producto__titulo').textContent = producto.nombre;
  tarjeta.querySelector('.tarjeta-producto__origen').textContent = producto.origen;
  tarjeta.querySelector('.tarjeta-producto__notas').textContent = producto.notas;

  const insignia = tarjeta.querySelector('.insignia');
  insignia.textContent = PERFILES[producto.perfil];
  insignia.classList.add(`insignia--${producto.perfil}`);

  tarjeta.querySelector('[data-precio]').textContent = pesos.format(producto.precio);
  const boton = tarjeta.querySelector('[data-agregar]');
  boton.dataset.agregar = producto.id;
  boton.setAttribute('aria-label', `Agregar ${producto.nombre} al pedido`);
  return tarjeta;
}

function normalizar(texto) {
  // Quita tildes y mayúsculas: "garzon" encuentra "Garzón"
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function productosVisibles() {
  const termino = normalizar(estado.busqueda.trim());
  return PRODUCTOS.filter((p) =>
    (estado.perfil === 'todos' || p.perfil === estado.perfil) &&
    normalizar(`${p.nombre} ${p.origen} ${p.notas}`).includes(termino));
}

function renderizarCatalogo() {
  const lista = productosVisibles();
  rejilla.replaceChildren(...lista.map(crearTarjeta));
  document.querySelector('#sin-resultados').hidden = lista.length > 0;
  resultado.textContent = `${lista.length} ${lista.length === 1 ? 'café encontrado' : 'cafés encontrados'}`;
}

/* 3. FILTROS -------------------------------------------------------------- */
document.querySelector('#filtro-perfil').addEventListener('change', (evento) => {
  estado.perfil = evento.target.value;
  renderizarCatalogo();
});

document.querySelector('#buscar').addEventListener('input', (evento) => {
  estado.busqueda = evento.target.value;
  renderizarCatalogo();
});

/* 4. PEDIDO --------------------------------------------------------------- */
const contador = document.querySelector('#contador-pedido');
const dialogo = document.querySelector('#dialogo-pedido');
const listaPedido = document.querySelector('#lista-pedido');
const totalPedido = document.querySelector('#total-pedido');
const botonConfirmar = document.querySelector('#confirmar-pedido');

function totalUnidades() {
  let total = 0;
  estado.pedido.forEach((cantidad) => { total += cantidad; });
  return total;
}

function actualizarContador() {
  const unidades = totalUnidades();
  contador.textContent = unidades;
  contador.hidden = unidades === 0;
  document.querySelector('#abrir-pedido').setAttribute('aria-label', `Ver pedido: ${unidades} ${unidades === 1 ? 'bolsa' : 'bolsas'}`);
}

// Delegación de eventos: un solo listener para todos los botones "Agregar"
rejilla.addEventListener('click', (evento) => {
  const boton = evento.target.closest('[data-agregar]');
  if (!boton) return;
  const producto = PRODUCTOS.find((p) => p.id === boton.dataset.agregar);
  estado.pedido.set(producto.id, (estado.pedido.get(producto.id) || 0) + 1);
  actualizarContador();
  AromaUI.toast(`${producto.nombre} agregado al pedido.`, 'exito');
});

function renderizarPedido() {
  const filas = [];
  let total = 0;
  estado.pedido.forEach((cantidad, id) => {
    const producto = PRODUCTOS.find((p) => p.id === id);
    const subtotal = producto.precio * cantidad;
    total += subtotal;
    const li = document.createElement('li');
    const nombre = document.createElement('span');
    nombre.textContent = `${cantidad} × ${producto.nombre}`;
    const valor = document.createElement('span');
    valor.textContent = pesos.format(subtotal);
    li.append(nombre, valor);
    filas.push(li);
  });
  listaPedido.replaceChildren(...filas);
  document.querySelector('#pedido-vacio').hidden = filas.length > 0;
  totalPedido.textContent = pesos.format(total);
  botonConfirmar.disabled = filas.length === 0;
}

document.querySelector('#abrir-pedido').addEventListener('click', () => {
  renderizarPedido();
  dialogo.showModal();                           // modal nativo: atrapa el foco y se cierra con Esc
});

dialogo.querySelectorAll('[data-cerrar-dialogo]').forEach((boton) =>
  boton.addEventListener('click', () => dialogo.close()));

botonConfirmar.addEventListener('click', () => {
  AromaUI.cargando(botonConfirmar, true, 'Enviando…');
  setTimeout(() => {
    AromaUI.cargando(botonConfirmar, false);
    dialogo.close();
    estado.pedido.clear();
    actualizarContador();
    AromaUI.toast('Pedido enviado. Tu asesor lo confirmará por correo.', 'exito');
  }, 900);
});

/* INICIO ------------------------------------------------------------------ */
try {
  const correo = sessionStorage.getItem('aromasur:correo');
  if (correo) document.querySelector('#saludo').textContent = `Sesión iniciada como ${correo}.`;
} catch (error) {
  // Sin almacenamiento disponible: se mantiene el texto por defecto
}

renderizarCatalogo();
actualizarContador();
