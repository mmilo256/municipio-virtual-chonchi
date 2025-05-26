import apiClient from './apiClient'

// Función para obtener el historial de estados de una solicitud específica
export const fetchRequestStatusLogs = async (request_id) => {
    try {
        // Realiza una solicitud GET para obtener el historial de estados de una solicitud usando su ID
        const response = await apiClient.get(`/requests/${request_id}/historial`)

        // Extrae y devuelve los datos del historial de estados
        const data = response.data
        return data
    } catch (error) {
        // Si ocurre un error, lanza una excepción con el mensaje de error
        console.log(error)
        throw error.message
    }
}

export const fetchRequestById = async (requestId) => {
    try {
        const response = await apiClient.get(`/requests/${requestId}`)
        const data = response.data
        return data
    } catch (error) {
        throw error.message
    }
}

export const fetchDocumentosAdjuntos = async (id) => {
    try {
        const response = await apiClient.get(`/requests/${id}/documents?type=adjunto`)
        const data = response.data
        return data
    } catch (error) {
        throw error.message
    }
}

// Función para obtener todas las solicitudes realizadas por un usuario dado su RUT
export const fetchRequestsByUserId = async (id) => {
    try {
        // Realiza una solicitud GET para obtener las solicitudes asociadas al RUT proporcionado
        const response = await apiClient.get(`/requests/user/${id}`)

        // Extrae y devuelve las solicitudes desde la respuesta
        const data = response.data
        return data
    } catch (error) {
        // Si ocurre un error, lanza una excepción con el mensaje de error
        console.log(error)
        throw error.message
    }
}

// Función para enviar una nueva solicitud con los datos proporcionados
export const sendRequest = async (data) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }
    try {
        // Realiza una solicitud POST para enviar la nueva solicitud con los datos proporcionados
        await apiClient.post(`/requests`, data, config)
    } catch (error) {
        // Si ocurre un error, lanza una excepción con el mensaje de error
        console.log(error)
        throw error.message
    }
}
