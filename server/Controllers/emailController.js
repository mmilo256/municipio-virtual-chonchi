import { sendEmail } from "../config/nodemailer.js"

export const sendMail = async (req, res) => {
    const { to, subject, html } = req.body
    try {
        await sendEmail(to, subject, html)
        res.status(200).json({ message: 'Email sent' })
    } catch (error) {
        res.status(500).json({ message: 'Error sending email' })
    }
}