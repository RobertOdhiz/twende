/**
 * Submits a review for a specific booking.
 * @param {String} bookingId - The ID of the booking.
 * @param {String} userId - The ID of the user submitting the review.
 * @param {Number} rating - The rating given by the user.
 * @param {String} comment - The review comment.
 * @returns {Object} - The submitted review object.
 * @throws {Error} - Throws an error if the review submission fails.
 */
export const submitReview = async (bookingId, userId, rating, comment) => {
    // Simulate review submission
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

    return {
        bookingId,
        userId,
        rating,
        comment,
        status: 'submitted'
    };
};

export default {
    submitReview
};