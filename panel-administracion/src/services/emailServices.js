import apiClient from "./apiClient"

export const sendEmail = async (to, subject, html, attachments) => {
    try {
        await apiClient.post("/email", { to, subject, html, attachments })
    } catch (error) {
        console.log(error)
    }
}