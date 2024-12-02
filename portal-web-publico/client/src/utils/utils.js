// Formatear campo numérico
export const formatNumber = (value) => {
    // Remover todos los caracteres que no sean dígitos o 'k'/'K'
    let cleanValue = value.replace(/[^0-9]/g, "").toUpperCase();

    return cleanValue
};

// Formatear rut
export const formatRut = (value) => {
    // Remover todos los caracteres que no sean dígitos o 'k'/'K'
    let cleanValue = value.replace(/[^0-9kK]/g, "").toUpperCase();

    // Si el RUT tiene más de un dígito, agregar el guion antes del dígito verificador
    if (cleanValue.length > 1) {
        cleanValue = cleanValue.slice(0, -1) + "-" + cleanValue.slice(-1);
    }

    // Separar la parte numérica del dígito verificador
    const parts = cleanValue.split("-");
    const numericPart = parts[0];
    const verifier = parts[1] ? `-${parts[1]}` : "";

    return numericPart + verifier;
};

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


// Verificación del RUT con el algoritmo Modulo 11
function validarRut(number, dv) {

    return getDV(number) == dv;

}

function getDV(number) {
    let newNumber = number.toString().split("").reverse().join("");
    let sum = 0;
    let j = 2;

    for (let i = 0; i < newNumber.length; i++) {
        sum += parseInt(newNumber.charAt(i)) * j;
        j = j < 7 ? j + 1 : 2;
    }

    let n_dv = 11 - (sum % 11);
    return n_dv === 11 ? 0 : n_dv === 10 ? "K" : n_dv;
}

export const verifyRut = (rut) => {

    const [number, dv] = rut.split("-");
    const cleanedNumber = number.replace(/\./g, "");

    return validarRut(cleanedNumber, dv);
};