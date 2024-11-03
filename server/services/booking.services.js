import Booking from '../database/models/booking.models.js';
import Bus from '../database/models/bus.model.js';
import Location from '../database/models/location.model.js'; // Assuming you have a Location model
import { getDistance } from '../utils/distanceUtils.js';

/**
 * Creates a booking for a bus.
 * @param {String} busId - The ID of the bus.
 * @param {String} userId - The ID of the user making the booking.
 * @param {String} pickupLocationId - The ID of the pickup location.
 * @param {String} dropoffLocationId - The ID of the dropoff location.
 * @returns {Promise<Object>} The created booking object.
 * @throws {Error} Throws an error if the booking creation fails.
 */
export const createBooking = async (busId, userId, pickupLocationId, dropoffLocationId) => {
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

    // Fetch pickup and dropoff locations
    const pickupLocation = await Location.findByPk(pickupLocationId);
    const dropoffLocation = await Location.findByPk(dropoffLocationId);
    
    if (!pickupLocation || !dropoffLocation) {
        throw new Error('Pickup or dropoff location not found');
    }

    // Calculate the distance using Google Maps API
    const distance = await getDistance(pickupLocation.address, dropoffLocation.address);
    
    // Optionally: You can use the distance for fare calculation or other logic
    const fare = calculateFare(distance); // Implement this function based on your fare structure

    // Create a new booking
    const booking = await Booking.create({
        busId,
        userId,
        paymentStatus: 'pending',
        distance, // Store the distance if needed
        fare, // Store the calculated fare if needed
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
    return totalBookings < bus.capacity;
};

// Example fare calculation function
const calculateFare = (distance) => {
    const ratePerKm = 5; 
    return distance * ratePerKm; // Calculates fare based on distance
};


export default {
    createBooking,
    checkBusAvailability,
};