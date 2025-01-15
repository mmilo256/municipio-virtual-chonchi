import axios from "axios"
import { API_URL } from "../constants/constants"
import { logout } from "./authServices"

// Función para obtener los campos de un formulario asociado a un trámite específico
export const fetchFormInputs = async (id) => {
    try {
        // Realiza una solicitud GET para obtener los datos del formulario del trámite mediante el ID proporcionado
        const response = await axios.get(`${API_URL}/portal/procedures/${id}/forms`, { withCredentials: true })

        // Extrae y devuelve los inputs del formulario desde la respuesta
        const data = response.data
        return data.inputs
    } catch (error) {
        // Si ocurre un error (por ejemplo, token inválido o fallo en la solicitud), muestra el mensaje de error y cierra la sesión
        console.log(error.message)
        logout() // Cierra sesión en caso de error
    }
}

// Función para obtener todos los trámites disponibles
export const fetchAllProcedures = async () => {
    try {
        // Realiza una solicitud GET para obtener todos los trámites disponibles
        const response = await axios.get(`${API_URL}/portal/procedures`, { withCredentials: true })

        // Extrae y devuelve los trámites desde la respuesta
        const data = response.data.procedures
        return data
    } catch (error) {
        // Si ocurre un error, muestra el mensaje de error y cierra la sesión
        console.log(error.message)
        logout() // Cierra sesión en caso de error
    }
}

// Función para obtener un trámite específico por su ID
export const fetchProcedureById = async (id) => {
    try {
        // Realiza una solicitud GET para obtener los detalles de un trámite específico por ID
        const response = await axios.get(`${API_URL}/portal/procedures/${id}`, { withCredentials: true })

        // Extrae y devuelve el trámite desde la respuesta
        const data = response.data.procedure
        return data
    } catch (error) {
        // Si ocurre un error, muestra el mensaje de error y cierra la sesión
        console.log(error.message)
        logout() // Cierra sesión en caso de error
    }
}
