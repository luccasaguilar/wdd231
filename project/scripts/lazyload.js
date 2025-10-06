const lazyConfig = {
  fadeClass: 'lazy-fade',
  loadedClass: 'lazy-fade-loaded'
};

document.querySelectorAll(`img.${lazyConfig.fadeClass}`).forEach(img => {
  img.addEventListener('load', () => {
    if (!img.classList.contains(lazyConfig.loadedClass)) {
      img.classList.add(lazyConfig.loadedClass);
    }
  });
});
