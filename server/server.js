import { initSocket } from './controllers/locations.controller.js';
import { testConnection } from './database/config/database.config.js';
import app from './src/app.js';
import dotenv from 'dotenv';
import http from 'http';

import logger from './src/utils/logger.js';

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

dotenv.config();

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 9000;

const startServer = async () => {
  try {
    await testConnection();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  }
};

startServer();
