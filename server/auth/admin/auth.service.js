import { config } from "../../config/config.js"
import Employee from "../../models/employeeModel.js"
import { hashPassword } from "../../utils/encryption.utils.js"
import { generateJWT, generateRandomToken } from "../../utils/token.utils.js"

export const createEmployee = async (data) => {
    // Obtiene los datos del nuevo usuario desde el cuerpo de la solicitud
    const { nombres, apellidos, username, password, email, run, rol } = data

    // Genera un 'salt' para agregar al proceso de hash de la contraseña
    const salt = generateRandomToken()

    // Hashea la contraseña utilizando PBKDF2
    const hashedPassword = hashPassword(password, salt)

    // Crea un nuevo empleado en la base de datos
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
    return employee
}


// Loguear usuario
export const loginUser = async (username, pass) => {

    // Comprobar que se proporcionaron los datos obligatorios
    if (!username || !pass) {
        throw { status: 400, message: "Se requiere nombre de usuario y contraseña" }
    }

    // Verificar si el usuario existe en la base de datos
    const user = await Employee.findOne({ where: { username } })

    if (!user) {
        throw { status: 404, message: "No se encontró el usuario" }
    }

    // Comparar la contraseña ingresada con la contraseña de la base de datos
    const { password, salt } = user
    const hashedPassword = hashPassword(pass, salt)
    if (hashedPassword !== password) {
        throw { status: 401, message: "Contraseña incorrecta" }
    }

    // Generar un token JWT
    const { jwtSecret, jwtExpiresIn } = config.oauth

    const payload = {
        nombres: user.nombres,
        apellidos: user.apellidos,
        username: user.username,
        email: user.email,
        run: user.run,
        rol: user.rol
    }

    const token = generateJWT(payload, jwtSecret, jwtExpiresIn)

    return token

}