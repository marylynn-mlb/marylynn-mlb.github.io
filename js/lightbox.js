// Click a screenshot to see it large. Uses a native <dialog>, so Esc, focus trapping
// and focus return come from the browser. Left/right arrows move between screenshots.
(function () {
  var zooms = Array.prototype.slice.call(document.querySelectorAll('.shot-grid .zoom'));
  if (!zooms.length || typeof HTMLDialogElement === 'undefined') return;

  var dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.setAttribute('aria-label', 'Screenshot viewer');
  dlg.innerHTML =
    '<div class="lb-bar"><span class="lb-count" aria-live="polite"></span>' +
    '<button type="button" class="lb-close" aria-label="Close">Close ✕</button></div>' +
    '<div class="lb-stage"><button type="button" class="lb-nav lb-prev" aria-label="Previous screenshot">←</button>' +
    '<img class="lb-img" alt="">' +
    '<button type="button" class="lb-nav lb-next" aria-label="Next screenshot">→</button></div>' +
    '<p class="lb-cap"></p>';
  document.body.appendChild(dlg);

  var img = dlg.querySelector('.lb-img');
  var cap = dlg.querySelector('.lb-cap');
  var count = dlg.querySelector('.lb-count');
  var prev = dlg.querySelector('.lb-prev');
  var next = dlg.querySelector('.lb-next');
  var i = 0;

  function show(n) {
    i = (n + zooms.length) % zooms.length;
    var z = zooms[i];
    img.src = z.dataset.src;
    img.alt = z.dataset.alt || '';
    cap.textContent = z.dataset.caption || '';
    count.textContent = zooms.length > 1 ? (i + 1) + ' of ' + zooms.length : '';
    prev.hidden = next.hidden = zooms.length < 2;
  }
  function open(n) {
    show(n);
    dlg.showModal();
    document.documentElement.classList.add('lb-open');
  }

  var hero = document.querySelector('.hero-zoom');
  if (hero) hero.addEventListener('click', function () { open(0); });
  zooms.forEach(function (z, n) { z.addEventListener('click', function () { open(n); }); });
  dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
  prev.addEventListener('click', function () { show(i - 1); });
  next.addEventListener('click', function () { show(i + 1); });
  // Clicking the dark area around the picture closes it.
  dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.classList.contains('lb-stage')) dlg.close(); });
  dlg.addEventListener('close', function () { document.documentElement.classList.remove('lb-open'); img.removeAttribute('src'); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1); }
  });
})();
