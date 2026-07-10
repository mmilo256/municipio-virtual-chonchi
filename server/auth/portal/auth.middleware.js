import { config } from '../../config/config.js';
import logger from '../../config/winston.js';
import { verifyJWT } from '../../utils/token.utils.js';

const { jwtSecret } = config.oauth;

export const authMiddleware = async (req, res, next) => {
  logger.info('Verificando usuario...');
  try {
    const token = req.cookies['jwt'];
    if (!token) {
      logger.error('Acceso denegado');
      return res.json({ message: 'Acceso denegado' });
    }
    const payload = verifyJWT(token, jwtSecret);
    if (!payload) {
      logger.error('Token inválido');
      return res.json({ message: 'El token no es válido' });
    }
    req.user = {
      id: payload.id,
      nombres: payload.nombres,
      apellidos: payload.apellidos,
      run: payload.run,
    };
    next();
  } catch (error) {
    console.error(error.message);
    logger.error('Error interno del servidor');
    res.json({ message: 'Error interno del servidor' });
  }
};
