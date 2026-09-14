import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + '/api/links';

export const getUserLinks = async (token) => {

    const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

console.log('Token sent to backend:', token ? 'TOKEN_PRESENT' : 'NO_TOKEN');
    try {

        const res = await axios.get(
            API_URL + '/my-links',
            config
        );

        return res.data;

    } catch (err) {

        console.error(
            'API Error: Failed to fetch user links',
            err
        );

        if (err.response && err.response.data) {
            throw err.response.data;
        }

        throw new Error(
            'An unexpected error occurred while fetching links.'
        );
    }
};