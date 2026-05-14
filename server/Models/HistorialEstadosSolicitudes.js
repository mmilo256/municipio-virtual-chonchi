import { sequelize } from '../config/db/config.js';
import { DataTypes } from 'sequelize';

const HistorialEstadosSolicitudes = sequelize.define('historial_estados_solicitudes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estado: DataTypes.STRING,
  accion: DataTypes.STRING,
  mensaje: DataTypes.STRING,
  metadata: DataTypes.JSON,
  usuario_id: DataTypes.INTEGER,
  usuario_tipo: DataTypes.ENUM('funcionario', 'solicitante'),
});

export default HistorialEstadosSolicitudes;
