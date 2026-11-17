// Menu plein écran (mobile) : rideau qui descend, liens qui montent un à un
import { $, $$, reducedMotion } from './utils.js';
import { gsap } from './gsap.js';
import { lockScroll } from './smooth.js';

const HIDDEN = 'inset(0 0 100% 0)';
const SHOWN = 'inset(0 0 0% 0)';

export function initMenu() {
  const toggle = $('.nav__toggle');
  const menu = $('#menu');
  if (!toggle || !menu) return;

  // Chaque lien reçoit un masque pour que le texte puisse « monter » dedans
  if (!reducedMotion) $$('nav a', menu).forEach((a) => (a.innerHTML = `<span class="line"><span>${a.innerHTML}</span></span>`));
  const items = $$('.line > span', menu);
  let tl;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    lockScroll(open);
    if (reducedMotion) { menu.hidden = !open; return; }

    tl?.kill(); // un second clic interrompt l'animation en cours
    if (open) {
      menu.hidden = false;
      tl = gsap.timeline()
        .fromTo(menu, { clipPath: HIDDEN }, { clipPath: SHOWN, duration: 0.9, ease: 'expo.inOut' })
        .fromTo(items, { yPercent: 110 }, { yPercent: 0, stagger: 0.05, duration: 1 }, 0.25)
        .fromTo('.menu__foot', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.6);
    } else {
      tl = gsap.timeline({ onComplete: () => (menu.hidden = true) })
        .to(items, { yPercent: -110, stagger: 0.03, duration: 0.5, ease: 'expo.in' })
        .to('.menu__foot', { autoAlpha: 0, duration: 0.3 }, 0)
        .to(menu, { clipPath: HIDDEN, duration: 0.7, ease: 'expo.inOut' }, 0.15);
    }
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  addEventListener('keydown', (e) => e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true' && setOpen(false));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
}
