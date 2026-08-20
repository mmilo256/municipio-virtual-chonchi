import { sendEmail } from '../config/nodemailer.js';
import { normalizeEmailRequest } from '../utils/emailInput.js';

export const sendMail = async (req, res) => {
  try {
    const { to, subject, html, attachments } = normalizeEmailRequest(req.body);
    await sendEmail(to, subject, html, attachments);
    res.status(200).json({ message: 'Correo enviado exitosamente' });
  } catch (error) {
    const invalidInput = error.message.includes('inválid') || error.message.includes('Demasiados');
    res.status(invalidInput ? 400 : 500).json({ message: 'No se pudo enviar el email' });
  }
};
