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
    originalname: DataTypes.STRING,
    estado: DataTypes.ENUM("sin firmar", "firmado"),
    nombre: DataTypes.STRING,
    tipo: DataTypes.ENUM('subido', 'generado')
})

export default Document