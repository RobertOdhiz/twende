import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config();

export default {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectModule: pg,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectModule: pg,
  },
};