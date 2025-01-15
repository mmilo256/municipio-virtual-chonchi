import { formatRut, verifyRut } from "./utils"

// Cambiar el valor del input teniendo en cuenta las validaciones
const handleOnChange = (currentValue, typeValidation = true, name, min, onChange, required) => {
    let isValid

    // Si el campo no es obligatorio, pero el valor es vacío, se considera válido
    if (!required) {
        if (currentValue === "") {
            isValid = true
        } else {
            // Si se requiere validación de tipo y el valor tiene una longitud mínima, se considera válido
            if (typeValidation && currentValue.length >= min) {
                isValid = true
            } else {
                isValid = false
            }
        }
    } else {
        // Si el campo es obligatorio, se verifica que el valor cumpla con la validación
        if (typeValidation && currentValue.length >= min) {
            isValid = true
        } else {
            isValid = false
        }
    }

    // Actualiza el estado con el nuevo valor y su validez
    onChange(prev => ({
        ...prev,
        [name]: {
            isValid,
            value: currentValue
        }
    }))
}

// Validación para inputs tipo text
export const validateTextInput = (currentValue, name, min, onChange, required) => {
    handleOnChange(currentValue, true, name, min, onChange, required)
}

// Validación para los input de números telefónicos
export const validatePhoneInput = (currentValue, name, min, onChange, required) => {
    // Verifica que el valor sea un número o esté vacío
    if (/^$|^[0-9]+$/.test(currentValue)) {
        handleOnChange(currentValue, true, name, min, onChange, required)
    }
}

// Validación para los input de tipo email
export const validateEmailInput = (currentValue, name, min, onChange, required) => {
    // Validación de formato de email con expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = emailRegex.test(currentValue)
    handleOnChange(currentValue, isValid, name, min, onChange, required)
}

// Validación para los input de tipo rut
export const validateRutInput = (currentValue, name, min, onChange, required) => {
    // Verifica si el RUT es válido utilizando las funciones de formato y validación
    let isValid = verifyRut(formatRut(currentValue))
    handleOnChange(formatRut(currentValue), isValid, name, min, onChange, required)
}

// Validación para los input de tipo fecha
export const validateDateInput = (currentValue, name, min, onChange, required) => {
    // A pesar de que la función de fecha no tiene validación explícita aquí, se pasa por la función de cambio
    handleOnChange(formatRut(currentValue), true, name, min, onChange, required)
}
