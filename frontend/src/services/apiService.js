import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const createShortUrl = async (longUrl) => {

    try {

        const token = localStorage.getItem('token');

        const config = {};

        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`
            };
        }

        const res = await axios.post(
            API_URL + '/api/shorten',
            {
                longUrl: longUrl
            },
            config
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