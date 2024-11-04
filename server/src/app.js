import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import UserRoutes from '../routes/users.routes.js';
import associateModels from '../database/models/associateModels.js';
import LocationRoutes from '../routes/locations.routes.js';
import swaggerUi from 'swagger-ui-express';
import docs from '../docs/index.js';
import CompanyRoutes from '../routes/company.routes.js';
import BusRoutes from '../routes/bus.routes.js';
import BookingRoutes from '../routes/booking.routes.js';
import PaymentRoutes from '../routes/payment.routes.js';

dotenv.config();

const app = express();

const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Setup Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs, {
  customCss: '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
  customCssUrl: CSS_URL,
}));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the Twende API',
  });
});

// Define routes
app.use('/api/users', UserRoutes);
app.use('/api/locations', LocationRoutes);
app.use('/api/companies', CompanyRoutes);
app.use('/api/buses', BusRoutes);
app.use('/api/bookings', BookingRoutes);
app.use('/api/payments/', PaymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

associateModels();

export default app;
