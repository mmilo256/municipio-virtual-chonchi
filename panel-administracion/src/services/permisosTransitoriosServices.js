import axios from "axios"
import { API_URL } from "../constants/constants"

export const approveRequestPT = async (data) => {
    try {
        await axios.post(`${API_URL}/procedures/permisos-transitorios`, { data })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`)
    }
}