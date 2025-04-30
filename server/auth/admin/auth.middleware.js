import { config } from "../../config/config.js"
import { verifyJWT } from "../../utils/token.utils.js"

const { jwtSecret } = config.oauth

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies['jwt-admin']
        if (!token) {
            return res.status(401).json({ message: "Acceso denegado" })
        }
        const decoded = verifyJWT(token, jwtSecret)
        if (!decoded) {
            return res.status(401).json({ message: "El token no es válido" })
        }
        req.user = {
            nombres: decoded.nombres,
            apellidos: decoded.apellidos,
            username: decoded.username,
            email: decoded.email,
            run: decoded.run,
            rol: decoded.rol
        }
        next()
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Error interno del servidor" })
    }
}