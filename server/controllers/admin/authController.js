import Employee from "../../models/employeeModel.js"
import crypto from 'node:crypto'
import { generateToken } from "../../utils/utils.js"

// Cerrar sesión
export const logout = async (req, res) => {
    res.clearCookie('tokenjwt', {
        httpOnly: true,
        secure: false
    })
    res.send("Se ha cerrado la sesión")
}
// Iniciar sesión
export const login = async (req, res) => {
    const { username, password } = req.body
    try {
        // Verificar que el usuario existe en el sistema
        const user = await Employee.findOne({ where: { username } })
        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            })
        }

        // Si el usuario existe, comprobar que las contraseñas coincidan
        const { password: storedHash, salt } = user
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
        if (hashedPassword !== storedHash) {
            return res.status(401).json({
                message: "Contraseña incorrecta"
            })
        }

        // Si las contraseñas coinciden, generar token JWT
        const token = generateToken(user.dataValues)

        // Enviar token en una cookie
        res.cookie('tokenjwt', token, {
            httpOnly: true,
            secure: false
        })

        // Enviar token en la respuesta
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Registrar un usuario
export const register = async (req, res) => {
    try {
        const { nombres, apellidos, username, password, email, run, rol } = req.body
        const salt = crypto.randomBytes(16).toString('hex')
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
        const employee = await Employee.create({
            nombres,
            apellidos,
            username,
            password: hashedPassword,
            email,
            run,
            rol,
            salt
        })
        res.json(employee)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}