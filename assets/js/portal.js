/**
 * Portal ADSO Virtual · Lógica de index.html
 * ---------------------------------------------------------------------------
 * Todo el contenido dinámico sale de window.ADSO_CATALOGO (catalogo.js):
 *   - Ruta de aprendizaje por actividad (AA) de la guía activa.
 *   - Explorador multi-guía con filtros, búsqueda y paginación.
 *   - Modal de detalle (paso a paso, criterios, checklist personal).
 *   - Selector de sesiones para proyectar y enlaces del pie de página.
 * Enlace directo a una evidencia: index.html#ev-05 abre su paso a paso.
 */
(function () {
  'use strict';

  const CATALOG = window.ADSO_CATALOGO;
  if (!CATALOG) {
    console.error('catalogo.js no está cargado: el portal no puede renderizar las evidencias.');
    return;
  }

  const EVIDENCIAS = CATALOG.evidencias;
  const GUIAS = Object.fromEntries(CATALOG.guias.map((g) => [g.id, g]));
  const CATEGORIAS = CATALOG.categorias;
  const GUIA_ACTIVA = CATALOG.guias.find((g) => g.status === 'activa');
  const ITEMS_PER_PAGE = 6;

  // ---------------------------------------------------------------------------
  // Utilidades
  // ---------------------------------------------------------------------------
  const $ = (id) => document.getElementById(id);

  const esc = (value) =>
    String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const renderIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
  };

  /** localStorage puede fallar (modo privado, almacenamiento bloqueado): nunca rompe la UI. */
  const storage = {
    get(key, fallback) {
      try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (_) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) { /* sin persistencia */ }
    },
  };

  const sessionHref = (ev) => `${GUIAS[ev.guia].folder}${ev.session.file}`;
  const shortCode = (code) => code.split('-').slice(-2).join('-'); // AA1-EV01
  const guiaNumber = (ev) => EVIDENCIAS.filter((e) => e.guia === ev.guia).indexOf(ev) + 1;
  const catBadge = (cat) => (CATEGORIAS[cat] && CATEGORIAS[cat].badge) || 'bg-slate-50 text-slate-700 border-slate-200';
  const guiaBadge = (guia) => ({ 'guia-05': 'bg-slate-700 text-white', 'guia-07': 'bg-teal-700 text-white' }[guia] || 'bg-[#00324D] text-white');

  /** Sesiones únicas: varias evidencias pueden compartir el mismo archivo de presentación. */
  function uniqueSessions() {
    const map = new Map();
    EVIDENCIAS.filter((e) => e.session).forEach((ev) => {
      const href = sessionHref(ev);
      if (map.has(href)) map.get(href).evs.push(ev);
      else map.set(href, { href, ev, evs: [ev] });
    });
    return [...map.values()];
  }
  const sharedWith = (ev) => (ev.session ? EVIDENCIAS.filter((e) => e !== ev && e.session && sessionHref(e) === sessionHref(ev)) : []);
  const codesLabel = (evs) => [shortCode(evs[0].code), ...evs.slice(1).map((e) => shortCode(e.code).split('-').pop())].join(' + ');

  const sesionesDisponibles = () => uniqueSessions().length + CATALOG.guias.filter((g) => g.generalSession).length;

  // ---------------------------------------------------------------------------
  // Modales genéricos (abrir/cerrar, bloqueo de scroll y foco)
  // ---------------------------------------------------------------------------
  let lastFocus = null;

  function openModal(id) {
    const modal = $(id);
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    document.body.style.overflow = 'hidden';
    renderIcons();
    const focusable = modal.querySelector('button, a[href], input');
    if (focusable) focusable.focus({ preventScroll: true });
  }

  function closeModal(id) {
    const modal = $(id);
    if (!modal || modal.classList.contains('hidden')) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    if (!document.querySelector('.fixed.inset-0.flex[aria-modal="true"]')) document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus({ preventScroll: true });
    lastFocus = null;
  }

  // ---------------------------------------------------------------------------
  // 1. Ruta de aprendizaje (guía activa)
  // ---------------------------------------------------------------------------
  function renderRuta() {
    const container = $('ruta-actividades');
    if (!container || !GUIA_ACTIVA) return;

    const evs = EVIDENCIAS.filter((e) => e.guia === GUIA_ACTIVA.id);
    const publicadas = evs.filter((e) => e.session).length;

    $('ruta-progress-label').textContent = `${publicadas} de ${evs.length}`;
    $('ruta-progress-bar').style.width = `${Math.round((publicadas / evs.length) * 100)}%`;
    const bar = $('ruta-progressbar');
    bar.setAttribute('aria-valuemax', String(evs.length));
    bar.setAttribute('aria-valuenow', String(publicadas));

    container.innerHTML = GUIA_ACTIVA.activities.map((act) => {
      const items = evs.filter((e) => e.activityId === act.id);
      const listas = items.filter((e) => e.session).length;
      const completa = listas === items.length && items.length > 0;

      return `
        <article class="bg-slate-50/60 border border-slate-200 rounded-2xl p-5 shadow-sm">
          <header class="flex items-start gap-3 mb-5">
            <span class="w-11 h-11 rounded-xl bg-[#00324D] text-white font-mono font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">${esc(act.id)}</span>
            <div class="min-w-0 flex-1">
              <h3 class="text-sm font-extrabold text-slate-900 leading-snug">${esc(act.title)}</h3>
              <p class="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span class="font-mono font-bold text-slate-600">${act.hours} h</span>
                <span class="text-slate-300">•</span>
                <span>${items.length} evidencia${items.length === 1 ? '' : 's'}</span>
                <span class="text-slate-300">•</span>
                <span class="${completa ? 'text-emerald-700 font-bold' : 'text-slate-500'}">${listas}/${items.length} sesiones publicadas</span>
              </p>
            </div>
          </header>

          <ol class="relative space-y-3">
            <span class="absolute left-4 top-4 bottom-4 w-px bg-slate-200" aria-hidden="true"></span>
            ${items.map((ev) => rutaItem(ev)).join('')}
          </ol>
        </article>`;
    }).join('');
  }

  function rutaItem(ev) {
    const ready = !!ev.session;
    const num = String(guiaNumber(ev)).padStart(2, '0');
    return `
      <li class="relative flex items-start gap-3">
        <span class="relative z-10 w-8 h-8 rounded-full ring-4 ring-slate-50 flex items-center justify-center text-[11px] font-extrabold shrink-0 ${ready ? 'bg-[#39A900] text-white' : 'bg-white border border-dashed border-slate-300 text-slate-400'}" aria-hidden="true">${num}</span>
        <div class="flex-1 min-w-0 bg-white border border-slate-200 rounded-xl p-3.5 hover:border-emerald-300 transition-colors">
          <div class="flex flex-wrap items-center gap-1.5 mb-1.5">
            <span class="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">${esc(shortCode(ev.code))}</span>
            <span class="text-[10px] font-semibold text-slate-500">${esc(ev.type)}</span>
            <span class="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-full border ${catBadge(ev.category)}">${esc(ev.catName)}</span>
          </div>
          <p class="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">${esc(ev.title)}</p>
          <p class="text-[11px] text-slate-500 mt-1 flex items-center gap-1"><i data-lucide="package" class="w-3 h-3"></i> Entrega: <span class="font-mono text-slate-700">${esc(ev.format)}</span></p>
          ${sharedWith(ev).length ? `<p class="mt-1.5 inline-flex items-center gap-1 text-[10.5px] font-semibold text-[#00324D] bg-sky-50 border border-sky-200 px-1.5 py-0.5 rounded"><i data-lucide="link-2" class="w-3 h-3"></i> Sesión compartida con ${esc(sharedWith(ev).map((e) => shortCode(e.code)).join(', '))}</p>` : ''}
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <button type="button" data-open-evidence="${esc(ev.id)}" class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200 transition-colors">
              <i data-lucide="list-checks" class="w-3.5 h-3.5"></i> Paso a paso
            </button>
            ${ready ? `
            <a href="${esc(sessionHref(ev))}" class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#39A900] hover:bg-[#2D8200] text-white text-[11px] font-bold transition-colors shadow-2xs">
              <i data-lucide="presentation" class="w-3.5 h-3.5"></i> Proyectar · ${ev.session.slides} diapositivas
            </a>` : `
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <i data-lucide="clock" class="w-3 h-3"></i> Sesión en preparación
            </span>`}
          </div>
        </div>
      </li>`;
  }

  // ---------------------------------------------------------------------------
  // 2. Explorador multi-guía
  // ---------------------------------------------------------------------------
  const state = { guia: 'all', cat: 'all', query: '', page: 1 };

  function getFiltered() {
    const q = state.query.toLowerCase().trim();
    return EVIDENCIAS.filter((ev) => {
      const matchGuia = state.guia === 'all' || ev.guia === state.guia;
      const matchCat = state.cat === 'all' || ev.category === state.cat;
      const matchSearch = !q || [ev.code, ev.title, ev.summary, ev.format, ev.catName, ev.guiaName, ev.activity]
        .some((field) => String(field).toLowerCase().includes(q));
      return matchGuia && matchCat && matchSearch;
    });
  }

  function evidenceCard(ev) {
    const ready = !!ev.session;
    return `
      <article class="bg-white border border-slate-200 rounded-xl p-5 card-hover flex flex-col justify-between shadow-2xs group relative">
        <div>
          <div class="flex items-start justify-between gap-2 mb-3">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${guiaBadge(ev.guia)} shrink-0">${esc(ev.guiaName)}</span>
              <span class="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 truncate max-w-[145px]" title="${esc(ev.code)}">${esc(ev.code)}</span>
            </div>
            <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${catBadge(ev.category)} shrink-0">${esc(ev.catName)}</span>
          </div>

          <h3 class="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-sena transition-colors line-clamp-2" title="${esc(ev.title)}">${esc(ev.title)}</h3>
          <p class="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">${esc(ev.summary)}</p>

          <dl class="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
            <div>
              <dt class="text-slate-400 block text-[10px] uppercase font-semibold">Tipo</dt>
              <dd class="font-medium text-slate-800">${esc(ev.type)}</dd>
            </div>
            <div>
              <dt class="text-slate-400 block text-[10px] uppercase font-semibold">Formato</dt>
              <dd class="font-medium text-emerald-700 font-mono truncate" title="${esc(ev.format)}">${esc(ev.format)}</dd>
            </div>
          </dl>

          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span class="text-slate-400 font-medium">Sesión en aula:</span>
            ${ready ? `
              <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                ${ev.session.slides} diapositivas
              </span>` : `
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                <i data-lucide="clock" class="w-3 h-3 text-amber-600"></i>
                En preparación
              </span>`}
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <button type="button" data-open-evidence="${esc(ev.id)}" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors">
            <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            <span>Ver Paso a Paso</span>
          </button>
          ${ready ? `
            <a href="${esc(sessionHref(ev))}" class="p-2 rounded-lg bg-[#39A900] hover:bg-[#2D8200] text-white transition-colors shadow-2xs flex items-center justify-center" aria-label="Proyectar sesión interactiva ${esc(ev.code)}" title="Proyectar sesión interactiva">
              <i data-lucide="presentation" class="w-4 h-4"></i>
            </a>` : `
            <button type="button" data-not-available="${esc(ev.id)}" class="p-2 rounded-lg bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-400 border border-slate-200 hover:border-amber-300 transition-colors flex items-center justify-center" aria-label="Sesión en preparación para ${esc(ev.code)}" title="Material interactivo en preparación">
              <i data-lucide="presentation" class="w-4 h-4"></i>
            </button>`}
        </div>
      </article>`;
  }

  function renderEvidencias() {
    const filtered = getFiltered();
    const grid = $('evidence-grid');
    const noResults = $('no-results');

    $('evidence-count-badge').textContent = `${filtered.length} de ${EVIDENCIAS.length}`;

    if (filtered.length === 0) {
      grid.innerHTML = '';
      noResults.classList.remove('hidden');
      renderPagination(0);
      return;
    }

    noResults.classList.add('hidden');
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    if (state.page > totalPages) state.page = 1;

    const start = (state.page - 1) * ITEMS_PER_PAGE;
    grid.innerHTML = filtered.slice(start, start + ITEMS_PER_PAGE).map(evidenceCard).join('');
    renderPagination(filtered.length);
    renderIcons();
  }

  function renderPagination(total) {
    const container = $('pagination-container');
    if (total === 0) { container.classList.add('hidden'); return; }
    container.classList.remove('hidden');

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    $('pag-total').textContent = total;
    $('pag-start').textContent = (state.page - 1) * ITEMS_PER_PAGE + 1;
    $('pag-end').textContent = Math.min(state.page * ITEMS_PER_PAGE, total);

    const navBtn = (page, label, disabled) => `
      <button type="button" data-page="${page}" ${disabled ? 'disabled' : ''} class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 transition-colors ${disabled ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-slate-100'}">${label}</button>`;

    let html = navBtn(state.page - 1, '&larr; Anterior', state.page === 1);
    for (let i = 1; i <= totalPages; i++) {
      const active = i === state.page;
      html += `<button type="button" data-page="${i}" ${active ? 'aria-current="page"' : ''} class="w-8 h-8 rounded-lg text-xs font-bold transition-colors ${active ? 'bg-[#00324D] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}">${i}</button>`;
    }
    html += navBtn(state.page + 1, 'Siguiente &rarr;', state.page === totalPages);
    $('pagination-buttons').innerHTML = html;
  }

  function goToPage(page) {
    const totalPages = Math.ceil(getFiltered().length / ITEMS_PER_PAGE);
    if (page < 1 || page > totalPages) return;
    state.page = page;
    renderEvidencias();
    $('evidencias-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setActiveFilter(buttons, active, on, off) {
    buttons.forEach((b) => {
      const isActive = b === active;
      on.forEach((c) => b.classList.toggle(c, isActive));
      off.forEach((c) => b.classList.toggle(c, !isActive));
      b.setAttribute('aria-pressed', String(isActive));
    });
  }

  const GUIA_ON = ['bg-[#00324D]', 'text-white', 'shadow-xs'];
  const CAT_ON = ['bg-slate-800', 'text-white', 'shadow-2xs'];
  const FILTER_OFF = ['bg-white', 'text-slate-700'];

  // ---------------------------------------------------------------------------
  // 3. Modal de detalle de evidencia
  // ---------------------------------------------------------------------------
  let activeEvidence = null;
  let activeTab = 'pasos';

  function openEvidenceModal(id) {
    const ev = EVIDENCIAS.find((e) => e.id === id);
    if (!ev) return;
    activeEvidence = ev;
    activeTab = 'pasos';

    $('modal-badge-guia').textContent = ev.guiaName;
    $('modal-code').textContent = ev.code;
    $('modal-title').textContent = ev.title;
    $('modal-badge-cat').textContent = ev.catName;
    $('modal-badge-type').textContent = ev.type;
    $('modal-badge-hours').textContent = ev.hours;

    const proj = $('modal-proj-link');
    if (ev.session) {
      proj.href = sessionHref(ev);
      proj.className = 'inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#39A900] hover:bg-[#2D8200] text-white font-bold text-xs shadow-xs transition-colors';
      proj.innerHTML = '<i data-lucide="presentation" class="w-4 h-4"></i><span>Proyectar en Aula</span>';
      proj.onclick = null;
    } else {
      proj.href = '#';
      proj.className = 'inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold text-xs transition-colors';
      proj.innerHTML = '<i data-lucide="clock" class="w-4 h-4 text-amber-600"></i><span>Diapositivas en Preparación</span>';
      proj.onclick = (e) => { e.preventDefault(); closeModal('evidence-modal'); showNotAvailableModal(ev.id); };
    }

    renderModalTab();
    openModal('evidence-modal');
    history.replaceState(null, '', `#${ev.id}`);
  }

  function closeEvidenceModal() {
    closeModal('evidence-modal');
    if (/^#ev-/.test(location.hash)) history.replaceState(null, '', location.pathname + location.search);
  }

  function renderModalTab() {
    if (!activeEvidence) return;
    const ev = activeEvidence;
    const content = $('modal-content-area');
    const tabs = { pasos: $('tab-btn-pasos'), criterios: $('tab-btn-criterios'), checklist: $('tab-btn-checklist') };

    Object.entries(tabs).forEach(([key, btn]) => {
      const active = key === activeTab;
      btn.className = `py-3 border-b-2 transition-colors ${active ? 'border-sena text-sena' : 'border-transparent text-slate-500 hover:text-slate-800'}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', String(active));
    });

    if (activeTab === 'pasos') {
      content.innerHTML = `
        <div class="space-y-4">
          <div class="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
            <strong>Propósito pedagógico (${esc(ev.guiaName)}):</strong> ${esc(ev.summary)}
          </div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <i data-lucide="list-ordered" class="w-4 h-4 text-sena"></i> Paso a paso para desarrollar la evidencia
          </h4>
          <ol class="space-y-2.5">
            ${ev.steps.map((step, idx) => `
              <li class="flex items-start gap-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700">
                <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center shrink-0 text-[11px]">${idx + 1}</span>
                <span class="pt-0.5">${esc(step.replace(/^\d+\.\s*/, ''))}</span>
              </li>`).join('')}
          </ol>
          ${ev.session ? `
            <div class="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-950">
              <div class="flex items-start gap-2">
                <i data-lucide="presentation" class="w-5 h-5 text-emerald-700 shrink-0"></i>
                <span><strong>Sesión interactiva disponible (${ev.session.slides} diapositivas):</strong> ${esc(ev.session.blurb)}</span>
              </div>
              <a href="${esc(sessionHref(ev))}" class="px-3.5 py-1.5 bg-[#39A900] hover:bg-[#2D8200] text-white font-bold rounded-lg shrink-0 transition-colors flex items-center gap-1.5 shadow-2xs">
                <span>Ver diapositivas</span><i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </a>
            </div>` : `
            <div class="p-3.5 bg-amber-50/90 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-950">
              <i data-lucide="clock" class="w-4 h-4 text-amber-600 shrink-0 mt-0.5"></i>
              <div>
                <strong class="font-bold text-amber-900 block mb-0.5">Diapositivas en preparación (próxima sesión sincrónica)</strong>
                <span>El material interactivo de esta evidencia lo orientará el <strong>${esc(CATALOG.instructor)}</strong> en la sesión virtual correspondiente y quedará publicado en este repositorio para tu consulta.</span>
              </div>
            </div>`}
          <div class="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <span>Formato de entrega: <strong class="text-slate-800 font-mono">${esc(ev.format)}</strong></span>
            <span>Instrumento SENA: <strong class="text-slate-800 font-mono">${esc(ev.instrument)}</strong></span>
          </div>
        </div>`;
    } else if (activeTab === 'criterios') {
      const ext = ev.format.toLowerCase().includes('pdf') && !ev.format.toLowerCase().includes('zip') ? 'pdf' : 'zip';
      content.innerHTML = `
        <div class="space-y-4">
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span class="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">Criterio de evaluación oficial SENA</span>
            <p class="text-sm font-semibold text-slate-800 leading-relaxed">${esc(ev.criteria)}</p>
          </div>
          <div class="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-2 text-xs text-amber-900">
            <div class="flex items-center gap-2 font-bold text-amber-950">
              <i data-lucide="alert-circle" class="w-4 h-4 text-amber-600"></i> Recomendaciones del ${esc(CATALOG.instructor)}
            </div>
            <p>• La entrega oficial y evaluada se realiza únicamente en <strong>Zajuna</strong> antes de la fecha límite.</p>
            <p>• Nombra tus archivos con la convención estándar: <code class="bg-white/70 px-1 rounded">${esc(ev.code)}_Nombre_Apellido.${ext}</code></p>
            <p>• Valida tu trabajo en tu entorno local antes de comprimir y cargar.</p>
          </div>
        </div>`;
    } else {
      const saved = storage.get(`check_${ev.id}`, []);
      const done = ev.checklist.filter((_, idx) => saved.includes(idx)).length;
      content.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center justify-between gap-3">
            <p class="text-xs text-slate-500">Marca cada requisito a medida que lo completes. El avance se guarda solo en este navegador.</p>
            <span class="font-mono text-xs font-bold ${done === ev.checklist.length ? 'text-emerald-700' : 'text-slate-600'} shrink-0">${done}/${ev.checklist.length}</span>
          </div>
          <div class="h-1.5 rounded-full bg-slate-100 overflow-hidden"><div class="h-1.5 bg-[#39A900] rounded-full" style="width:${Math.round((done / ev.checklist.length) * 100)}%"></div></div>
          <div class="space-y-2.5">
            ${ev.checklist.map((item, idx) => {
              const checked = saved.includes(idx);
              return `
                <label class="flex items-start gap-3 p-3 bg-slate-50 hover:bg-emerald-50/50 rounded-xl border border-slate-200 cursor-pointer transition-colors text-xs text-slate-700">
                  <input type="checkbox" data-check-idx="${idx}" ${checked ? 'checked' : ''} class="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4">
                  <span class="${checked ? 'line-through text-slate-400' : ''}">${esc(item)}</span>
                </label>`;
            }).join('')}
          </div>
        </div>`;
    }
    renderIcons();
  }

  function toggleCheckItem(idx) {
    const key = `check_${activeEvidence.id}`;
    const saved = storage.get(key, []);
    storage.set(key, saved.includes(idx) ? saved.filter((i) => i !== idx) : [...saved, idx]);
    renderModalTab();
  }

  function showNotAvailableModal(id) {
    const ev = EVIDENCIAS.find((e) => e.id === id);
    if (!ev) return;
    $('na-modal-code').textContent = ev.code;
    $('na-modal-title').textContent = ev.title;
    $('na-modal-guia').textContent = ev.guiaName;
    $('na-modal-cat').textContent = ev.catName;
    $('na-btn-view-steps').onclick = () => { closeModal('not-available-modal'); openEvidenceModal(ev.id); };
    openModal('not-available-modal');
  }

  // ---------------------------------------------------------------------------
  // 4. Selector de sesiones para proyectar + pie de página
  // ---------------------------------------------------------------------------
  function renderProjectionSelector() {
    const grid = $('proj-available-grid');
    const pending = $('proj-pending-list');
    if (!grid || !pending) return;

    const cards = [];
    CATALOG.guias.filter((g) => g.generalSession).forEach((g) => {
      cards.push(`
        <article class="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-emerald-200/80 hover:border-emerald-300 transition-colors hover:shadow-md flex flex-col justify-between gap-3 group">
          <div>
            <div class="flex items-center justify-between gap-2 mb-1.5">
              <span class="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#00324D] text-white uppercase">${esc(g.name)} · General</span>
              <span class="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">${g.generalSession.slides} diapositivas</span>
            </div>
            <h4 class="text-sm font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">${esc(g.generalSession.title)}</h4>
            <p class="text-[11.5px] text-slate-600 leading-relaxed mt-1">${esc(g.generalSession.blurb)}</p>
          </div>
          <div class="pt-2 border-t border-slate-200/60 flex justify-end">
            <a href="${esc(g.folder + g.generalSession.file)}" class="inline-flex items-center gap-1.5 bg-[#00324D] hover:bg-[#00263A] text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-2xs transition-colors">
              <span>Proyectar</span><i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        </article>`);
    });

    uniqueSessions().forEach(({ ev, evs }) => {
      cards.push(`
        <article class="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 transition-colors hover:shadow-md flex flex-col justify-between gap-3 group">
          <div>
            <div class="flex items-center justify-between gap-2 mb-1.5">
              <span class="text-[10px] font-mono font-bold text-sena bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">${esc(ev.guiaName.replace('Guía ', 'GA'))}-${esc(codesLabel(evs))}</span>
              <span class="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">${ev.session.slides} diapositivas</span>
            </div>
            <h4 class="text-sm font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">${esc(ev.session.title)}</h4>
            <p class="text-[11.5px] text-slate-600 leading-relaxed mt-1 line-clamp-3">${esc(ev.session.blurb)}</p>
          </div>
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
            <span class="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-full border ${catBadge(ev.category)}">${esc(ev.catName)}</span>
            <a href="${esc(sessionHref(ev))}" class="inline-flex items-center gap-1.5 bg-[#39A900] hover:bg-[#2D8200] text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-2xs transition-colors">
              <span>Proyectar</span><i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        </article>`);
    });
    grid.innerHTML = cards.join('');

    const proximas = EVIDENCIAS.filter((e) => !e.session && GUIA_ACTIVA && e.guia === GUIA_ACTIVA.id);
    pending.innerHTML = proximas.map((ev) => `
      <div class="p-2.5 bg-white/90 rounded-xl border border-amber-100 flex items-center justify-between gap-2">
        <span class="font-medium text-slate-700 truncate"><span class="font-mono text-[10px] text-slate-400 mr-1">${esc(shortCode(ev.code))}</span>${esc(ev.title)}</span>
        <span class="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded shrink-0">Próxima</span>
      </div>`).join('') || '<p class="text-xs text-amber-900">Todas las sesiones de la guía activa están publicadas.</p>';
  }

  function renderFooterSessions() {
    const list = $('footer-resources');
    if (!list) return;
    const items = [];
    CATALOG.guias.filter((g) => g.generalSession).forEach((g) => {
      items.push(`<li><a href="${esc(g.folder + g.generalSession.file)}" class="hover:text-emerald-400 transition-colors flex items-center gap-1.5"><i data-lucide="monitor" class="w-3.5 h-3.5"></i> Sesión general ${esc(g.name)}</a></li>`);
    });
    uniqueSessions().forEach(({ ev }) => {
      items.push(`<li><a href="${esc(sessionHref(ev))}" class="hover:text-emerald-400 transition-colors flex items-center gap-1.5"><i data-lucide="presentation" class="w-3.5 h-3.5 shrink-0"></i> <span class="truncate">${esc(ev.session.title)}</span></a></li>`);
    });
    list.insertAdjacentHTML('beforeend', items.join(''));
  }

  // ---------------------------------------------------------------------------
  // 5. Inicialización y eventos (delegación)
  // ---------------------------------------------------------------------------
  function init() {
    // Fecha del cintillo
    const fecha = new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const elFecha = $('cintillo-fecha');
    if (elFecha) elFecha.textContent = fecha.charAt(0).toUpperCase() + fecha.slice(1);

    document.querySelectorAll('[data-sesiones-count]').forEach((el) => { el.textContent = sesionesDisponibles(); });

    renderRuta();
    renderEvidencias();
    renderProjectionSelector();
    renderFooterSessions();

    // Filtros
    const guiaBtns = Array.from(document.querySelectorAll('.guia-filter-btn'));
    const catBtns = Array.from(document.querySelectorAll('.cat-filter-btn'));
    guiaBtns.forEach((btn) => btn.addEventListener('click', () => {
      setActiveFilter(guiaBtns, btn, GUIA_ON, FILTER_OFF);
      state.guia = btn.dataset.guia; state.page = 1; renderEvidencias();
    }));
    catBtns.forEach((btn) => btn.addEventListener('click', () => {
      setActiveFilter(catBtns, btn, CAT_ON, FILTER_OFF);
      state.cat = btn.dataset.cat; state.page = 1; renderEvidencias();
    }));

    const search = $('evidence-search');
    search.setAttribute('aria-label', 'Buscar evidencias');
    search.addEventListener('input', (e) => { state.query = e.target.value; state.page = 1; renderEvidencias(); });

    $('reset-filter-btn')?.addEventListener('click', () => {
      search.value = '';
      Object.assign(state, { guia: 'all', cat: 'all', query: '', page: 1 });
      setActiveFilter(guiaBtns, guiaBtns[0], GUIA_ON, FILTER_OFF);
      setActiveFilter(catBtns, catBtns[0], CAT_ON, FILTER_OFF);
      renderEvidencias();
    });

    // Banner de competencias transversales
    const banner = $('transversales-banner');
    $('btn-transversales-info')?.addEventListener('click', () => {
      banner.classList.toggle('hidden');
      if (!banner.classList.contains('hidden')) banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    $('close-transversales-banner')?.addEventListener('click', () => banner.classList.add('hidden'));

    // Delegación: tarjetas, ruta, paginación, checklist
    document.addEventListener('click', (e) => {
      const open = e.target.closest('[data-open-evidence]');
      if (open) { openEvidenceModal(open.dataset.openEvidence); return; }
      const na = e.target.closest('[data-not-available]');
      if (na) { showNotAvailableModal(na.dataset.notAvailable); return; }
      const page = e.target.closest('[data-page]');
      if (page && !page.disabled) { goToPage(Number(page.dataset.page)); return; }
      const closer = e.target.closest('[data-close-modal]');
      if (closer) closeModal(closer.dataset.closeModal);
    });
    $('modal-content-area').addEventListener('change', (e) => {
      if (e.target.matches('[data-check-idx]')) toggleCheckItem(Number(e.target.dataset.checkIdx));
    });

    // Modal de detalle
    $('modal-close-btn').addEventListener('click', closeEvidenceModal);
    $('modal-ok-btn').addEventListener('click', closeEvidenceModal);
    ['pasos', 'criterios', 'checklist'].forEach((tab) =>
      $(`tab-btn-${tab}`).addEventListener('click', () => { activeTab = tab; renderModalTab(); }));

    // Cierre por backdrop
    [['evidence-modal', closeEvidenceModal], ['not-available-modal', () => closeModal('not-available-modal')], ['projection-selector-modal', () => closeModal('projection-selector-modal')]]
      .forEach(([id, close]) => $(id)?.addEventListener('click', (e) => { if (e.target.id === id) close(); }));

    // Menú móvil
    const mobileBtn = $('btn-mobile-menu');
    const mobileDrawer = $('mobile-menu-drawer');
    if (mobileBtn && mobileDrawer) {
      mobileBtn.setAttribute('aria-controls', 'mobile-menu-drawer');
      mobileBtn.setAttribute('aria-expanded', 'false');
      mobileBtn.addEventListener('click', () => {
        const willOpen = mobileDrawer.classList.contains('hidden');
        mobileDrawer.classList.toggle('hidden', !willOpen);
        mobileBtn.setAttribute('aria-expanded', String(willOpen));
      });
      mobileDrawer.querySelectorAll('a, button').forEach((link) => link.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }));
    }

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      closeEvidenceModal();
      closeModal('not-available-modal');
      closeModal('projection-selector-modal');
    });

    // Enlace directo: index.html#ev-05 (al cargar y al cambiar el hash)
    const openFromHash = () => {
      const id = location.hash.slice(1);
      if (EVIDENCIAS.some((ev) => ev.id === id)) openEvidenceModal(id);
    };
    window.addEventListener('hashchange', openFromHash);
    openFromHash();

    renderIcons();
  }

  // API usada por los onclick del HTML estático
  window.openProjectionSelectorModal = () => openModal('projection-selector-modal');
  window.closeProjectionSelectorModal = () => closeModal('projection-selector-modal');
  window.closeNotAvailableModal = () => closeModal('not-available-modal');
  window.openEvidenceModal = openEvidenceModal;
  window.showNotAvailableModal = showNotAvailableModal;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
