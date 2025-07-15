import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL_LOCAL;

export const createInvoice = async (title: string, clientId: string, total_ttc: number) => {
    try {
        const response = await axios.post(`${API_URL}/invoice`, {
            title,
            clientId,
            total_ttc,
        });
        if (response.status !== 201) {
            throw new Error('Invoice creation failed');
        }
        console.log('Invoice created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Invoice creation failed:', error);
        throw error;
    }
}

export const getInvoices = async () => {
    try {
        const response = await axios.get(`${API_URL}/invoice`);
        if (response.status !== 200) {
            throw new Error('Invoice get failed');
        }
        console.log('invoice get successfull: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Invoice Get failed:', error);
        throw error;
    }
}

export const updateInvoice = async (id: string, data: { title?: string; clientId?: string; total_ttc?: number }) => {
    try {
        const response = await axios.put(`${API_URL}/invoice/${id}`, data);
        if (response.status !== 200) {
            throw new Error('Invoice update failed');
        }
        console.log('Invoice updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Invoice update failed:', error);
        throw error;
    }
}

export const deleteInvoice = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/invoice/${id}`);
        if (response.status !== 200) {
            throw new Error('Invoice deletion failed');
        }
        console.log('Invoice deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Invoice deletion failed:', error);
        throw error;
    }
}