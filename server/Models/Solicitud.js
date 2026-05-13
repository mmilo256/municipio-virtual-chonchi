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
    'requiere correccion',
    'aprobada',
    'rechazada',
  ),
  observacion: DataTypes.STRING,
  origen: DataTypes.ENUM('fisico', 'digital'),
  email_contacto: DataTypes.STRING,
  telefono_contacto: DataTypes.STRING,
  direccion_contacto: DataTypes.STRING,
  requiere_correccion: DataTypes.BOOLEAN,
  campos_correccion: DataTypes.JSON,
  fecha_solicitud_correccion: DataTypes.DATE,
  fecha_respuesta_correccion: DataTypes.DATE,
});

export default Solicitud;
