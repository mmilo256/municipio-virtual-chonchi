export const camposContacto = [
  {
    id: 'nombreCompleto',
    tipo: 'text',
    nombre_interno: 'nombreCompleto',
    disabled: true,
    etiqueta: 'Nombre completo',
    placeholder: 'Ingresa tu nombre completo',
    texto_ayuda: '',
    obligatorio: true,
    opciones: [],
    config: {
      minLength: {
        value: 3,
        mensaje: 'Debe tener como mínimo 3 caracteres',
      },
      maxLength: {
        value: 100,
        mensaje: 'Debe tener máximo 100 caracteres',
      },
    },
  },
  {
    id: 'rut',
    tipo: 'rut',
    nombre_interno: 'rut',
    disabled: true,
    etiqueta: 'RUT',
    placeholder: '',
    texto_ayuda: '',
    obligatorio: true,
    opciones: [],
    config: {
      minLength: {
        value: 3,
        mensaje: 'Debe tener como mínimo 3 caracteres',
      },
      maxLength: {
        value: 100,
        mensaje: 'Debe tener máximo 100 caracteres',
      },
    },
  },
  {
    id: 'email',
    tipo: 'email',
    nombre_interno: 'email',
    etiqueta: 'Correo electrónico',
    placeholder: 'correo@ejemplo.cl',
    texto_ayuda: '',
    obligatorio: true,
    opciones: [],
    config: {
      regex: {
        value: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
        mensaje: 'Ingrese un email válido',
      },
      maxLength: {
        value: 100,
        mensaje: 'Debe tener máximo 100 caracteres',
      },
    },
  },
  {
    id: 'telefono',
    tipo: 'phone',
    nombre_interno: 'telefono',
    etiqueta: 'Número de teléfono',
    placeholder: '912345678',
    texto_ayuda: '',
    obligatorio: true,
    opciones: [],
    config: {
      regex: {
        value: '^(?:\\+569\\d{8}|9\\d{8}|\\d{8})$',
        mensaje: 'Ingrese un número de teléfono válido',
      },
      maxLength: {
        value: 15,
        mensaje: 'Debe tener máximo 15 caracteres',
      },
    },
  },
  {
    id: 'direccion',
    tipo: 'text',
    nombre_interno: 'direccion',
    etiqueta: 'Dirección',
    placeholder: 'Calle 123, Chonchi',
    texto_ayuda: '',
    obligatorio: false,
    opciones: [],
    config: {
      minLength: {
        value: 3,
        mensaje: 'Debe tener como mínimo 3 caracteres',
      },
      maxLength: {
        value: 100,
        mensaje: 'Debe tener máximo 100 caracteres',
      },
    },
  },
];
