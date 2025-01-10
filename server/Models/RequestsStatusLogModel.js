import { sequelize } from "../config/db/config.js";
import { DataTypes } from "sequelize";

const RequestsStatusLog = sequelize.define('historial_estados_solicitudes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: DataTypes.STRING
})

export default RequestsStatusLog