import { Server } from 'socket.io';
import { handleBadRequest, handleInternalServerError } from '../src/utils/errorHandlers.js';
import LocationService from '../services/location.services.js';

let io;

export const initSocket = (server) => {
    io = new Server(server);
    console.log("Web socket Connection Established");
    io.on('connection', (socket) => {
        console.log('New WebSocket connection:', socket.id);
        socket.on('disconnect', () => {
          console.log('WebSocket disconnected:', socket.id);
        });
    });
};

export const createLocation = async (req, res) => {
    try {
        const userIdFromAuth = req.user?.id;
        const { userId, longitude, latitude, type } = req.body;

        const newLocation = await LocationService.createLocation({
            userId: userIdFromAuth || userId,
            longitude,
            latitude,
            type,
        });

        io.emit('locationCreated', newLocation);

        return res.status(201).json({
            status: 'success',
            data: newLocation,
        });
    } catch (error) {
        console.error('Error creating location:', error);
        return handleInternalServerError(res, error);
    }
};

export const getAllLocations = async (req, res) => {
    try {
        const locations = await LocationService.getAllLocations();
        return res.status(200).json({
            status: 'success',
            data: locations,
        });
    } catch (error) {
        console.error('Error fetching locations:', error);
        return handleInternalServerError(res, error);
    }
};

export const updateLocation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { latitude, longitude } = req.body;

        if (handleBadRequest(res, { latitude, longitude })) return;

        const updatedData = {
            latitude, longitude
        };

        const updatedLocation = await LocationService.updateLocation(id, userId, updatedData);

        io.emit('locationUpdated', updatedLocation);

        return res.status(200).json({
            status: 'success',
            data: updatedLocation,
        });
    } catch (error) {
        console.error('Error updating location:', error);
        return handleInternalServerError(res, error);
    }
};

export const getPassengerLocation = async (req, res) => {
    try {
        const userId = req.user.id;
        const location = await LocationService.getPassengerLocation(userId);
        
        if (!location) {
            return res.status(404).json({
                status: 'error',
                message: 'Passenger location not found',
            });
        }

        return res.status(200).json({
            status: 'success',
            data: location,
        });
    } catch (error) {
        console.error('Error fetching passenger location:', error);
        return handleInternalServerError(res, error);
    }
};

export const getStageLocations = async (req, res) => {
    try {
        const { id } = req.params;
        const location = await LocationService.getStageLocations(id);

        if (!location) {
            return res.status(404).json({
                status: 'error',
                message: 'Stage location not found',
            });
        }

        return res.status(200).json({
            status: 'success',
            data: location,
        });
    } catch (error) {
        console.error('Error fetching stage location:', error);
        return handleInternalServerError(res, error);
    }
};

export const getBusLocation = async (req, res) => {
    try {
        const userId = req.user.id;
        const location = await LocationService.getBusLocation(userId);

        if (!location) {
            return res.status(404).json({
                status: 'error',
                message: 'Bus location not found',
            });
        }

        return res.status(200).json({
            status: 'success',
            data: location,
        });
    } catch (error) {
        console.error('Error fetching bus location:', error);
        return handleInternalServerError(res, error);
    }
};

export const getLocationById = async (req, res) => {
    try {
        const { id } = req.params;
        const location = await LocationService.getLocationById(id);

        if (!location) {
            return res.status(404).json({
                status: 'error',
                message: 'Location not found',
            });
        }

        return res.status(200).json({
            status: 'success',
            data: location,
        });
    } catch (error) {
        console.error('Error fetching location by ID:', error);
        return handleInternalServerError(res, error);
    }
};
