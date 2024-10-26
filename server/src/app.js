import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import UserRoutes from '../routes/users.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the Twende API'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use('/api/users', UserRoutes);

export default app;

