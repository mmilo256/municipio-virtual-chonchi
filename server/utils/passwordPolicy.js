export const validatePassword = (password) => {
  if (typeof password !== 'string' || password.length < 12 || password.length > 128) {
    throw Object.assign(new Error('La contraseña debe tener entre 12 y 128 caracteres'), {
      status: 400,
    });
  }
  return password;
};
