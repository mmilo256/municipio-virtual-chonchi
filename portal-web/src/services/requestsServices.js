import axios from 'axios'
import { API_URL } from '../constants/constants'

export const sendRequest = async (data) => {
    try {
        await axios.post(`${API_URL}/requests`, data, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
    } catch (error) {
        throw new Error(error.message)
    }
}