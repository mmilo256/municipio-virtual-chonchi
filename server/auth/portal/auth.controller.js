import { getAccessToken, getAuthUrl, getUserData, insertUser } from './auth.service.js'
import { generateJWT, generateRandomToken, verifyJWT } from '../../utils/token.utils.js';
import { config } from '../../config/config.js';

const { jwtSecret, jwtExpiresIn, homeUrl } = config.oauth

// Función para ingresar credenciales en ClaveÚnica
export const login = async (req, res) => {
    try {
        // Crear un token anti-falsificación único para proteger el proceso de login
        const csrfToken = generateRandomToken()
        req.session.csrfToken = csrfToken;

        // Obtener URL ir al login de ClaveÚnica
        const authUrl = getAuthUrl(csrfToken)

        // Redirigir al usuario al login de ClaveÚnica para la autenticación
        res.redirect(authUrl);
    } catch (error) {
        // Manejo de errores en el proceso de login
        console.error('Error en el proceso de login:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud de login' });
    }
};

// Función callback para cuando el usuario autoriza la aplicación en ClaveÚnica
export const callback = async (req, res) => { // Cambiar nombre a callback en producción
    const { code, state } = req.query

    // Verificar que se hayan recibido correctamente los parámetros de código y estado
    if (!code || !state) {
        return res.status(400).json({ message: "Faltan parámetros" })
    }

    // Confirmar que el token anti-falsificación es válido
    const csrfToken = req.session.csrfToken
    if (state !== csrfToken) {
        return res.status(400).json({ message: "El token anti-falsificación no es válido." })
    }

    // Intercambiar el código de autorización por un token de acceso
    try {
        const accessToken = await getAccessToken(code, state)
        if (!accessToken) {
            return res.status(404).json({ message: "No se pudo obtener el token de acceso" })
        }

        // Obtener los datos del usuario utilizando el token de acceso
        const userData = await getUserData(accessToken)

        if (!userData) {
            return res.status(404).json({ message: "No se pudo obtener la información del usuario" })
        }

        const payload = await insertUser(userData)

        // Crear el JSON Web Token (JWT) con los datos del usuario
        const jwt = generateJWT(payload, jwtSecret, jwtExpiresIn)

        // Enviar el JWT en una cookie
        res.cookie('jwt', jwt, {
            secure: false, // Cambiar a true en producción para usar HTTPS
            httpOnly: true // Impide acceso al cookie desde JavaScript
        })
        // res.redirect(homeUrl) // Redirigir al usuario a la página principal */

        res.redirect(homeUrl)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "No se pudo iniciar sesión", error: error.message })
    }
}

// Comprobar la validez del token
export const verifySession = async (req, res) => {
    try {
        const payload = req.user
        if (!payload) {
            return res.json({ message: "No hay una sesión activa" })
        }
        res.json({ message: "La sesión está activa", payload })
    } catch (e) {
        res.json({ message: "Error interno del servidor", error: e.message })
    }
}

// Cerrar sesión
export const logout = async (req, res) => {
    res.clearCookie('jwt', {
        secure: false, // Cambiar a true en producción para usar HTTPS
        httpOnly: true // Impide acceso al cookie desde JavaScript en el navegador
    })
    res.json({ message: "Se ha destruido la sesión" })
}