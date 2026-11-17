// Visionneuse : un clic sur une photo [data-lightbox] l'ouvre en grand
import { $, $$ } from './utils.js';
import { lockScroll } from './smooth.js';

export function initLightbox() {
  const dialog = $('.lightbox');
  if (!dialog) return;
  const img = $('img', dialog);
  const caption = $('.lightbox__caption', dialog);

  $$('[data-lightbox]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const photo = $('img', btn);
      img.src = photo.currentSrc || photo.src;
      img.alt = photo.alt;
      caption.textContent = btn.closest('figure')?.querySelector('figcaption')?.textContent ?? '';
      dialog.showModal();
      lockScroll(true);
    });
  });
  dialog.addEventListener('close', () => lockScroll(false));
  dialog.addEventListener('click', (e) => e.target === img && dialog.close());
}
