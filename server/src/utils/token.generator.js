import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    return jwt.sign({
        role: user.role,
        username: user.username,
        email: user.email,
        id: user.id
    }, process.env.JWT_SECRET, {
        expiresIn: '24h' 
    });
}

export { generateToken };
