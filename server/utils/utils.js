import jwt from 'jsonwebtoken'
// Generar JWT
const JWT_SECRET = process.env.ADMIN_JWT_SECRET
const EXPIRES_IN = process.env.ADMIN_JWT_EXPIRES_IN
export const generateToken = (user) => {
    return jwt.sign(user, JWT_SECRET, { expiresIn: EXPIRES_IN })
}

// Verificar JWT
export const verifyTokenJWT = (token) => {
    return jwt.verify(token, JWT_SECRET)
}

// Información del usuario autenticado para mostrar en los logs
export const userInfoLogFormat = (
    namesArray,
    lastNamesArray,
    runObject
) => {
    let namesString = ""
    let lastNamesString = ""
    let run = `${runObject.numero}-${runObject.DV}`

    namesArray.forEach(name => {
        namesString += `${name} `
    })
    lastNamesArray.forEach(lastName => {
        lastNamesString += `${lastName} `
    })

    const fullName = namesString + lastNamesString
    return `USUARIO: ${fullName} | RUN: ${run}`
}

export const formatDate = (date, format) => {

    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

    const newDate = new Date(date)
    const day = newDate.getUTCDate() <= 9 ? `0${newDate.getUTCDate()}` : newDate.getUTCDate()
    const month = newDate.getUTCMonth() + 1 <= 9 ? `0${newDate.getUTCMonth() + 1}` : newDate.getUTCMonth() + 1
    const monthName = monthNames[month - 1]
    const year = newDate.getUTCFullYear()
    const hour = newDate.getUTCHours() <= 9 ? `0${newDate.getHours()}` : newDate.getHours()
    const minutes = newDate.getUTCMinutes() <= 9 ? `0${newDate.getUTCMinutes()}` : newDate.getUTCMinutes()
    let dateString
    switch (format) {
        case 1:
            dateString = `${day} de ${monthName} de ${year}`
            break;
        case 2:
            dateString = `${day} de ${monthName} de ${year} a las ${hour}:${minutes}`
            break;
        case 3:
            dateString = `${day}/${month}/${year} ${hour}:${minutes}`
            break;
        default:
            dateString = `${day}/${month}/${year}`
            break;
    }
    return dateString
}