import express from 'express';
import {
    createLocation,
    getAllLocations,
    updateLocation,
    getPassengerLocation,
    getStageLocations,
    getBusLocation,
    getLocationById
} from '../controllers/locations.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const LocationRoutes = express.Router();

LocationRoutes.post('/', protectRoute, createLocation);
LocationRoutes.get('/', getAllLocations);
LocationRoutes.put('/:id', protectRoute, updateLocation);
LocationRoutes.get('/passenger', protectRoute, getPassengerLocation);
LocationRoutes.get('/stage/:id', protectRoute, getStageLocations);
LocationRoutes.get('/bus', protectRoute, getBusLocation);
LocationRoutes.get('/:id', protectRoute, getLocationById);

export default LocationRoutes;
