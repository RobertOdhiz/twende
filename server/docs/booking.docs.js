const bookingPaths = {
    '/api/bookings': {
        post: {
            summary: 'Book a bus',
            tags: ['Booking'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                busId: {
                                    type: 'string',
                                    description: 'The ID of the bus to book',
                                    example: 'bus123',
                                },
                                pickupLocation: {
                                    type: 'string',
                                    description: 'The pickup location for the bus',
                                    example: 'Nairobi',
                                },
                                dropoffLocation: {
                                    type: 'string',
                                    description: 'The dropoff location for the bus',
                                    example: 'Mombasa',
                                },
                                ticketPrice: {
                                    type: 'number',
                                    description: 'Price of the bus ticket',
                                    example: 1500,
                                },
                                pickupTime: {
                                    type: 'string',
                                    format: 'date-time',
                                    description: 'Time of pickup',
                                    example: '2024-11-10T09:00:00Z',
                                },
                            },
                            required: ['busId', 'pickupLocation', 'dropoffLocation', 'ticketPrice', 'pickupTime'],
                        },
                    },
                },
            },
            responses: {
                '201': {
                    description: 'Bus booking successful',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Bus booking successful' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            bookingId: { type: 'string' },
                                            busId: { type: 'string' },
                                            userId: { type: 'string' },
                                            pickupLocation: { type: 'string' },
                                            dropoffLocation: { type: 'string' },
                                            ticketPrice: { type: 'number' },
                                            pickupTime: { type: 'string', format: 'date-time' },
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
                    description: 'Bad request or invalid data',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'Invalid booking details' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to book bus',
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
    '/api/bookings/availability/{busId}': {
        get: {
            summary: 'Check availability of a bus',
            tags: ['Booking'],
            parameters: [
                {
                    name: 'busId',
                    in: 'path',
                    required: true,
                    description: 'The ID of the bus to check availability for',
                    schema: {
                        type: 'string',
                        example: 'bus123',
                    },
                },
            ],
            responses: {
                '200': {
                    description: 'Availability check successful',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Bus is available' },
                                    isAvailable: { type: 'boolean' },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Bus not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'Bus not found' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to check bus availability',
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
    '/api/bookings': {
        get: {
            summary: 'Get all bookings',
            tags: ['Booking'],
            responses: {
                '200': {
                    description: 'All bookings retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'All bookings retrieved successfully' },
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                bookingId: { type: 'string' },
                                                busId: { type: 'string' },
                                                userId: { type: 'string' },
                                                pickupLocation: { type: 'string' },
                                                dropoffLocation: { type: 'string' },
                                                ticketPrice: { type: 'number' },
                                                pickupTime: { type: 'string', format: 'date-time' },
                                                createdAt: { type: 'string', format: 'date-time' },
                                                updatedAt: { type: 'string', format: 'date-time' },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to retrieve bookings',
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
    '/api/bookings/bus/{busId}': {
        get: {
            summary: 'Get all bookings for a specific bus',
            tags: ['Booking'],
            parameters: [
                {
                    name: 'busId',
                    in: 'path',
                    required: true,
                    description: 'The ID of the bus to retrieve bookings for',
                    schema: {
                        type: 'string',
                        example: 'bus123',
                    },
                },
            ],
            responses: {
                '200': {
                    description: 'Bookings for the bus retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Bookings for the bus retrieved successfully' },
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                bookingId: { type: 'string' },
                                                busId: { type: 'string' },
                                                userId: { type: 'string' },
                                                pickupLocation: { type: 'string' },
                                                dropoffLocation: { type: 'string' },
                                                ticketPrice: { type: 'number' },
                                                pickupTime: { type: 'string', format: 'date-time' },
                                                createdAt: { type: 'string', format: 'date-time' },
                                                updatedAt: { type: 'string', format: 'date-time' },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'No bookings found for this bus',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'No bookings found for this bus' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to retrieve bookings for the bus',
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
    '/api/bookings/{bookingId}': {
        get: {
            summary: 'Get a single booking by booking ID',
            tags: ['Booking'],
            parameters: [
                {
                    name: 'bookingId',
                    in: 'path',
                    required: true,
                    description: 'The ID of the booking to retrieve',
                    schema: {
                        type: 'string',
                        example: 'booking123',
                    },
                },
            ],
            responses: {
                '200': {
                    description: 'Booking retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Booking retrieved successfully' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            bookingId: { type: 'string' },
                                            busId: { type: 'string' },
                                            userId: { type: 'string' },
                                            pickupLocation: { type: 'string' },
                                            dropoffLocation: { type: 'string' },
                                            ticketPrice: { type: 'number' },
                                            pickupTime: { type: 'string', format: 'date-time' },
                                            createdAt: { type: 'string', format: 'date-time' },
                                            updatedAt: { type: 'string', format: 'date-time' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Booking not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'Booking not found' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to retrieve booking',
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

export default bookingPaths;
