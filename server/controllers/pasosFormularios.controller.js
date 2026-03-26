import PasoFormulario from '../models/PasoFormulario.js';

export const crearPasosFormulario = async (req, res) => {
  const { formularioId, pasos } = req.body;
  const values = pasos.map((paso) => ({
    formulario_id: formularioId,
    titulo: paso.titulo,
    descripcion: paso.descripcion,
    orden: paso.orden,
  }));
  const response = await PasoFormulario.bulkCreate(values);
  console.log(response);
  try {
    res.status(200).json({ data: { formularioId, pasos }, message: 'Pasos creados correctamente' });
  } catch (error) {
    res.status(500).json({ error, message: 'No se pudo crear los pasos para el formulario' });
  }
};
