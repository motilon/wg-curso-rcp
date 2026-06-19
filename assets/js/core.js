/* =========================================================
   CORE · Lógica universal del template
   ---------------------------------------------------------
   ⛔ NO EDITAR · este archivo es universal para todos los cursos.
   Renderiza sidebar, breadcrumb, screen-nav y maneja todas
   las interacciones de los componentes UI.
   ========================================================= */

(function () {
  'use strict';

  const C = window.WG_COURSE || { menu: [] };
  // 'hibrida' se conserva como id interno (data-version="hibrida") por compat
  // con el HTML existente, pero se muestra al usuario como "Oscura".
  const VERSIONS = ['hibrida', 'clara'];
  const VERSION_LABELS = { hibrida: 'Oscura', clara: 'Clara' };
  const VERSION_ICONS  = { hibrida: 'mdi:weather-night', clara: 'mdi:white-balance-sunny' };

  /* ============================================
     RENDER · sidebar
     ============================================ */
  function renderSidebar() {
    const el = document.querySelector('[data-wg-sidebar]');
    if (!el) return;
    const currentId = el.dataset.current;
    const idx = C.menu.findIndex(m => m.id === currentId);
    const total = C.menu.length;
    const completed = Math.max(0, idx);
    const progress = ((completed + 1) / total) * 100;

    el.innerHTML = `
      <div class="wg-sidebar__brand">
        <img class="wg-brand-logo wg-brand-logo--desktop" src="${C.brand.logo}" alt="${C.brand.name || 'WAYGROUP'}" />
        ${C.brand.logoMobile ? `<img class="wg-brand-logo wg-brand-logo--mobile" src="${C.brand.logoMobile}" alt="${C.brand.name || 'WAYGROUP'}" />` : ''}
        ${C.brand.name || C.brand.sub ? `
          <div>
            ${C.brand.name ? `<strong>${C.brand.name}</strong>` : ''}
            ${C.brand.sub  ? `<small>${C.brand.sub}</small>`   : ''}
          </div>
        ` : ''}
      </div>
      <div class="wg-sidebar__course">
        ${C.course.code     ? `<span class="wg-sidebar__course-tag">${C.course.code}</span>` : ''}
        <h3>${C.course.name}</h3>
        ${C.course.subtitle ? `<p>${C.course.subtitle}</p>` : ''}
      </div>
      <nav class="wg-sidebar__menu">
        ${C.menu.map((m, i) => {
          const state = i < idx ? 'is-done' : (i === idx ? 'is-active' : '');
          return `
            <a href="${m.file}" class="wg-sidebar__menu-item ${state}" data-title="${m.titulo}" aria-current="${i === idx ? 'page' : 'false'}">
              <span class="num">${m.num}</span>
              <span class="title">${m.titulo}</span>
              <iconify-icon icon="${m.icon}"></iconify-icon>
            </a>
          `;
        }).join('')}
      </nav>
      <div class="wg-sidebar__progress" data-progress="${completed + 1}/${total}">
        <div class="label">
          <span>Progreso</span>
          <strong>${completed + 1}/${total}</strong>
        </div>
        <div class="bar"><div class="bar-fill" style="width:${progress}%"></div></div>
      </div>
    `;
  }

  /* ============================================
     TOGGLE · colapsar/expandir sidebar
     Persistencia en localStorage
     ============================================ */
  function setupSidebarToggle(){
    // Lectura inicial de la preferencia guardada · no la aplicamos todavía
    const saved = localStorage.getItem('wg-sidebar-collapsed');

    // Solo inyectar si hay sidebar en la página (no en archivos del template)
    if (!document.querySelector('[data-wg-sidebar]')) return;
    if (document.querySelector('[data-wg-sidebar-toggle]')) return; // ya existe

    // Inyectar el botón flotante al body (afuera del sidebar para que position:fixed funcione)
    const btn = document.createElement('button');
    btn.className = 'wg-sidebar__toggle';
    btn.setAttribute('data-wg-sidebar-toggle', '');
    btn.title = saved === 'true' ? 'Expandir menú' : 'Colapsar menú';
    btn.innerHTML = '<iconify-icon icon="mdi:chevron-left" style="transition:transform .25s ease;"></iconify-icon>';
    // Fallback inline para garantizar visibilidad incluso si el CSS está cacheado viejo
    btn.style.cssText = `
      position: fixed; top: 24px;
      left: calc(var(--sidebar-w, 300px) - 16px);
      width: 32px; height: 32px;
      border-radius: 50%;
      background: var(--bg-surface, #fff);
      border: 1px solid var(--border-c, #e5e7eb);
      color: var(--text-pri, #3a4255);
      display: grid; place-items: center;
      cursor: pointer;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0,0,0,.15);
      transition: left .25s ease, background .2s ease, transform .2s ease;
    `;
    document.body.appendChild(btn);
    console.log('[wg] Sidebar toggle inyectado:', btn);

    // Helper · aplica los estilos inline para garantizar funcionamiento aunque el CSS esté cacheado
    function applyCollapsedState(collapsed){
      const app = document.querySelector('.wg-app');
      const sidebar = document.querySelector('.wg-sidebar');
      const ico = btn.querySelector('iconify-icon');
      if (collapsed) {
        if (app) app.style.gridTemplateColumns = '72px 1fr';
        btn.style.left = 'calc(72px - 16px)';
        if (ico) ico.style.transform = 'rotate(180deg)';
        // Ocultar elementos textuales
        document.querySelectorAll(
          '.wg-sidebar__course, .wg-sidebar__brand > div, ' +
          '.wg-sidebar__menu-item .num, .wg-sidebar__menu-item .title, ' +
          '.wg-sidebar__progress .label, .wg-sidebar__progress .bar'
        ).forEach(el => { el.style.display = 'none'; });
        // Centrar iconos del menú
        document.querySelectorAll('.wg-sidebar__menu-item').forEach(el => {
          el.style.gridTemplateColumns = '1fr';
          el.style.justifyItems = 'center';
          el.style.padding = '10px 0';
        });
        document.querySelectorAll('.wg-sidebar__brand').forEach(el => {
          el.style.justifyContent = 'center';
          el.style.padding = '16px 8px';
        });
      } else {
        if (app) app.style.gridTemplateColumns = '';
        btn.style.left = 'calc(var(--sidebar-w, 300px) - 16px)';
        if (ico) ico.style.transform = 'rotate(0deg)';
        document.querySelectorAll(
          '.wg-sidebar__course, .wg-sidebar__brand > div, ' +
          '.wg-sidebar__menu-item .num, .wg-sidebar__menu-item .title, ' +
          '.wg-sidebar__progress .label, .wg-sidebar__progress .bar'
        ).forEach(el => { el.style.display = ''; });
        document.querySelectorAll('.wg-sidebar__menu-item').forEach(el => {
          el.style.gridTemplateColumns = '';
          el.style.justifyItems = '';
          el.style.padding = '';
        });
        document.querySelectorAll('.wg-sidebar__brand').forEach(el => {
          el.style.justifyContent = '';
          el.style.padding = '';
        });
      }
    }

    // Detectar viewport mobile · el toggle NO debe aplicar ahí (entra el burger overlay)
    const mqMobile = window.matchMedia('(max-width: 1024px)');
    const html = document.documentElement;

    function syncWithViewport(){
      if (mqMobile.matches) {
        // ===== MOBILE =====
        // 1) Ocultar el toggle
        btn.style.display = 'none';
        // 2) QUITAR el atributo del <html> · sin tocar localStorage (preferencia persiste)
        html.removeAttribute('data-sidebar-collapsed');
        // 3) Limpiar todos los inline styles
        applyCollapsedState(false);
      } else {
        // ===== DESKTOP =====
        // 1) Mostrar el toggle
        btn.style.display = '';
        // 2) Restaurar el estado guardado en localStorage
        if (saved === 'true') {
          html.setAttribute('data-sidebar-collapsed', 'true');
          applyCollapsedState(true);
          btn.title = 'Expandir menú';
        } else {
          html.removeAttribute('data-sidebar-collapsed');
          applyCollapsedState(false);
          btn.title = 'Colapsar menú';
        }
      }
    }

    syncWithViewport();

    // Re-sincronizar cuando cambia el viewport
    mqMobile.addEventListener('change', syncWithViewport);

    // Listener del click · solo funciona en desktop
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (mqMobile.matches) return; // ignorar en mobile
      const html = document.documentElement;
      const isCollapsed = html.getAttribute('data-sidebar-collapsed') === 'true';
      if (isCollapsed) {
        html.removeAttribute('data-sidebar-collapsed');
        localStorage.setItem('wg-sidebar-collapsed', 'false');
        btn.title = 'Colapsar menú';
        applyCollapsedState(false);
      } else {
        html.setAttribute('data-sidebar-collapsed', 'true');
        localStorage.setItem('wg-sidebar-collapsed', 'true');
        btn.title = 'Expandir menú';
        applyCollapsedState(true);
      }
    });
  }

  /* ============================================
     RENDER · breadcrumb topbar
     ============================================ */
  function renderBreadcrumb() {
    const el = document.querySelector('[data-wg-breadcrumb]');
    if (!el) return;
    const currentId = el.dataset.current;
    const idx = C.menu.findIndex(m => m.id === currentId);
    if (idx < 0) return;
    const m = C.menu[idx];
    el.innerHTML = `
      <span class="step">${m.num} / ${C.menu.length.toString().padStart(2, '0')}</span>
      <span>${C.course.name}</span>
      <span class="sep">›</span>
      <strong>${m.titulo}</strong>
    `;
  }

  /* ============================================
     RENDER · prev/next nav
     ============================================ */
  function renderScreenNav() {
    const el = document.querySelector('[data-wg-screen-nav]');
    if (!el) return;
    const currentId = el.dataset.current;
    const idx = C.menu.findIndex(m => m.id === currentId);
    const prev = idx > 0 ? C.menu[idx - 1] : null;
    const next = idx >= 0 && idx < C.menu.length - 1 ? C.menu[idx + 1] : null;
    el.innerHTML = `
      ${prev ? `
        <a href="${prev.file}" class="wg-screen-nav__btn wg-screen-nav__btn--prev">
          <span class="ico"><iconify-icon icon="mdi:arrow-left"></iconify-icon></span>
          <span><small>Anterior</small><strong>${prev.titulo}</strong></span>
        </a>
      ` : `<span></span>`}
      ${next ? `
        <a href="${next.file}" class="wg-screen-nav__btn wg-screen-nav__btn--next">
          <span><small>Siguiente</small><strong>${next.titulo}</strong></span>
          <span class="ico"><iconify-icon icon="mdi:arrow-right"></iconify-icon></span>
        </a>
      ` : `<span></span>`}
    `;
  }

  /* ============================================
     RENDER · botón "Siguiente" del topbar
     Calcula automáticamente la próxima pantalla en la secuencia
     ============================================ */
  function renderNextIconBtn() {
    document.querySelectorAll('[data-wg-next-iconbtn]').forEach(btn => {
      // Obtener pantalla actual desde el sidebar o breadcrumb
      const host = document.querySelector('[data-wg-breadcrumb][data-current]')
                || document.querySelector('[data-wg-sidebar][data-current]');
      if (!host) return;
      const currentId = host.dataset.current;
      const idx = C.menu.findIndex(m => m.id === currentId);
      if (idx < 0) return;
      const next = idx < C.menu.length - 1 ? C.menu[idx + 1] : null;
      if (next) {
        btn.href = next.file;
        btn.title = `Siguiente: ${next.titulo}`;
      } else {
        // Última pantalla · llevar al inicio
        btn.href = 'index.html';
        btn.title = 'Volver al inicio';
        btn.querySelector('iconify-icon')?.setAttribute('icon', 'mdi:restart');
      }
    });
  }

  /* ============================================
     VERSIÓN del template (hibrida/clara/oscura)
     ============================================ */
  function setVersion(v) {
    if (!VERSIONS.includes(v)) v = 'hibrida';
    document.documentElement.setAttribute('data-version', v);
    localStorage.setItem('wg-version', v);
    document.querySelectorAll('[data-wg-version-btn]').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.wgVersionBtn === v);
    });
  }
  function renderVersionSwitch() {
    document.querySelectorAll('[data-wg-version-switch]').forEach(host => {
      host.innerHTML = `
        <span class="wg-version-switch__label">
          <iconify-icon icon="mdi:palette-outline"></iconify-icon>
          Tema
        </span>
        <div class="wg-version-switch__pills">
          ${VERSIONS.map(v => `
            <button data-wg-version-btn="${v}" title="Versión ${VERSION_LABELS[v]}">
              <iconify-icon icon="${VERSION_ICONS[v]}"></iconify-icon>
              <span>${VERSION_LABELS[v]}</span>
            </button>
          `).join('')}
        </div>
      `;
    });
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-wg-version-btn]');
      if (btn) setVersion(btn.dataset.wgVersionBtn);
    });
    const saved = localStorage.getItem('wg-version') || 'hibrida';
    setVersion(saved);
  }

  /* ============================================
     COMPONENTES INTERACTIVOS
     ============================================ */

  // Acordeón
  function setupAcordeon() {
    document.querySelectorAll('.wg-acordeon').forEach(group => {
      group.querySelectorAll('.wg-acordeon__head').forEach(head => {
        head.addEventListener('click', () => {
          const item = head.parentElement;
          const isOpen = item.classList.contains('is-open');
          group.querySelectorAll('.wg-acordeon__item').forEach(i => i.classList.remove('is-open'));
          if (!isOpen) item.classList.add('is-open');
        });
      });
    });
  }

  // Tabs
  function setupTabs() {
    document.querySelectorAll('.wg-tabs').forEach(tabs => {
      const btns = tabs.querySelectorAll('.wg-tabs__btn');
      const panels = tabs.querySelectorAll('.wg-tabs__panel');
      btns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
          btns.forEach(b => b.classList.remove('is-active'));
          panels.forEach(p => p.classList.remove('is-active'));
          btn.classList.add('is-active');
          panels[i]?.classList.add('is-active');
        });
      });
    });
  }

  // Quiz
  function setupQuiz() {
    document.querySelectorAll('.wg-quiz').forEach(quiz => {
      const opts = quiz.querySelectorAll('.wg-quiz__opt');
      const feedback = quiz.querySelector('.wg-quiz__feedback');
      opts.forEach(opt => {
        opt.addEventListener('click', () => {
          if (quiz.dataset.answered === 'true') return;
          quiz.dataset.answered = 'true';
          const isCorrect = opt.dataset.correct === 'true';
          opt.classList.add(isCorrect ? 'is-correct' : 'is-wrong');
          if (!isCorrect) quiz.querySelector('[data-correct="true"]')?.classList.add('is-correct');
          if (feedback) {
            feedback.classList.add('is-visible');
            feedback.classList.toggle('is-wrong', !isCorrect);
            feedback.innerHTML = isCorrect
              ? (feedback.dataset.correct || '¡Correcto!')
              : (feedback.dataset.wrong || 'Revisa el contenido.');
          }
        });
      });
    });
  }

  // Checklist
  function setupChecklist() {
    document.querySelectorAll('.wg-checklist').forEach(list => {
      const items = list.querySelectorAll('.wg-checklist__item');
      const count = list.querySelector('.wg-checklist__count strong');
      items.forEach(item => {
        item.addEventListener('click', () => {
          item.classList.toggle('is-done');
          const done = list.querySelectorAll('.is-done').length;
          if (count) count.textContent = done;
        });
      });
    });
  }

  // Carrusel
  function setupCarrusel() {
    document.querySelectorAll('.wg-carrusel').forEach(carr => {
      const track = carr.querySelector('.wg-carrusel__track');
      const slides = carr.querySelectorAll('.wg-carrusel__slide');
      const dotsHost = carr.querySelector('.wg-carrusel__dots');
      const prev = carr.querySelector('[data-wg-carrusel-prev]');
      const next = carr.querySelector('[data-wg-carrusel-next]');
      if (!track || !slides.length) return;
      let idx = 0;
      const visible = () => window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;
      const max = () => Math.max(0, slides.length - visible());
      const go = (i) => {
        idx = Math.max(0, Math.min(max(), i));
        const slideW = slides[0].offsetWidth + 16;
        track.style.transform = `translateX(${-idx * slideW}px)`;
        dotsHost?.querySelectorAll('.wg-carrusel__dot').forEach((d, k) => d.classList.toggle('is-active', k === idx));
      };
      if (dotsHost) {
        dotsHost.innerHTML = Array.from({ length: max() + 1 }, (_, i) =>
          `<button class="wg-carrusel__dot ${i === 0 ? 'is-active' : ''}" data-i="${i}"></button>`
        ).join('');
        dotsHost.addEventListener('click', e => {
          const d = e.target.closest('.wg-carrusel__dot');
          if (d) go(parseInt(d.dataset.i));
        });
      }
      prev?.addEventListener('click', () => go(idx - 1));
      next?.addEventListener('click', () => go(idx + 1));
    });
  }

  // Drag & Drop
  function setupDnD() {
    let dragged = null;
    document.querySelectorAll('.wg-dnd__item').forEach(item => {
      item.draggable = true;
      item.addEventListener('dragstart', () => { dragged = item; item.classList.add('is-dragging'); });
      item.addEventListener('dragend', () => { item.classList.remove('is-dragging'); dragged = null; });
    });
    document.querySelectorAll('.wg-dnd__zone').forEach(zone => {
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('is-over'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('is-over'));
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('is-over');
        if (!dragged) return;
        const correct = dragged.dataset.wgCorrect === zone.dataset.wgTarget;
        dragged.classList.add(correct ? 'is-correct' : 'is-wrong');
        zone.querySelector('.wg-dnd__items')?.appendChild(dragged);
      });
    });
  }

  // Ordenar
  function setupOrden() {
    document.querySelectorAll('.wg-orden').forEach(list => {
      let dragged = null;
      list.querySelectorAll('.wg-orden__item').forEach(item => {
        item.draggable = true;
        item.addEventListener('dragstart', () => { dragged = item; item.classList.add('is-dragging'); });
        item.addEventListener('dragend',   () => { item.classList.remove('is-dragging'); dragged = null; renumber(list); });
        item.addEventListener('dragover',  e => { e.preventDefault(); if (!dragged || dragged === item) return;
          const rect = item.getBoundingClientRect();
          const after = (e.clientY - rect.top) / rect.height > 0.5;
          item.parentNode.insertBefore(dragged, after ? item.nextSibling : item);
        });
      });
    });
    document.querySelectorAll('[data-wg-orden-check]').forEach(btn => {
      btn.addEventListener('click', () => {
        const list = btn.previousElementSibling?.matches('.wg-orden') ? btn.previousElementSibling : btn.parentElement.querySelector('.wg-orden');
        if (!list) return;
        list.querySelectorAll('.wg-orden__item').forEach((item, i) => {
          item.classList.remove('is-correct', 'is-wrong');
          item.classList.add(parseInt(item.dataset.wgOrder) === i + 1 ? 'is-correct' : 'is-wrong');
        });
      });
    });
  }
  function renumber(list) {
    list.querySelectorAll('.wg-orden__item').forEach((item, i) => {
      const num = item.querySelector('.wg-orden__num');
      if (num) num.textContent = i + 1;
    });
  }

  // Emparejar
  function setupEmparejar() {
    document.querySelectorAll('.wg-empar').forEach(group => {
      let selected = null;
      group.querySelectorAll('.wg-empar__item').forEach(item => {
        item.addEventListener('click', () => {
          if (item.classList.contains('is-matched')) return;
          if (!selected) { selected = item; item.classList.add('is-selected'); return; }
          if (selected === item) { item.classList.remove('is-selected'); selected = null; return; }
          if (selected.parentElement === item.parentElement) {
            selected.classList.remove('is-selected'); selected = item; item.classList.add('is-selected'); return;
          }
          const match = selected.dataset.wgMatch === item.dataset.wgMatch;
          if (match) { [selected, item].forEach(el => { el.classList.add('is-matched'); el.classList.remove('is-selected'); }); }
          else {
            [selected, item].forEach(el => el.classList.add('is-wrong'));
            setTimeout(() => [selected, item].forEach(el => el?.classList.remove('is-wrong', 'is-selected')), 500);
          }
          selected = null;
        });
      });
    });
  }

  // Modal
  function setupModal() {
    document.addEventListener('click', e => {
      const open = e.target.closest('[data-wg-modal-open]');
      if (open) { document.getElementById(open.dataset.wgModalOpen)?.classList.add('is-open'); return; }
      const close = e.target.closest('[data-wg-modal-close]');
      if (close) { close.closest('.wg-modal')?.classList.remove('is-open'); return; }
      if (e.target.classList.contains('wg-modal')) e.target.classList.remove('is-open');
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') document.querySelectorAll('.wg-modal.is-open').forEach(m => m.classList.remove('is-open'));
    });
  }

  // Antes / Después
  function setupBeforeAfter() {
    document.querySelectorAll('.wg-beforeafter').forEach(ba => {
      const after = ba.querySelector('.wg-beforeafter__after');
      const handle = ba.querySelector('.wg-beforeafter__handle');
      let dragging = false;
      const update = (x) => {
        const rect = ba.getBoundingClientRect();
        const pct = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
        if (after)  after.style.clipPath = `inset(0 0 0 ${pct}%)`;
        if (handle) handle.style.left = pct + '%';
      };
      const start = e => { dragging = true; update(e.clientX || e.touches[0].clientX); };
      const move  = e => { if (dragging) update(e.clientX || e.touches[0].clientX); };
      const end   = () => { dragging = false; };
      ba.addEventListener('mousedown', start); document.addEventListener('mousemove', move); document.addEventListener('mouseup', end);
      ba.addEventListener('touchstart', start); document.addEventListener('touchmove', move); document.addEventListener('touchend', end);
    });
  }

  // Burger mobile
  function setupBurger() {
    const burger = document.querySelector('[data-wg-burger]');
    const sidebar = document.querySelector('[data-wg-sidebar]');
    if (!burger || !sidebar) return;
    burger.addEventListener('click', () => sidebar.classList.toggle('is-open'));
  }

  // Reveal on scroll
  function setupReveal() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
  }

  // Keyboard nav
  function setupKeyboardNav() {
    document.addEventListener('keydown', e => {
      if (e.target.matches('input, textarea, select, button')) return;
      const nav = document.querySelector('[data-wg-screen-nav]');
      if (!nav) return;
      if (e.key === 'ArrowRight') nav.querySelector('.wg-screen-nav__btn--next')?.click();
      if (e.key === 'ArrowLeft')  nav.querySelector('.wg-screen-nav__btn--prev')?.click();
    });
  }

  /* ============================================
     INIT
     ============================================ */
  document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
    renderBreadcrumb();
    renderScreenNav();
    renderNextIconBtn();
    renderVersionSwitch();
    setupSidebarToggle();
    setupAcordeon();
    setupTabs();
    setupQuiz();
    setupChecklist();
    setupCarrusel();
    setupDnD();
    setupOrden();
    setupEmparejar();
    setupModal();
    setupBeforeAfter();
    setupBurger();
    setupReveal();
    setupKeyboardNav();
  });
})();
