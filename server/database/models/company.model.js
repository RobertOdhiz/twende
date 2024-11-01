import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js'; 
import Bus from '../models/bus.model'; 

const Company = sequelize.define('Company', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactInfo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'companies',
    timestamps: true,
});

// Relationships
Company.associate = (models) => {
    Company.hasMany(models.Bus, {
        foreignKey: 'companyId', 
        as: 'buses', // Alias for the relationship
        onDelete: 'CASCADE', // Automatically delete buses when the company is deleted
    });
};

export default Company;