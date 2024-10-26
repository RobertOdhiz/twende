import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config.js";
import User from "./user.model.js";

const Location = sequelize.define(
  'Location',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    longitude: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    type: {
      type: DataTypes.ENUM('passenger', 'driver', 'stage'),
      allowNull: false,
      defaultValue: 'passenger',
    },
  },
  {
    timestamps: true,
    tableName: 'locations',
    validate: {
      userIdConditional() {
        if ((this.type === 'passenger' || this.type === 'driver') && !this.userId) {
          throw new Error('userId is required for types passenger and driver');
        }
        if (this.type === 'stage' && this.userId) {
          throw new Error('userId should be null when type is stage');
        }
      },
    },
  }
);

export default Location;
