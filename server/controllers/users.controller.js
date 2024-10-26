import userService from "../services/user.services.js";
import { handleBadRequest, handleInternalServerError } from "../src/utils/errorHandlers.js";
import { generateToken } from "../src/utils/token.generator.js";
import { comparePassword, hashPassword } from "../src/utils/password.util.js";

export const registerUser = async (req, res) => {
    const { email, username, password, role } = req.body;

    if (handleBadRequest(res, { email, password, username })) return;

    try {
        const [existingUserByUsername, existingUserByEmail] = await Promise.all([
            userService.findUserByUsername(username),
            userService.findUserByEmail(email)
        ]);

        if (existingUserByUsername) {
            return res.status(400).json({ status: 'error', message: 'Username already in use' });
        }

        if (existingUserByEmail) {
            return res.status(400).json({ status: 'error', message: 'Email already in use' });
        }

        const hashedPassword = await hashPassword(password);

        const userObj = {
            username,
            email,
            password: hashedPassword,
            role
        }
        const newUser = await userService.createUser(userObj);

        return res.status(201).json({
            status: 'success',
            message: 'User registration successful',
            data: newUser
        })
    } catch (error) {
        return handleInternalServerError(res, error);
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("Request Body: ", req.body);

    if (handleBadRequest(res, { email, password })) return;

    try {
        const user = await userService.findUserByEmail(email);
        console.log('User found: ', user);

        if (!user) {
            return res.status(404).json({ status: 'error', message: 'No user exists with this email' });
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ status: 'error', message: 'Invalid password' });
        }

        const token = generateToken(user);

        return res.status(200).json({
            status: 'success',
            message: 'Login successful',
            token
        });
    } catch (error) {
        return handleInternalServerError(res, error);
    }
};