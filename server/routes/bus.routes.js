import express from "express";
import { protectRoute, restrictTo } from "../middlewares/auth.middleware.js";
import busController from "../controllers/bus.controllers.js";

const BusRoutes = express.Router();

// Route to create a new bus
BusRoutes.post('/', protectRoute, restrictTo('admin'), busController.createBus);

// Route to get all buses
BusRoutes.get('/', protectRoute, busController.getAllBuses);

// Route to get a bus by ID
BusRoutes.get('/:busId', protectRoute, busController.getBusById);

// Route to assign a driver to a bus
BusRoutes.patch('/assign-driver', protectRoute, busController.assignDriverToBus);

// Route to update bus service status
BusRoutes.patch('/service-status', protectRoute, busController.updateBusServiceStatus);

// Route to set a bus out of service
BusRoutes.patch('/:busId/out-of-service', protectRoute, busController.setBusOutOfService);

// Route to delete a bus
BusRoutes.delete('/:busId', protectRoute, restrictTo('admin'), busController.deleteBus);

export default BusRoutes;
