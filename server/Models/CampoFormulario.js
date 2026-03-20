import { sequelize } from '../config/db/config.js';
import { DataTypes } from 'sequelize';

const CampoFormulario = sequelize.define('campos_formularios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  etiqueta: DataTypes.STRING,
  nombre_interno: DataTypes.STRING,
  placeholder: DataTypes.STRING,
  tipo: DataTypes.ENUM(['text', 'textarea', 'select']),
  orden: DataTypes.INTEGER,
  opciones: DataTypes.JSON,
  texto_ayuda: DataTypes.STRING,
  obligatorio: DataTypes.BOOLEAN,
});

export default CampoFormulario;
