import Funcionario from '../../models/Funcionario.js';
import Solicitud from '../../models/Solicitud.js';
import Tramite from '../../models/Tramite.js';
import Usuario from '../../models/Usuario.js';
import Documento from '../../models/Documento.js';
import Log from '../../models/Log.js';
import Direccion from '../../models/Direccion.js';
import Formulario from '../../models/Formulario.js';
import PasoFormulario from '../../models/PasoFormulario.js';
import CampoFormulario from '../../models/CampoFormulario.js';
import Respuesta from '../../models/Respuesta.js';
import HistorialEstadosSolicitudes from '../../models/HistorialEstadosSolicitudes.js';

const defineAssociations = async () => {
  // Solicitud - Trámite
  Solicitud.belongsTo(Tramite, { foreignKey: 'tramite_id' });
  Tramite.hasMany(Solicitud, { foreignKey: 'tramite_id' });
  // Direccion - Trámite
  Tramite.belongsTo(Direccion, { foreignKey: 'direccion_id' });
  Direccion.hasMany(Tramite, { foreignKey: 'direccion_id' });
  // Solicitud - Usuario
  Solicitud.belongsTo(Usuario, { foreignKey: 'usuario_id' });
  Usuario.hasMany(Solicitud, { foreignKey: 'usuario_id' });
  // Solicitud - Funcionario
  Solicitud.belongsTo(Funcionario, { foreignKey: 'funcionario_id' });
  Funcionario.hasMany(Solicitud, { foreignKey: 'funcionario_id' });
  // Solicitud - Logs
  Log.belongsTo(Solicitud, { foreignKey: 'solicitud_id' });
  Solicitud.hasMany(Log, { foreignKey: 'solicitud_id' });
  // Funcionario - Log
  Log.belongsTo(Funcionario, { foreignKey: 'funcionario_id' });
  Funcionario.hasMany(Log, { foreignKey: 'funcionario_id' });
  // Solicitud - Documento
  Documento.belongsTo(Solicitud, { foreignKey: 'solicitud_id' });
  Solicitud.hasMany(Documento, { foreignKey: 'solicitud_id' });
  // Funcionario - Trámite
  Funcionario.belongsToMany(Tramite, { through: 'funcionario_tramites' });
  Tramite.belongsToMany(Funcionario, { through: 'funcionario_tramites' });
  // Formulario - PasoFormulario
  Formulario.hasMany(PasoFormulario, { foreignKey: 'formulario_id' });
  PasoFormulario.belongsTo(Formulario, { foreignKey: 'formulario_id' });
  // PasoFormulario - CampoFormulario
  PasoFormulario.hasMany(CampoFormulario, { foreignKey: 'paso_id' });
  CampoFormulario.belongsTo(PasoFormulario, { foreignKey: 'paso_id' });
  // Tramite - Formulario
  Tramite.belongsTo(Formulario, { foreignKey: 'formulario_id' });
  Formulario.hasMany(Tramite, { foreignKey: 'formulario_id' });
  // Solicitud - Respuesta
  Solicitud.hasMany(Respuesta, { foreignKey: 'solicitud_id' });
  Respuesta.belongsTo(Solicitud, { foreignKey: 'solicitud_id' });
  // Respuesta - Campo Formulario
  CampoFormulario.hasMany(Respuesta, { foreignKey: 'campo_id' });
  Respuesta.belongsTo(CampoFormulario, { foreignKey: 'campo_id' });
  //Solicitud - Historial Estados Solicitud
  Solicitud.hasMany(HistorialEstadosSolicitudes, { foreignKey: 'solicitud_id' });
  HistorialEstadosSolicitudes.belongsTo(Solicitud, { foreignKey: 'solicitud_id' });
  //Documento - Funcionario
  Funcionario.hasMany(Documento, { foreignKey: 'funcionario_id' });
  Documento.belongsTo(Funcionario, { foreignKey: 'funcionario_id' });
};

export default defineAssociations;
