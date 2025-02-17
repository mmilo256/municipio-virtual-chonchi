import apiClient from "./apiClient"

// Función para verificar la validez del token de autenticación
export const fetchSessionData = async () => {
    try {
        // Realiza una solicitud GET al endpoint '/portal/auth/protected' para verificar si el token es válido
        // La opción { withCredentials: true } permite enviar las cookies con la solicitud
        const response = await apiClient.get("/portal/auth/session-data")
        // Si la solicitud es exitosa, devuelve los datos obtenidos (por ejemplo, el estado de autenticación)
        const data = response.data
        return data
    } catch (error) {
        throw error.response.data
    }
}

// Función para cerrar sesión del usuario
export const logout = async () => {
    try {
        // Realiza una solicitud POST al endpoint '/portal/auth/logout' para cerrar sesión en el backend
        await apiClient.post("portal/auth/logout")
    } catch (error) {
        // Si ocurre un error durante el cierre de sesión, lo imprime en la consola
        console.log(error)
    }
}
