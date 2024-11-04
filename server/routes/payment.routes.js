import express from 'express';
import {
    initiatePayment,
    confirmCashPayment,
    initiatePushSTK,
    pushSTKCallback
} from '../controllers/payments.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const PaymentRoutes = express.Router();

/**
 * @route POST /api/payments
 * @desc Initiate a payment for a booking (either cash or M-Pesa)
 * @access Private
 * @param {Object} req.body - Payment details including booking ID, amount, payment method, and phone number (if M-Pesa)
 * @returns {Object} - Payment confirmation
 */
PaymentRoutes.post('/', protectRoute, initiatePayment);

/**
 * @route POST /api/payments/cash/confirm
 * @desc Confirm a cash payment as received
 * @access Private
 * @param {Object} req.body - Payment confirmation details including booking ID
 * @returns {Object} - Confirmation message
 */
PaymentRoutes.post('/cash/confirm', protectRoute, confirmCashPayment);

/**
 * @route POST /api/payments/mpesa/stkpush
 * @desc Initiate an STK push for M-Pesa payment
 * @access Private
 * @param {Object} req.body - STK push details including booking ID, amount, and phone number
 * @returns {Object} - STK push initiation response
 */
PaymentRoutes.post('/mpesa/stkpush', protectRoute, initiatePushSTK);

/**
 * @route POST /api/payments/stkPushCallback/:bookingId
 * @desc Handle the M-Pesa STK push callback
 * @access Public
 * @param {String} req.params.bookingId - The booking ID to update payment status
 * @returns {Object} - Callback processing confirmation
 */
PaymentRoutes.post('/stkPushCallback/:bookingId', pushSTKCallback);

export default PaymentRoutes;
