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

// Lightbox de video (YouTube) — el iframe solo se crea al hacer clic,
// nunca autoplay al cargar la página, y se destruye al cerrar.
document.addEventListener('DOMContentLoaded', function () {
  var modal = document.querySelector('.video-modal');
  if (!modal) return;

  var frameWrap = modal.querySelector('.video-modal-frame');
  var closeBtn = modal.querySelector('.video-modal-close');

  function abrirVideo(videoId) {
    frameWrap.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0" ' +
      'title="Reproductor de video" frameborder="0" ' +
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
      'allowfullscreen></iframe>';
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function cerrarVideo() {
    modal.classList.remove('is-open');
    frameWrap.innerHTML = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-video-id]').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      abrirVideo(trigger.getAttribute('data-video-id'));
    });
  });

  closeBtn && closeBtn.addEventListener('click', cerrarVideo);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) cerrarVideo();
  });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) cerrarVideo();
  });
});
