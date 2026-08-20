import { config } from '../../config/config.js';
import Funcionario from '../../models/Funcionario.js';
import { hashPassword, verifyPassword } from '../../utils/encryption.utils.js';
import { generateJWT, generateRandomToken } from '../../utils/token.utils.js';
import { validatePassword } from '../../utils/passwordPolicy.js';

export const createEmployee = async (data) => {
  // Obtiene los datos del nuevo usuario desde el cuerpo de la solicitud
  const { nombres, apellidos, username, password, email, run, rol } = data;

  // Genera un 'salt' para agregar al proceso de hash de la contraseña
  const salt = generateRandomToken();

  // Hashea la contraseña utilizando PBKDF2
  const hashedPassword = hashPassword(validatePassword(password), salt);

  // Crea un nuevo empleado en la base de datos
  const employee = await Funcionario.create({
    nombres,
    apellidos,
    username,
    password: hashedPassword,
    email,
    run,
    rol,
    salt, // Guarda el 'salt' junto con la contraseña hasheada
  });
  return employee;
};

// Loguear usuario
export const loginUser = async (username, pass) => {
  // Comprobar que se proporcionaron los datos obligatorios
  if (!username || !pass) {
    throw { status: 400, message: 'Se requiere nombre de usuario y contraseña' };
  }

  // Verificar si el usuario existe en la base de datos
  const user = await Funcionario.findOne({ where: { username } });

  if (!user || !user.activo) {
    throw { status: 401, message: 'Usuario o contraseña incorrectos' };
  }

  // Comparar la contraseña ingresada con la contraseña de la base de datos
  const { password, salt } = user;
  const passwordCheck = verifyPassword(pass, salt, password);
  if (!passwordCheck.valid) {
    throw { status: 401, message: 'Usuario o contraseña incorrectos' };
  }

  if (passwordCheck.needsUpgrade) {
    const newSalt = generateRandomToken();
    await user.update({ password: hashPassword(pass, newSalt), salt: newSalt });
  }

  // Generar un token JWT
  const { jwtSecret, jwtExpiresIn } = config.oauth;

  const payload = {
    id: user.id,
    nombres: user.nombres,
    apellidos: user.apellidos,
    username: user.username,
    email: user.email,
    run: user.run,
    rol: user.rol,
  };

  const token = generateJWT(payload, jwtSecret, jwtExpiresIn);

  return token;
};
