import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.config.js'; 
import User from './user.models.js'; 
import Bus from './bus.models.js'; 
import Ticket from './ticket.models.js'; 
import Location from './location.models.js';

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    busId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Bus,
            key: 'id',
        },
    },
    pickupLocation: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Location,
            key: 'id'
        }
    },
    dropoffLocation: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Location,
            key: 'id'
        }
    },
    ticketId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Ticket,
            key: 'id',
        },
    },
    ticketPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    pickupTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    bookingTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    paymentStatus: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
    },
}, {
    tableName: 'bookings',
    paranoid: true,
    timestamps: true,
});



export default Booking;