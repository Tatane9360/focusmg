// Bouton « Copier la référence » : <button data-copy="N26583FR001">
import { $$ } from './utils.js';

export function initCopy() {
  $$('[data-copy]').forEach((btn) => {
    const label = btn.textContent;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.textContent = 'Référence copiée';
      } catch {
        btn.textContent = `Référence : ${btn.dataset.copy}`; // presse-papiers refusé : on l'affiche
      }
      btn.classList.add('is-done');
      setTimeout(() => { btn.textContent = label; btn.classList.remove('is-done'); }, 2500);
    });
  });
}
