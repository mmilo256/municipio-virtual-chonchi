import useAuthStore from '../stores/useAuthStore';

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPhone = /^(?:\+?56)?0?9\d{8}$/;
const regexRut = /^\d{7,8}-[\dkK]$/;

export const validateRequired = (text) => {
  if (!text) return 'Este campo es obligatorio';
  return null;
};

export const validateEmail = (email) => {
  if (!email) return 'Este campo es obligatorio';
  if (!regexEmail.test(email)) return 'Ingresa un correo electrónico válido';
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return 'Este campo es obligatorio';
  if (!regexPhone.test(phone)) return 'Ingresa un número de teléfono válido';
  return null;
};

export const validateRut = (rut) => {
  if (!rut) return 'Este campo es obligatorio';
  if (!regexRut.test(rut)) return 'Ingresa un RUT válido (sin puntos y con guión)';
  return null;
};

export const validateComMembers = (array) => {
  const userData = useAuthStore.getState().sessionData;
  let isValid;

  if (array.length === 0) return 'Debe agregar como mínimo 1 integrante de la comisión electoral';
  array.map((member) => {
    console.log({ rutus: member.rut });
    console.log(userData.run);
    if (member.rut === userData.run) {
      isValid = true;
    } else {
      isValid = false;
    }
  });
  if (isValid === false) {
    return 'El usuario solicitante debe ser parte de la comisión electoral';
  }

  return null;
};
