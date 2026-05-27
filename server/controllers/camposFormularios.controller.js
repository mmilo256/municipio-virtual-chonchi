import crypto from 'crypto';
import { camposConfig } from '../data/campos.config.js';
import CampoFormulario from '../models/CampoFormulario.js';

export const crearCamposFormulario = async (req, res) => {
  const { campos, pasoId } = req.body;

  try {
    const values = campos.map((campo) => {
      const uuidCorto = crypto.randomUUID().split('-')[0];

      const newOpciones = campo.opciones
        ? campo.opciones
            .split(',')
            .map((opcion) => opcion.trim())
            .filter(Boolean)
            .map((opcion) => ({
              label: opcion,
              value: opcion,
            }))
        : [];

      const thisConfig = camposConfig[campo.tipoCampo] || {};

      return {
        etiqueta: campo.etiqueta,
        nombre_interno: `${campo.slug}_${uuidCorto}`,
        placeholder: campo.placeholder,
        tipo: campo.tipoCampo,
        opciones: newOpciones,
        texto_ayuda: campo.textoAyuda,
        obligatorio: campo.obligatorio,
        config: thisConfig,
        paso_id: pasoId,
      };
    });

    await CampoFormulario.bulkCreate(values);

    res.status(201).json({
      data: values,
      message: 'Campos creados exitosamente',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error,
      message: 'No se pudieron crear los campos',
    });
  }
};
