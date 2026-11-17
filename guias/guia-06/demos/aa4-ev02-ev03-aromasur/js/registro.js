/* ==========================================================================
   REGISTRO · RF02 (crear cuenta) y RF04 (aceptar tratamiento de datos)
   ========================================================================== */

const formularioRegistro = document.querySelector('#form-registro');
const botonCrear = formularioRegistro.querySelector('button[type="submit"]');

Validacion.conectar(formularioRegistro, (datos) => {
  AromaUI.cargando(botonCrear, true, 'Creando cuenta…');

  setTimeout(() => {
    AromaUI.cargando(botonCrear, false);
    AromaUI.toast(`¡Listo, ${datos.nombre.split(' ')[0]}! Tu cuenta fue creada. Ahora inicia sesión.`, 'exito');
    formularioRegistro.reset();
    setTimeout(() => { window.location.href = 'index.html'; }, 1800);
  }, 900);
});
