import { sequelize } from '../config/db/config.js';
import { DataTypes } from 'sequelize';

const Respuesta = sequelize.define('respuestas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  valor: DataTypes.STRING,
});

export default Respuesta;
