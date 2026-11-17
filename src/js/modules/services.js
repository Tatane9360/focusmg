// Liste des services : une image suit le curseur au survol d'une ligne
import { $, $$ } from './utils.js';
import { gsap } from './gsap.js';

export function initServiceCursor() {
  const box = $('.cursor-img');
  if (!box || !matchMedia('(hover: hover)').matches) return;
  const img = $('img', box);
  gsap.set(box, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.8 });
  const xTo = gsap.quickTo(box, 'x', { duration: 0.6, ease: 'power3' });
  const yTo = gsap.quickTo(box, 'y', { duration: 0.6, ease: 'power3' });
  addEventListener('mousemove', (e) => { xTo(e.clientX); yTo(e.clientY); });

  $$('[data-img]').forEach((row) => {
    row.addEventListener('mouseenter', () => {
      img.src = row.dataset.img;
      gsap.to(box, { autoAlpha: 1, scale: 1, rotation: gsap.utils.random(-4, 4), duration: 0.6 });
    });
    row.addEventListener('mouseleave', () => gsap.to(box, { autoAlpha: 0, scale: 0.8, duration: 0.5 }));
  });
}
