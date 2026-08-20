export const camposConfig = {
  text: {
    minLength: {
      value: 3,
      mensaje: 'Debe tener como mínimo 3 caracteres',
    },
    maxLength: {
      value: 100,
      mensaje: 'Debe tener máximo 100 caracteres',
    },
  },
  textarea: {
    minLength: {
      value: 3,
      mensaje: 'Debe tener como mínimo 3 caracteres',
    },
    maxLength: {
      value: 250,
      mensaje: 'Debe tener máximo 250 caracteres',
    },
  },
  email: {
    regex: {
      value: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
      mensaje: 'Ingrese un email válido',
    },
    maxLength: {
      value: 100,
      mensaje: 'Debe tener máximo 100 caracteres',
    },
  },
  phone: {
    regex: {
      value: '^(?:\\+569\\d{8}|9\\d{8}|\\d{8})$',
      mensaje: 'Ingrese un número de teléfono válido',
    },
    maxLength: {
      value: 15,
      mensaje: 'Debe tener máximo 15 caracteres',
    },
  },
  rut: {
    regex: {
      value: '^\\d{7,8}-[\\dkK]$',
      mensaje: 'El RUT no es válido',
    },
    maxLength: {
      value: 10,
      mensaje: 'Debe tener máximo 10 caracteres',
    },
  },
  file: {
    maxSize: {
      value: 5,
      mensaje: 'El archivo no debe superar los 5 MB',
    },
    allowedTypes: {
      value: ['application/pdf', 'image/jpeg', 'image/png'],
      mensaje: 'No se permite otro tipo de archivo',
    },
  },
};
