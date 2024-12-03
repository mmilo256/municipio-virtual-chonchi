import { formatNumber, formatRut } from "../utils/utils"

export const setInputOptions = (required, minLength, type = "text", setValue, name) => {
    const inputOptions = {
        required: {
            value: required,
            message: "El campo es requerido"
        },
        minLength: {
            value: minLength,
            message: `El campo debe tener como mínimo ${minLength} caracteres`
        },
    }

    // Validación de campos numéricos
    if (type === "phone" || type === "number") {
        inputOptions.valueAsNumber = true
        inputOptions.onChange = (e) => {
            const value = formatNumber(e.target.value)
            setValue(name, value)
        }
    }

    // Validación del campo Email
    if (type === "email") {
        inputOptions.pattern = {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Correo electrónico no válido"
        }
    }

    // Validación del campo RUT
    if (type === "rut") {
        inputOptions.minLength = null
        inputOptions.onChange = (e) => {
            const value = formatRut(e.target.value)
            setValue(name, value)
        }
    }
    return inputOptions
}