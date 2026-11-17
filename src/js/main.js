// Point d'entrée : chaque module ne s'active que si ses éléments sont dans la page
import { $$, reducedMotion } from './modules/utils.js';
import { ScrollTrigger } from './modules/gsap.js';
import { initSmooth } from './modules/smooth.js';
import { initMenu } from './modules/menu.js';
import { markCurrentPage, initNavHide } from './modules/nav.js';
import { prepareHero, initHeroDrift } from './modules/hero.js';
import { initIntro } from './modules/intro.js';
import { initTransitions } from './modules/transitions.js';
import { initReveals } from './modules/reveal.js';
import { initReel } from './modules/reel.js';
import { initServiceCursor } from './modules/services.js';
import { initGallery } from './modules/gallery.js';
import { initMarquee } from './modules/marquee.js';
import { initLightbox } from './modules/lightbox.js';
import { initCopy } from './modules/copy.js';
import { initContactForm } from './modules/contact-form.js';
import { initVideos } from './modules/videos.js';

// Fonctionnel, avec ou sans animations
initMenu();
markCurrentPage();
initLightbox();
initCopy();
initContactForm();
initVideos();

if (reducedMotion) {
  $$('.loader, .curtain').forEach((el) => el.remove());
} else {
  const hasLoader = !!document.querySelector('.loader');
  initSmooth();
  prepareHero();
  initTransitions({ enter: !hasLoader });
  if (hasLoader) initIntro();
  // Les sections épinglées d'abord : les déclencheurs créés ensuite tiennent compte de leur hauteur
  initReel();
  initGallery();
  initHeroDrift();
  initReveals();
  initServiceCursor();
  initMarquee();
  initNavHide();
  addEventListener('load', () => ScrollTrigger.refresh());
}
