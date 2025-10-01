import { sequelize } from "../config/db/config.js";
import { DataTypes } from "sequelize";

const RefreshToken = sequelize.define('refresh_token', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: DataTypes.TEXT,
    expires_in: DataTypes.DATE,
    userId: DataTypes.INTEGER
})

export default RefreshToken