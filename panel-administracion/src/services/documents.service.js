import { API_URL } from "../constants/constants.js"
import apiClient from "./apiClient.js"

export const deleteDocumentService = async (id) => {
    try {
        await apiClient.delete(`${API_URL}/documents/${id}`)
    } catch (error) {
        console.log(error)
    }
}