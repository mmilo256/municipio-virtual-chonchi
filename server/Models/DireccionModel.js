import { sequelize } from "../config/db/config.js";
import { DataTypes } from "sequelize";

const Direccion = sequelize.define('direcciones_municipales', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING
})

export default Direccion