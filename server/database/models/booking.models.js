import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.config.js'; 
import User from './user.models.js'; 
import Bus from './bus.models.js'; 

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
    departureLocation: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    arrivalLocation: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    departureDate: {
        type: DataTypes.DATEONLY, //  DATEONLY for just date (without time)
        allowNull: false, 
    },
    departureTime: {
        type: DataTypes.TIME, // TIME for just time (without date)
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
    timestamps: true,
});

export default Booking;