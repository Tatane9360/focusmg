// Rideau noir entre les pages : il se lève à l'arrivée et retombe avant de partir
import { $ } from './utils.js';
import { gsap } from './gsap.js';
import { heroTimeline } from './hero.js';

const OPEN = 'inset(0% 0 0% 0)';
const GONE_UP = 'inset(0 0 100% 0)';
const GONE_DOWN = 'inset(100% 0 0 0)';

export function initTransitions({ enter }) {
  const curtain = $('.curtain');
  if (!curtain) return;
  curtain.style.animation = 'none';

  if (enter) {
    gsap.timeline()
      .fromTo(curtain, { clipPath: OPEN }, { clipPath: GONE_UP, duration: 1.1, ease: 'expo.inOut' })
      .add(heroTimeline(), '-=0.5');
  } else {
    gsap.set(curtain, { clipPath: GONE_UP });
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === '_blank' || a.hasAttribute('download') || a.origin !== location.origin) return;
    if (a.pathname === location.pathname) return; // ancre dans la même page
    e.preventDefault();
    gsap.fromTo(curtain, { clipPath: GONE_DOWN }, {
      clipPath: OPEN, duration: 0.7, ease: 'expo.inOut', onComplete: () => (location.href = a.href),
    });
  });

  // Retour arrière depuis le cache du navigateur : la page ne doit pas rester couverte
  addEventListener('pageshow', (e) => e.persisted && gsap.set(curtain, { clipPath: GONE_UP }));
}
