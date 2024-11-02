import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import envConfigs from '../config/config.js';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

console.log(`Environment: ${env}`);
console.log(`Config: ${JSON.stringify(config, null, 2)}`);

let sequelize;

if (config && config.url) {
  sequelize = new Sequelize(config.url, config);
} else if (config) {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
} else {
  throw new Error(`No configuration found for environment: ${env}`);
}

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    await sequelize.sync({ alter: true });
    
    console.log('Database synchronized successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    throw err;
  }
};

export { sequelize, testConnection };