import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config.js";
import Payment from "./payment.models.js";


const QRCode = sequelize.define('QRCode', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    paymentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Payment,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    qrCodeImage: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'qr_codes',
    paranoid: true,
    timestamps: true, 
});


export default QRCode;