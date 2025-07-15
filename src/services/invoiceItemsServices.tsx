import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL_LOCAL;

export const createInvoiceItem = async (invoiceId: string, productId: string, quantity: number) => {
    try {
        const response = await axios.post(`${API_URL}/invoiceItem`, {
            invoiceId,
            productId,
            quantity,
        });
        if (response.status !== 201) {
            throw new Error('Invoice item creation failed');
        }
        console.log('Invoice item created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Invoice item creation failed:', error);
        throw error;
    }
}

export const getInvoiceItems = async (invoiceId: string) => {
    try {
        const response = await axios.get(`${API_URL}/invoiceItem/${invoiceId}`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch invoice items');
        }
        console.log('Invoice items fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch invoice items:', error);
        throw error;
    }
}

export const updateInvoiceItem = async (id: string, data: { quantity?: string; unit_price?: number }) => {
    try {
        const response = await axios.put(`${API_URL}/invoiceItem/${id}`, data);
        if (response.status !== 200) {
            throw new Error('Invoice item update failed');
        }
        console.log('Invoice item updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Invoice item update failed:', error);
        throw error;
    }
}

export const deleteInvoiceItem = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/invoiceItem/${id}`);
        if (response.status !== 200) {
            throw new Error('Invoice item deletion failed');
        }
        console.log('Invoice item deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Invoice item deletion failed:', error);
        throw error;
    }
}