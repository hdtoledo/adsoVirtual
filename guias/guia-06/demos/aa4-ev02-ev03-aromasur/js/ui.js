/* ==========================================================================
   UI · comportamientos de los componentes compartidos por todas las páginas
   - AromaUI.toast(mensaje, tipo)   → notificación flotante accesible
   - Botones "mostrar contraseña"   → se activan solos con [data-mostrar-clave]
   Se usa un objeto global (AromaUI) en lugar de módulos ES para que la demo
   funcione también abriendo el archivo con doble clic (protocolo file://).
   ========================================================================== */

const AromaUI = (function () {
  /* ---------- Toast ---------- */
  let region = null;

  function obtenerRegion() {
    if (!region) {
      region = document.createElement('div');
      region.className = 'toast-region';
      region.setAttribute('role', 'status');      // los lectores de pantalla anuncian cada mensaje
      region.setAttribute('aria-live', 'polite');
      document.body.append(region);
    }
    return region;
  }

  /**
   * Muestra una notificación que desaparece sola.
   * @param {string} mensaje  Texto a mostrar (se inserta como texto, nunca como HTML)
   * @param {'info'|'exito'|'error'} tipo
   */
  function toast(mensaje, tipo = 'info') {
    const aviso = document.createElement('div');
    aviso.className = `toast toast--${tipo}`;
    aviso.textContent = mensaje;                  // textContent evita inyección de HTML (XSS)
    obtenerRegion().append(aviso);

    setTimeout(() => {
      aviso.dataset.saliendo = '';
      setTimeout(() => aviso.remove(), 200);
    }, 3500);
  }

  /* ---------- Mostrar / ocultar contraseña ---------- */
  function activarMostrarClave() {
    document.querySelectorAll('[data-mostrar-clave]').forEach((boton) => {
      const campo = document.getElementById(boton.getAttribute('aria-controls'));
      boton.addEventListener('click', () => {
        const visible = campo.type === 'text';
        campo.type = visible ? 'password' : 'text';
        boton.setAttribute('aria-pressed', String(!visible));
        boton.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña');
      });
    });
  }

  /* ---------- Estado de carga de un botón ---------- */
  function cargando(boton, activo, texto) {
    if (activo) {
      boton.dataset.textoOriginal = boton.textContent.trim();
      boton.textContent = texto;
    } else if (boton.dataset.textoOriginal) {
      boton.textContent = boton.dataset.textoOriginal;
    }
    boton.disabled = activo;
    boton.setAttribute('aria-busy', String(activo));
  }

  document.addEventListener('DOMContentLoaded', activarMostrarClave);

  return { toast, cargando };
})();
