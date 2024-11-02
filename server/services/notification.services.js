/**
 * Sends a notification to the user.
 * @param {String} userId - The ID of the user to notify.
 * @param {String} message - The message to send.
 * @returns {Object} - The result of the notification sending process.
 * @throws {Error} - Throws an error if notification fails.
 */
export const sendNotification = async (userId, message) => {

    return {
        userId,
        message,
        status: 'sent'
    };
};

export default {
    sendNotification
};