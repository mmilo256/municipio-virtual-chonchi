import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'

// Función para generar el token JWT
export const generateJWT = (payload, secret, expiresIn) => {
    return jwt.sign(payload, secret, { expiresIn })
}

// Función para verificar la validez del token JWT
export const verifyJWT = (token, secret) => {
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        console.log(error.message)
        return null
    }
}

// Generar un token aleatorio
export const generateRandomToken = () => {
    return crypto.randomBytes(30).toString('hex');
}