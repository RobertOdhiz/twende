import bookingService from '../services/booking.services.js';

/**
 * Books a seat on a bus.
 * @param {Object} req - The request object containing booking details.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with booking details.
 */
export const bookBus = async (req, res) => {
    const { busId, pickupLocation, dropoffLocation, ticketPrice, pickupTime } = req.body;
    const userId = req.user.id;

    try {
        const booking = await bookingService.createBooking(busId, userId, pickupLocation, dropoffLocation, ticketPrice, pickupTime);
        return res.status(201).json({
            status: 'success',
            message: 'Bus booking successful',
            data: booking,
        });
    } catch (error) {
        return handleInternalServerError(res, error, 'Failed to book bus');
    }
};

/**
 * Checks availability of a bus.
 * @param {Object} req - The request object containing bus ID.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with availability status.
 */
export const checkAvailability = async (req, res) => {
    const { busId } = req.params;

    try {
        const isAvailable = await bookingService.checkBusAvailability(busId);
        return res.status(200).json({
            status: 'success',
            message: isAvailable ? 'Bus is available' : 'Bus is fully booked',
            isAvailable
        });
    } catch (error) {
        return handleInternalServerError(res, error, 'Failed to check bus availability');
    }
};

/**
 * Fetches all bookings.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with all bookings.
 */
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllBookings();
        return res.status(200).json({
            status: 'success',
            message: 'All bookings retrieved successfully',
            data: bookings,
        });
    } catch (error) {
        return handleInternalServerError(res, error, 'Failed to retrieve bookings');
    }
};

/**
 * Fetches all bookings for a specific bus.
 * @param {Object} req - The request object containing bus ID.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with bookings for the bus.
 */
export const getBookingsByBus = async (req, res) => {
    const { busId } = req.params;

    try {
        const bookings = await bookingService.getBookingsByBus(busId);
        return res.status(200).json({
            status: 'success',
            message: 'Bookings for the bus retrieved successfully',
            data: bookings,
        });
    } catch (error) {
        return handleInternalServerError(res, error, 'Failed to retrieve bookings for the bus');
    }
};

/**
 * Fetches a single booking by booking ID.
 * @param {Object} req - The request object containing booking ID.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with booking details.
 */
export const getBookingById = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await bookingService.getBookingById(bookingId);
        return res.status(200).json({
            status: 'success',
            message: 'Booking retrieved successfully',
            data: booking,
        });
    } catch (error) {
        return handleInternalServerError(res, error, 'Failed to retrieve booking');
    }
};

/**
 * Fetches bookings for a specific user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with user's bookings.
 */
export const getBookingsByUser = async (req, res) => {
    const userId = req.user.id;

    try {
        const bookings = await bookingService.getBookingsByUser(userId);
        return res.status(200).json({
            status: 'success',
            message: 'User bookings retrieved successfully',
            data: bookings,
        });
    } catch (error) {
        return handleInternalServerError(res, error, 'Failed to retrieve user bookings');
    }
};

/**
 * Updates a booking.
 * @param {Object} req - The request object containing booking ID and update details.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with updated booking details.
 */
export const updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const updates = req.body;

    try {
        const updatedBooking = await bookingService.updateBooking(bookingId, updates);
        return res.status(200).json({
            status: 'success',
            message: 'Booking updated successfully',
            data: updatedBooking,
        });
    } catch (error) {
        return handleInternalServerError(res, error, 'Failed to update booking');
    }
};

/**
 * Deletes a booking.
 * @param {Object} req - The request object containing booking ID.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object confirming deletion.
 */
export const deleteBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        await bookingService.deleteBooking(bookingId);
        return res.status(204).json({
            status: 'success',
            message: 'Booking deleted successfully',
        });
    } catch (error) {
        return handleInternalServerError(res, error, 'Failed to delete booking');
    }
};

