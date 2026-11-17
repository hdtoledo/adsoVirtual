/* ==========================================================================
   LOGIN · RF01 (iniciar sesión) y RF03 (enlace a Registro en el HTML)
   Esta demo no tiene servidor: simula la respuesta y navega al catálogo.
   En el proyecto real aquí se llama a la API (fetch) y el SERVIDOR valida
   las credenciales; nunca se guardan contraseñas en el navegador.
   ========================================================================== */

const formularioLogin = document.querySelector('#form-login');
const botonIngresar = formularioLogin.querySelector('button[type="submit"]');

Validacion.conectar(formularioLogin, (datos) => {
  AromaUI.cargando(botonIngresar, true, 'Ingresando…');

  // Simulación de la petición al servidor (800 ms)
  setTimeout(() => {
    try {
      sessionStorage.setItem('aromasur:correo', datos.correo); // solo el correo, para saludar
    } catch (error) {
      // Almacenamiento bloqueado: la demo continúa sin el saludo
    }
    window.location.href = 'catalogo.html';
  }, 800);
});

document.querySelector('#olvido-clave').addEventListener('click', () => {
  AromaUI.toast('La recuperación de contraseña llega en la próxima versión.');
});
