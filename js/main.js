// Menú móvil — abrir/cerrar, sin dependencias externas.
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var closeBtn = document.querySelector('.nav-close');
  var nav = document.querySelector('.main-nav');
  var scrim = document.querySelector('.nav-scrim');

  if (!toggle || !nav) return;

  function abrirMenu() {
    nav.classList.add('is-open');
    scrim && scrim.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function cerrarMenu() {
    nav.classList.remove('is-open');
    scrim && scrim.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', abrirMenu);
  closeBtn && closeBtn.addEventListener('click', cerrarMenu);
  scrim && scrim.addEventListener('click', cerrarMenu);

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', cerrarMenu);
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrarMenu();
  });
});
