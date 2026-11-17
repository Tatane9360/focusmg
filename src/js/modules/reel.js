// Accueil : la photo s'ouvre jusqu'au plein écran, section épinglée
import { $ } from './utils.js';
import { gsap } from './gsap.js';

export function initReel() {
  const reel = $('.reel');
  if (!reel) return;
  gsap.timeline({ scrollTrigger: { trigger: reel, start: 'top top', end: '+=120%', pin: true, scrub: 1 } })
    .fromTo('.reel__frame', { clipPath: 'inset(22% 28% 22% 28% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.inOut', duration: 1 })
    .fromTo('.reel__frame img', { scale: 1.35 }, { scale: 1, ease: 'power2.inOut', duration: 1 }, 0);
}
