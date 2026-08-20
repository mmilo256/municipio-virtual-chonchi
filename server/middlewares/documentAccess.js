import Documento from '../models/Documento.js';
import Solicitud from '../models/Solicitud.js';

export const authorizeDocumentAccess = async (req, res, next) => {
  try {
    const document = await Documento.findByPk(req.params.id);

    if (!document) return res.status(404).json({ message: 'Documento no encontrado' });
    if (req.user?.rol) {
      req.document = document;
      return next();
    }
    const request = await Solicitud.findByPk(document.solicitud_id, { attributes: ['usuario_id'] });
    if (!request || request.usuario_id !== req.user?.id) {
      return res.status(403).json({ message: 'No tienes permiso para acceder a este documento' });
    }

    req.document = document;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireDocumentAdministrator = (req, res, next) => {
  if (!req.user?.rol) return res.status(403).json({ message: 'Operación no autorizada' });
  next();
};
