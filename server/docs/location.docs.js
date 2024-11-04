const locationPaths = {
    '/api/locations': {
        post: {
            summary: 'Create a new location',
            tags: ['Location'],
            security: [
                {
                    Bearer: [],
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                userId: {
                                    type: 'string',
                                    description: 'The ID of the user creating the location (optional, defaults to authenticated user)',
                                    example: '12345',
                                },
                                longitude: {
                                    type: 'number',
                                    description: 'The longitude of the location',
                                    example: 34.0522,
                                },
                                latitude: {
                                    type: 'number',
                                    description: 'The latitude of the location',
                                    example: -118.2437,
                                },
                                type: {
                                    type: 'string',
                                    description: 'The type of location (e.g., bus stop, station)',
                                    example: 'bus stop',
                                },
                            },
                            required: ['longitude', 'latitude'],
                        },
                    },
                },
            },
            responses: {
                '201': {
                    description: 'Location created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            longitude: { type: 'number' },
                                            latitude: { type: 'number' },
                                            type: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to create location',
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
    '/api/locations': {
        get: {
            summary: 'Retrieve all locations',
            tags: ['Location'],
            responses: {
                '200': {
                    description: 'A list of all locations',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'string' },
                                                longitude: { type: 'number' },
                                                latitude: { type: 'number' },
                                                type: { type: 'string' },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to retrieve locations',
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
    '/api/locations/{id}': {
        put: {
            summary: 'Update an existing location',
            tags: ['Location'],
            security: [
                {
                    Bearer: [],
                },
            ],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'The ID of the location to update',
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
                                longitude: {
                                    type: 'number',
                                    description: 'The new longitude of the location',
                                    example: 34.0522,
                                },
                                latitude: {
                                    type: 'number',
                                    description: 'The new latitude of the location',
                                    example: -118.2437,
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Location updated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            longitude: { type: 'number' },
                                            latitude: { type: 'number' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Location not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'Location not found' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to update location',
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
    '/api/locations/passenger': {
        get: {
            summary: 'Retrieve the location of a passenger',
            tags: ['Location'],
            security: [
                {
                    Bearer: [],
                },
            ],
            responses: {
                '200': {
                    description: 'Passenger location retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            longitude: { type: 'number' },
                                            latitude: { type: 'number' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Passenger location not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'Passenger location not found' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to retrieve passenger location',
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
    '/api/locations/stage/{id}': {
        get: {
            summary: 'Retrieve stage locations by ID',
            tags: ['Location'],
            security: [
                {
                    Bearer: [],
                },
            ],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'The ID of the stage to retrieve locations for',
                    schema: {
                        type: 'string',
                    },
                },
            ],
            responses: {
                '200': {
                    description: 'Stage locations retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            locations: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        id: { type: 'string' },
                                                        longitude: { type: 'number' },
                                                        latitude: { type: 'number' },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Stage location not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'Stage location not found' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to retrieve stage locations',
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
    '/api/locations/bus': {
        get: {
            summary: 'Retrieve the location of a bus',
            tags: ['Location'],
            security: [
                {
                    Bearer: [],
                },
            ],
            responses: {
                '200': {
                    description: 'Bus location retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            longitude: { type: 'number' },
                                            latitude: { type: 'number' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Bus location not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'Bus location not found' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to retrieve bus location',
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

export default locationPaths;
