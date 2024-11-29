export const setErrorMessages = (required, minLength) => {
    return {
        required: {
            value: required,
            message: "El campo es requerido"
        },
        minLength: {
            value: minLength,
            message: `El campo debe tener como mínimo ${minLength} caracteres`
        }
    }
}