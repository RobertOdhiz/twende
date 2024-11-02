/**
 * Error handling middleware for Express applications.
 *
 * This middleware captures errors that occur during request processing
 * and sends a standardized JSON response to the client. It logs the error
 * stack to the console for debugging purposes and includes the stack trace
 * in the response only when the application is in development mode.
 *
 * @param {Error} err - The error object that was thrown.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 *
 * @returns {void} Sends a JSON response with the error details.
 */
export const errorHandler = (err, req, res, next) => {
    // Log the error stack for debugging
    console.error(err.stack);

    // Determine the status code
    const statusCode = err.status || 500;

    // Create a response object
    const response = {
        status: 'error',
        statusCode: statusCode,
        message: err.message || 'Internal Server Error',
    };

    // If in development mode, include stack trace for easier debugging
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack; // Include stack trace only in development
    }

    // Send the response
    res.status(statusCode).json(response);
};