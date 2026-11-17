// Entrée du titre principal de chaque page ([data-hero] contient des .line > span)
import { gsap } from './gsap.js';

const LINES = '[data-hero] .line > span';
const FADES = '[data-hero-fade]';

export function prepareHero() {
  gsap.set(LINES, { yPercent: 110 });
  gsap.set(FADES, { autoAlpha: 0, y: 20 });
}

export function heroTimeline() {
  return gsap.timeline()
    .to(LINES, { yPercent: 0, stagger: 0.09, duration: 1.6 })
    .to(FADES, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1.2 }, 0.3);
}

// Le titre s'éloigne doucement quand on quitte la hero
export function initHeroDrift() {
  gsap.to('[data-hero]', {
    yPercent: -18, ease: 'none',
    scrollTrigger: { trigger: '[data-hero]', start: 'top 20%', end: 'bottom top', scrub: true },
  });
}
