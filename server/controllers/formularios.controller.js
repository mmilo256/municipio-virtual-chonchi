import Formulario from '../models/Formulario.js';

export const obtenerFormularios = async (req, res) => {
  try {
    const formularios = await Formulario.findAll();

    if (formularios.length <= 0) {
      return res.status(404).json({ error: true, message: 'No se encontró ningún formulario' });
    }

    res.status(200).json({ data: formularios, message: 'Formularios obtenidos correctamente' });
  } catch (error) {
    res.status(500).json({ error, message: 'No se pudo obtener los formularios' });
  }
};
