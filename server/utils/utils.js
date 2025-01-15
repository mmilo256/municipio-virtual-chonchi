import jwt from 'jsonwebtoken'

// Configuración del JWT
const JWT_SECRET = process.env.ADMIN_JWT_SECRET // Se obtiene la clave secreta para firmar el JWT desde las variables de entorno
const EXPIRES_IN = process.env.ADMIN_JWT_EXPIRES_IN // Tiempo de expiración del JWT, también desde las variables de entorno

// Función para generar el token JWT
export const generateToken = (user) => {
    // Se utiliza la librería jwt para generar un token que contiene la información del usuario
    // Se firma el token con la clave secreta (JWT_SECRET) y se establece el tiempo de expiración
    return jwt.sign(user, JWT_SECRET, { expiresIn: EXPIRES_IN })
}

// Función para verificar la validez del token JWT
export const verifyTokenJWT = (token) => {
    // Verifica el token recibido utilizando la clave secreta. Retorna el payload del token si es válido.
    return jwt.verify(token, JWT_SECRET)
}

// Función para generar una cadena de texto con la información del usuario para los logs
export const userInfoLogFormat = (
    namesArray,
    lastNamesArray,
    runObject
) => {
    // Inicializa las cadenas para nombres y apellidos
    let namesString = ""
    let lastNamesString = ""
    // Formatea el RUN en formato "numero-DV"
    let run = `${runObject.numero}-${runObject.DV}`

    // Junta todos los nombres en una sola cadena
    namesArray.forEach(name => {
        namesString += `${name} `
    })
    // Junta todos los apellidos en una sola cadena
    lastNamesArray.forEach(lastName => {
        lastNamesString += `${lastName} `
    })

    // Combina los nombres y apellidos en el nombre completo
    const fullName = namesString + lastNamesString
    // Retorna una cadena con la información del usuario en el formato: "USUARIO: <nombre completo> | RUN: <RUN>"
    return `USUARIO: ${fullName} | RUN: ${run}`
}

// Función para formatear una fecha en distintos formatos
export const formatDate = (date, format) => {
    // Nombres de los meses en español
    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

    // Convierte la fecha en un objeto Date
    const newDate = new Date(date)
    // Formatea el día, mes, año, hora y minutos para los formatos
    const day = newDate.getUTCDate() <= 9 ? `0${newDate.getUTCDate()}` : newDate.getUTCDate()
    const month = newDate.getUTCMonth() + 1 <= 9 ? `0${newDate.getUTCMonth() + 1}` : newDate.getUTCMonth() + 1
    const monthName = monthNames[month - 1]
    const year = newDate.getUTCFullYear()
    const hour = newDate.getUTCHours() <= 9 ? `0${newDate.getHours()}` : newDate.getHours()
    const minutes = newDate.getUTCMinutes() <= 9 ? `0${newDate.getUTCMinutes()}` : newDate.getUTCMinutes()

    // Variable que almacenará el formato final de la fecha
    let dateString
    // Según el formato elegido, se retorna el formato de fecha correspondiente
    switch (format) {
        case 1:
            dateString = `${day} de ${monthName} de ${year}` // "02 de enero de 2025"
            break;
        case 2:
            dateString = `${day} de ${monthName} de ${year} a las ${hour}:${minutes}` // "02 de enero de 2025 a las 14:30"
            break;
        case 3:
            dateString = `${day}/${month}/${year} ${hour}:${minutes}` // "02/01/2025 14:30"
            break;
        default:
            dateString = `${day}/${month}/${year}` // Formato por defecto: "02/01/2025"
            break;
    }
    // Retorna la fecha formateada según el formato seleccionado
    return dateString
}
