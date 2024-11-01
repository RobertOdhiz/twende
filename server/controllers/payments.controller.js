import paymentService from '../services/payment.services.js';
import bookingService from '../services/booking.services.js';

/**
 * Initiates a payment for a booking.
 * @param {Object} req - The request object containing booking ID and amount.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with payment confirmation.
 */
export const initiatePayment = async (req, res) => {
    const { bookingId, amount } = req.body;

    try {
        // Process the payment
        const payment = await paymentService.processPayment(bookingId, amount);
        
        // Generate QR code for payment confirmation
        const qrCodeImage = await paymentService.createQRCode(bookingId);
        
        return res.status(200).json({
            status: 'success',
            payment,
            qrCodeImage // Include the QR code in the response
        });
    } catch (error) {
        return handleInternalServerError(res, error);
    }
};

/**
 * Confirms payment status.
 * @param {Object} req - The request object containing payment ID.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with payment confirmation.
 */
export const confirmPaymentStatus = async (req, res) => {
    const { paymentId } = req.params;

    try {
        const paymentStatus = await paymentService.getPaymentStatus(paymentId);
        return res.status(200).json({
            status: 'success',
            paymentStatus
        });
    } catch (error) {
        return handleInternalServerError(res, error);
    }
};

/**
 * Generates a QR code for the payment confirmation.
 * @param {Object} req - The request object containing booking ID.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing the QR code.
 */
export const generateQRCode = async (req, res) => {
    const { bookingId } = req.params;

    try {
        // Ensure the booking exists and the payment is confirmed before generating the QR code
        const booking = await bookingService.getBooking(bookingId);
        if (!booking || booking.paymentStatus !== 'paid') {
            return res.status(404).json({
                status: 'error',
                message: 'Booking not found or payment not confirmed'
            });
        }

        const qrCodeImage = await paymentService.createQRCode(bookingId);
        return res.status(200).json({
            status: 'success',
            qrCodeImage
        });
    } catch (error) {
        return handleInternalServerError(res, error);
    }
};

/**
 * Handles internal server errors.
 * @param {Object} res - The response object.
 * @param {Error} error - The error object.
 * @returns {Object} - The response object with the error message.
 */
const handleInternalServerError = (res, error) => {
    console.error(error);
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
};