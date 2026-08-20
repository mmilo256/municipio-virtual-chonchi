import { normalizeRecipients } from '../services/notifications.service.js';
import { resolveStoredFile } from './storagePaths.js';

export const normalizeEmailRequest = ({ to, subject, html, attachments }) => {
  const recipients = normalizeRecipients(to);
  if (!recipients.length || recipients.length > 20) throw new Error('Destinatarios inválidos');
  if (typeof subject !== 'string' || !subject.trim() || subject.length > 200) {
    throw new Error('Asunto inválido');
  }
  if (typeof html !== 'string' || !html.trim() || html.length > 500000) {
    throw new Error('Contenido de correo inválido');
  }

  const items = attachments ? (Array.isArray(attachments) ? attachments : [attachments]) : [];
  if (items.length > 10) throw new Error('Demasiados archivos adjuntos');
  const safeAttachments = items.map((attachment) => {
    if (!attachment || typeof attachment.path !== 'string') {
      throw new Error('Archivo adjunto inválido');
    }
    return {
      filename: String(attachment.filename || 'documento').replace(/[\r\n"]/g, '').slice(0, 150),
      path: resolveStoredFile(attachment.path),
    };
  });

  return {
    to: recipients,
    subject: subject.trim().replace(/[\r\n]/g, ' '),
    html,
    attachments: safeAttachments,
  };
};
