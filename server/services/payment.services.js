import QRCode from 'qrcode';
import axios from 'axios';
import Payment from '../database/models/payment.model.js';
import Booking from '../database/models/booking.model.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Sends a request to the M-Pesa API to process a payment.
 * @param {String} phoneNumber - The phone number of the customer.
 * @param {Number} amount - The amount to be paid.
 * @param {String} reference - A reference for the transaction.
 * @returns {Promise<Object>} The response from the M-Pesa API.
 * @throws {Error} Throws an error if the M-Pesa payment fails.
 */
const processMpesaPayment = async (phoneNumber, amount, reference) => {
    const apiUrl = 'https://sandbox.safaricom.co.ke/mpesa/';
    const apiKey = process.env.MPESA_API_KEY; //  environment variable for API Key

    const requestBody = {
        phoneNumber,
        amount,
        reference,
    };

    try {
        const response = await axios.post(`${apiUrl}payment/request`, requestBody, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error('M-Pesa payment failed: ' + error.message);
    }
};

/**
 * Processes a payment for a booking.
 * @param {String} bookingId - The ID of the booking.
 * @param {Number} amount - The amount to be paid.
 * @param {String} paymentMethod - The payment method ('mpesa' or 'cash').
 * @param {String} phoneNumber - The customer's phone number for M-Pesa payments.
 * @param {String} busDetails - Details of the bus boarded (only for cash payments).
 * @returns {Promise<Object>} The payment confirmation object.
 * @throws {Error} Throws an error if the payment process fails.
 */
export const processPayment = async (bookingId, amount, paymentMethod, phoneNumber = null, busDetails = null) => {
    let payment;
    if (paymentMethod === 'mpesa') {
        const reference = `Booking-${bookingId}`;
        const paymentResponse = await processMpesaPayment(phoneNumber, amount, reference);
        
        payment = await Payment.create({
            bookingId,
            amount,
            paymentMethod,
            paymentStatus: paymentResponse.status,
            transactionId: paymentResponse.transactionId,
        });

        await Booking.update({ status: 'paid' }, { where: { id: bookingId } });
    } else if (paymentMethod === 'cash') {
        payment = await Payment.create({
            bookingId,
            amount,
            paymentMethod,
            paymentStatus: 'completed', 
        });

        await Booking.update({ status: 'paid', busDetails }, { where: { id: bookingId } });
    } else {
        throw new Error('Invalid payment method');
    }

    return payment;
};

/**
 * Creates a QR code for payment confirmation.
 * @param {String} bookingId - The ID of the booking.
 * @returns {Promise<String>} The QR code image data as a base64 string.
 * @throws {Error} Throws an error if QR code generation fails.
 */
export const createQRCode = async (bookingId) => {
    const qrCodeText = `Payment confirmed for booking ${bookingId}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeText, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
    });

    return qrCodeImage;
};

/**
 * Confirms cash payment has been received.
 * @param {String} bookingId - The ID of the booking.
 * @returns {Promise<Object>} The confirmation object.
 * @throws {Error} Throws an error if confirmation fails.
 */
export const confirmCashPayment = async (bookingId) => {
    // Logic to confirm that cash payment has been received
    // This could involve checking the payment status in the database
    const payment = await Payment.findOne({ where: { bookingId, paymentMethod: 'cash' } });
    
    if (!payment) {
        throw new Error('No cash payment found for this booking');
    }

    // Update payment status to confirmed
    await Payment.update(
        { paymentStatus: 'confirmed' },
        { where: { bookingId, paymentMethod: 'cash' } }
    );

    return { message: 'Cash payment confirmed successfully' };
};

/**
 * Retrieves the payment status based on the payment ID.
 * @param {String} paymentId - The ID of the payment.
 * @returns {Promise<Object>} The payment status object.
 * @throws {Error} Throws an error if the payment status retrieval fails.
 */
export const getPaymentStatus = async (paymentId) => {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) throw new Error('Payment not found');
    return payment;
};

export default {
    processPayment,
    processMpesaPayment,
    createQRCode,
    confirmCashPayment,
    getPaymentStatus,
};