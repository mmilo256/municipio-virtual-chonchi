// VALIDACIONES DE CAMPOS
export const validateInput = (type, value) => {
    console.log("Tipo:", type)
    console.log("Valor:", value)
}


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

    // Agregar puntos cada tres dígitos a la parte numérica desde el final
    let result = "";
    let count = 0;
    for (let i = numericPart.length - 1; i >= 0; i--) {
        result = numericPart[i] + result;
        count++;
        if (count === 3 && i > 0) {
            result = "." + result;
            count = 0;
        }
    }

    return result + verifier;
};

export const onlyNumberInput = (value) => {
    // Remover todos los caracteres que no sean dígitos
    let cleanValue = value.replace(/[^0-9]/g, "");
    return cleanValue
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


export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

// Verificación del RUT con el algoritmo Modulo 11
function validarRut(number, dv) {
    if (number.length === 0 || number.length > 8) {
        console.error("El número del RUT debe tener entre 1 y 8 dígitos.");
        return false;
    } else {
        return getDV(number) == dv;
    }
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
    if (!rut.includes("-")) {
        console.error(
            "El RUT debe tener un guion para separar el número del dígito verificador."
        );
        return false;
    }

    const [number, dv] = rut.split("-");
    const cleanedNumber = number.replace(/\./g, "");

    if (isNaN(cleanedNumber) || dv.length !== 1) {
        console.error("Formato de RUT inválido.");
        return false;
    }

    return validarRut(cleanedNumber, dv.toUpperCase());
};