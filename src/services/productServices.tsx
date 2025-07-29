import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const createProduct = async (data: {name: string, price:number}) => {
    try {
        const response = await axios.post(`${API_URL}/product`, {
            name: data.name,
            price: data.price,
        });
        if (response.status !== 201) {
            throw new Error('Product creation failed');
        }
        console.log('Product created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Product creation failed:', error);
        throw error;
    }
}

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/product`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch products');
        }
        console.log('Products fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
}

export const updateProduct = async (id: string, data: { name?: string; price?: number }) => {
    try {
        const response = await axios.put(`${API_URL}/product/${id}`, data);
        if (response.status !== 200) {
            throw new Error('Product update failed');
        }
        console.log('Product updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Product update failed:', error);
        throw error;
    }
}

export const deleteProduct = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/product/${id}`);
        if (response.status !== 204) {
            throw new Error('Product deletion failed');
        }
        return response.status;
    } catch (error) {
        console.error('Product deletion failed:', error);
        throw error;
    }
}