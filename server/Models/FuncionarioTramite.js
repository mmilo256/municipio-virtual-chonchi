import { sequelize } from '../config/db/config.js';
import { DataTypes } from 'sequelize';

const FuncionarioTramite = sequelize.define('asignaciones_tramites', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

export default FuncionarioTramite;
