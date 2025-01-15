import axios from "axios"
import { API_URL, HOME_URL, LOGOUT_URL } from "../constants/constants"

// Función para verificar la validez del token de autenticación
export const verifyToken = async () => {
    try {
        // Realiza una solicitud GET al endpoint '/portal/auth/protected' para verificar si el token es válido
        // La opción { withCredentials: true } permite enviar las cookies con la solicitud
        const response = await axios.get(`${API_URL}/portal/auth/protected`, { withCredentials: true })

        // Si la solicitud es exitosa, devuelve los datos obtenidos (por ejemplo, el estado de autenticación)
        const data = response.data
        return data
    } catch (error) {
        // Si ocurre un error (por ejemplo, token inválido), lanza una excepción con el mensaje del error
        throw new Error(error)
    }
}

// Función para cerrar sesión del usuario
export const logout = async () => {
    try {
        // Realiza una solicitud POST al endpoint '/portal/auth/logout' para cerrar sesión en el backend
        // La opción 'credentials: include' asegura que las cookies de la sesión se envíen junto con la solicitud
        await fetch(`${API_URL}/portal/auth/logout`, {
            method: "POST",
            credentials: 'include' // Enviar cookies con la solicitud
        })
    } catch (error) {
        // Si ocurre un error durante el cierre de sesión, lo imprime en la consola
        console.log(error)
    } finally {
        // Elimina la sesión almacenada en sessionStorage
        sessionStorage.removeItem('session')

        // Redirige al usuario a la página de logout
        window.location.href = LOGOUT_URL

        // Después de 1 segundo, redirige al usuario al home (esto permite que el backend complete el proceso de logout)
        setTimeout(() => {
            window.location.href = HOME_URL
        }, 1000);
    }
}
