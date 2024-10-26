import User from "../database/models/user.model.js";

class userService {
    static async createUser (userObj) {
        return await User.create(userObj)
    }

    static async findUserByEmail (email) {
        return await User.findOne({ where: { email } })
    }

    static async findUserByUsername (username) {
        return await User.findOne({ where: { username }, attributes: { exclude: ['password'] } })
    }
}

export default userService;
