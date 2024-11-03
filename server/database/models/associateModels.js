import Location from './location.models.js';
import Bus from './bus.models.js';
import User from './user.models.js';
import Company from './company.models.js';
import Booking from './booking.models.js';
import Payment from './payment.models.js';
import QRCode from './qr_code.models.js';

const associateModels = () => {
    // User and Location Associations
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

    // User and Booking Associations
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

    // User and Bus Associations (driver)
    User.hasMany(Bus, {
        foreignKey: 'driverId',
        as: 'buses',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    Bus.belongsTo(User, {
        foreignKey: 'driverId',
        as: 'driver',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    // Bus and Booking Associations
    Bus.hasMany(Booking, {
        foreignKey: 'busId',
        as: 'bookings',
    });
    Booking.belongsTo(Bus, {
        foreignKey: 'busId',
        as: 'bus',
    });

    // Company and Bus Associations
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

    // Booking and Payment Associations
    Booking.hasOne(Payment, {
        foreignKey: 'bookingId',
        as: 'payment',
    });
    Payment.belongsTo(Booking, {
        foreignKey: 'bookingId',
        as: 'booking',
    });

    // Payment and QRCode Associations
    Payment.hasOne(QRCode, {
        foreignKey: 'paymentId',
        as: 'qrCode',
    });
    QRCode.belongsTo(Payment, {
        foreignKey: 'paymentId',
        as: 'payment',
    });

    // Booking and Location Associations (for pickup and dropoff)
    Booking.belongsTo(Location, {
        foreignKey: 'pickupLocation',
        as: 'pickupLocationDetails',
    });
    Booking.belongsTo(Location, {
        foreignKey: 'dropoffLocation',
        as: 'dropoffLocationDetails',
    });
    Location.hasMany(Booking, {
        foreignKey: 'pickupLocation',
        as: 'pickupBookings',
    });
    Location.hasMany(Booking, {
        foreignKey: 'dropoffLocation',
        as: 'dropoffBookings',
    });
};

export default associateModels;
