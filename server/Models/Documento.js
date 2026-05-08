import { sequelize } from '../config/db/config.js';
import { DataTypes } from 'sequelize';

const Documento = sequelize.define('documentos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  campo_id: DataTypes.INTEGER,
  nombre_original: DataTypes.STRING,
  nombre_guardado: DataTypes.STRING,
  nombre: DataTypes.STRING,
  ruta: DataTypes.STRING,
  mime_type: DataTypes.STRING,
  bytes: DataTypes.BIGINT,
  origen: DataTypes.ENUM('solicitante', 'funcionario', 'sistema'),
});

export default Documento;
