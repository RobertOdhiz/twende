import Booking from '../database/models/booking.models.js';
import Bus from '../database/models/bus.models.js';
import { sequelize } from '../database/config/database.config.js';

const BookingController = {
    createBooking: async (req, res) => {
        const { userId, busId, ticketId, pickupLocation, dropoffLocation, ticketPrice, pickupTime, bookingTime } = req.body;

        let transaction;

        try {
            // Start a transaction
            transaction = await sequelize.transaction();

            // Find the bus by ID
            const bus = await Bus.findByPk(busId, { transaction });
            if (!bus) {
                return res.status(404).json({ error: 'Bus not found' });
            }

            // Check if there are available seats
            if (bus.seatsBooked >= bus.numberOfSeats) {
                return res.status(400).json({ error: 'No available seats on this bus' });
            }

            // Create the booking
            const booking = await Booking.create({
                userId,
                busId,
                ticketId,
                pickupLocation,
                dropoffLocation,
                ticketPrice,
                pickupTime,
                bookingTime,
            }, { transaction });

            // Increment the seatsBooked count
            bus.seatsBooked += 1;
            await bus.save({ transaction });

            // Commit the transaction
            await transaction.commit();

            res.status(201).json({ booking });
        } catch (error) {
            if (transaction) await transaction.rollback();
            console.error('Error creating booking:', error);
            res.status(500).json({ error: 'An error occurred while creating the booking' });
        }
    },

    getBookingById: async (req, res) => {
        const { id } = req.params;

        try {
            const booking = await Booking.findByPk(id, {
                include: [
                    { model: Bus, as: 'bus' },
                    { model: User, as: 'user', attributes: ['id', 'username', 'email', 'role'] },
                    { model: Ticket, as: 'ticket' },
                ]
            });

            if (!booking) {
                return res.status(404).json({ error: 'Booking not found' });
            }

            res.status(200).json({ booking });
        } catch (error) {
            console.error('Error fetching booking:', error);
            res.status(500).json({ error: 'An error occurred while fetching the booking' });
        }
    },

    deleteBooking: async (req, res) => {
        const { id } = req.params;

        let transaction;

        try {
            // Start a transaction
            transaction = await sequelize.transaction();

            // Find the booking
            const booking = await Booking.findByPk(id, { transaction });
            if (!booking) {
                return res.status(404).json({ error: 'Booking not found' });
            }

            // Find the associated bus and decrement seatsBooked
            const bus = await Bus.findByPk(booking.busId, { transaction });
            if (bus && bus.seatsBooked > 0) {
                bus.seatsBooked -= 1;
                await bus.save({ transaction });
            }

            // Soft delete the booking
            await booking.destroy({ transaction });

            // Commit the transaction
            await transaction.commit();

            res.status(200).json({ message: 'Booking deleted successfully' });
        } catch (error) {
            if (transaction) await transaction.rollback();
            console.error('Error deleting booking:', error);
            res.status(500).json({ error: 'An error occurred while deleting the booking' });
        }
    },
};

export default BookingController;
