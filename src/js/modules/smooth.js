// Défilement fluide (Lenis) synchronisé avec ScrollTrigger
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap.js';

export let lenis = null;

export function initSmooth() {
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

// Bloque le scroll de la page (menu, visionneuse)
export function lockScroll(locked) {
  document.body.style.overflow = locked ? 'hidden' : '';
  if (lenis) locked ? lenis.stop() : lenis.start();
}
