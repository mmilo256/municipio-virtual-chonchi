import { API_URL } from "../constants/constants.js"
import apiClient from "./apiClient.js"

export const deleteDocumentService = async (id) => {
    try {
        await apiClient.delete(`/documents/${id}`)
    } catch (error) {
        console.log(error)
    }
}

export const downloadDocumentService = (id) => {
    try {
        window.open(`${API_URL}/documents/${id}/download`)
    } catch (error) {
        console.log(error)
        throw error.message
    }
}