import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.config.js'; 

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

export default Company;