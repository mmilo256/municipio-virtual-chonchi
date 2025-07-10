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
        const response = await apiClient.get(`/requests/${id}/documents?type=subido`)
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

export const subirDocumentoAsociado = async (id, data, status = null, type = null, name = null) => {
    let queries = {}
    if (status) { queries.status = status }
    if (type) { queries.type = type }
    if (name) { queries.name = name }

    const queryString = new URLSearchParams(queries).toString()

    try {
        await apiClient.post(`/requests/${id}/documents?${queryString}`, data, { headers: { "Content-Type": "multipart/form-data" } })
    } catch (error) {
        throw error.message
    }
}

export const updateRequestStatus = async (requestId, status) => {
    try {
        await apiClient.patch(`/requests/${requestId}`, { status })
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

export const fetchRequestsByProcedure = async (procedureId, page = 1, pageSize = 10) => {
    try {
        const response = await apiClient.get(`/requests/procedure/${procedureId}?page=${page}&pageSize=${pageSize}`)
        const data = response.data
        return data
    } catch (error) {
        throw error.message
    }
}