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
    rut: {
        value: /^\d{7,8}-[kK\d]$/,
        message: "El rut debe ser sin puntos y con guión"
    },
    email: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Correo electrónico inválido",
    },
};