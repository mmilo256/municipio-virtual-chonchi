import CampoFormulario from '../models/CampoFormulario.js';
import PasoFormulario from '../models/PasoFormulario.js';

export const crearPasosFormulario = async (req, res) => {
  const { formularioId, pasos } = req.body;
  const values = pasos.map((paso) => ({
    formulario_id: formularioId,
    titulo: paso.titulo,
    descripcion: paso.descripcion,
    orden: paso.orden,
  }));

  try {
    await PasoFormulario.destroy({ where: { formulario_id: formularioId } });
    const newPasos = await PasoFormulario.bulkCreate(values);
    res.status(200).json({
      data: newPasos,
      message: 'Pasos creados correctamente',
    });
  } catch (error) {
    res.status(500).json({ error, message: 'No se pudo crear los pasos para el formulario' });
  }
};

export const obtenerPasoFormularioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const paso = await PasoFormulario.findByPk(id, { include: CampoFormulario });
    res.status(200).json({ data: paso, message: 'Paso obtenido correctamente' });
  } catch (error) {
    res.status(500).json({ error, message: 'No se pudo obtener el paso seleccionado' });
  }
};

/* export const editarPasosFormulario = async (req, res) => {
  const { formularioId, pasos } = req.body;
  const values = pasos.map((paso) => ({
    formulario_id: formularioId,
    titulo: paso.titulo,
    descripcion: paso.descripcion,
    orden: paso.orden,
  }));

  // Verificar si el paso existe. Si no existe, agregar
  const pasosAnteriores = await PasoFormulario.findAll({
    attributes: ['titulo'],
    where: { formulario_id: formularioId },
  });

  const leResponse = {
    values,
    pasosAnteriores,
  };

  // Si el paso no existe en "pasos",

  // Si el paso

  try {
    res.status(200).json({
      data: leResponse,
      message: 'Pasos creados correctamente',
    });
  } catch (error) {
    res.status(500).json({ error, message: 'No se pudo crear los pasos para el formulario' });
  }
}; */
