import bookingService from '../services/booking.services.js';

/**
 * Books a seat on a bus.
 * @param {Object} req - The request object containing booking details.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with booking details.
 */

export const bookBus = async (req, res) => {
    const { busId } = req.body;
    const userId = req.user.id; 

    try {
        const booking = await bookingService.createBooking(busId, userId);
        return res.status(201).json({
            status: 'success',
            data: booking,
        });
    } catch (error) {
        return handleInternalServerError(res, error);
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
            isAvailable
        });
    } catch (error) {
        return handleInternalServerError(res, error);
    }
};