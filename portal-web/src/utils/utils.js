// Obtener la fecha de hoy
export const getTodayDate = () => {
    return new Date().toISOString().split("T")[0]
}

// Obtener datos del usuario
export const getUserData = (sessionData) => {
    const fullName = sessionData.nombres + " " + sessionData.apellidos
    const rut = sessionData.run
    return { fullName, rut }
}

// Formatear campo numérico
export const formatNumber = (value) => {
    // Remover todos los caracteres que no sean dígitos o 'k'/'K'
    let cleanValue = value.replace(/[^0-9]/g, "").toUpperCase();

    return cleanValue;
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

// Formatear fecha
export const formatDate = (date, format) => {
    // Definir los nombres de los meses en español
    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

    // Crear una nueva fecha con el valor proporcionado
    const newDate = new Date(date);
    const day = newDate.getUTCDate() <= 9 ? `0${newDate.getUTCDate()}` : newDate.getUTCDate();
    const month = newDate.getUTCMonth() + 1 <= 9 ? `0${newDate.getUTCMonth() + 1}` : newDate.getUTCMonth() + 1;
    const monthName = monthNames[month - 1]; // Obtener el nombre del mes
    const year = newDate.getUTCFullYear();
    const hour = newDate.getUTCHours() <= 9 ? `0${newDate.getHours()}` : newDate.getHours();
    const minutes = newDate.getUTCMinutes() <= 9 ? `0${newDate.getUTCMinutes()}` : newDate.getUTCMinutes();

    // Formatear la fecha según el valor de 'format'
    let dateString;
    switch (format) {
        case 1:
            dateString = `${day} de ${monthName} de ${year}`;
            break;
        case 2:
            dateString = `${day} de ${monthName} de ${year} a las ${hour}:${minutes}`;
            break;
        case 3:
            dateString = `${day}/${month}/${year} ${hour}:${minutes}`;
            break;
        default:
            dateString = `${day}/${month}/${year}`;
            break;
    }
    return dateString;
};

// Verificación del RUT con el algoritmo Modulo 11
function validarRut(number, dv) {
    // Validar el RUT verificando el dígito verificador con el número
    return getDV(number) == dv;
}

// Función para obtener el dígito verificador
function getDV(number) {
    // Invertir el número del RUT para facilitar el cálculo
    let newNumber = number.toString().split("").reverse().join("");
    let sum = 0;
    let j = 2;

    // Sumar los dígitos del número del RUT multiplicados por los coeficientes del algoritmo Módulo 11
    for (let i = 0; i < newNumber.length; i++) {
        sum += parseInt(newNumber.charAt(i)) * j;
        j = j < 7 ? j + 1 : 2; // El coeficiente se reinicia a 2 después de 6
    }

    // Calcular el dígito verificador
    let n_dv = 11 - (sum % 11);
    // Retornar el dígito verificador: 0, 'K' o el valor calculado
    return n_dv === 11 ? 0 : n_dv === 10 ? "K" : n_dv;
}

// Función para verificar un RUT
export const verifyRut = (rut) => {
    // Separar el número del RUT y el dígito verificador
    const [number, dv] = rut.split("-");
    const cleanedNumber = number.replace(/\./g, ""); // Remover puntos del número del RUT

    // Verificar que el número del RUT sea válido según el algoritmo Módulo 11
    return validarRut(cleanedNumber, dv);
};
