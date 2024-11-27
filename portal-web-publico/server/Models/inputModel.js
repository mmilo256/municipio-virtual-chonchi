import { sequelize } from "../config/db/config.js";
import { DataTypes } from "sequelize";

const INPUT_TYPES = ["text", "rut", "textarea", "phone", "number", "select", "date", "time", "email", "password", "radio", "file"]

const Input = sequelize.define('campos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
    etiqueta: DataTypes.STRING,
    tipo: DataTypes.ENUM(INPUT_TYPES),
    es_requerido: DataTypes.BOOLEAN,
    opciones: DataTypes.JSON,
    placeholder: DataTypes.STRING,
    min: DataTypes.NUMBER,
    max: DataTypes.NUMBER
})

export default Input