import Booking from '../database/models/booking.model.js';
import Bus from '../database/models/bus.model.js';

/**
 * Creates a booking for a bus.
 * @param {String} busId - The ID of the bus.
 * @param {String} userId - The ID of the user making the booking.
 * @returns {Promise<Object>} The created booking object.
 * @throws {Error} Throws an error if the booking creation fails.
 */
export const createBooking = async (busId, userId) => {
    // Check if the bus exists
    const bus = await Bus.findByPk(busId);
    if (!bus) {
        throw new Error('Bus not found');
    }

    // Check if the bus has available seats
    const isAvailable = await checkBusAvailability(busId);
    if (!isAvailable) {
        throw new Error('Bus is fully booked');
    }

    // Create a new booking
    const booking = await Booking.create({
        busId,
        userId,
        paymentStatus: 'pending', // Initially set to pending
    });

    return booking;
};

/**
 * Checks the availability of a bus.
 * @param {String} busId - The ID of the bus.
 * @returns {Promise<Boolean>} True if the bus is available, false otherwise.
 * @throws {Error} Throws an error if the availability check fails.
 */
export const checkBusAvailability = async (busId) => {
    // Count the number of bookings for the bus
    const totalBookings = await Booking.count({ where: { busId } });

    // Find the bus to get its capacity
    const bus = await Bus.findByPk(busId);
    if (!bus) {
        throw new Error('Bus not found');
    }

    // Check if there are available seats
    return totalBookings < bus.capacity; // Return true if available seats exist, otherwise false
};

// Export other necessary functions...
export default {
    createBooking,
    checkBusAvailability,
};