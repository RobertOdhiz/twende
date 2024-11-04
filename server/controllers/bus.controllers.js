import busService from "../services/bus.services.js";

class busController {
    static async getAllBuses(req, res) {
        try {
            const buses = await busService.getAllBuses();
            return res.status(200).json(buses);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async assignDriverToBus(req, res) {
        let { busId, driverId } = req.body;

        if (!driverId) {
            if (req.user.role === 'driver') {
                driverId = req.user.id;
            } else {
                return res.status(403).json({ message: 'Only a driver can be assigned to a bus.' });
            }
        }

        try {
            const bus = await busService.assignDriverToBus(busId, driverId);
            return res.status(200).json(bus);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async updateBusServiceStatus(req, res) {
        const { busId, onService } = req.body;

        try {
            const bus = await busService.updateBusServiceStatus(busId, onService);
            return res.status(200).json(bus);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async setBusOutOfService(req, res) {
        const { busId } = req.params;

        try {
            const bus = await busService.setBusOutOfService(busId);
            return res.status(200).json(bus);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async getBusById(req, res) {
        const { busId } = req.params;

        try {
            const bus = await busService.getBusById(busId);
            return res.status(200).json(bus);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async deleteBus(req, res) {
        const { busId } = req.params;

        try {
            const result = await busService.deleteBus(busId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async createBus(req, res) {
        const busData = req.body;
        console.log('Bus Data in Controller: ', busData);

        try {
            const newBus = await busService.createBus(busData);
            return res.status(201).json(newBus);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default busController;
