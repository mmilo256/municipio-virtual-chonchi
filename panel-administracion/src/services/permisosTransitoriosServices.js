import apiClient from "./apiClient"

export const uploadSignedDocument = async (id, file) => {
    try {
        await apiClient.post(`/permisos-transitorios/${id}/subir-decreto`, file, { headers: { "Content-Type": "multipart/form-data" } })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`)
    }
}

export const approveRequestPT = async (id, data) => {
    try {
        await apiClient.post(`/permisos-transitorios/${id}/aprobar`, { data })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`)
    }
}

export const generarDecreto = async (requestId, data) => {
    try {
        const response = apiClient.post(`/permisos-transitorios/${requestId}/generar-decreto`, data)
        return response
    } catch (error) {
        console.log(error)
        throw error.message
    }
}

export const fetchFinalDocument = async (solicitud_id, estado_doc = "sin firmar") => {
    try {
        const response = await apiClient.get(`/permisos-transitorios/${solicitud_id}/obtener-decreto?estado_doc=${estado_doc}`)
        const data = response.data
        return data.document
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`);
    }
}