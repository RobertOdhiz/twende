import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * M-Pesa payment configuration
 */
const MPESA_API_URL = 'https://sandbox.safaricom.co.ke/mpesa/';
const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE; 
const MPESA_LIVE_URL = 'https://api.safaricom.co.ke'; // For production
const MPESA_USERNAME = process.env.MPESA_USERNAME; 
const MPESA_PASSWORD = process.env.MPESA_PASSWORD; 
const MPESA_LIVE_PASSKEY = process.env.MPESA_LIVE_PASSKEY; 
const MPESA_LIVE_SHORTCODE = process.env.MPESA_LIVE_SHORTCODE; 

/**
 * Initiates an M-Pesa payment.
 * @param {String} phoneNumber - The phone number to which the payment is being made.
 * @param {Number} amount - The amount to be paid.
 * @param {String} bookingId - The ID of the booking.
 * @returns {Object} - The payment response object.
 * @throws {Error} - Throws an error if the payment initiation fails.
 */
export const initiateMpesaPayment = async (phoneNumber, amount, bookingId) => {
    const payload = {
        shortCode: MPESA_SHORTCODE,
        amount,
        phoneNumber,
        callbackUrl: `${process.env.CALLBACK_URL}/callback`, // environment variable for callback URL
        accountReference: bookingId,
        transactionDesc: `Payment for booking ${bookingId}`
    };

    // Get access token
    const token = Buffer.from(`${MPESA_USERNAME}:${MPESA_PASSWORD}`).toString('base64');

    try {
        // Initiate payment
        const response = await axios.post(`${MPESA_API_URL}payment/request`, payload, {
            headers: {
                Authorization: `Basic ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        throw new Error(`M-Pesa payment initiation failed: ${error.message}`);
    }
};

/**
 * Processes a cash payment.
 * @param {String} bookingId - The ID of the booking.
 * @param {Number} amount - The amount to be paid.
 * @returns {Object} - The cash payment confirmation object.
 * @throws {Error} - Throws an error if the cash payment process fails.
 */
export const processCashPayment = async (bookingId, amount) => {
    // Simulate cash payment processing
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay

    return {
        paymentId: `CASH-${bookingId}`,
        amount,
        status: 'paid'
    };
};

/**
 * Retrieves the payment status based on the payment ID.
 * @param {String} paymentId - The ID of the payment.
 * @returns {Object} - The payment status object.
 * @throws {Error} - Throws an error if the payment status retrieval fails.
 */
export const getPaymentStatus = async (paymentId) => {
    // Simulate fetching payment status
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

    return {
        paymentId,
        status: paymentId.startsWith('PAYMENT-') ? 'paid' : 'pending'
    };
};

/**
 * Handles the callback from the payment gateway.
 * @param {Object} callbackData - The data sent by the payment gateway.
 * @returns {Object} - The result of processing the callback.
 * @throws {Error} - Throws an error if the callback processing fails.
 */
export const handlePaymentCallback = async (callbackData) => {
    const { paymentId, status, bookingId } = callbackData;

    // Update the payment status in the database
    try {
        await PaymentModel.updateOne({ paymentId }, { status });
    } catch (error) {
        throw new Error(`Failed to update payment status: ${error.message}`);
    }

    return {
        paymentId,
        status,
        bookingId
    };
};

export default {
    initiateMpesaPayment,
    processCashPayment,
    getPaymentStatus,
    handlePaymentCallback
};