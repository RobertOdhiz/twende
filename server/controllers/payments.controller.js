import paymentService from '../services/payment.services.js';
import Booking from '../database/models/booking.models.js';
import { handleInternalServerError, handleBadRequest } from '../utils/errorHandlers.js';

/**
 * Initiates a cash payment for a booking.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The payment confirmation object.
 */
export const initiateCashPayment = async (req, res) => {
    const { bookingId, amount, busDetails } = req.body;

    // Validate request body
    if (!bookingId || !amount || !busDetails) {
        return handleBadRequest(res, { bookingId, amount, busDetails });
    }

    try {
        // Process the cash payment
        const payment = await paymentService.processPayment(bookingId, amount, 'cash');

        // Record the bus details and payment amount in the database
        await Booking.update(
            { busDetails, amountPaid: amount },
            { where: { id: bookingId } }
        );

        // Generate a QR code for payment confirmation
        const qrCodeImage = await paymentService.createQRCode(bookingId);

        return res.status(200).json({
            status: 'success',
            message: 'Cash payment processed successfully',
            payment,
            qrCodeImage, // Include the QR code in the response
        });
    } catch (error) {
        return handleInternalServerError(res, error);
    }
};

/**
 * Confirms that the cash payment has been received.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} Confirmation message.
 */
export const confirmCashPayment = async (req, res) => {
    const { bookingId } = req.body;

    try {
        const confirmation = await paymentService.confirmCashPayment(bookingId);
        return res.status(200).json({
            status: 'success',
            message: confirmation.message,
        });
    } catch (error) {
        return handleInternalServerError(res, error);
    }
};

/**
 * Initiates a payment for a booking (can be M-Pesa or cash).
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The payment confirmation object.
 */
export const initiatePayment = async (req, res) => {
    const { bookingId, amount, paymentMethod } = req.body;

    // Validate request body
    if (!bookingId || !amount || !paymentMethod) {
        return handleBadRequest(res, { bookingId, amount, paymentMethod });
    }

    try {
        const payment = await paymentService.processPayment(bookingId, amount, paymentMethod);
        const qrCodeImage = await paymentService.createQRCode(bookingId);

        return res.status(200).json({
            status: 'success',
            message: 'Payment processed successfully',
            payment,
            qrCodeImage, // Include the QR code in the response
        });
    } catch (error) {
        return handleInternalServerError(res, error);
    }
};

export default {
    initiateCashPayment,
    confirmCashPayment,
    initiatePayment,
};