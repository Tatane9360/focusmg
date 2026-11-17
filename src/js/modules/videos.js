// Vidéos YouTube : la miniature est remplacée par le lecteur au clic (rien n'est chargé avant)
import { $$ } from './utils.js';

export function initVideos() {
  $$('[data-yt]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.yt}?autoplay=1&rel=0`;
      iframe.title = btn.getAttribute('aria-label') || 'Vidéo';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      btn.replaceChildren(iframe);
    }, { once: true });
  });
}
