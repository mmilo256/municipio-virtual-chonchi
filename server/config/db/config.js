import { Sequelize } from 'sequelize';
import { config } from '../config.js';

const { host, name, user, password, port } = config.db;

export const sequelize = new Sequelize(name, user, password, {
  host,
  port,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: Number(process.env.DB_POOL_MAX || 10),
    min: Number(process.env.DB_POOL_MIN || 0),
    acquire: Number(process.env.DB_POOL_ACQUIRE_MS || 30000),
    idle: Number(process.env.DB_POOL_IDLE_MS || 10000),
  },
});
