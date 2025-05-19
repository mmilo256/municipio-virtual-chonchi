import nodemailer from 'nodemailer'
import { config } from './config.js'

const { email, emailPassword } = config

// Configura el transporte de correos utilizando nodemailer
const transporter = nodemailer.createTransport({
    host: 'mail.municipalidadchonchi.cl', // Servidor SMTP de la municipalidad
    port: 465, // Puerto seguro para la conexión
    secure: true, // Define que la conexión será segura (SSL/TLS)
    auth: {
        user: email, // Usuario de correo electrónico obtenido de las variables de entorno
        pass: emailPassword // Contraseña de correo electrónico obtenida de las variables de entorno
    }
})

// Función para enviar un correo electrónico
export const sendEmail = async (to, subject, html, attachments) => {
    // Envía el correo utilizando el transporte configurado
    const info = await transporter.sendMail({
        from: email, // Dirección de correo del remitente (configurada en las variables de entorno)
        to, // Dirección de correo del destinatario
        subject, // Asunto del correo
        html, // Cuerpo del correo en formato HTML
        attachments // Archivos adjuntos, si los hay
    })
    return info
}
