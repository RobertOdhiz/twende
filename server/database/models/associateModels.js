import Location from "./location.models.js";
import User from "./user.model.js";

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
};

export default associateModels;
