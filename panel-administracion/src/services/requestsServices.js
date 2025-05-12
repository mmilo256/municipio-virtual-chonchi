import apiClient from './apiClient'

export const borrarDocumentoAsociado = async (solicitudId, documentoId) => {
    try {
        await apiClient.delete(`/requests/${solicitudId}/documentos-asociados/${documentoId}`)
    } catch (error) {
        throw error.message
    }
}

export const fetchDocumentosAsociados = async (id) => {
    try {
        const response = await apiClient.get(`/requests/${id}/documentos-asociados`)
        const data = response.data
        return data
    } catch (error) {
        throw error.message
    }
}

export const subirDocumentoAsociado = async (id, data) => {
    try {
        await apiClient.post(`/requests/${id}/documents`, data, { headers: { "Content-Type": "multipart/form-data" } })
    } catch (error) {
        throw error.message
    }
}

export const updateRequestStatus = async (requestId, estado) => {
    try {
        await apiClient.patch(`/requests/${requestId}/estado`, { estado })
    } catch (error) {
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

export const fetchRequestsByProcedure = async (procedureId) => {
    try {
        const response = await apiClient.get(`/requests/procedure/${procedureId}`)
        const data = response.data
        return data
    } catch (error) {
        throw error.message
    }
}