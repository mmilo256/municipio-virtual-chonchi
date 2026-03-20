import { sequelize } from '../config/db/config.js';
import { DataTypes } from 'sequelize';

const Formulario = sequelize.define('formularios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  activo: DataTypes.BOOLEAN,
});

export default Formulario;
