import { DataTypes } from 'sequelize';
import { sequelize  } from '../config/database.config.js'; 
import Company from './company.models.js'; 
import User from './user.models.js';

const Bus = sequelize.define('Bus', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    driverId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    plateNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numberOfSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    companyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Company, 
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    seatsBooked: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    electric: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    onService: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'buses',
    paranoid: true,
    timestamps: true,
});


export default Bus;