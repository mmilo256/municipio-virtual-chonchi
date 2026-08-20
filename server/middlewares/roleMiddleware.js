export const autorizarAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'No autorizado' });
  }
  if (req.user.rol !== 'admin') {
    return res.status(403).json({
      message: 'No tienes permiso para acceder a este recurso',
    });
  }
  next();
};
