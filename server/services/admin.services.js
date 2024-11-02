/**
 * Retrieves all users in the system.
 * @returns {Array} - A list of users.
 * @throws {Error} - Throws an error if the retrieval fails.
 */
export const getAllUsers = async () => {
    // Simulate fetching users
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

    return [
        { userId: 'USER-123', name: 'John Doe', email: 'john@example.com' },
        { userId: 'USER-456', name: 'Jane Smith', email: 'jane@example.com' }
    ];
};

export default {
    getAllUsers
};