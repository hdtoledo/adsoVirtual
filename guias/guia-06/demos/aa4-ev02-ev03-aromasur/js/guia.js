/* ==========================================================================
   GUÍA DE COMPONENTES · ejemplos interactivos de diálogo y toast
   ========================================================================== */

const MENSAJES_DEMO = {
  exito: 'Huila Supremo agregado al pedido.',
  error: 'Revisa los campos marcados en rojo.',
  info: 'La recuperación de contraseña llega en la próxima versión.',
};

document.querySelectorAll('[data-demo-toast]').forEach((boton) => {
  boton.addEventListener('click', () => {
    const tipo = boton.dataset.demoToast;
    AromaUI.toast(MENSAJES_DEMO[tipo], tipo);
  });
});

const dialogoDemo = document.querySelector('#dialogo-demo');

document.querySelector('[data-demo-dialogo]').addEventListener('click', () => dialogoDemo.showModal());

dialogoDemo.querySelectorAll('[data-cerrar-dialogo]').forEach((boton) =>
  boton.addEventListener('click', () => dialogoDemo.close()));
