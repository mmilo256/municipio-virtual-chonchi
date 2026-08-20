import { sendEmail } from '../config/nodemailer.js';
import logger from '../config/winston.js';

export const normalizeRecipients = (recipients) => {
  const values = Array.isArray(recipients) ? recipients : [recipients];
  return [...new Set(values.filter((value) => typeof value === 'string').map((v) => v.trim()))]
    .filter(Boolean);
};

export const sendEmailSafely = async (
  { to, subject, html, attachments = null, context = 'notificación' },
  emailSender = sendEmail,
) => {
  const recipients = normalizeRecipients(to);

  if (recipients.length === 0) {
    logger.warn(`Correo omitido sin destinatarios: ${context}`);
    return { status: 'skipped', reason: 'no-recipients' };
  }

  try {
    await emailSender(recipients, subject, html, attachments);
    return { status: 'sent' };
  } catch (error) {
    logger.error(`No se pudo enviar correo (${context}): ${error.message}`);
    return { status: 'failed', reason: error.message };
  }
};
