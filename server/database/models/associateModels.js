import Location from './location.models.js';
import Bus from './bus.models.js';
import User from './user.models.js';
import Company from './company.models.js';
import Booking from './booking.models.js';
import Payment from './payment.models.js';
import QRCode from './qr_code.models.js';

const associateModels = () => {
    User.hasMany(Location, {
        foreignKey: 'userId',
        as: 'locations',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    Location.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    
    User.hasMany(Booking, {
        foreignKey: 'userId',
        as: 'bookings',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    Booking.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user',
    });

    Booking.belongsTo(Bus, {
        foreignKey: 'busId',
        as: 'bus',
    });

    Bus.hasMany(Booking, {
        foreignKey: 'busId',
        as: 'bookings',
    });

    Booking.hasOne(Payment, {
        foreignKey: 'bookingId',
        as: 'payment',
    });

    Payment.belongsTo(Booking, {
        foreignKey: 'bookingId',
    });

    Company.hasMany(Bus, {
        foreignKey: 'companyId',
        as: 'buses',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    Bus.belongsTo(Company, {
        foreignKey: 'companyId',
        as: 'company',
    });

    Payment.belongsTo(Booking, {
        foreignKey: 'bookingId',
        as: 'booking',
    });

    QRCode.belongsTo(Payment, {
        foreignKey: 'paymentId',
        as: 'payment',
    });
};

export default associateModels;