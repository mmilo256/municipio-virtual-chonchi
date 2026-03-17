import Tramite from '../models/Tramite.js';
import Direccion from '../models/Direccion.js';
import { sequelize } from '../config/db/config.js';
import Funcionario from '../models/Funcionario.js';
/* import FuncionarioTramite from '../models/FuncionarioTramite.js'; */

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
  };

  const t = await sequelize.transaction();

  try {
    const tramite = await Tramite.create(tramiteData, { transaction: t });
    await tramite.setFuncionarios(funcionarios, { transaction: t });

    console.log(tramite);
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
      attributes: ['id', 'titulo', 'slug', 'activo'],
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
