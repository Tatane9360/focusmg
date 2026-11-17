export const $ = (s, c = document) => c.querySelector(s);
export const $$ = (s, c = document) => [...c.querySelectorAll(s)];
export const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
