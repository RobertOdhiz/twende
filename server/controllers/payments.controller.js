import paymentService from '../services/payment.services.js';
import Booking from '../database/models/booking.models.js';
import { handleInternalServerError, handleBadRequest } from '../src/utils/errorHandlers.js';
import { getTimestamp } from '../src/utils/timestamp.utils.js';
import ngrok from 'ngrok';
import axios from 'axios';

/**
 * Initiates a cash payment for a booking.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const initiateCashPayment = async (req, res) => {
    const { bookingId, amount, busDetails } = req.body;

    if (!bookingId || !amount || !busDetails) {
        return handleBadRequest(res, { bookingId, amount, busDetails });
    }

    try {
        const payment = await paymentService.processPayment(bookingId, amount, 'cash');
        await Booking.update(
            { busDetails, amountPaid: amount },
            { where: { id: bookingId } }
        );

        return res.status(200).json({
            status: 'success',
            message: 'Cash payment processed successfully',
            payment,
        });
    } catch (error) {
        return handleInternalServerError(res, error);
    }
};

/**
 * Confirms that the cash payment has been received.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
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
 * Initiates a payment (M-Pesa or cash).
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const initiatePayment = async (req, res) => {
    const { bookingId, amount, paymentMethod, phoneNumber } = req.body;

    if (!bookingId || !amount || !paymentMethod) {
        return handleBadRequest(res, { bookingId, amount, paymentMethod });
    }

    try {
        const payment = await paymentService.processPayment(bookingId, amount, paymentMethod, phoneNumber);
        return res.status(200).json({
            status: 'success',
            message: 'Payment processed successfully',
            payment,
        });
    } catch (error) {
        return handleInternalServerError(res, error);
    }
};

/**
 * Initiates an STK push for M-Pesa.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export const initiatePushSTK = async (req, res, next) => {
    const { bookingId, amount, phoneNumber } = req.body;

    try {
        const safaricomAccessToken = await paymentService.generateMpesaApiKey(); // Generate API Key dynamically
        const timestamp = getTimestamp();
        const password = Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp).toString('base64');

        const callbackUrl = await ngrok.connect(process.env.PORT);

        const response = await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            {
                BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: amount,
                PartyA: phoneNumber,
                PartyB: process.env.BUSINESS_SHORT_CODE,
                PhoneNumber: phoneNumber,
                CallBackURL: `${callbackUrl}/api/stkPushCallback/${bookingId}`,
                AccountReference: "Twende",
                TransactionDesc: "Bus Booking",
            },
            {
                headers: { Authorization: `Bearer ${safaricomAccessToken}` },
            }
        );

        req.paymentData = response.data;
        next();
    } catch (error) {
        return handleInternalServerError(res, { message: "Error with the STK push", error: error.message });
    }
};

/**
 * Handles the STK push callback.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const pushSTKCallback = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { stkCallback } = req.body.Body;

        const callbackData = stkCallback.CallbackMetadata.Item.reduce((acc, item) => {
            acc[item.Name] = item.Value;
            return acc;
        }, {});

        console.log("STK Push Callback Data:", callbackData);

        // Update payment status based on STK Push results (adjust fields accordingly)
        await Payment.update(
            {
                paymentStatus: stkCallback.ResultCode === 0 ? 'completed' : 'failed',
                transactionId: callbackData.MpesaReceiptNumber,
            },
            { where: { bookingId } }
        );

        return res.status(200).json({ message: "Callback received and processed successfully" });
    } catch (error) {
        return handleInternalServerError(res, error);
    }
};