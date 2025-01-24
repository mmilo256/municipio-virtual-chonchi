import { verifyToken } from "../../utils/tokens.js"

export const verifyAdminToken = (req, res, next) => {
    let token = req.cookies['adminAccessToken']
    // Verificar si hay un token en el header de la solicitud
    if (!token) {
        return res.status(401).json({ message: "Acceso denegado" })
    }

    // Verificar si el token es válido
    const secret = process.env.ADMIN_JWT_SECRET
    try {
        verifyToken(token, secret)
    } catch (error) {
        return res.status(401).json({ error: true, message: `Token inválido. ${error.message}` })
    }
    next()
}