const busPaths = {
    '/api/buses': {
        post: {
            summary: 'Create a new bus',
            tags: ['Bus'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                plateNumber: {
                                    type: 'string',
                                    description: 'Unique identifier for the bus',
                                    example: 'BUS1234',
                                },
                                capacity: {
                                    type: 'integer',
                                    description: 'Seating capacity of the bus',
                                    example: 50,
                                },
                                driverId: {
                                    type: 'string',
                                    description: 'ID of the driver assigned to the bus (optional)',
                                    example: 'driver-123',
                                },
                                onService: {
                                    type: 'boolean',
                                    description: 'Service status of the bus',
                                    example: true,
                                },
                                electric: {
                                    type: 'boolean',
                                    description: 'Indicates if the bus is electric',
                                    example: false,
                                },
                                companyId: {
                                    type: 'string',
                                    description: 'ID of the company that owns the bus',
                                    example: 'company-123',
                                },
                            },
                            required: ['plateNumber', 'capacity', 'companyId'],
                        },
                    },
                },
            },
            responses: {
                '201': {
                    description: 'Bus created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Bus created successfully' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            plateNumber: { type: 'string' },
                                            capacity: { type: 'integer' },
                                            driverId: { type: 'string' },
                                            electric: { type: 'boolean' },
                                            onService: { type: 'boolean' },
                                            companyId: { type: 'string' },
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
                    description: 'Invalid request data',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'Invalid request data' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to create bus',
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
    '/api/buses/{busId}': {
        put: {
            summary: 'Update a bus',
            tags: ['Bus'],
            parameters: [
                {
                    name: 'busId',
                    in: 'path',
                    required: true,
                    description: 'ID of the bus to update',
                    schema: {
                        type: 'string',
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                plateNumber: {
                                    type: 'string',
                                    description: 'Unique identifier for the bus',
                                    example: 'BUS1234',
                                },
                                capacity: {
                                    type: 'integer',
                                    description: 'Seating capacity of the bus',
                                    example: 50,
                                },
                                driverId: {
                                    type: 'string',
                                    description: 'ID of the driver assigned to the bus (optional)',
                                    example: 'driver-123',
                                },
                                onService: {
                                    type: 'boolean',
                                    description: 'Service status of the bus',
                                    example: true,
                                },
                                electric: {
                                    type: 'boolean',
                                    description: 'Indicates if the bus is electric',
                                    example: false,
                                },
                                companyId: {
                                    type: 'string',
                                    description: 'ID of the company that owns the bus',
                                    example: 'company-123',
                                },
                            },
                            required: ['plateNumber', 'capacity', 'companyId'],
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Bus updated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Bus updated successfully' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            plateNumber: { type: 'string' },
                                            capacity: { type: 'integer' },
                                            driverId: { type: 'string' },
                                            electric: { type: 'boolean' },
                                            onService: { type: 'boolean' },
                                            companyId: { type: 'string' },
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
                    description: 'Failed to update bus',
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
    '/api/buses/{busId}/out-of-service': {
        post: {
            summary: 'Set bus out of service',
            tags: ['Bus'],
            parameters: [
                {
                    name: 'busId',
                    in: 'path',
                    required: true,
                    description: 'ID of the bus to set out of service',
                    schema: {
                        type: 'string',
                    },
                },
            ],
            responses: {
                '200': {
                    description: 'Bus set out of service successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Bus set out of service successfully' },
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
                    description: 'Failed to set bus out of service',
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

export default busPaths;
