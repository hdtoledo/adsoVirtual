/**
 * Motor de Presentaciones ADSO Virtual · v2
 * ---------------------------------------------------------------------------
 * Un único motor para todas las sesiones proyectadas. Cada presentación solo
 * contiene sus diapositivas (<section class="slide-content">) dentro de <main>
 * y dos marcadores (<div data-presenter="top|bottom">). El motor:
 *   - Genera la interfaz común: cintillo, barra de control con progreso,
 *     índice lateral, ayuda de atajos y barra inferior de contexto.
 *   - Toma título, guía, actividad y sesiones vecinas desde catalogo.js
 *     (body[data-evidencia] o body[data-guia] para la sesión general).
 *   - Navegación por teclado, gestos táctiles, enlace profundo (#slide-N),
 *     cronómetro / cuenta regresiva y copiado de bloques de código.
 *
 * API pública (compatible con los onclick existentes en las diapositivas):
 *   presenter.nextSlide() · presenter.prevSlide() · presenter.goToSlide(i)
 *   presenter.toggleMenu() · presenter.toggleHelpModal() · goToSlide(i)
 *   (i es 0-based)
 */
(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Utilidades
  // ---------------------------------------------------------------------------
  const scriptSrc = document.currentScript ? document.currentScript.src : window.location.href;
  const ROOT = new URL('../../', scriptSrc); // assets/js/ → raíz del repositorio
  const rootUrl = (path) => new URL(path, ROOT).href;

  const esc = (value) =>
    String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
  };

  const isTypingTarget = (el) =>
    !!el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));

  const pad = (n) => String(n).padStart(2, '0');

  // ---------------------------------------------------------------------------
  // Contexto de la sesión a partir del catálogo
  // ---------------------------------------------------------------------------
  function resolveContext() {
    const catalog = window.ADSO_CATALOGO || null;
    const evId = document.body.dataset.evidencia || null;
    const guiaId = document.body.dataset.guia || null;
    const fallbackTitle = document.title.split('·')[0].split('|')[0].trim();

    if (!catalog) {
      return { title: fallbackTitle, guiaName: '', code: '', activityId: '', category: null, prev: null, next: null };
    }

    // data-evidencia admite varias evidencias que comparten una misma sesión: "ev-09 ev-10"
    const evs = (evId || '').split(/\s+/).filter(Boolean)
      .map((id) => catalog.evidencias.find((e) => e.id === id))
      .filter(Boolean);
    const ev = evs[0] || null;
    const guia = catalog.guias.find((g) => g.id === (ev ? ev.guia : guiaId)) || null;
    const shortCode = (code) => code.split('-').slice(-2).join('-'); // AA1-EV01

    // Secuencia de sesiones de la guía: sesión general + evidencias con diapositivas.
    // Las evidencias que comparten archivo se agrupan en un solo paso.
    const sequence = [];
    if (guia && guia.generalSession) {
      sequence.push({ keys: [`general:${guia.id}`], label: 'Visión general de la guía', short: 'General', href: guia.generalSession.file });
    }
    catalog.evidencias
      .filter((e) => e.guia === (guia && guia.id) && e.session)
      .forEach((e) => {
        const shared = sequence.find((s) => s.href === e.session.file);
        if (shared) {
          shared.keys.push(e.id);
          shared.short += ` + ${shortCode(e.code).split('-').pop()}`;
          return;
        }
        sequence.push({ keys: [e.id], label: e.session.title || e.title, short: shortCode(e.code), href: e.session.file });
      });

    const currentKey = ev ? ev.id : guia ? `general:${guia.id}` : null;
    const idx = sequence.findIndex((s) => s.keys.includes(currentKey));

    // El título de sesión solo aplica si esta página ES el archivo de la sesión;
    // material complementario de la misma evidencia conserva el título de la evidencia.
    const currentFile = decodeURIComponent(window.location.pathname.split('/').pop() || '');
    const isSessionFile = !!(ev && ev.session && ev.session.file === currentFile);

    return {
      title: ev ? (isSessionFile ? ev.session.title : ev.title) : (guia && guia.generalSession && guia.generalSession.title) || fallbackTitle,
      guiaName: guia ? guia.name : '',
      code: evs.length > 1
        ? [evs[0].code, ...evs.slice(1).map((e) => shortCode(e.code).split('-').pop())].join(' + ')
        : ev ? ev.code : '',
      activityId: [...new Set(evs.map((e) => e.activityId))].join(' · '),
      category: ev && catalog.categorias ? { id: ev.category, ...catalog.categorias[ev.category] } : null,
      prev: idx > 0 ? sequence[idx - 1] : null,
      next: idx >= 0 && idx < sequence.length - 1 ? sequence[idx + 1] : null,
      zajuna: catalog.zajuna,
    };
  }

  // ---------------------------------------------------------------------------
  // Plantillas de la interfaz común
  // ---------------------------------------------------------------------------
  function topTemplate(ctx, total) {
    const breadcrumb = [
      ctx.guiaName && `<span class="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">${esc(ctx.guiaName)}</span>`,
      ctx.activityId && `<span class="hidden md:inline font-mono font-bold text-[#00324D] bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0">${esc(ctx.activityId)}</span>`,
      ctx.category && ctx.category.name && `<span class="hidden xl:inline text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${esc(ctx.category.badge || '')} shrink-0">${esc(ctx.category.name)}</span>`,
      `<span class="text-slate-600 font-medium truncate" title="${esc(ctx.title)}">${esc(ctx.title)}</span>`,
    ].filter(Boolean).join('');

    return `
  <div class="presenter-chrome bg-[#00324D] text-white text-[11px] py-1.5 px-4 sm:px-6 border-b border-[#00263A]">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-3">
      <div class="flex items-center gap-2 truncate">
        <span class="font-extrabold tracking-wide shrink-0">SENA</span>
        <span class="text-slate-400">|</span>
        <span class="text-slate-200 truncate font-medium">Regional Huila • Centro Agroempresarial y Desarrollo Pecuario del Huila (CADPH Garzón)</span>
      </div>
      <div class="hidden sm:flex items-center gap-3 text-slate-300 font-mono text-[11px] shrink-0">
        ${ctx.code ? `<span class="text-slate-200">${esc(ctx.code)}</span><span class="text-slate-400">•</span>` : ''}
        <span class="text-emerald-400 font-semibold">ADSO Virtual • Sesión en Aula</span>
      </div>
    </div>
  </div>

  <header class="presenter-chrome border-b border-slate-200 bg-white sticky top-0 z-40 shadow-xs">
    <div class="w-full bg-slate-100 h-1" role="progressbar" aria-label="Progreso de la presentación" aria-valuemin="1" aria-valuemax="${total}" aria-valuenow="1" id="presentation-progressbar">
      <div id="presentation-progress" class="bg-[#39A900] h-1 transition-[width] duration-300 ease-out motion-reduce:transition-none" style="width:${(100 / total).toFixed(2)}%"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
      <div class="flex items-center gap-3 min-w-0">
        <a href="${rootUrl('index.html')}" class="flex items-center gap-2.5 group shrink-0" title="Volver al portal ADSO">
          <span class="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center p-1 group-hover:bg-emerald-100 transition-colors shrink-0">
            <img src="${rootUrl('assets/logo_green.png')}" alt="Logo SENA" width="28" height="28" class="w-full h-full object-contain">
          </span>
          <span class="hidden min-[420px]:block truncate">
            <span class="font-extrabold text-slate-900 tracking-tight text-sm">FORMACIÓN <span class="text-sena">ADSO</span></span>
            <span class="hidden lg:inline text-[11px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded ml-1 uppercase">CADPH</span>
          </span>
        </a>
        <span class="text-slate-300 hidden sm:inline">/</span>
        <nav aria-label="Ubicación" class="hidden sm:flex items-center gap-2 text-xs min-w-0">${breadcrumb}</nav>
      </div>

      <div class="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        <div class="hidden md:flex items-center gap-1 bg-slate-100 pl-2.5 pr-1 py-1 rounded-lg border border-slate-200 font-mono text-xs text-slate-700" aria-label="Cronómetro de aula">
          <i data-lucide="timer" class="w-3.5 h-3.5 text-slate-500"></i>
          <span id="timer-display" class="font-bold tabular-nums min-w-[2.75rem] text-center" aria-live="off">00:00</span>
          <button type="button" id="btn-timer-start" class="px-1.5 py-0.5 rounded text-emerald-700 hover:bg-white font-bold text-[11px] uppercase transition-colors">Iniciar</button>
          <button type="button" id="btn-timer-reset" class="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-white transition-colors" aria-label="Reiniciar cronómetro"><i data-lucide="rotate-ccw" class="w-3 h-3"></i></button>
          <div class="relative">
            <button type="button" id="btn-timer-presets" class="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-white transition-colors" aria-haspopup="true" aria-expanded="false" aria-label="Cuenta regresiva para actividades"><i data-lucide="chevron-down" class="w-3 h-3"></i></button>
            <div id="timer-presets" class="hidden absolute right-0 top-full mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-50 font-sans">
              <p class="px-2 pt-1 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Cuenta regresiva</p>
              ${[5, 10, 15, 20, 30].map((m) => `<button type="button" data-timer-preset="${m}" class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors">${m} minutos</button>`).join('')}
            </div>
          </div>
        </div>

        <button type="button" id="btn-toggle-menu" class="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors" aria-label="Índice de diapositivas (M)" aria-controls="menu-drawer" aria-expanded="false">
          <i data-lucide="list" class="w-4 h-4"></i>
        </button>

        <div class="px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-mono font-bold text-slate-700 border border-slate-200 tabular-nums">
          <span id="slide-counter" aria-live="polite">1 / ${total}</span>
        </div>

        <div class="flex items-center gap-1">
          <button type="button" id="btn-prev-slide" class="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Diapositiva anterior (←)">
            <i data-lucide="chevron-left" class="w-4 h-4"></i>
          </button>
          <button type="button" id="btn-next-slide" class="p-2 rounded-lg bg-[#39A900] hover:bg-[#2D8200] text-white transition-colors shadow-xs disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Diapositiva siguiente (→ o Espacio)">
            <i data-lucide="chevron-right" class="w-4 h-4"></i>
          </button>
        </div>

        <button type="button" id="btn-fullscreen" class="hidden sm:inline-flex p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors" aria-label="Pantalla completa (F)">
          <i data-lucide="maximize" class="w-4 h-4"></i>
        </button>

        <button type="button" id="btn-toggle-help" class="hidden sm:inline-flex p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors" aria-label="Atajos de teclado (?)" aria-controls="help-modal">
          <i data-lucide="keyboard" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  </header>`;
  }

  function sessionLink(item, direction) {
    if (!item) return '';
    const isPrev = direction === 'prev';
    return `
      <a href="${esc(item.href)}" class="group flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/60 transition-colors ${isPrev ? '' : 'flex-row-reverse text-right'}">
        <i data-lucide="${isPrev ? 'arrow-left' : 'arrow-right'}" class="w-4 h-4 text-slate-400 group-hover:text-emerald-700 transition-colors"></i>
        <span class="min-w-0">
          <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-400">${isPrev ? 'Sesión anterior' : 'Siguiente sesión'} · ${esc(item.short)}</span>
          <span class="block text-xs font-semibold text-slate-700 group-hover:text-emerald-800 truncate">${esc(item.label)}</span>
        </span>
      </a>`;
  }

  function bottomTemplate(ctx, slidesMeta) {
    let lastSection = null;
    const items = slidesMeta.map((s, i) => {
      const header = s.section && s.section !== lastSection
        ? `<p class="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2 ${i === 0 ? 'pt-1' : 'pt-4'} pb-1">${esc(s.section)}</p>`
        : '';
      lastSection = s.section || lastSection;
      return `${header}
        <button type="button" data-slide-index="${i}" class="menu-slide-item w-full text-left px-2.5 py-2 rounded-lg border border-transparent text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-2.5">
          <span class="w-6 shrink-0 font-mono text-[10px] text-slate-400">${pad(i + 1)}</span>
          <span class="truncate">${esc(s.title)}</span>
        </button>`;
    }).join('');

    return `
  <footer class="presenter-chrome border-t border-slate-200 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 min-h-12 py-2 flex items-center justify-between gap-3 text-xs">
      <p class="min-w-0 flex items-center gap-2 text-slate-500">
        <span id="current-slide-section" class="hidden md:inline font-bold uppercase tracking-wider text-[10px] text-slate-400 shrink-0"></span>
        <span id="current-slide-title" class="font-semibold text-slate-700 truncate"></span>
      </p>
      <div class="flex items-center gap-3 shrink-0">
        <span class="hidden lg:inline font-mono text-[11px] text-slate-400">[←][→] navegar · [M] índice · [F] pantalla completa · [?] ayuda</span>
        <a id="next-session-cta" href="${ctx.next ? esc(ctx.next.href) : '#'}" class="hidden items-center gap-1.5 bg-[#39A900] hover:bg-[#2D8200] text-white px-3 py-1.5 rounded-lg font-bold transition-colors">
          <span>Siguiente sesión</span><i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </a>
        <a href="${rootUrl('index.html')}" class="text-emerald-700 font-bold hover:underline">Volver al portal</a>
      </div>
    </div>
  </footer>

  <div id="menu-backdrop" class="presenter-chrome presenter-backdrop fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm" aria-hidden="true"></div>
  <aside id="menu-drawer" class="presenter-chrome presenter-drawer fixed inset-y-0 right-0 z-50 w-[22rem] max-w-[92vw] bg-white border-l border-slate-200 shadow-2xl flex flex-col" role="dialog" aria-modal="true" aria-labelledby="menu-drawer-title" aria-hidden="true" inert>
    <div class="p-4 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-3">
      <div class="min-w-0">
        <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${esc([ctx.guiaName, ctx.code].filter(Boolean).join(' · ') || 'Sesión en aula')}</p>
        <h2 id="menu-drawer-title" class="font-extrabold text-sm text-slate-900 leading-snug line-clamp-2">${esc(ctx.title)}</h2>
        <p class="text-[11px] text-slate-500 mt-0.5">${slidesMeta.length} diapositivas</p>
      </div>
      <button type="button" id="btn-close-menu" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors" aria-label="Cerrar índice">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    </div>
    <nav aria-label="Diapositivas" class="overflow-y-auto flex-1 p-3 space-y-0.5" id="menu-items-list">${items}</nav>
    <div class="p-3 border-t border-slate-200 space-y-2 bg-white">
      ${sessionLink(ctx.prev, 'prev')}
      ${sessionLink(ctx.next, 'next')}
      <div class="grid grid-cols-2 gap-2 pt-1">
        <a href="${rootUrl('index.html')}" class="inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors">
          <i data-lucide="house" class="w-3.5 h-3.5"></i> Portal
        </a>
        <button type="button" data-action="print" class="inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors">
          <i data-lucide="printer" class="w-3.5 h-3.5"></i> Guardar PDF
        </button>
      </div>
    </div>
  </aside>

  <div id="help-modal" class="presenter-chrome fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm hidden items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="help-modal-title">
    <div class="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
      <div class="flex items-center justify-between p-5 border-b border-slate-100">
        <h2 id="help-modal-title" class="font-extrabold text-sm text-slate-900 flex items-center gap-2">
          <i data-lucide="keyboard" class="w-4 h-4 text-sena"></i> Atajos de navegación
        </h2>
        <button type="button" id="btn-close-help" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Cerrar ayuda">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
      <dl class="p-5 space-y-2 text-xs text-slate-600">
        ${[
          ['Avanzar', 'Espacio · → · AvPág'],
          ['Retroceder', '← · RePág'],
          ['Primera / última', 'Inicio · Fin'],
          ['Índice de diapositivas', 'M'],
          ['Pantalla completa', 'F'],
          ['Iniciar / pausar cronómetro', 'T'],
          ['Esta ayuda', '?'],
          ['Cerrar paneles', 'Esc'],
          ['Pantallas táctiles', 'Deslizar ← →'],
        ].map(([label, keys]) => `
        <div class="flex items-center justify-between gap-3 py-1.5 border-b border-slate-100 last:border-0">
          <dt>${label}</dt>
          <dd><kbd class="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800 font-bold text-[11px]">${keys}</kbd></dd>
        </div>`).join('')}
      </dl>
      <div class="px-5 pb-5">
        <button type="button" data-action="close-help" class="w-full py-2.5 bg-[#00324D] hover:bg-[#00263A] text-white rounded-xl text-xs font-bold transition-colors">Entendido</button>
      </div>
    </div>
  </div>`;
  }

  // ---------------------------------------------------------------------------
  // Motor
  // ---------------------------------------------------------------------------
  class SlidePresenter {
    constructor() {
      this.slides = Array.from(document.querySelectorAll('.slide-content'));
      this.total = this.slides.length;
      this.index = 0;
      this.timer = { seconds: 0, mode: 'up', running: false, handle: null };
      this.lastFocus = null;
      if (this.total === 0) return;

      this.ctx = resolveContext();
      this.meta = this.slides.map((slide, i) => ({
        title: this.slideTitle(slide, i),
        section: slide.dataset.section || '',
      }));

      this.mountChrome();
      this.cacheElements();
      this.bindEvents();
      this.setupCodeCopy();
      this.goToSlide(this.indexFromHash() ?? 0, { initial: true });
      renderIcons();
    }

    slideTitle(slide, i) {
      const raw = slide.dataset.title
        || (slide.querySelector('h1, h2, h3') || {}).textContent
        || `Diapositiva ${i + 1}`;
      return raw.replace(/\s+/g, ' ').replace(/^\d+\.\s*/, '').trim();
    }

    mountChrome() {
      const top = document.querySelector('[data-presenter="top"]');
      const bottom = document.querySelector('[data-presenter="bottom"]');
      const main = this.slides[0].closest('main');

      const topHtml = topTemplate(this.ctx, this.total);
      const bottomHtml = bottomTemplate(this.ctx, this.meta);

      if (top) top.outerHTML = topHtml;
      else if (main) main.insertAdjacentHTML('beforebegin', topHtml);

      if (bottom) bottom.outerHTML = bottomHtml;
      else if (main) main.insertAdjacentHTML('afterend', bottomHtml);
    }

    cacheElements() {
      const $ = (id) => document.getElementById(id);
      this.el = {
        progress: $('presentation-progress'),
        progressbar: $('presentation-progressbar'),
        counter: $('slide-counter'),
        prev: $('btn-prev-slide'),
        next: $('btn-next-slide'),
        fullscreen: $('btn-fullscreen'),
        menuBtn: $('btn-toggle-menu'),
        drawer: $('menu-drawer'),
        backdrop: $('menu-backdrop'),
        help: $('help-modal'),
        helpBtn: $('btn-toggle-help'),
        title: $('current-slide-title'),
        section: $('current-slide-section'),
        nextSession: $('next-session-cta'),
        timerDisplay: $('timer-display'),
        timerStart: $('btn-timer-start'),
        timerReset: $('btn-timer-reset'),
        timerPresetsBtn: $('btn-timer-presets'),
        timerPresets: $('timer-presets'),
      };
      this.menuItems = Array.from(document.querySelectorAll('#menu-items-list [data-slide-index]'));
    }

    // --- Navegación ---------------------------------------------------------
    indexFromHash() {
      const m = window.location.hash.match(/^#slide-(\d+)$/);
      if (!m) return null;
      const i = Number(m[1]) - 1;
      return i >= 0 && i < this.total ? i : null;
    }

    goToSlide(i, { initial = false } = {}) {
      if (!Number.isInteger(i) || i < 0 || i >= this.total) return;
      this.index = i;
      this.render();
      if (!initial) {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      }
      this.closeMenu();
    }

    nextSlide() { this.goToSlide(this.index + 1); }
    prevSlide() { this.goToSlide(this.index - 1); }

    render() {
      const i = this.index;
      const isFirst = i === 0;
      const isLast = i === this.total - 1;

      this.slides.forEach((slide, idx) => {
        const active = idx === i;
        slide.classList.toggle('active', active);
        slide.classList.toggle('hidden', !active);
        slide.setAttribute('aria-hidden', String(!active));
      });

      this.el.counter.textContent = `${i + 1} / ${this.total}`;
      this.el.progress.style.width = `${((i + 1) / this.total) * 100}%`;
      this.el.progressbar.setAttribute('aria-valuenow', String(i + 1));
      this.el.prev.disabled = isFirst;
      this.el.next.disabled = isLast;

      const meta = this.meta[i];
      this.el.title.textContent = `${pad(i + 1)} · ${meta.title}`;
      this.el.section.textContent = meta.section;
      this.el.section.classList.toggle('md:inline', !!meta.section);

      // Al terminar la sesión se sugiere continuar con la siguiente
      const showNext = isLast && !!this.ctx.next;
      this.el.nextSession.classList.toggle('hidden', !showNext);
      this.el.nextSession.classList.toggle('inline-flex', showNext);

      this.menuItems.forEach((item, idx) => {
        const active = idx === i;
        item.classList.toggle('bg-emerald-50', active);
        item.classList.toggle('border-emerald-200', active);
        item.classList.toggle('text-emerald-800', active);
        item.classList.toggle('font-bold', active);
        item.classList.toggle('border-transparent', !active);
        if (active) item.setAttribute('aria-current', 'step');
        else item.removeAttribute('aria-current');
      });

      // replaceState: enlace profundo sin llenar el historial ni provocar saltos
      const hash = `#slide-${i + 1}`;
      if (window.location.hash !== hash) history.replaceState(null, '', hash);
    }

    // --- Paneles ------------------------------------------------------------
    isMenuOpen() { return this.el.drawer.dataset.open === 'true'; }
    isHelpOpen() { return !this.el.help.classList.contains('hidden'); }

    openMenu() {
      this.lastFocus = document.activeElement;
      this.el.drawer.dataset.open = 'true';
      this.el.backdrop.dataset.open = 'true';
      this.el.drawer.setAttribute('aria-hidden', 'false');
      this.el.drawer.inert = false;
      this.el.menuBtn.setAttribute('aria-expanded', 'true');
      const current = this.menuItems[this.index];
      if (current) {
        current.scrollIntoView({ block: 'center' });
        current.focus({ preventScroll: true });
      }
    }

    closeMenu() {
      if (!this.el || !this.isMenuOpen()) return;
      this.el.drawer.dataset.open = 'false';
      this.el.backdrop.dataset.open = 'false';
      this.el.drawer.setAttribute('aria-hidden', 'true');
      this.el.drawer.inert = true;
      this.el.menuBtn.setAttribute('aria-expanded', 'false');
      this.restoreFocus();
    }

    toggleMenu() { this.isMenuOpen() ? this.closeMenu() : this.openMenu(); }

    toggleHelpModal(force) {
      const open = typeof force === 'boolean' ? force : !this.isHelpOpen();
      if (open) {
        this.lastFocus = document.activeElement;
        this.el.help.classList.remove('hidden');
        this.el.help.classList.add('flex');
        document.getElementById('btn-close-help').focus();
      } else {
        this.el.help.classList.add('hidden');
        this.el.help.classList.remove('flex');
        this.restoreFocus();
      }
    }

    restoreFocus() {
      if (this.lastFocus && typeof this.lastFocus.focus === 'function') this.lastFocus.focus({ preventScroll: true });
      this.lastFocus = null;
    }

    toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    }

    // --- Cronómetro / cuenta regresiva ---------------------------------------
    toggleTimer() { this.timer.running ? this.pauseTimer() : this.startTimer(); }

    startTimer() {
      if (this.timer.running) return;
      if (this.timer.mode === 'down' && this.timer.seconds === 0) this.timer.mode = 'up';
      this.timer.running = true;
      this.timer.handle = setInterval(() => this.tick(), 1000);
      this.updateTimerButton();
    }

    pauseTimer() {
      this.timer.running = false;
      clearInterval(this.timer.handle);
      this.updateTimerButton();
    }

    resetTimer() {
      this.pauseTimer();
      this.timer.seconds = 0;
      this.timer.mode = 'up';
      this.updateTimerDisplay();
      this.updateTimerButton(true);
    }

    setCountdown(minutes) {
      this.pauseTimer();
      this.timer.mode = 'down';
      this.timer.seconds = minutes * 60;
      this.updateTimerDisplay();
      this.startTimer();
    }

    tick() {
      if (this.timer.mode === 'down') {
        this.timer.seconds = Math.max(0, this.timer.seconds - 1);
        if (this.timer.seconds === 0) {
          this.pauseTimer();
          this.playAlert();
        }
      } else {
        this.timer.seconds += 1;
      }
      this.updateTimerDisplay();
    }

    updateTimerDisplay() {
      const { seconds, mode } = this.timer;
      this.el.timerDisplay.textContent = `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`;
      this.el.timerDisplay.classList.toggle('timer-warning', mode === 'down' && seconds <= 60);
    }

    updateTimerButton(reset = false) {
      const btn = this.el.timerStart;
      btn.textContent = this.timer.running ? 'Pausa' : reset || this.timer.seconds === 0 ? 'Iniciar' : 'Seguir';
      btn.classList.toggle('text-amber-700', this.timer.running);
      btn.classList.toggle('text-emerald-700', !this.timer.running);
    }

    playAlert() {
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        const ctx = new Ctx();
        [0, 0.35].forEach((offset) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(587.33, ctx.currentTime + offset);
          gain.gain.setValueAtTime(0.3, ctx.currentTime + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + offset);
          osc.stop(ctx.currentTime + offset + 0.3);
        });
      } catch (_) { /* Sin audio disponible: el aviso visual es suficiente */ }
    }

    // --- Eventos ------------------------------------------------------------
    bindEvents() {
      const { el } = this;
      el.prev.addEventListener('click', () => this.prevSlide());
      el.next.addEventListener('click', () => this.nextSlide());
      el.fullscreen.addEventListener('click', () => this.toggleFullscreen());
      el.menuBtn.addEventListener('click', () => this.toggleMenu());
      el.helpBtn.addEventListener('click', () => this.toggleHelpModal(true));
      el.backdrop.addEventListener('click', () => this.closeMenu());
      document.getElementById('btn-close-menu').addEventListener('click', () => this.closeMenu());
      document.getElementById('btn-close-help').addEventListener('click', () => this.toggleHelpModal(false));
      el.help.addEventListener('click', (e) => { if (e.target === el.help) this.toggleHelpModal(false); });

      this.menuItems.forEach((item) =>
        item.addEventListener('click', () => this.goToSlide(Number(item.dataset.slideIndex))));

      document.addEventListener('click', (e) => {
        const action = e.target.closest('[data-action]');
        if (action && action.dataset.action === 'close-help') this.toggleHelpModal(false);
        if (action && action.dataset.action === 'print') { this.closeMenu(); window.print(); }
        if (!e.target.closest('#timer-presets, #btn-timer-presets')) this.toggleTimerPresets(false);
      });

      // Cronómetro
      el.timerStart.addEventListener('click', () => this.toggleTimer());
      el.timerReset.addEventListener('click', () => this.resetTimer());
      el.timerPresetsBtn.addEventListener('click', () => this.toggleTimerPresets());
      el.timerPresets.querySelectorAll('[data-timer-preset]').forEach((btn) =>
        btn.addEventListener('click', () => {
          this.setCountdown(Number(btn.dataset.timerPreset));
          this.toggleTimerPresets(false);
        }));

      // Teclado
      window.addEventListener('keydown', (e) => this.onKeydown(e));

      // Enlace profundo manual (#slide-N escrito en la barra de direcciones)
      window.addEventListener('hashchange', () => {
        const i = this.indexFromHash();
        if (i !== null && i !== this.index) this.goToSlide(i);
      });

      this.bindSwipe();
    }

    toggleTimerPresets(force) {
      const open = typeof force === 'boolean' ? force : this.el.timerPresets.classList.contains('hidden');
      this.el.timerPresets.classList.toggle('hidden', !open);
      this.el.timerPresetsBtn.setAttribute('aria-expanded', String(open));
    }

    onKeydown(e) {
      if (e.ctrlKey || e.metaKey || e.altKey || isTypingTarget(e.target)) return;

      if (e.key === 'Escape') {
        if (this.isHelpOpen()) this.toggleHelpModal(false);
        this.closeMenu();
        this.toggleTimerPresets(false);
        return;
      }

      // Con un panel abierto solo se permite cerrarlo y navegar el índice con Tab
      if (this.isHelpOpen()) return;

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const actions = {
        ArrowRight: () => this.nextSlide(),
        PageDown: () => this.nextSlide(),
        ' ': () => this.nextSlide(),
        ArrowLeft: () => this.prevSlide(),
        PageUp: () => this.prevSlide(),
        Home: () => this.goToSlide(0),
        End: () => this.goToSlide(this.total - 1),
        m: () => this.toggleMenu(),
        f: () => this.toggleFullscreen(),
        t: () => this.toggleTimer(),
        h: () => this.toggleHelpModal(),
        '?': () => this.toggleHelpModal(),
        '¿': () => this.toggleHelpModal(),
      };

      // Dentro del índice, Espacio/Enter activan el botón enfocado
      if (this.isMenuOpen() && [' ', 'Enter'].includes(e.key)) return;

      const action = actions[key];
      if (action) {
        e.preventDefault();
        action();
      }
    }

    bindSwipe() {
      const main = this.slides[0].closest('main');
      if (!main) return;
      let start = null;
      main.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        // No interferir con tablas o bloques de código con scroll horizontal
        if (e.target.closest('pre, table, .overflow-x-auto, .overflow-auto')) return;
        start = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }, { passive: true });
      main.addEventListener('touchend', (e) => {
        if (!start) return;
        const dx = e.changedTouches[0].clientX - start.x;
        const dy = e.changedTouches[0].clientY - start.y;
        start = null;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          dx < 0 ? this.nextSlide() : this.prevSlide();
        }
      }, { passive: true });
    }

    // --- Copiar bloques de código (botones .copy-btn existentes) ---------------
    setupCodeCopy() {
      document.querySelectorAll('.copy-btn').forEach((button) => {
        button.addEventListener('click', async () => {
          const targetId = button.getAttribute('data-target');
          const code = targetId
            ? document.getElementById(targetId)
            : button.closest('.code-box')?.querySelector('code');
          if (!code) return;
          try {
            await navigator.clipboard.writeText(code.innerText);
            const original = button.innerHTML;
            button.innerHTML = '<span class="text-emerald-500 font-semibold text-xs">¡Copiado!</span>';
            setTimeout(() => { button.innerHTML = original; renderIcons(); }, 1800);
          } catch (_) {
            button.title = 'No fue posible copiar: selecciona el texto manualmente';
          }
        });
      });
    }
  }

  // El script se carga al final de <body>: el DOM de las diapositivas ya existe.
  const presenter = new SlidePresenter();
  window.SlidePresenter = SlidePresenter;
  window.presenter = presenter;
  window.goToSlide = (i) => presenter.goToSlide(i);
})();
