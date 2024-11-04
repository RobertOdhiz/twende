import express from 'express';
import {
    bookBus,
    checkAvailability,
    getAllBookings,
    getBookingsByBus,
    getBookingById,
    getBookingsByUser,
    updateBooking,
    deleteBooking,
} from '../controllers/booking.controllers.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

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

/**
 * @route GET /api/bookings
 * @desc Get all bookings
 * @access Private
 * @returns {Array} - List of all bookings
 */
BookingRoutes.get('/', protectRoute, getAllBookings);

/**
 * @route GET /api/bookings/bus/:busId
 * @desc Get all bookings for a specific bus
 * @access Private
 * @param {String} req.params.busId - The ID of the bus
 * @returns {Array} - List of bookings for the bus
 */
BookingRoutes.get('/bus/:busId', protectRoute, getBookingsByBus);

/**
 * @route GET /api/bookings/:bookingId
 * @desc Get a single booking by booking ID
 * @access Private
 * @param {String} req.params.bookingId - The ID of the booking
 * @returns {Object} - The booking details
 */
BookingRoutes.get('/:bookingId', protectRoute, getBookingById);

/**
 * @route GET /api/bookings/user
 * @desc Get all bookings for a specific user
 * @access Private
 * @returns {Array} - List of user's bookings
 */
BookingRoutes.get('/user', protectRoute, getBookingsByUser);

/**
 * @route PUT /api/bookings/:bookingId
 * @desc Update a booking
 * @access Private
 * @param {String} req.params.bookingId - The ID of the booking
 * @param {Object} req.body - The updated booking details
 * @returns {Object} - The updated booking details
 */
BookingRoutes.put('/:bookingId', protectRoute, updateBooking);

/**
 * @route DELETE /api/bookings/:bookingId
 * @desc Delete a booking
 * @access Private
 * @param {String} req.params.bookingId - The ID of the booking
 * @returns {Object} - Confirmation of deletion
 */
BookingRoutes.delete('/:bookingId', protectRoute, deleteBooking);

export default BookingRoutes;
