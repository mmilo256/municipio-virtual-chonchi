import apiClient from './apiClient'

// Función para obtener el historial de estados de una solicitud específica
export const fetchRequestStatusLogs = async (request_id) => {
    try {
        // Realiza una solicitud GET para obtener el historial de estados de una solicitud usando su ID
        const response = await apiClient.get(`/portal/requests/${request_id}/historial-estados`)

        // Extrae y devuelve los datos del historial de estados
        const data = response.data
        return data
    } catch (error) {
        // Si ocurre un error, lanza una excepción con el mensaje de error
        throw new Error(error.message)
    }
}

// Función para obtener todas las solicitudes realizadas por un usuario dado su RUT
export const fetchRequestsByRut = async (run) => {
    try {
        // Realiza una solicitud GET para obtener las solicitudes asociadas al RUT proporcionado
        const response = await apiClient.get(`/portal/requests?run=${run}`)

        // Extrae y devuelve las solicitudes desde la respuesta
        const data = response.data
        return data
    } catch (error) {
        // Si ocurre un error, lanza una excepción con el mensaje de error
        throw new Error(error.message)
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
        await apiClient.post(`/portal/requests`, data, config)
    } catch (error) {
        // Si ocurre un error, lanza una excepción con el mensaje de error
        throw new Error(error.message)
    }
}
