import Bus from "../database/models/bus.models.js";
import User from "../database/models/user.models.js";

class busService {
    static async getAllBuses() {
        return await Bus.findAll({
            include: [
                {
                    model: User,
                    as: 'driver',
                    attributes: ['id', 'email', 'firstName', 'lastName', 'role'],
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
