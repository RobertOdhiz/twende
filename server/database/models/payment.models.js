import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.config.js'; import Booking from './booking.models.js'; 

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
        onDelete: 'CASCADE', // Optional: Automatically delete payments when booking is deleted
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
        type: DataTypes.STRING, // Optional: To store a unique transaction ID for the payment
        allowNull: true, // Not required, as it may not always be available
    },
    paymentDate: {
        type: DataTypes.DATE,
        allowNull: true, // Not required, can be set to null if not specified
        defaultValue: DataTypes.NOW, // Automatically set to current date/time if not provided
    },
}, {
    tableName: 'payments',
    timestamps: true,
});

// Define relationships
Payment.associate = (models) => {
    Payment.belongsTo(models.Booking, {
        foreignKey: 'bookingId',
        as: 'booking', // Alias for the relationship
    });
};

export default Payment;