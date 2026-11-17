// Animations au scroll pilotées par attributs data-* dans le HTML
import { $$ } from './utils.js';
import { gsap, ScrollTrigger } from './gsap.js';

// [data-reveal] : le titre monte derrière un masque
function titles() {
  $$('[data-reveal]').forEach((el) => {
    el.innerHTML = `<span class="line"><span>${el.innerHTML}</span></span>`;
    gsap.from(el.firstChild.firstChild, { yPercent: 105, duration: 1.6, scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
}

// [data-words] : les mots s'allument au fil du scroll
function words() {
  $$('[data-words]').forEach((el) => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="inline-block">${w}</span>`).join(' ');
    gsap.fromTo(el.children, { opacity: 0.12 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
    });
  });
}

// [data-rise] : apparition en cascade
function rise() {
  gsap.set('[data-rise]', { autoAlpha: 0, y: 48 });
  ScrollTrigger.batch('[data-rise]', {
    start: 'top 90%', once: true,
    onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 1.2 }),
  });
}

// [data-curtain] : l'image se dévoile (valeur : « up » par défaut, ou « left »)
function curtains() {
  $$('[data-curtain]').forEach((el) => {
    const from = el.dataset.curtain === 'left' ? 'inset(0 100% 0 0)' : 'inset(100% 0 0 0)';
    gsap.from(el, { clipPath: from, duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 85%' } });
  });
}

// [data-parallax="13"] : l'image glisse de N % dans son cadre
function parallax() {
  $$('[data-parallax]').forEach((el) => {
    const n = Number(el.dataset.parallax) || 10;
    gsap.fromTo(el, { yPercent: -n }, {
      yPercent: 0, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

// [data-draw="x|y"] : une ligne se trace au scroll
function lines() {
  $$('[data-draw]').forEach((el) => {
    const axis = el.dataset.draw === 'y' ? 'scaleY' : 'scaleX';
    gsap.fromTo(el, { [axis]: 0 }, {
      [axis]: 1, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top 80%', end: 'bottom 60%', scrub: true },
    });
  });
}

export function initReveals() {
  titles(); words(); rise(); curtains(); parallax(); lines();
}
