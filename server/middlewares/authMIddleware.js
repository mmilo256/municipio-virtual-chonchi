import Jwt from 'jsonwebtoken'
import logger from '../config/winston.js'
import { userInfoLogFormat, verifyTokenJWT } from '../utils/utils.js';

export const verifyAdminToken = (req, res, next) => {
    const token = req.cookies.tokenjwt
    const isValid = verifyTokenJWT(token)
    if (!isValid) {
        return res.status(400).send("No has iniciado sesión")
    }
    next()
}

export const verifyToken = (req, res, next) => {
    const jwt = req.cookies.jwt

    // Log para registrar que se está intentando validar un token
    logger.info(`Validando token...`);
    //Comprueba que el token exista en las cookies
    if (!jwt) {
        logger.warn(`No se encontró el token en la solicitud`);
        return res.status(400).send("No has iniciado sesión")
    }

    // Verifica el token obtenido
    try {
        const decoded = Jwt.verify(jwt, process.env.JWT_SECRET)
        const data = {
            name: decoded.name,
            run: decoded.run
        }
        logger.info(userInfoLogFormat(data.name.nombres, data.name.apellidos, data.run))
        req.session.user = data
        next()
    } catch (error) {
        console.error(error.message)
        res.clearCookie('jwt', {
            secure: false, // Cambiar a true en producción
            httpOnly: true
        })
        logger.error(`No se pudo verificar el token. ${error.message}`)
        return res.status(400).json({ error: error.message })
    }
}