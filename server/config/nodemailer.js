import nodemailer from 'nodemailer';
import { config } from './config.js';

const { email, emailPassword, smtp, portalPublicUrl, adminPublicUrl } = config;

// Configura el transporte de correos utilizando nodemailer
const transporter = nodemailer.createTransport({
  host: smtp.host,
  port: smtp.port,
  secure: smtp.secure,
  auth: {
    user: email, // Usuario de correo electrónico obtenido de las variables de entorno
    pass: emailPassword, // Contraseña de correo electrónico obtenida de las variables de entorno
  },
  disableUrlAccess: true,
});

// Función para enviar un correo electrónico
export const sendEmail = async (to, subject, html, attachments) => {
  const configuredHtml = html
    ?.replaceAll('https://municipiovirtualchonchi.cl/admin', adminPublicUrl)
    .replaceAll('https://municipiovirtualchonchi.cl', portalPublicUrl);
  // Envía el correo utilizando el transporte configurado
  const info = await transporter.sendMail({
    from: email, // Dirección de correo del remitente (configurada en las variables de entorno)
    to, // Dirección de correo del destinatario
    subject, // Asunto del correo
    html: configuredHtml, // Cuerpo del correo con enlaces del ambiente actual
    attachments, // Archivos adjuntos, si los hay
  });
  return info;
};
