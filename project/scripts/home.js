import { initMainShell } from './main.js';
import { initLazyLoad } from './lazyload.js';
import { initProvinces, setupMapModalWiring, openModal, closeModal } from './provinces.js';

initMainShell();
initLazyLoad();
setupMapModalWiring();
initProvinces();
openModal();
closeModal();