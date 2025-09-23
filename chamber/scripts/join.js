(() => {
  const ts = document.getElementById('timestamp');
  if (ts) ts.value = new Date().toISOString();
})();

(() => {
  const openButtons = document.querySelectorAll('.more-link[data-modal]');
  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modal');
      const dlg = document.getElementById(id);
      if (dlg?.showModal) dlg.showModal();
    });
  });

  document.querySelectorAll('.plan-modal .close-modal').forEach(b =>
    b.addEventListener('click', e => {
      const dlg = e.target.closest('dialog');
      if (dlg?.close) dlg.close();
    })
  );

  document.querySelectorAll('.plan-modal').forEach(dlg => {
    dlg.addEventListener('click', (e) => {
      const rect = dlg.getBoundingClientRect();
      const inDialog =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inDialog) dlg.close();
    });
  });
})();
