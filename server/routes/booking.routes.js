import express from 'express';
import { bookBus, checkAvailability } from '../controllers/booking.controllers.js';
import { protectRoute } from '../middlewares/auth.middlewares.js';

const BookingRoutes = express.Router();

/**
 * @route POST /api/bookings
 * @desc Book a bus
 * @access Private
 * @param {Object} req.body - The booking details
 * @returns {Object} - The booking confirmation
 */
BookingRoutes.post('/', protectRoute, bookBus);

/**
 * @route GET /api/bookings/availability/:busId
 * @desc Check availability of a bus
 * @access Private
 * @param {String} req.params.busId - The ID of the bus
 * @returns {Boolean} - Availability status
 */
BookingRoutes.get('/availability/:busId', protectRoute, checkAvailability);

export default BookingRoutes;