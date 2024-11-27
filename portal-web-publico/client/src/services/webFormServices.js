import axios from 'axios'
import { API_URL } from '../constants/constants.js';

export async function getAllApplications(page = 1) {
    try {
        const response = await axios.get(`${API_URL}/api/solicitudes?limit=5&page=${page}`);
        const data = await response.data
        return data
    } catch (error) {
        console.error(error);
    }
}

export async function getApplicationById(id) {
    try {
        const response = await axios.get(`${API_URL}/api/solicitudes/${id}`);
        const data = await response.data
        return data
    } catch (error) {
        console.error(error);
    }
}
export const updateRequest = async (id, status) => {
    try {
        const res = await axios.patch(`${API_URL}/api/solicitudes/${id}`, { status })
        const data = await res.data
        return data
    } catch (error) {
        console.log(error)
    }
}

export const createApplication = async (data, config) => {
    try {
        await axios.post(`${API_URL}/api/solicitudes`, data, config)
    } catch (error) {
        console.log(error)
    }
}