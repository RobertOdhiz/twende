import User from "../database/models/user.model.js";
import Location from "../database/models/location.models.js";

class LocationService {

    static async createLocation (locationData) {
        return await Location.create(locationData);
    }
    
    static async getAllLocations() {
        return await Location.findAll({
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'username', 'email', 'role'],
            },
        });
    }

    static async getPassengerLocation(userId) {
        return await Location.findOne({
            where: { userId, type: 'passenger' },
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'username', 'email', 'role'],
            },
        });
    }

    static async getStageLocations(id) {
        return await Location.findOne({
            where: { id, type: 'stage' },
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'username', 'email', 'role'],
            },
        });
    }

    static async getBusLocation(userId) {
        return await Location.findOne({
            where: { userId, type: 'driver' },
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'username', 'email', 'role'],
            },
        });
    }

    static async getLocationById(id) {
        return await Location.findOne({
            where: { id },
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'username', 'email', 'role'],
            },
        });
    }

    static async updateLocation(id, userId, updatedData) {
        const location = await Location.findOne({ where: { id, userId } });

        if (!location) {
            throw new Error('Location not found or userId does not match');
        }

        await location.update(updatedData);

        return location;
    }
}

export default LocationService;
