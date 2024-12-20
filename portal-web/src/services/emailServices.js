import axios from 'axios'
import { API_URL } from '../constants/constants.js';

export const sendEmail = async (to, subject, html, attachments = "") => {
    try {
        const response = await axios.post(`${API_URL}/api/email/send-email`, { to, subject, html, attachments }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = response.data
        return data
    } catch (error) {
        console.log("Error al enviar correo", error); // Muestra un mensaje de error si ocurre un problema durante la solicitud
    }
}