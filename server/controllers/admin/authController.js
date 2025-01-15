import Employee from "../../models/employeeModel.js"
import crypto from 'node:crypto'
import { generateToken } from "../../utils/utils.js"

// Cerrar sesión
export const logout = async (req, res) => {
    // Borra el token JWT de las cookies para cerrar la sesión
    res.clearCookie('tokenjwt', {
        httpOnly: true, // La cookie no será accesible desde JavaScript
        secure: false // La cookie no se enviará a través de conexiones seguras (http)
    })
    res.send("Se ha cerrado la sesión") // Responde indicando que la sesión se cerró correctamente
}

// Iniciar sesión
export const login = async (req, res) => {
    const { username, password } = req.body // Obtiene el nombre de usuario y la contraseña del cuerpo de la solicitud
    try {
        // Verifica que el usuario existe en la base de datos
        const user = await Employee.findOne({ where: { username } })
        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado" // Si el usuario no existe, responde con error
            })
        }

        // Compara la contraseña ingresada con la almacenada en la base de datos
        const { password: storedHash, salt } = user
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
        if (hashedPassword !== storedHash) {
            return res.status(401).json({
                message: "Contraseña incorrecta" // Si las contraseñas no coinciden, responde con error
            })
        }

        // Si las contraseñas coinciden, genera un token JWT
        const token = generateToken(user.dataValues)

        // Envia el token JWT en una cookie
        res.cookie('tokenjwt', token, {
            httpOnly: true, // La cookie no será accesible desde JavaScript
            secure: false // La cookie no se enviará a través de conexiones seguras (http)
        })

        // Envía el token también en la respuesta JSON
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({
            message: error.message // Responde con el mensaje de error si ocurre un fallo
        })
    }
}

// Registrar un usuario
export const register = async (req, res) => {
    try {
        // Obtiene los datos del nuevo usuario desde el cuerpo de la solicitud
        const { nombres, apellidos, username, password, email, run, rol } = req.body

        // Genera un 'salt' para agregar al proceso de hash de la contraseña
        const salt = crypto.randomBytes(16).toString('hex')

        // Hashea la contraseña utilizando PBKDF2
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

        // Crea un nuevo usuario en la base de datos
        const employee = await Employee.create({
            nombres,
            apellidos,
            username,
            password: hashedPassword,
            email,
            run,
            rol,
            salt // Guarda el 'salt' junto con la contraseña hasheada
        })

        // Responde con los datos del empleado creado
        res.json(employee)
    } catch (error) {
        res.status(500).json({
            message: error.message // Responde con el mensaje de error si ocurre un fallo
        })
    }
}
