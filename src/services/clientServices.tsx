import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL_LOCAL;

export const createClient = async (name: string, email: string, adress: string, phone: string) => {
    try {
        const response = await axios.post(`${API_URL}/client`, {
            name,
            email,
            adress,
            phone,
        });
        if (response.status !== 201) {
            throw new Error('Client creation failed');
        }
        if (response.status === 201) {
            console.log('Client created successfully:', response.data);
        }
        return response.data;
    } catch (error) {
        console.error('Client creation failed:', error);
        throw error;
    }
}

export const getClients = async () => {
    try {
        const response = await axios.get(`${API_URL}/client`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch clients');
        }
        console.log('Clients fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch clients:', error);
        throw error;
    }
}

export const updateClient = async (id: string, data: { name?: string; email?: string; adress?: string; phone?: string }) => {
    try {
        const response = await axios.put(`${API_URL}/client/${id}`, data);
        if (response.status !== 200) {
            throw new Error('Client update failed');
        }
        console.log('Client updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Client update failed:', error);
        throw error;
    }
}

export const deleteClient = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/client/${id}`);
        if (response.status !== 200) {
            throw new Error('Client deletion failed');
        }
        console.log('Client deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Client deletion failed:', error);
        throw error;
    }
}

