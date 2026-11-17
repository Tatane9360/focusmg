// Galerie : défilement horizontal épinglé (tablette et desktop)
import { $ } from './utils.js';
import { gsap } from './gsap.js';

export function initGallery() {
  const track = $('.gallery__track');
  if (!track) return;
  gsap.matchMedia().add('(min-width: 640px)', () => {
    const dist = () => track.scrollWidth - innerWidth;
    gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: track.closest('section'), start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true },
    });
  });
}
