import Funcionario from '../../models/Funcionario.js';
import Solicitud from '../../models/Solicitud.js';
import Tramite from '../../models/Tramite.js';
import Usuario from '../../models/Usuario.js';
import Documento from '../../models/Documento.js';
import Log from '../../models/Log.js';
import Direccion from '../../models/Direccion.js';

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
  Solicitud.hasMany(Documento, { foreignKey: 'solicitud_id', as: 'documentosAsociados' });
  // Funcionario - Trámite
  Funcionario.belongsToMany(Tramite, { through: 'funcionario_tramites' });
  Tramite.belongsToMany(Funcionario, { through: 'funcionario_tramites' });
};

export default defineAssociations;
