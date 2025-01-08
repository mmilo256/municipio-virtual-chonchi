import { sendEmail } from "../../config/nodemailer.js"

export const sendMail = async (req, res) => {
    const { to, subject, html, attachments } = req.body
    try {
        await sendEmail(to, subject, html, attachments)
        res.status(200).json({ message: 'Email sent' })
    } catch (error) {
        res.status(500).json({ message: 'Error sending email' })
    }
}