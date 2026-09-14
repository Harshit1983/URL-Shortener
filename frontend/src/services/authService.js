import axios from "axios";

const API_URL = '/api/auth';

export const registerUser = async (userData) => {
    try {
        const res = await axios.post(API_URL + '/register', userData)
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
        }
        return res.data

    }
    catch (error) {
        console.error('API Error: User registration failed', error);


        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error('An unexpected error occurred during registration.');
        }

    }

}


export const loginUser = async (credentials) => {
    try {
        const res = await axios.post(API_URL + '/login', credentials);
        if (res.data.token) {

            localStorage.setItem('token', res.data.token);
        }
        return res.data
    }
    catch (error) {
        console.error('API Error: User registration failed', error);


        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error('An unexpected error occurred during registration.');
        }

    }

}