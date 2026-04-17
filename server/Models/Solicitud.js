import { sequelize } from '../config/db/config.js';
import { DataTypes } from 'sequelize';

const Solicitud = sequelize.define('solicitudes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  codigo: DataTypes.STRING,
  tramite_id: '2',
  estado: DataTypes.ENUM(
    'pendiente',
    'en revision',
    'rechazada',
    'por firmar',
    'aprobada',
    'finalizada',
  ),
  origen: DataTypes.ENUM('fisico', 'digital'),
  folio: DataTypes.INTEGER,
  respuestas: DataTypes.TEXT,
  documentos: DataTypes.TEXT,
  orgName: DataTypes.TEXT,
  orgRut: DataTypes.TEXT,
});

export default Solicitud;
