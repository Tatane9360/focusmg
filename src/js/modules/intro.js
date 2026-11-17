// Accueil : compteur, rideau noir puis entrée de la hero
import { $ } from './utils.js';
import { gsap } from './gsap.js';
import { lenis } from './smooth.js';
import { heroTimeline } from './hero.js';

export function initIntro() {
  const loader = $('.loader');
  loader.style.animation = 'none';
  lenis?.stop();
  gsap.set('.nav', { autoAlpha: 0 });

  const count = { v: 0 };
  const num = $('.loader__num', loader);
  const tl = gsap.timeline({ paused: true })
    .from('.loader__word span', { yPercent: 100, stagger: 0.08, duration: 1.2 })
    .to(count, { v: 100, duration: 1.6, ease: 'power2.inOut', onUpdate: () => (num.textContent = Math.round(count.v)) }, 0)
    .to('.loader__word span', { yPercent: -100, stagger: 0.05, duration: 0.8, ease: 'expo.in' }, '+=0.15')
    .to('.loader__count', { autoAlpha: 0, duration: 0.4 }, '<')
    .fromTo(loader, { clipPath: 'inset(0 0 0% 0)' }, { clipPath: 'inset(0 0 100% 0)', duration: 1.2, ease: 'expo.inOut' }, '-=0.2')
    .add(heroTimeline(), '-=0.55')
    .to('.nav', { autoAlpha: 1, duration: 1 }, '<0.4')
    .add(() => { loader.remove(); lenis?.start(); });

  // On attend les polices pour que les lignes ne bougent pas pendant l'animation
  Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2500))]).then(() => tl.play());
}
