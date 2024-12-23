import axios from 'axios'
import { API_URL } from '../constants/constants'

export const updateRequestStatus = async (requestId, estado) => {
    try {
        await axios.patch(`${API_URL}/requests/${requestId}`, { estado })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`)
    }
}

export const fetchRequestById = async (requestId) => {
    try {
        const response = await axios.get(`${API_URL}/requests/${requestId}`)
        const data = response.data.request
        return data
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`);

    }
}

export const fetchRequestsByProcedure = async (procedureId) => {
    try {
        const response = await axios.get(`${API_URL}/requests?tramiteId=${procedureId}`)
        const data = response.data.requests
        return data
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`)
    }
}