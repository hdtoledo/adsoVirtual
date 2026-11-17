/* ==========================================================================
   AromaSur Café · Comportamiento de la página
   Se carga con `defer`: el navegador ejecuta este archivo cuando el HTML ya
   está construido, así que todos los elementos existen en el DOM.

   1. Menú móvil (abrir / cerrar)
   2. Modo oscuro (con memoria en localStorage)
   3. Validación del formulario del boletín
   4. Año actual en el pie de página
   ========================================================================== */

/* 1. MENÚ MÓVIL ------------------------------------------------------------ */
const encabezado = document.querySelector('.encabezado');
const botonMenu = document.querySelector('.menu-toggle');
const textoMenu = botonMenu.querySelector('.solo-lectores');

function cambiarMenu(abrir) {
  encabezado.dataset.menu = abrir ? 'abierto' : 'cerrado'; // el CSS reacciona a este atributo
  botonMenu.setAttribute('aria-expanded', String(abrir));   // informa el estado al lector de pantalla
  textoMenu.textContent = abrir ? 'Cerrar menú' : 'Abrir menú';
}

botonMenu.addEventListener('click', () => {
  const estaAbierto = botonMenu.getAttribute('aria-expanded') === 'true';
  cambiarMenu(!estaAbierto);
});

// Al elegir un enlace del menú, este se cierra
document.querySelectorAll('.navegacion__lista a').forEach((enlace) => {
  enlace.addEventListener('click', () => cambiarMenu(false));
});

// La tecla Escape también cierra el menú y devuelve el foco al botón
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape' && encabezado.dataset.menu === 'abierto') {
    cambiarMenu(false);
    botonMenu.focus();
  }
});

/* 2. MODO OSCURO ----------------------------------------------------------- */
const raiz = document.documentElement;
const botonTema = document.querySelector('.tema-toggle');
const textoTema = botonTema.querySelector('.solo-lectores');

function aplicarTema(tema) {
  raiz.dataset.theme = tema;                         // activa las variables de [data-theme="dark"]
  const oscuro = tema === 'dark';
  botonTema.setAttribute('aria-pressed', String(oscuro));
  textoTema.textContent = oscuro ? 'Desactivar modo oscuro' : 'Activar modo oscuro';
}

aplicarTema(raiz.dataset.theme || 'light'); // sincroniza el botón con el tema aplicado en <head>

botonTema.addEventListener('click', () => {
  const nuevoTema = raiz.dataset.theme === 'dark' ? 'light' : 'dark';
  aplicarTema(nuevoTema);
  try {
    localStorage.setItem('tema', nuevoTema); // se recuerda en la próxima visita
  } catch (error) {
    // Navegación privada o almacenamiento bloqueado: el tema solo dura esta visita
  }
});

/* 3. VALIDACIÓN DEL FORMULARIO -------------------------------------------- */
const formulario = document.querySelector('#form-boletin');
const correo = document.querySelector('#correo');
const errorCorreo = document.querySelector('#correo-error');
const estado = formulario.querySelector('.formulario__estado');

formulario.noValidate = true; // usamos mensajes propios en lugar de las burbujas del navegador

function validarCorreo() {
  let mensaje = '';
  if (correo.validity.valueMissing) {
    mensaje = 'Escribe tu correo electrónico.';
  } else if (correo.validity.typeMismatch) {
    mensaje = 'El correo debe tener el formato nombre@dominio.com.';
  }
  errorCorreo.textContent = mensaje;
  correo.setAttribute('aria-invalid', String(mensaje !== ''));
  return mensaje === '';
}

correo.addEventListener('blur', validarCorreo); // valida al salir del campo

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault(); // evita recargar la página: no hay servidor en esta demo
  estado.textContent = '';

  if (!validarCorreo()) {
    correo.focus(); // lleva al usuario directo al campo con error
    return;
  }

  const metodo = formulario.metodo.selectedOptions[0].textContent;
  estado.textContent = `¡Listo! Te enviaremos recetas de ${metodo}.`;
  formulario.reset();
});

/* 4. AÑO ACTUAL ------------------------------------------------------------ */
document.querySelector('#anio').textContent = new Date().getFullYear();
