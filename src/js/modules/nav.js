// Lien actif dans la navigation + barre qui se cache en descendant
import { $, $$ } from './utils.js';
import { gsap, ScrollTrigger } from './gsap.js';

// « serie-concert.html » et « serie-sport.html » → « serie » ; « oeuvres.html » et « oeuvre-brou.html » → « oeuvre »
const section = (file) => (file || 'index.html').replace(/s?(\.html|-.*)$/, '');

export function markCurrentPage() {
  const here = section(location.pathname.split('/').pop());
  $$('.nav__links a, .menu a').forEach((a) => {
    if (section(a.getAttribute('href')) === here) a.setAttribute('aria-current', 'page');
  });
}

export function initNavHide() {
  const nav = $('.nav');
  ScrollTrigger.create({
    start: 200, end: 'max',
    onUpdate: (self) => gsap.to(nav, { yPercent: self.direction === 1 ? -100 : 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' }),
    onLeaveBack: () => gsap.to(nav, { yPercent: 0, duration: 0.6 }),
  });
}
