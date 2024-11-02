import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.config.js'; 
import Booking from './booking.models.js'; 

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    bookingId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Booking,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    paymentMethod: {
        type: DataTypes.ENUM('cash', 'mpesa'),
        allowNull: false,
    },
    paymentStatus: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
    },
    transactionId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    paymentDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'payments',
    paranoid: true,
    timestamps: true,
});


export default Payment;