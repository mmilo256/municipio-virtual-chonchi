import { Sequelize } from "sequelize";
import { config } from "../config.js";

const { host, name, user, password, port } = config.db

export const sequelize = new Sequelize(name, user, password, {
    host,
    port,
    dialect: "mysql"
});