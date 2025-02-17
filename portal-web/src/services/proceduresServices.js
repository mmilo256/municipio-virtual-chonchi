import { logout } from "./authServices"
import apiClient from "./apiClient"

// Función para obtener todos los trámites disponibles
export const fetchAllProcedures = async () => {
    try {
        // Realiza una solicitud GET para obtener todos los trámites disponibles
        const response = await apiClient.get(`/portal/procedures`)

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
        const response = await apiClient.get(`/portal/procedures/${id}`)

        // Extrae y devuelve el trámite desde la respuesta
        const data = response.data.procedure
        return data
    } catch (error) {
        // Si ocurre un error, muestra el mensaje de error y cierra la sesión
        console.log(error.message)
        logout() // Cierra sesión en caso de error
    }
}
