import { initSocket } from './controllers/locations.controller.js';
import { testConnection } from './database/config/database.config.js';
import app from './src/app.js';
import dotenv from 'dotenv';
import http from 'http';

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
