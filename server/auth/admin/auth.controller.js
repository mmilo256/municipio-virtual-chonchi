
import { createEmployee, loginUser } from "./auth.service.js"

// Registrar un usuario
export const register = async (req, res) => {
    try {
        // Responde con los datos del empleado creado
        const employee = await createEmployee(req.body)
        res.status(200).json({ message: "Funcionario creado exitosamente.", employee })
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor.",
            error: error.message // Responde con el mensaje de error si ocurre un fallo
        })
    }
}

// Iniciar sesión
export const login = async (req, res) => {
    const { username, password } = req.body // Obtiene el nombre de usuario y la contraseña del cuerpo de la solicitud

    try {

        const token = await loginUser(username, password)

        // Guardar token en cookies
        res.cookie('jwt-admin', token, {
            httpOnly: true,
            secure: false
        })

        // Envía el token también en la respuesta JSON
        res.status(200).json({ message: "Usuario logueado exitosamente", token })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "No se pudo iniciar sesión" // Responde con el mensaje de error si ocurre un fallo
        })
    }
}

// Cerrar sesión
export const logout = async (req, res) => {
    try {
        // Elimina la cookie que contiene el token de acceso
        res.clearCookie('jwt-admin', {
            httpOnly: true,
            secure: false
        })
        res.status(200).json({ message: "Sesión cerrada" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message, message: "No se pudo cerrar sesión" })
    }
}

// Verificar la sesión del usuario
export const verifySession = async (req, res) => {
    try {
        const userData = req.user
        if (!userData) {
            return res.json({ message: "No hay una sesión activa" })
        }
        console.log({ userData, msg: "No entiendo que pasa" })
        res.json({
            message: "La sesión está activa", data: userData
        })
    } catch (error) {
        console.log(error.message)
        res.json({ message: "Error interno del servidor" })
    }
}