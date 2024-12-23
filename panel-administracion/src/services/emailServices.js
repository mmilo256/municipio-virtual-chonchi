import axios from "axios"
import { API_URL } from "../constants/constants"

export const sendEmail = async (to, subject, html) => {
    try {
        await axios.post(`${API_URL}/email/enviar-email`, { to, subject, html })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`)
    }
}