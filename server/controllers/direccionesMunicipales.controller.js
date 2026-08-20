import Direccion from '../models/Direccion.js';

export const obtenerDireccionesMunicipales = async (req, res) => {
  try {
    const direcciones = await Direccion.findAll({ attributes: ['id', 'nombre'] });
    res
      .status(200)
      .json({ data: direcciones, message: 'Direcciones municipales obtenidas correctamente' });
  } catch (error) {
    res.status(500).json({ error, message: 'No se pudo obtener las direcciones municipales.' });
  }
};
