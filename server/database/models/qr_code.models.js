
/**
 * @module QRCodeModel
 * @description This module defines the QRCode model used for representing 
 *              QR codes generated for payment transactions. Each QR code 
 *              is linked to a specific payment, allowing for easy 
 *              tracking and validation of payment transactions.
 * 
 * @see {@link Payment} for the associated payment model.
 * 
 * @typedef {Object} QRCode
 * @property {string} id - The unique identifier for the QR code, 
 *                         generated as a UUID.
 * @property {string} paymentId - The unique identifier of the payment 
 *                                associated with this QR code, 
 *                                referencing the Payment model.
 * @property {string} qrCodeImage - The image data or URL of the QR code.
 * @property {Date} createdAt - The timestamp indicating when the QR code 
 *                             was created.
 * 
 * @exports QRCodeModel
 */


const QRCodeModel = sequelize.define('QRCode', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    paymentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Payment, // Use the Payment model directly
            key: 'id',
        },
        onDelete: 'CASCADE', // Automatically delete QR codes when the associated payment is deleted
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
    timestamps: true, 
});

/**
 * Define associations for the QRCode model.
 * @param {Object} models - An object containing all models.
 */
QRCodeModel.associate = (models) => {
    QRCodeModel.belongsTo(models.Payment, {
        foreignKey: 'paymentId',
        as: 'payment', // Alias for the relationship
    });
};

export default QRCodeModel;