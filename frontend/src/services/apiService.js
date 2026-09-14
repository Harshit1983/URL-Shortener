import axios from 'axios';

export const createShortUrl = async (longUrl) => {

    try {

        const res = await axios.post('/api/shorten', {
            longUrl: longUrl
        });

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