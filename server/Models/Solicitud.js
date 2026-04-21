import { sequelize } from '../config/db/config.js';
import { DataTypes } from 'sequelize';

const Solicitud = sequelize.define('solicitudes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  codigo: DataTypes.STRING,
  estado: DataTypes.ENUM(
    'pendiente',
    'en revision',
    'rechazada',
    'por firmar',
    'aprobada',
    'finalizada',
  ),
  origen: DataTypes.ENUM('fisico', 'digital'),
});

export default Solicitud;
