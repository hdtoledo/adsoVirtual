/**
 * Configuración compartida de Tailwind (Play CDN) · Identidad SENA
 * Se carga inmediatamente después de https://cdn.tailwindcss.com en todas las páginas.
 *
 * Unifica las dos convenciones que existían en el repositorio:
 *   - sena-green / sena-navy …  (portal y evidencias 01–03)
 *   - sena / sena-hover / cadph …  (evidencias 04–09)
 */
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sena: {
          DEFAULT: '#39A900',
          hover: '#2D8200',
          light: '#E8F5E9',
          green: '#39A900',
          'green-hover': '#2D8200',
          navy: '#00324D',
          'navy-dark': '#00263A',
          'navy-light': '#004164',
        },
        cadph: {
          DEFAULT: '#00324D',
          dark: '#00263A',
          light: '#004870',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
};
