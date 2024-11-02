import { DataTypes } from 'sequelize';
import { sequelize  } from '../config/database.config.js'; 
import Company from './company.models.js'; 

const Bus = sequelize.define('Bus', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    plateNumber: {
        type: DataTypes.STRING,
        allowNull: false
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