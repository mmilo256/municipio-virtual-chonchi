import apiClient from './apiClient'

export const borrarDocumentoAsociado = async (solicitudId, documentoId) => {
    try {
        await apiClient.delete(`admin/requests/${solicitudId}/documentos-asociados/${documentoId}`)
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`)
    }
}

export const fetchDocumentosAsociados = async (id) => {
    try {
        const response = await apiClient.get(`admin/requests/${id}/documentos-asociados`)
        const data = response.data
        return data
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`)
    }
}

export const subirDocumentoAsociado = async (id, file) => {
    try {
        await apiClient.post(`admin/requests/${id}/documento-asociado`, file, { headers: { "Content-Type": "multipart/form-data" } })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`)
    }
}

export const updateRequestStatus = async (requestId, estado) => {
    try {
        await apiClient.patch(`/admin/requests/${requestId}/estado`, { estado })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`)
    }
}

export const fetchRequestById = async (requestId) => {
    try {
        const response = await apiClient.get(`/admin/requests/${requestId}`)
        const data = response.data.request
        return data
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`);

    }
}

export const fetchRequestsByProcedure = async (procedureId) => {
    try {
        const response = await apiClient.get(`/admin/requests?tramiteId=${procedureId}`)
        const data = response.data.requests
        return data
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`)
    }
}