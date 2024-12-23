import nodemailer from 'nodemailer'
import 'dotenv/config'

const transporter = nodemailer.createTransport({
    host: 'mail.municipalidadchonchi.cl',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

export const sendEmail = async (to, subject, html) => {
    const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        html
    })
}