import axios from "axios"
import { API_URL } from "../constants/constants"

export const verifyToken = async () => {
    try {
        const response = await axios.get(`${API_URL}/protected`, { withCredentials: true })
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error)
    }
}