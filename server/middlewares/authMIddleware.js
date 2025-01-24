/* import Jwt from 'jsonwebtoken'
import logger from '../config/winston.js'
import { verifyAdminToken } from '../utils/tokens.js';
import { userInfoLogFormat } from '../utils/format.js'

// Middleware para verificar si el token de administrador es válido
export const verifyAdminToken = (req, res, next) => {
    const token = req.cookies.tokenjwt // Obtener el token de las cookies
    const isValid = verifyToken(token) // Verificar la validez del token
    if (!isValid) {
        return res.status(400).send("No has iniciado sesión") // Si no es válido, retornar un error
    }
    next() // Si el token es válido, pasar al siguiente middleware
}

// Middleware para verificar la validez del token de usuario
export const verifyToken = (req, res, next) => {
    const jwt = req.cookies.jwt // Obtener el token de las cookies

    // Log para registrar que se está intentando validar un token
    logger.info(`Validando token...`);

    // Verificar que el token exista en las cookies
    if (!jwt) {
        logger.warn(`No se encontró el token en la solicitud`); // Si no se encuentra, registrar advertencia
        return res.status(400).send("No has iniciado sesión") // Retornar error si el token no está presente
    }

    // Verificar el token usando Jwt.verify
    try {
        const decoded = Jwt.verify(jwt, process.env.JWT_SECRET) // Decodificar el token con la clave secreta
        const data = {
            name: decoded.name, // Obtener el nombre del usuario desde el token decodificado
            run: decoded.run // Obtener el RUN del usuario desde el token decodificado
        }
        // Loguear los datos del usuario para el seguimiento
        logger.info(userInfoLogFormat(data.name.nombres, data.name.apellidos, data.run))

        // Guardar los datos del usuario en la sesión
        req.session.user = data
        next() // Continuar con el siguiente middleware si el token es válido
    } catch (error) {
        console.error(error.message) // Mostrar el error en la consola
        res.clearCookie('jwt', { // Limpiar la cookie si el token es inválido
            secure: false, // Cambiar a true en producción para asegurar la cookie
            httpOnly: true
        })
        logger.error(`No se pudo verificar el token. ${error.message}`) // Registrar el error
        return res.status(400).json({ error: error.message }) // Retornar el error en la respuesta
    }
}
 */