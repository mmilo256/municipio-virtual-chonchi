import dayjs from 'dayjs'
import 'dayjs/locale/es.js'

dayjs.locale("es")

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

export const formatDate = (date, format = "DD/MM/YYYY") => {
    return dayjs(date).format(format)
}
