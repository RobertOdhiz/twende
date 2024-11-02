
import userService from "../services/user.services.js";
import { handleBadRequest, handleInternalServerError } from "../src/utils/errorHandlers.js";
import { generateToken } from "../src/utils/token.generator.js";
import { comparePassword, hashPassword } from "../src/utils/password.util.js";

/**
 * Registers a new user.
 *
 * @async
 * @function registerUser  
 * @param {Object} req - The request object containing user registration data.
 * @param {Object} res - The response object used to send the response.
 * @returns {Promise<Object>} A promise that resolves to the response object with the newly created user.
 * @throws {Error} Throws an error if user registration fails.
 */
export const registerUser  = async (req, res) => {
    const { email, username, password, role } = req.body;

    // Validate the request body
    if (handleBadRequest(res, { email, password, username })) return;

    try {
        // Correct function call (removed space in function name)
        const existingUser  = await userService.findUserByEmail(email); 
        if (existingUser ) {
            return res.status(400).json({ status: 'error', message: 'Email already in use' });
        }

        // Hash the password before saving
        const hashedPassword = await hashPassword(password);
        const userObj = { username, email, password: hashedPassword, role: role || 'passenger' };
        
        // Create a new user
        const newUser  = await userService.createUser (userObj);

        return res.status(201).json({ status: 'success', message: 'User  registration successful', data: newUser  });
    } catch (error) {
        return handleInternalServerError(res, error);
    }
};

/**
 * Logs in a user.
 *
 * @async
 * @function loginUser  
 * @param {Object} req - The request object containing user login data.
 * @param {Object} res - The response object used to send the response.
 * @returns {Promise<Object>} A promise that resolves to the response object with the login token.
 * @throws {Error} Throws an error if user login fails.
 */
export const loginUser  = async (req, res) => {
    const { email, password } = req.body;

    if (handleBadRequest(res, { email, password })) return;

    try {
        const user = await userService.findUserByEmail(email); // Correct function call
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'No user exists with this email' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: 'error', message: 'Invalid password' });
        }

        const token = generateToken(user);
        return res.status(200).json({ status: 'success', message: 'Login successful', token });
    } catch (error) {
        return handleInternalServerError(res, error);
    }
};

/**
 * Middleware to restrict access based on user roles.
 *
 * @function restrictTo
 * @param {...string} roles - The roles that are allowed to access the route.
 * @returns {Function} Middleware function that checks if the user has the required role.
 */
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You are not allowed to perform this task' });
        }
        next();
    };
};