import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const createShortUrl = async (longUrl) => {
    try {
        const res = await axios.post(
            API_URL + '/api/shorten',
            {
                longUrl: longUrl
            }
        );

        return res.data;

    } catch (error) {
        console.error('API Error:', error);

        if (error.response && error.response.data) {
            throw error.response.data;
        }

        throw new Error(
            'An unexpected error occurred. Please try again.'
        );
    }
};