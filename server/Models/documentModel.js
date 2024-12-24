import { sequelize } from "../config/db/config.js";
import { DataTypes } from "sequelize";

const Document = sequelize.define('documentos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero: DataTypes.INTEGER,
    ruta: DataTypes.STRING,
    estado: DataTypes.ENUM("sin firmar", "firmado")
})

export default Document