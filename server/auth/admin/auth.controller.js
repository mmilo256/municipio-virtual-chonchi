import logger from '../../config/winston.js';
import { loginUser } from './auth.service.js';
import { config } from '../../config/config.js';

const adminCookieOptions = {
  httpOnly: true,
  secure: config.cookieSecure,
  sameSite: config.cookieSecure ? 'none' : 'lax',
  maxAge: config.sessionMaxAgeMs,
};

// Iniciar sesión
export const login = async (req, res) => {
  const { username, password } = req.body; // Obtiene el nombre de usuario y la contraseña del cuerpo de la solicitud

  try {
    logger.info('Iniciando sesión...');
    const token = await loginUser(username, password);

    // Guardar token en cookies
    res.cookie('jwt-admin', token, {
      ...adminCookieOptions,
    });

    logger.info('Sesión iniciada correctamente');
    res.status(200).json({ message: 'Usuario logueado exitosamente' });
  } catch (error) {
    logger.error('No se pudo iniciar sesión');
    res.status(error.status >= 400 && error.status < 500 ? error.status : 500).json({
      message: error.status >= 400 && error.status < 500 ? error.message : 'No se pudo iniciar sesión',
    });
  }
};

// Cerrar sesión
export const logout = async (req, res) => {
  try {
    // Elimina la cookie que contiene el token de acceso
    res.clearCookie('jwt-admin', {
      ...adminCookieOptions,
    });
    res.status(200).json({ message: 'Sesión cerrada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message, message: 'No se pudo cerrar sesión' });
  }
};

// Verificar la sesión del usuario
export const verifySession = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      return res.json({ message: 'No hay una sesión activa' });
    }
    res.json({
      message: 'La sesión está activa',
      data: userData,
    });
  } catch (error) {
    console.error(error.message);
    res.json({ message: 'Error interno del servidor' });
  }
};
