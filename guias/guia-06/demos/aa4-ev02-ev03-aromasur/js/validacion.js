/* ==========================================================================
   VALIDACIÓN · reutilizable por cualquier formulario del proyecto
   Cada campo declara sus reglas en el HTML (required, type, pattern,
   minlength) y sus mensajes en atributos data-msg-*. Este archivo solo
   lee la API validity del navegador y muestra el mensaje correspondiente.

   Uso:  Validacion.conectar(formulario, (datos) => { ... })
   ========================================================================== */

const Validacion = (function () {
  // Relación entre el estado de validity y el atributo con el mensaje
  const MENSAJES = [
    ['valueMissing', 'msgRequerido', 'Este campo es obligatorio.'],
    ['typeMismatch', 'msgFormato', 'El formato no es válido.'],
    ['patternMismatch', 'msgFormato', 'El formato no es válido.'],
    ['tooShort', 'msgCorto', 'El texto es demasiado corto.'],
  ];

  /** Valida un campo, muestra u oculta su error y devuelve true si es válido. */
  function validarCampo(campo) {
    let mensaje = '';
    for (const [estado, atributo, porDefecto] of MENSAJES) {
      if (campo.validity[estado]) {
        mensaje = campo.dataset[atributo] || porDefecto;
        break;
      }
    }

    const error = document.getElementById(`${campo.id}-error`);
    if (error) error.textContent = mensaje;
    campo.setAttribute('aria-invalid', String(mensaje !== ''));
    return mensaje === '';
  }

  /** Conecta un formulario: valida al salir de cada campo y al enviar. */
  function conectar(formulario, alEnviarValido) {
    formulario.noValidate = true;                // mensajes propios en lugar de las burbujas del navegador
    const campos = [...formulario.querySelectorAll('input, select')];

    campos.forEach((campo) => {
      campo.addEventListener('blur', () => validarCampo(campo));
      // Si el campo ya mostraba error, se corrige en vivo mientras el usuario escribe
      campo.addEventListener('input', () => {
        if (campo.getAttribute('aria-invalid') === 'true') validarCampo(campo);
      });
    });

    formulario.addEventListener('submit', (evento) => {
      evento.preventDefault();
      const invalidos = campos.filter((campo) => !validarCampo(campo));

      if (invalidos.length > 0) {
        invalidos[0].focus();                    // lleva al usuario al primer error
        AromaUI.toast('Revisa los campos marcados en rojo.', 'error');
        return;
      }

      alEnviarValido(Object.fromEntries(new FormData(formulario)));
    });
  }

  return { conectar, validarCampo };
})();
