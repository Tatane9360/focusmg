// Formulaire de devis : ouvre la messagerie avec la demande pré-remplie
// shortcut: pas de serveur d'envoi, le visiteur doit avoir une messagerie configurée ; brancher Formspree ou Netlify Forms pour un envoi direct.
import { $ } from './utils.js';

const LABELS = {
  nom: 'Nom', email: 'E-mail', telephone: 'Téléphone', societe: 'Société ou club',
  type: 'Type de projet', date: 'Date souhaitée', lieu: 'Lieu', message: 'Projet',
};

export function buildMail(data) {
  const lines = Object.entries(LABELS).filter(([k]) => data[k]).map(([k, label]) => `${label} : ${data[k]}`);
  const subject = `Demande de devis : ${data.type || 'projet'} (${data.nom})`;
  return `mailto:contact@focusmg.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}

export function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;
  const status = $('#form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    location.href = buildMail(Object.fromEntries(new FormData(form)));
    status.textContent = 'Votre messagerie s’ouvre avec votre demande pré-remplie. Il ne reste qu’à l’envoyer.';
  });
}
