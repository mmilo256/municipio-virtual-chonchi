import { sequelize } from '../config/db/config.js';
import { DataTypes } from 'sequelize';

const PasoFormulario = sequelize.define('pasos_formularios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  orden: DataTypes.INTEGER,
});

export default PasoFormulario;
