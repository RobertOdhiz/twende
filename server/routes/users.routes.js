import express from 'express';
import { loginUser, registerUser } from '../controllers/users.controller.js';

const UserRoutes = express.Router()

UserRoutes.post('/register', registerUser);
UserRoutes.post('/login', loginUser);

export default UserRoutes;