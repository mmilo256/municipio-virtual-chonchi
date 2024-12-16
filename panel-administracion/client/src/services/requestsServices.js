import axios from 'axios'
import { API_URL } from '../constants/constants'

export const fetchRequestsByProcedure = async (procedureId) => {
    try {
        const response = await axios.get(`${API_URL}/solicitudes?tramiteId=${procedureId}`)
        const data = response.data.requests
        return data
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`)
    }
}