import express from 'express';
import { initiatePayment, confirmPaymentStatus } from '../controllers/payment.controllers.js';
import { protectRoute } from '../middlewares/auth.middlewares.js';

const PaymentRoutes = express.Router();

/**
 * @route POST /api/payments
 * @desc Initiate a payment for a booking
 * @access Private
 * @param {Object} req.body - Payment details including booking ID and amount
 * @returns {Object} - Payment confirmation
 */
PaymentRoutes.post('/', protectRoute, initiatePayment);

/**
 * @route GET /api/payments/:paymentId/status
 * @desc Confirm the status of a payment
 * @access Private
 * @param {String} req.params.paymentId - The ID of the payment
 * @returns {Object} - Payment status
 */
PaymentRoutes.get('/:paymentId/status', protectRoute, confirmPaymentStatus);

export default PaymentRoutes;