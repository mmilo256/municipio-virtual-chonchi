import { config } from "../../config/config.js"
import { verifyJWT } from "../../utils/token.utils.js"

const { jwtSecret } = config.oauth

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies['jwt']
        if (!token) {
            return res.json({ message: "Acceso denegado" })
        }
        const payload = verifyJWT(token, jwtSecret)
        if (!payload) {
            return res.json({ message: "El token no es válido" })
        }
        req.user = {
            id: payload.id,
            nombres: payload.nombres,
            apellidos: payload.apellidos,
            run: payload.run
        }
        next()
    } catch (error) {
        console.log(error.message)
        res.json({ message: "Error interno del servidor" })
    }
}