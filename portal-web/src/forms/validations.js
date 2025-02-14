// Definición de validaciones
export const validationRules = {
    required: {
        value: true,
        message: "Este campo es obligatorio",
    },
    minLength: (minLength) => ({
        value: minLength,
        message: `Debe tener al menos ${minLength} caracteres`,
    }),
    pattern: (regex, message) => ({
        value: regex,
        message: message || "Formato inválido",
    }),
    email: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Correo electrónico inválido",
    },
};