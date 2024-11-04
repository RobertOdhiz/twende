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
        allowNull: true,
        defaultValue: 0.0,
    },
    promotionCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    validFrom: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    validUntil: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'tickets',
    paranoid: true,
    timestamps: true,
});

export default Ticket;