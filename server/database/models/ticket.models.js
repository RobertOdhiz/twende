import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.config.js';

const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    basePrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    pricePerKilometer: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    discountPercentage: {
        type: DataTypes.FLOAT,
        allowNull: true, // Optional field for discounts
        defaultValue: 0.0,
    },
    promotionCode: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field for promotion codes
    },
    validFrom: {
        type: DataTypes.DATE,
        allowNull: true, // Optional field for when the ticket is valid from
    },
    validUntil: {
        type: DataTypes.DATE,
        allowNull: true, // Optional field for when the ticket is valid until
    },
}, {
    tableName: 'tickets',
    timestamps: true,
});

export default Ticket;