import { camposConfig } from '../data/campos.config.js';
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

    // CONFIGURACIONES CAMPOS
    const { text, textarea, email, phone, rut, file } = camposConfig;
    let thisConfig;
    switch (campo.tipoCampo) {
      case 'text':
        thisConfig = text;
        break;
      case 'textarea':
        thisConfig = textarea;
        break;
      case 'email':
        thisConfig = email;
        break;
      case 'phone':
        thisConfig = phone;
        break;
      case 'rut':
        thisConfig = rut;
        break;
      case 'file':
        thisConfig = file;
        break;
      default:
        break;
    }

    return {
      etiqueta: campo.etiqueta,
      nombre_interno: campo.slug,
      placeholder: campo.placeholder,
      tipo: campo.tipoCampo,
      opciones: newOpciones,
      texto_ayuda: campo.textoAyuda,
      obligatorio: campo.obligatorio,
      config: thisConfig,
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
