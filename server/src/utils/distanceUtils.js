import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

export const getDistance = async (origin, destination) => {
    try {
        const response = await client.distancematrix({
            params: {
                origins: [origin],
                destinations: [destination],
                key: process.env.GOOGLE_MAPS_API_KEY, // Store your API key in an environment variable
            },
            timeout: 1000, // milliseconds
        });

        const distance = response.data.rows[0].elements[0].distance.value; // distance in meters
        return distance / 1000; // Convert to kilometers
    } catch (error) {
        console.error("Error fetching distance:", error);
        throw error; // Handle the error appropriately
    }
};