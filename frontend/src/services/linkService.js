import axios from "axios";

const API_URL = '/api/links';

export const getUserLinks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const res = await axios.get(API_URL + '/my-links', config);
        return res.data;

    } catch (err) {
        console.error('API Error: Failed to fetch user links', err);

        if (err.response && err.response.data) {
            throw err.response.data;
        } else {
            throw new Error(
                'An unexpected error occurred while fetching links.'
            );
        }
    }
};