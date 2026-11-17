// Bandeau infini qui accélère avec la vitesse de scroll
import { $ } from './utils.js';
import { gsap, ScrollTrigger } from './gsap.js';

export function initMarquee() {
  const row = $('.marquee__row');
  if (!row) return;
  const loop = gsap.to(row, { xPercent: -50, repeat: -1, duration: 22, ease: 'none' }); // la rangée contient 2 moitiés identiques
  ScrollTrigger.create({
    trigger: row, start: 'top bottom', end: 'bottom top',
    onUpdate: (self) => {
      const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 4);
      gsap.to(loop, { timeScale: boost * self.direction, duration: 0.2, overwrite: true });
      gsap.to(loop, { timeScale: self.direction, duration: 1, delay: 0.2 });
    },
  });
}
