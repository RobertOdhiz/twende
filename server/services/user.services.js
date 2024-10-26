import User from "../database/models/user.model.js";

class userService {
    static async createUser (userObj) {
        return await User.create(userObj);
    }

    static async findUserByEmail(email) {
        if (!email) {
            throw new Error('Email is required');
        }
        console.log('Email in service: ', email);
    
        try {
            const user = await User.findOne({ where: { email } });
            return user;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw new Error('Database query failed');
        }
    }    

    static async findUserByUsername (username) {
        return await User.findOne({ where: { username }, attributes: { exclude: ['password'] } });
    }
}

export default userService;
