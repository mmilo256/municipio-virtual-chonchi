import { sendEmail } from "../config/nodemailer.js"

export const sendMail = async (req, res) => {
    const { to, subject, html, attachments } = req.body
    try {
        const info = await sendEmail(to, subject, html, attachments)
        res.status(200).json({ message: "Correo enviado exitosamente", info })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message, message: "No se pudo enviar el email" })
    }
}