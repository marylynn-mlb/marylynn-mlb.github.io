// Filter chips on the Projects index. Cards render fully without this script.
(function () {
  var state = { type: 'all', status: 'all' };
  var cards = Array.prototype.slice.call(document.querySelectorAll('#grid .card'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var empty = document.getElementById('empty');
  function apply() {
    var shown = 0;
    cards.forEach(function (c) {
      var ok = (state.type === 'all' || c.dataset.type === state.type) &&
               (state.status === 'all' || c.dataset.status === state.status);
      c.hidden = !ok;
      if (ok) shown++;
    });
    chips.forEach(function (b) {
      b.setAttribute('aria-pressed', String(state[b.dataset.filter] === b.dataset.value));
    });
    empty.hidden = shown !== 0;
  }
  chips.forEach(function (b) {
    b.addEventListener('click', function () {
      state[b.dataset.filter] = b.dataset.value;
      apply();
    });
  });
})();
