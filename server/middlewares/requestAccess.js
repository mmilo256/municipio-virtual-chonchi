import Solicitud from '../models/Solicitud.js';

export const requireStaff = (req, res, next) => {
  if (!req.user?.rol) return res.status(403).json({ message: 'Operación no autorizada' });
  next();
};

export const authorizeOwnRequestsList = (req, res, next) => {
  if (req.user?.rol || Number(req.params.id) === Number(req.user?.id)) return next();
  return res.status(403).json({ message: 'No tienes permiso para consultar estas solicitudes' });
};

export const authorizeRequestAccess = async (req, res, next) => {
  try {
    if (req.user?.rol) return next();

    const where = req.params.codigo
      ? { codigo: req.params.codigo }
      : { id: Number(req.params.id) };
    const request = await Solicitud.findOne({ where, attributes: ['id', 'usuario_id'] });
    if (!request) return res.status(404).json({ message: 'Solicitud no encontrada' });
    if (Number(request.usuario_id) !== Number(req.user?.id)) {
      return res.status(403).json({ message: 'No tienes permiso para acceder a esta solicitud' });
    }
    req.requestRecord = request;
    next();
  } catch (error) {
    next(error);
  }
};
