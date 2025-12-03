import { agregarDiasHabiles } from './utils';

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

export const validateComissionMember = (isValid) => {
  if (!isValid)
    return 'El usuario solicitante debe ser parte de la comisión para realizar la solicitud';
};

// FECHA DE ELECCIÓN DE DIRECTORIO
export const validateDate = (date) => {
  if (!date) return 'Debe ingresar una fecha válida';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const proxDiaHabil = agregarDiasHabiles(today, 15);
  const dateArray = date.split('-');
  const newDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);

  if (date && newDate < proxDiaHabil)
    return 'La fecha de elección debe ingresarse con mínimo 15 días hábiles de anticipación';
};
