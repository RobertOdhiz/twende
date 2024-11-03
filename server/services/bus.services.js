import axios from 'axios';
import Bus from '../database/models/bus.models.js';

const GOOGLE_MAPS_API_KEY = 'GOOGLE_MAPS_API_KEY';

/**
 * Finds nearby buses based on the provided location.
 * @param {Object} location - The location to find nearby buses.
 * @param {number} location.latitude - The latitude of the location.
 * @param {number} location.longitude - The longitude of the location.
 * @param {number} radius - The radius to search within (in meters).
 * @returns {Promise<Array>} A promise that resolves to an array of nearby buses.
 */
export const findNearbyBuses = async (location, radius = 5000) => {
    const { latitude, longitude } = location;

    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
            params: {
                location: `${latitude},${longitude}`,
                radius: radius, // Radius in meters
                type: 'Kiambu Road', // Type of place to search for
                key: GOOGLE_MAPS_API_KEY,
            },
        });

        const nearbyBuses = response.data.results.map((place) => ({
            name: place.name,
            location: place.geometry.location,
            address: place.vicinity,
        }));

        return nearbyBuses;
    } catch (error) {
        console.error('Error finding nearby buses:', error);
        throw new Error('Failed to find nearby buses');
    }
};

/**
 * Create a new bus.
 * @param {Object} busData - The data for the new bus.
 * @returns {Promise<Object>} The created bus.
 */
export const createBus = async (busData) => {
    try {
        const newBus = await Bus.create(busData);
        return newBus;
    } catch (error) {
        console.error('Error creating bus:', error);
        throw new Error('Failed to create bus');
    }
};

/**
 * Get all buses.
 * @returns {Promise<Array>} The list of all buses.
 */
export const getAllBuses = async () => {
    try {
        const buses = await Bus.find();
        return buses;
    } catch (error) {
        console.error('Error fetching buses:', error);
        throw new Error('Failed to fetch buses');
    }
};

export default {
    findNearbyBuses,
    createBus,
    getAllBuses,
};