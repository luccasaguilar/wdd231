import { initMainShell } from './main.js';
import { initLazyLoad } from './lazyload.js';

initMainShell();
initLazyLoad();

(() => {
  const ts = document.getElementById('timestamp');
  if (ts) ts.value = new Date().toISOString();
})();
