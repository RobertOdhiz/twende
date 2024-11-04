import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const getMpesaApiKey = async () => {
    const consumerKey = process.env.SAFARICOM_CONSUMER_KEY;
    const consumerSecret = process.env.SAFARICOM_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
        throw new Error('Consumer Key and Consumer Secret must be set in the environment variables');
    }

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    try {
        const response = await axios.get(
            'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            }
        );

        return response.data.access_token;
    } catch (error) {
        console.error('Error generating M-Pesa API key:', error.message);
        throw new Error('Failed to generate SAFARICOM_API_KEY: ' + error.message);
    }
};

const api_key = await getMpesaApiKey();

console.log('M-Pesa API Key:', api_key);