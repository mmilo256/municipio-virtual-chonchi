import Tramite from '../models/Tramite.js';
import Direccion from '../models/Direccion.js';
import { sequelize } from '../config/db/config.js';
import Funcionario from '../models/Funcionario.js';
import { Op } from 'sequelize';
import Formulario from '../models/Formulario.js';
import PasoFormulario from '../models/PasoFormulario.js';
import CampoFormulario from '../models/CampoFormulario.js';
/* import FuncionarioTramite from '../models/FuncionarioTramite.js'; */

export const obtenerFormularioPorSlugDeTramite = async (req, res) => {
  const { slug } = req.params;
  try {
    const { formulario_id } = await Tramite.findOne({ where: { slug } });
    const formulario = await Formulario.findByPk(formulario_id, {
      include: [{ model: PasoFormulario, include: [{ model: CampoFormulario }] }],
    });
    res.status(200).json({ data: formulario, message: 'Formulario obtenido correctamente' });
  } catch (error) {
    res.status(500).json({ error, message: 'No se pudo obtener el formulario del trámite' });
  }
};

export const editarTramite = async (req, res) => {
  const { id } = req.params;

  const {
    titulo,
    slug,
    descripcion,
    descripcionCorta: descripcion_corta,
    infoAdicional: info_adicional,
    requisitos,
    costo,
    modalidadPago: modalidad_pago,
    direccion,
    horarioAtencion: horario_atencion,
    email,
    telefono,
    activo,
    direccionMunicipal: direccion_id,
    formularioSeleccionado: formulario_id,
    funcionariosAutorizados,
  } = req.body;

  const tramiteExiste = await Tramite.findByPk(id, {
    include: [{ model: Funcionario, attributes: ['id'], through: { attributes: [] } }],
  });

  if (!tramiteExiste) {
    return res.status(404).json({ error: true, message: 'No se encontró el trámite' });
  }

  const slugExiste = await Tramite.findOne({ where: { slug, id: { [Op.ne]: id } } });

  if (slugExiste) {
    return res.status(400).json({ error: true, message: 'Ya existe un trámite con este nombre' });
  }

  const values = {};

  if (titulo !== undefined && titulo !== tramiteExiste.titulo) values.titulo = titulo;
  if (slug !== undefined && slug !== tramiteExiste.slug) values.slug = slug;
  if (descripcion !== undefined && descripcion !== tramiteExiste.descripcion)
    values.descripcion = descripcion;
  if (descripcion_corta !== undefined && descripcion_corta !== tramiteExiste.descripcion_corta)
    values.descripcion_corta = descripcion_corta;
  if (info_adicional !== undefined && info_adicional !== tramiteExiste.info_adicional)
    values.info_adicional = info_adicional;
  if (requisitos !== undefined && requisitos !== tramiteExiste.requisitos)
    values.requisitos = requisitos;
  if (costo !== undefined && costo !== tramiteExiste.costo) values.costo = costo;
  if (modalidad_pago !== undefined && modalidad_pago !== tramiteExiste.modalidad_pago)
    values.modalidad_pago = modalidad_pago;
  if (direccion !== undefined && direccion !== tramiteExiste.direccion)
    values.direccion = direccion;
  if (horario_atencion !== undefined && horario_atencion !== tramiteExiste.horario_atencion)
    values.horario_atencion = horario_atencion;
  if (email !== undefined && email !== tramiteExiste.email) values.email = email;
  if (telefono !== undefined && telefono !== tramiteExiste.telefono) values.telefono = telefono;
  if (activo !== undefined && activo !== tramiteExiste.activo) values.activo = activo;
  if (direccion_id !== undefined && direccion_id !== tramiteExiste.direccion_id)
    values.direccion_id = direccion_id;
  if (formulario_id !== undefined && formulario_id !== tramiteExiste.formulario_id)
    values.formulario_id = formulario_id;

  const formattedFuncionarios = tramiteExiste.toJSON().funcionarios.map((fun) => fun.id);

  const mismosFuncionarios =
    JSON.stringify([...funcionariosAutorizados].sort((a, b) => a - b)) ===
    JSON.stringify([...formattedFuncionarios].sort((a, b) => a - b));

  const t = await sequelize.transaction();

  try {
    if (Object.values(values).length === 0 && mismosFuncionarios) {
      await t.rollback();
      return res.status(400).json({ error: true, message: 'No se realizó ningún cambio' });
    }

    await tramiteExiste.update(values, { transaction: t });

    await tramiteExiste.setFuncionarios(funcionariosAutorizados, { transaction: t });
    await t.commit();
    res.status(200).json({ data: tramiteExiste, message: 'El trámite ha sido editado' });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error, message: 'No se pudo editar el trámite' });
  }
};

