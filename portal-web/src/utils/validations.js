import { formatRut, verifyRut } from "./utils"

// Cambiar el valor del input teniendo en cuenta las validaciones
const handleOnChange = (currentValue, typeValidation = true, name, min, onChange, required) => {
    let isValid

    if (!required) {
        if (currentValue === "") {
            isValid = true
        } else {
            if (typeValidation && currentValue.length >= min) {
                isValid = true
            } else {
                isValid = false
            }
        }
    } else {
        if (typeValidation && currentValue.length >= min) {
            isValid = true
        } else {
            isValid = false
        }
    }
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
    if (/^$|^[0-9]+$/.test(currentValue)) {
        handleOnChange(currentValue, true, name, min, onChange, required)
    }
}

// Validación para los input de tipo email
export const validateEmailInput = (currentValue, name, min, onChange, required) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = emailRegex.test(currentValue)
    handleOnChange(currentValue, isValid, name, min, onChange, required)
}

// Validación para los input de tipo rut
export const validateRutInput = (currentValue, name, min, onChange, required) => {
    let isValid = verifyRut(formatRut(currentValue))
    handleOnChange(formatRut(currentValue), isValid, name, min, onChange, required)
}

// Validación para los input de tipo fecha
export const validateDateInput = (currentValue, name, min, onChange, required) => {
    handleOnChange(formatRut(currentValue), true, name, min, onChange, required)
}