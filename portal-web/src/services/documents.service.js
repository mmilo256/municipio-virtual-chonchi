import apiClient from "./apiClient"

// Función para obtener un trámite específico por su ID
export const previewDocument = async (id) => {
    try {
        // Realiza una solicitud GET para obtener los detalles de un trámite específico por ID
        const response = await apiClient.get(`/documents/${id}/view`)

        // Extrae y devuelve el trámite desde la respuesta
        const data = response.data
        return data
    } catch (error) {
        // Si ocurre un error, muestra el mensaje de error y cierra la sesión
        console.log(error)
        throw error.message
    }
}