import apiClient from "./apiClient"

export const obtenerTramites = async () => {
    try {
        const response = await apiClient.get(`admin/procedures`)
        const data = response.data
        return data
    } catch (error) {
        throw error.message
    }
}