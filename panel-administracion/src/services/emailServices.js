import apiClient from "./apiClient"

export const sendEmail = async (to, subject, html) => {
    try {
        await apiClient.post(`/admin/email/enviar-email`, { to, subject, html })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`)
    }
}