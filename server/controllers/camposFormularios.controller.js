import CampoFormulario from '../models/CampoFormulario.js';

export const crearCamposFormulario = async (req, res) => {
  const { campos, pasoId } = req.body;
  const values = campos.map((campo) => {
    const newOpciones = campo.opciones
      .split(',')
      .map((opcion) => opcion.trim())
      .map((opcion) => ({
        label: opcion,
        value: opcion,
      }));

    return {
      etiqueta: campo.etiqueta,
      nombre_interno: campo.slug,
      placeholder: campo.placeholder,
      tipo: campo.tipoCampo,
      opciones: newOpciones,
      texto_ayuda: campo.textoAyuda,
      obligatorio: campo.obligatorio,
      paso_id: pasoId,
    };
  });
  try {
    // Crear campos
    await CampoFormulario.bulkCreate(values);
    res.status(200).json({ data: values, message: 'Campos creados exitosamente' });
  } catch (error) {
    res.status(500).json({ error, message: 'No se pudo crear los pasos para el formulario' });
  }
};
