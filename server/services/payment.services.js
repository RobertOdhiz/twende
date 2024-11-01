import QRCode from 'qrcode';

/**
 * Processes a payment for a booking.
 * @param {String} bookingId - The ID of the booking.
 * @param {Number} amount - The amount to be paid.
 * @returns {Object} - The payment confirmation.
 */
export const processPayment = async (bookingId, amount) => {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay

    return {
        paymentId: `PAYMENT-${bookingId}`,
        amount,
        status: 'paid'
    };
};

/**
 * Creates a QR code for payment confirmation.
 * @param {String} bookingId - The ID of the booking.
 * @returns {String} - The QR code image data.
 */
export const createQRCode = async (bookingId) => {
    const qrCodeText = `Payment confirmed for booking ${bookingId}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeText, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        renderer: {
            width: 200,
            height: 200
        }
    });

    return qrCodeImage;
};