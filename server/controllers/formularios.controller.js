import { Op } from 'sequelize';
import Formulario from '../models/Formulario.js';
import PasoFormulario from '../models/PasoFormulario.js';
import CampoFormulario from '../models/CampoFormulario.js';

// Obtener un formulario según su ID
export const obtenerFormularioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const form = await Formulario.findByPk(id, {
      include: [
        {
          model: PasoFormulario,
          attributes: ['id', 'titulo', 'descripcion', 'orden'],
          include: [{ model: CampoFormulario }],
        },
      ],
    });
    res.status(200).json({ data: form, message: 'Formulario obtenido correctamente' });
  } catch (error) {
    res.status(500).json({ error, message: 'No se pudo obtener el formulario' });
  }
};

// Obtener todos los formularios
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

// Modificar formulario
export const editarFormulario = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, activo } = req.body;

  const formularioExiste = await Formulario.findByPk(id);

  if (!formularioExiste) {
    return res.status(404).json({ error: true, message: 'No se encontró este formulario' });
  }

  const tituloFormularioExiste = await Formulario.findOne({
    where: { titulo, id: { [Op.ne]: id } },
  });

  if (tituloFormularioExiste) {
    return res
      .status(400)
      .json({ error: true, message: 'Ya existe un formulario con este título' });
  }

  const values = {};

  if (titulo !== formularioExiste.titulo && titulo !== undefined) values.titulo = titulo;
  if (descripcion !== formularioExiste.descripcion && descripcion !== undefined)
    values.descripcion = descripcion;
  if (activo !== formularioExiste.activo && activo !== undefined) values.activo = activo;

  if (Object.values(values).length === 0) {
    return res.status(400).json({ error: true, message: 'No se ha realizado ningún cambio' });
  }

  try {
    await formularioExiste.update(values);
    res.status(200).json({ data: values, message: 'Formulario editado correctamente' });
  } catch (error) {
    res.status(500).json({ error, message: 'No se pudo editar el formulario seleccionado' });
  }
};

// Crear formulario
export const crearFormulario = async (req, res) => {
  const { titulo, descripcion, activo } = req.body;

  const data = {
    titulo,
    descripcion,
    activo,
  };

  const formularioExiste = await Formulario.findOne({ where: { titulo } });

  if (formularioExiste) {
    return res
      .status(400)
      .json({ error: true, message: 'Ya existe un formulario con este título' });
  }

  try {
    const formulario = await Formulario.create(data);
    res.status(200).json({ data: formulario, message: 'Formulario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error, message: 'No se pudo crear el formulario' });
  }
};
