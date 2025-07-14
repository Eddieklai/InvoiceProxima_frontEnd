import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL_LOCAL;

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
        });
        if (response.status !== 200) {
            throw new Error('Login failed');
        }
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export const registerUser = async (userData: {
    name: string;
    phone: string;
    email: string;
    password: string;
}) => {
    try {
        const response = await axios.post(`${API_URL}/user/register`, userData);
        if (response.status !== 201) {
            throw new Error('Registration failed');
        }
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
}

export const getMe = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`${API_URL}/user/me`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch user data');
        }
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error;
    }
}