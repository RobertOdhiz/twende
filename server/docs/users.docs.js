const userPaths = {
    '/api/users/register': {
        post: {
            summary: 'Register a new user',
            tags: ['Authentication'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                    format: 'email',
                                    description: 'User email address',
                                    example: 'user@example.com',
                                },
                                username: {
                                    type: 'string',
                                    description: 'Username for the new user',
                                    example: 'john_doe',
                                },
                                password: {
                                    type: 'string',
                                    description: 'Password for the new user',
                                    example: 'password123',
                                },
                                role: {
                                    type: 'string',
                                    description: 'Role of the user (optional, defaults to "passenger")',
                                    example: 'admin',
                                },
                            },
                            required: ['email', 'username', 'password'],
                        },
                    },
                },
            },
            responses: {
                '201': {
                    description: 'User registration successful',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'User registration successful' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            email: { type: 'string' },
                                            username: { type: 'string' },
                                            role: { type: 'string' },
                                            createdAt: { type: 'string', format: 'date-time' },
                                            updatedAt: { type: 'string', format: 'date-time' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '400': {
                    description: 'Email already in use or bad request',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'Email already in use' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to register user',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                    error: { type: 'string' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/api/users/login': {
        post: {
            summary: 'Login a user',
            tags: ['Authentication'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                    format: 'email',
                                    description: 'User email address',
                                    example: 'user@example.com',
                                },
                                password: {
                                    type: 'string',
                                    description: 'Password for the user',
                                    example: 'password123',
                                },
                            },
                            required: ['email', 'password'],
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Login successful',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Login successful' },
                                    token: { type: 'string', description: 'JWT token for authenticated user' },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'No user exists with this email',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'No user exists with this email' },
                                },
                            },
                        },
                    },
                },
                '401': {
                    description: 'Invalid password',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'Invalid password' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to login user',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                    error: { type: 'string' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

export default userPaths;
