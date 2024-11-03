const companyPaths = {
    '/api/companies': {
        post: {
            summary: 'Create a new company',
            tags: ['Company'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    description: 'Name of the company',
                                    example: 'Fast Buses Ltd.',
                                },
                                contactInfo: {
                                    type: 'string',
                                    description: 'Contact information for the company',
                                    example: 'info@fastbuses.com',
                                },
                            },
                            required: ['name', 'contactInfo'],
                        },
                    },
                },
            },
            responses: {
                '201': {
                    description: 'Company created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Company created successfully' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string', format: 'uuid' },
                                            name: { type: 'string' },
                                            contactInfo: { type: 'string' },
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
                    description: 'Failed to create company',
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
        get: {
            summary: 'Retrieve all companies',
            tags: ['Company'],
            responses: {
                '200': {
                    description: 'List of all companies',
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
                                                id: { type: 'string', format: 'uuid' },
                                                name: { type: 'string' },
                                                contactInfo: { type: 'string' },
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
                    description: 'Failed to retrieve companies',
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
    '/api/companies/{companyId}': {
        get: {
            summary: 'Retrieve a specific company by ID',
            tags: ['Company'],
            parameters: [
                {
                    name: 'companyId',
                    in: 'path',
                    required: true,
                    description: 'ID of the company to retrieve',
                    schema: {
                        type: 'string',
                    },
                },
            ],
            responses: {
                '200': {
                    description: 'Company retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string', format: 'uuid' },
                                            name: { type: 'string' },
                                            contactInfo: { type: 'string' },
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
                    description: 'Company not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'Company not found' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to retrieve company',
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
        put: {
            summary: 'Update a company',
            tags: ['Company'],
            parameters: [
                {
                    name: 'companyId',
                    in: 'path',
                    required: true,
                    description: 'ID of the company to update',
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
                                name: {
                                    type: 'string',
                                    description: 'Name of the company',
                                    example: 'Fast Buses Ltd.',
                                },
                                contactInfo: {
                                    type: 'string',
                                    description: 'Contact information for the company',
                                    example: 'info@fastbuses.com',
                                },
                            },
                            required: ['name', 'contactInfo'],
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Company updated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Company updated successfully' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string', format: 'uuid' },
                                            name: { type: 'string' },
                                            contactInfo: { type: 'string' },
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
                    description: 'Company not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'Company not found' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to update company',
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
        delete: {
            summary: 'Delete a company',
            tags: ['Company'],
            parameters: [
                {
                    name: 'companyId',
                    in: 'path',
                    required: true,
                    description: 'ID of the company to delete',
                    schema: {
                        type: 'string',
                    },
                },
            ],
            responses: {
                '200': {
                    description: 'Company deleted successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Company deleted successfully' },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Company not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'Company not found' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to delete company',
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

export default companyPaths;
