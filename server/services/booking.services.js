import Booking from '../database/models/booking.models.js';
import Bus from '../database/models/bus.models.js';
import User from '../database/models/user.models.js';
import Location from '../database/models/location.models.js';

class BookingService {
    /**
     * Creates a booking for a bus.
     * @param {String} busId - The ID of the bus.
     * @param {String} userId - The ID of the user making the booking.
     * @param {String} pickupLocation - ID of the pickup location.
     * @param {String} dropoffLocation - ID of the dropoff location.
     * @param {Float} ticketPrice - Price of the ticket.
     * @returns {Promise<Object>} The created booking object.
     * @throws {Error} Throws an error if the booking creation fails.
     */
    static async createBooking(busId, userId, pickupLocation, dropoffLocation, ticketPrice) {
        const bus = await Bus.findByPk(busId);
        if (!bus) throw new Error('Bus not found');

        const isAvailable = await this.checkBusAvailability(busId);
        if (!isAvailable) throw new Error('Bus is fully booked');

        const booking = await Booking.create({
            busId,
            userId,
            pickupLocation,
            dropoffLocation,
            ticketPrice,
            paymentStatus: 'pending',
        });

        return booking;
    }

    /**
     * Fetches all bookings with associated bus and user details.
     * @returns {Promise<Array>} - List of all bookings.
     */
    static async getAllBookings() {
        return await Booking.findAll({
            include: [
                { model: Bus, attributes: ['plateNumber', 'capacity', 'electric', 'onService'] },
                { model: User, attributes: ['firstName', 'lastName', 'email'] },
                { model: Location, as: 'pickupLocationDetails', attributes: ['name'] },
                { model: Location, as: 'dropoffLocationDetails', attributes: ['name'] },
            ],
        });
    }

    /**
     * Fetches all bookings for a specific bus.
     * @param {String} busId - The ID of the bus.
     * @returns {Promise<Array>} - List of bookings for the specified bus.
     */
    static async getBookingsForBus(busId) {
        return await Booking.findAll({
            where: { busId },
            include: [
                { model: Bus, attributes: ['plateNumber', 'capacity', 'electric', 'onService'] },
                { model: User, attributes: ['firstName', 'lastName', 'email'] },
                { model: Location, as: 'pickupLocationDetails', attributes: ['name'] },
                { model: Location, as: 'dropoffLocationDetails', attributes: ['name'] },
            ],
        });
    }

    /**
     * Fetches a single booking by booking ID.
     * @param {String} bookingId - The ID of the booking.
     * @returns {Promise<Object>} - The booking object.
     */
    static async getBookingById(bookingId) {
        return await Booking.findByPk(bookingId, {
            include: [
                { model: Bus, attributes: ['plateNumber', 'capacity', 'electric', 'onService'] },
                { model: User, attributes: ['firstName', 'lastName', 'email'] },
                { model: Location, as: 'pickupLocationDetails', attributes: ['name'] },
                { model: Location, as: 'dropoffLocationDetails', attributes: ['name'] },
            ],
        });
    }

    /**
     * Fetches all bookings made by a specific user.
     * @param {String} userId - The ID of the user.
     * @returns {Promise<Array>} - List of bookings for the specified user.
     */
    static async getBookingsForUser(userId) {
        return await Booking.findAll({
            where: { userId },
            include: [
                { model: Bus, attributes: ['plateNumber', 'capacity', 'electric', 'onService'] },
                { model: User, attributes: ['firstName', 'lastName', 'email'] },
                { model: Location, as: 'pickupLocationDetails', attributes: ['name'] },
                { model: Location, as: 'dropoffLocationDetails', attributes: ['name'] },
            ],
        });
    }

    /**
     * Updates a booking's details.
     * @param {String} bookingId - The ID of the booking to update.
     * @param {Object} updateData - Data to update in the booking.
     * @returns {Promise<Object>} - The updated booking object.
     */
    static async updateBooking(bookingId, updateData) {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) throw new Error('Booking not found');

        await booking.update(updateData);
        return booking;
    }

    /**
     * Deletes a booking by ID.
     * @param {String} bookingId - The ID of the booking to delete.
     * @returns {Promise<void>}
     */
    static async deleteBooking(bookingId) {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) throw new Error('Booking not found');

        await booking.destroy();
    }

    /**
     * Checks the availability of a bus.
     * @param {String} busId - The ID of the bus.
     * @returns {Promise<Boolean>} - True if the bus has available seats, false otherwise.
     */
    static async checkBusAvailability(busId) {
        const totalBookings = await Booking.count({ where: { busId } });
        const bus = await Bus.findByPk(busId);
        if (!bus) throw new Error('Bus not found');

        return totalBookings < bus.capacity;
    }
}

export default new BookingService();
