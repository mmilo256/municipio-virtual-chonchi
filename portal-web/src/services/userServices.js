import axios from "axios";
import { API_URL } from "../constants/constants";

// Función para obtener el ID de usuario a partir del RUT (run)
export const fetchUserId = async (run) => {
    try {
        // Realiza una solicitud GET para obtener el ID del usuario utilizando su RUT
        const response = await axios.get(`${API_URL}/portal/users?run=${run}`, { withCredentials: true })

        // Extrae el ID del usuario de la respuesta y lo devuelve
        const data = response.data.userId.id
        return data
    } catch (error) {
        // Si ocurre un error, lanza una excepción con el mensaje de error
        throw new Error(error.message);
    }
}
