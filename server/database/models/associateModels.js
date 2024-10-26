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
};

export default associateModels;
