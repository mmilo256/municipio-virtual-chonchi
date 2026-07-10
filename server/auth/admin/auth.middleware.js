import { config } from '../../config/config.js';
import logger from '../../config/winston.js';
import { verifyJWT } from '../../utils/token.utils.js';

const { jwtSecret } = config.oauth;

export const authMiddleware = async (req, res, next) => {
  logger.info('Verificando usuario...');
  try {
    const token = req.cookies['jwt-admin'];
    if (!token) {
      logger.error('Acceso denegado');
      return res.status(401).json({ message: 'Acceso denegado' });
    }
    const decoded = verifyJWT(token, jwtSecret);
    if (!decoded) {
      logger.error('Token inválido');
      return res.status(401).json({ message: 'El token no es válido' });
    }
    req.user = {
      id: decoded.id,
      nombres: decoded.nombres,
      apellidos: decoded.apellidos,
      username: decoded.username,
      email: decoded.email,
      run: decoded.run,
      rol: decoded.rol,
    };
    next();
  } catch (error) {
    console.error(error.message);
    logger.error('Error interno del servidor');
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