export const crearTramite = async (req, res) => {
  const {
    titulo,
    slug,
    descripcion,
    descripcionCorta,
    infoAdicional,
    requisitos,
    costo,
    modalidadPago,
    direccion,
    horarioAtencion,
    email,
    telefono,
    activo,
    direccionMunicipal,
    formulario_id,
    funcionarios,
  } = req.body;

  // Verificar que el trámite no exista en BD
  const tramiteExiste = await Tramite.findOne({ where: { slug } });

  if (tramiteExiste) {
    return res.status(400).json({ error: true, message: 'Ya existe un trámite con este slug' });
  }

  const tramiteData = {
    titulo,
    slug,
    descripcion,
    descripcion_corta: descripcionCorta,
    info_adicional: infoAdicional,
    requisitos,
    costo,
    modalidad_pago: modalidadPago,
    direccion,
    horario_atencion: horarioAtencion,
    email,
    telefono,
    activo,
    direccion_id: direccionMunicipal,
    formulario_id,
  };

  console.log(tramiteData);

  const t = await sequelize.transaction();

  try {
    const tramite = await Tramite.create(tramiteData, { transaction: t });
    await tramite.setFuncionarios(funcionarios, { transaction: t });
    await t.commit();
    res.status(200).json({ data: tramite, message: 'Trámite creado exitosamente' });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error, message: 'No se pudo crear el trámite' });
  }
};

// Obtener todos los trámites disponibles
export const obtenerTramites = async (req, res) => {
  try {
    // Consultar todos los trámites de la base de datos
    const procedures = await Tramite.findAll({
      attributes: ['id', 'titulo', 'descripcion_corta', 'slug', 'activo'],
      include: {
        model: Direccion,
        attributes: ['id', 'nombre'],
      },
    });
    res.status(200).json({ data: procedures, message: 'Tramites obtenidos correctamente' }); // Enviar la lista de trámites como respuesta
  } catch (error) {
    // Registrar el error en caso de fallo
    console.error(error);
    res.status(500).json({ message: 'No se pudo obtener los trámites' });
  }
};

// Obtener todos los trámites disponibles
export const obtenerTramitePorId = async (req, res) => {
  const { id } = req.params;

  try {
    // Consultar todos los trámites de la base de datos
    const tramite = await Tramite.findByPk(id, {
      include: [
        { model: Direccion, attributes: ['id', 'nombre'] },
        {
          model: Funcionario,
          attributes: ['id', 'nombres', 'apellidos'],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json({ data: tramite, message: 'Tramites obtenidos correctamente' }); // Enviar la lista de trámites como respuesta
  } catch (error) {
    // Registrar el error en caso de fallo
    console.error(error);
    res.status(500).json({ message: 'No se pudo obtener los trámites' });
  }
};

// Obtener todos los trámites disponibles
export const obtenerTramitePorSlug = async (req, res) => {
  const { slug } = req.params;

  try {
    // Consultar todos los trámites de la base de datos
    const tramite = await Tramite.findOne({
      where: { slug },
      include: [
        { model: Direccion, attributes: ['id', 'nombre'] },
        {
          model: Funcionario,
          attributes: ['id', 'nombres', 'apellidos'],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json({ data: tramite, message: 'Tramite obtenido correctamente' }); // Enviar la lista de trámites como respuesta
  } catch (error) {
    // Registrar el error en caso de fallo
    console.error(error);
    res.status(500).json({ message: 'No se pudo obtener los trámites' });
  }
};

/* export const getProcedureById = async (req, res) => {
  const { id } = req.params;
  try {
    const procedure = await Tramite.findByPk(id);
    res.json(procedure);
  } catch (error) {
    res.json({ message: 'No se pudo encontrar el trámite', error: error.message });
  }
}; */

/* export const createProcedure = async (req, res) => {
  const {
    nombre,
    titulo,
    descripcion,
    descripcion_corta,
    requisitos,
    costo,
    modalidad_pago,
    direccion,
    horario_atencion,
    email,
    telefono,
  } = req.body;
  const data = {
    nombre,
    titulo,
    descripcion,
    descripcion_corta,
    requisitos,
    costo,
    modalidad_pago,
    direccion,
    horario_atencion,
    email,
    telefono,
  };
  try {
    const newProcedure = await Tramite.create(data);
    res.json({ message: 'Trámite creado correctamente', procedure: newProcedure });
  } catch (error) {
    console.log(error);
    res.json({ message: 'No se pudo crear el trámite', error: error.message });
  }
}; */
