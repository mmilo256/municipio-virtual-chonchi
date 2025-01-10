import axios from 'axios'
import { API_URL } from '../constants/constants'

export const fetchRequestStatusLogs = async (request_id) => {
    try {
        const response = await axios.get(`${API_URL}/portal/requests/${request_id}/historial-estados`, { withCredentials: true })
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.message);
    }
}

export const fetchRequestsByRut = async (run) => {
    try {
        const response = await axios.get(`${API_URL}/portal/requests?run=${run}`, { withCredentials: true })
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const sendRequest = async (data) => {
    try {
        await axios.post(`${API_URL}/portal/requests`, data, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
    } catch (error) {
        throw new Error(error.message)
    }
}