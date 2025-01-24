import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'
import RefreshToken from '../models/refreshTokenModel.js'

// Función para generar el token JWT
export const generateToken = (payload, secret, expiresIn) => {
    return jwt.sign(payload, secret, { expiresIn })
}

// Función para verificar la validez del token JWT
export const verifyToken = (token, secret) => {
    return jwt.verify(token, secret)
}