import { sequelize } from '../config/db/config.js';
import { DataTypes } from 'sequelize';

const HistorialEstadosSolicitudes = sequelize.define('historial_estados_solicitudes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estado: DataTypes.STRING,
  mensaje: DataTypes.STRING,
});

export default HistorialEstadosSolicitudes;
