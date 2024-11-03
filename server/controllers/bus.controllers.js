// FILE: bus.controller.js
import {findNearbyBuses, createBus, getAllBuses } from '../services/bus.services.js';



/**
 * Controller to find nearby buses.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const findNearbyBusesController = async (req, res) => {
    const { latitude, longitude, radius } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ status: 'error', message: 'Latitude and longitude are required' });
    }

    try {
        const nearbyBuses = await findNearbyBuses({ latitude, longitude }, radius);
        return res.status(200).json({ status: 'success', data: nearbyBuses });
    } catch (error) {
        console.error('Error finding nearby buses:', error);
        return res.status(500).json({ status: 'error', message: 'Failed to find nearby buses' });
    }
};


/**
 * Create a new bus.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response object with the created bus.
 */
export const createBusController = async (req, res) => {
    try {
        const busData = req.body;
        const newBus = await createBus(busData);
        return res.status(201).json({ status: 'success', data: newBus });
    } catch (error) {
        console.error('Error creating bus:', error);
        return res.status(500).json({ status: 'error', message: 'Failed to create bus' });
    }
};

/**
 * Get all buses.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response object with the list of all buses.
 */
export const getAllBusesController = async (req, res) => {
    try {
        const buses = await getAllBuses();
        return res.status(200).json({ status: 'success', data: buses });
    } catch (error) {
        console.error('Error fetching buses:', error);
        return res.status(500).json({ status: 'error', message: 'Failed to fetch buses' });
    }
};

