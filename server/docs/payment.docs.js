const paymentPaths = {
    '/api/payments': {
        post: {
            summary: 'Initiate a payment for a booking (either cash or M-Pesa)',
            tags: ['Payment'],
            description: 'Initiates a payment for a specified booking. Requires payment details including booking ID, amount, payment method, and phone number if M-Pesa is used.',
            security: [{ Bearer: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                bookingId: { type: 'string', example: '123456' },
                                amount: { type: 'number', example: 500 },
                                paymentMethod: { type: 'string', enum: ['cash', 'mpesa'], example: 'mpesa' },
                                phoneNumber: { type: 'string', example: '0712345678' },
                            },
                            required: ['bookingId', 'amount', 'paymentMethod'],
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Payment processed successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Payment processed successfully' },
                                    payment: { type: 'object', additionalProperties: true },
                                },
                            },
                        },
                    },
                },
                '400': {
                    description: 'Invalid payment details',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: { type: 'string', example: 'Booking ID, amount, and payment method are required' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to process payment',
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
    '/api/payments/cash/confirm': {
        post: {
            summary: 'Confirm a cash payment as received',
            tags: ['Payment'],
            description: 'Confirms that the cash payment for a specific booking has been received.',
            security: [{ Bearer: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                bookingId: { type: 'string', example: '123456' },
                            },
                            required: ['bookingId'],
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Cash payment confirmation received',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: { type: 'string', example: 'Cash payment processed successfully' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to confirm payment',
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
    '/api/payments/mpesa/stkpush': {
        post: {
            summary: 'Initiate an STK push for M-Pesa payment',
            tags: ['Payment'],
            description: 'Initiates an STK push to process an M-Pesa payment for a specified booking.',
            security: [{ Bearer: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                bookingId: { type: 'string', example: '123456' },
                                amount: { type: 'number', example: 500 },
                                phoneNumber: { type: 'string', example: '0712345678' },
                            },
                            required: ['bookingId', 'amount', 'phoneNumber'],
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'STK push initiated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    paymentData: { type: 'object', additionalProperties: true },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to initiate STK push',
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
    '/api/payments/stkPushCallback/{bookingId}': {
        post: {
            summary: 'Handle the M-Pesa STK push callback',
            tags: ['Payment'],
            description: 'Processes the callback from the M-Pesa STK push to update payment status for the specified booking.',
            parameters: [
                {
                    name: 'bookingId',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                        example: '123456',
                    },
                },
            ],
            responses: {
                '200': {
                    description: 'Callback processed successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Callback received and processed successfully' },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Failed to process callback',
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

export default paymentPaths;
