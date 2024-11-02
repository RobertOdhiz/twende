import { DataTypes } from 'sequelize';
import { sequelize  } from '../config/database.config.js'; 
import Company from './company.models.js'; 

const Bus = sequelize.define('Bus', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    companyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Company, 
            key: 'id',
        },
        onDelete: 'CASCADE', //  Automatically delete the bus if the company is deleted
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    electric: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'buses',
    timestamps: true,
});

// Define relationships
Bus.associate = (models) => {
    Bus.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company', // Alias for the relationship
    });
};

export default Bus;