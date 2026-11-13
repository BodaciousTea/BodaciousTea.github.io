(() => {
  const control = document.querySelector('[data-escape-control]');
  const header = document.querySelector('.site-header');
  if (!control || !header) return;
  const modal = document.getElementById(control.dataset.escapeModal || '');
  let timer;
  let hovering = false;
  const active = () => !modal || modal.classList.contains('is-open');
  const hide = () => {
    if (!hovering && document.activeElement !== control) {
      control.classList.remove('is-visible');
    }
  };
  const reveal = () => {
    if (!active()) return;
    clearTimeout(timer);
    control.classList.add('is-visible');
    timer = setTimeout(hide, 2500);
  };
  header.addEventListener('pointerenter', () => {
    hovering = true;
    reveal();
  });
  header.addEventListener('pointerleave', () => {
    hovering = false;
    clearTimeout(timer);
    timer = setTimeout(hide, 1000);
  });
  control.addEventListener('focus', reveal);
  control.addEventListener('blur', () => {
    clearTimeout(timer);
    timer = setTimeout(hide, 1000);
  });
  control.addEventListener('click', () => {
    if (modal) document.getElementById(control.dataset.escapeClose)?.click();
  });
  document.addEventListener('keydown', (event) => {
    if (!active()) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      control.click();
    } else {
      reveal();
    }
  }, true);
  if (modal) {
    const sync = () => {
      clearTimeout(timer);
      control.hidden = !active();
      control.classList.remove('is-visible');
      if (active() && (hovering || header.matches(':hover'))) reveal();
    };
    new MutationObserver(sync).observe(modal, { attributes: true, attributeFilter: ['class'] });
    sync();
  }
})();
