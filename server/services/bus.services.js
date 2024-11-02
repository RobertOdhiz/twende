import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'GOOGLE_MAPS_API_KEY'; 

/**
 * Finds nearby buses based on the provided location.
 * @param {Object} location - The location to find nearby buses.
 * @param {number} location.latitude - The latitude of the location.
 * @param {number} location.longitude - The longitude of the location.
 * @returns {Promise<Array>} A promise that resolves to an array of nearby buses.
 */
export const findNearbyBuses = async (location) => {
    const { latitude, longitude } = location;

    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
            params: {
                location: `${latitude},${longitude}`,
                radius: 5000, // We will adjust the radius if need be. Radius is in metres
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