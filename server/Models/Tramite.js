import { sequelize } from '../config/db/config.js';
import { DataTypes } from 'sequelize';

const Tramite = sequelize.define('tramites', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  slug: DataTypes.STRING,
  titulo: DataTypes.STRING,
  descripcion: DataTypes.TEXT,
  descripcion_corta: DataTypes.TEXT,
  info_adicional: DataTypes.TEXT,
  requisitos: DataTypes.TEXT,
  costo: DataTypes.STRING,
  modalidad_pago: DataTypes.STRING,
  direccion: DataTypes.STRING,
  horario_atencion: DataTypes.STRING,
  email: DataTypes.STRING,
  telefono: DataTypes.STRING,
  activo: DataTypes.BOOLEAN,
});

export default Tramite;
