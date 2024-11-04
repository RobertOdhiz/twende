import Bus from "../database/models/bus.models.js";
import User from "../database/models/user.models.js";
import axios from 'axios';


class busService {
    static async getAllBuses() {
        return await Bus.findAll({
            include: [
                {
                    model: User,
                    as: 'driver',
                    attributes: ['id', 'email', 'role'],
                },
            ],
        });
    }

    static async assignDriverToBus(busId, driverId) {
        const bus = await Bus.findByPk(busId);
        if (!bus) {
            throw new Error('Bus not found');
        }

        bus.driverId = driverId;
        await bus.save();
        return bus;
    }

    static async updateBusServiceStatus(busId, onService) {
        const bus = await Bus.findByPk(busId);
        if (!bus) {
            throw new Error('Bus not found');
        }

        bus.onService = onService;
        await bus.save();
        return bus;
    }

    static async setBusOutOfService(busId) {
        const bus = await Bus.findByPk(busId);
        if (!bus) {
            throw new Error('Bus not found');
        }

        bus.onService = false;
        await bus.save();
        return bus;
    }

    static async getBusById(busId) {
        const bus = await Bus.findByPk(busId, {
            include: [
                {
                    model: User,
                    as: 'driver',
                    attributes: ['id', 'email', 'firstName', 'lastName', 'role'],
                },
            ],
        });
        if (!bus) {
            throw new Error('Bus not found');
        }
        return bus;
    }

    static async deleteBus(busId) {
        const bus = await Bus.findByPk(busId);
        if (!bus) {
            throw new Error('Bus not found');
        }

        await bus.destroy();
        return { message: 'Bus deleted successfully' };
    }

    static async createBus(busData) {
        console.log('Bus Data in service: ', busData);
        if (!busData || !busData.plateNumber || !busData.capacity || !busData.companyId) {
            throw new Error('Invalid bus data. Plate number, capacity, and company ID are required.');
        }

        const newBus = await Bus.create(busData);
        return newBus;
    }
}

export default busService;

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
