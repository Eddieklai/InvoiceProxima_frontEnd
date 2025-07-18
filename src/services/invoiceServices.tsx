import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
};

export const createInvoice = async (title: string, clientId: string, total_ttc: number, total_ht: number, listProduct: any[], pdfBlob: Blob) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('clientId', clientId);
        formData.append('total_ttc', String(total_ttc));
        formData.append('total_ht', String(total_ht));
        formData.append('listProduct', JSON.stringify(listProduct));
        formData.append('pdf', pdfBlob, title);
        const response = await axios.post(`${API_URL}/invoice`, formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
        );
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

export const downloadInvoice = async (invoice: any) => {
    try {
        console.log('Downloading invoice:', invoice);
        const formatedDate = formatDate(invoice.createdAt);
        const response = await axios.get(`${API_URL}/invoice/download/${invoice.id}`, {
            responseType: 'blob'
        });
        if (response.status !== 200) {
            throw new Error('Invoice download failed');
        }
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${invoice.title}_${invoice.client.name}_${formatedDate}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Invoice download failed:', error);
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