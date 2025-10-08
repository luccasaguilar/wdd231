(function () {
  const p = new URLSearchParams(location.search);

  const get = (k) => (p.get(k) || '').trim();

  const map = [
    ['c-first',  'first'],
    ['c-last',   'last'],
    ['c-email',  'email'],
    ['c-mobile', 'mobile'],
  ];
  map.forEach(([outId, key]) => {
    const el = document.getElementById(outId);
    if (el) el.textContent = get(key) || '—';
  });

  const tsEl = document.getElementById('c-ts');
  if (tsEl) {
    const ts = get('timestamp');
    let readable = '—';
    if (ts) {
      const d = new Date(ts);
      readable = isNaN(d) ? ts : d.toLocaleString();
    }
    tsEl.textContent = readable;
  }
})();
