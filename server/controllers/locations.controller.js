import { Server } from 'socket.io';
import { handleBadRequest, handleInternalServerError } from '../src/utils/errorHandlers.js';
import LocationService from '../services/location.services.js';

let io;

/**
 * Initializes the WebSocket server.
 * @param {Object} server - The HTTP server instance to attach the WebSocket server to.
 */
export const initSocket = (server) => {
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log('A bus connected: ', socket.id);

        socket.on('locationUpdate', (data) => {
            // Broadcast the location update to all connected clients
            socket.broadcast.emit('locationUpdated', data);
        });

        socket.on('requestNearbyBuses', async (location) => {
            // Logic to find nearby buses based on the location
            const nearbyBuses = await findNearbyBuses(location);
            socket.emit('nearbyBuses', nearbyBuses);
        });

        socket.on('disconnect', () => {
            console.log('Bus disconnected: ', socket.id);
        });
    });
};

/**
 * Creates a new location.
 * @async
 * @function createLocation
 * @param {Object} req - The request object containing user and location data.
 * @param {Object} res - The response object used to send the response.
 * @returns {Promise<Object>} A promise that resolves to the response object with the newly created location.
 * @throws {Error} Throws an error if location creation fails.
 */
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

        return res.status(201).json({ status: 'success', data: newLocation });
    } catch (error) {
        console.error('Error creating location:', error);
        return handleInternalServerError(res, error);
    }
};



/**
 * Retrieves all locations.
 *
 * @async
 * @function getAllLocations
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} A promise that resolves to the response object with all locations.
 * @throws {Error} Throws an error if fetching locations fails.
 */
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

/**
 * Updates an existing location.
 *
 * @async
 * @function updateLocation
 * @param {Object} req - The request object containing the location ID and updated data.
 * @param {Object} res - The response object used to send the response.
 * @returns {Promise<Object>} A promise that resolves to the response object with the updated location.
 * @throws {Error} Throws an error if updating the location fails or if bad request.
 */
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

/**
 * Retrieves the location of a passenger.
 *
 * @async
 * @function getPassengerLocation
 * @param {Object} req - The request object containing user authentication.
 * @param {Object} res - The response object used to send the response.
 * @returns {Promise<Object>} A promise that resolves to the response object with the passenger's location.
 * @throws {Error} Throws an error if fetching the passenger's location fails.
 */
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

/**
 * Retrieves stage locations based on the provided ID.
 *
 * @async
 * @function getStageLocations
 * @param {Object} req - The request object containing the stage ID in parameters.
 * @param {Object} res - The response object used to send the response.
 * @returns {Promise<Object>} A promise that resolves to the response object with the stage location.
 * @throws {Error} Throws an error if fetching the stage location fails.
 */
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

/**
 * Retrieves the location of a bus for a given user.
 *
 * @async
 * @function getBusLocation
 * @param {Object} req - The request object containing user authentication.
 * @param {Object} res - The response object used to send the response.
 * @returns {Promise<Object>} A promise that resolves to the response object with the bus location.
 * @throws {Error} Throws an error if fetching the bus location fails.
 */
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

/**
 * Retrieves a location by its ID.
 *
 * @async
 * @function getLocationById
 * @param {Object} req - The request object containing the location ID in parameters.
 * @param {Object} res - The response object used to send the response.
 * @returns {Promise<Object>} A promise that resolves to the response object with the location details.
 * @throws {Error} Throws an error if fetching the location fails.
 */
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