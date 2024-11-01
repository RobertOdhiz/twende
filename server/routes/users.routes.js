import express from 'express';
import { loginUser , registerUser  } from '../controllers/users.controller.js';

const UserRoutes = express.Router();

/**
 * @route POST /api/users/register
 * @desc Register a new user
 * @access Public
 * @param {Object} req.body - User registration details
 * @returns {Object} - Registration confirmation
 */
UserRoutes.post('/register', registerUser );

/**
 * @route POST /api/users/login
 * @desc Login a user
 * @access Public
 * @param {Object} req.body - User login details
 * @returns {Object} - Login confirmation with token
 */
UserRoutes.post('/login', loginUser );

export default UserRoutes;