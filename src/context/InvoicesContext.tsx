import React, { createContext, useContext, useEffect, useState } from 'react';
import { getInvoices, createInvoice, updateInvoice, deleteInvoice } from '@/services/invoiceServices';

interface Invoice {
  id: string;
  userId: string;
  clientId: string;
  title: string;
  total_ht: number;
  total_ttc: number;
  status: string;
  pdf: string | null;
  createdAt: string;
  updatedAt: string;
  client: {
    id: string;
    name: string;
    email: string;
    adress: string;
    phone: string;
  };
}

interface InvoicesContextType {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
  fetchInvoices: () => Promise<void>;
  addInvoice: (title: string, clientId: string, total_ttc: number) => Promise<void>;
  editInvoice: (id: string, data: Partial<Omit<Invoice, 'id'>>) => Promise<void>;
  removeInvoice: (id: string) => Promise<void>;
}

const InvoicesContext = createContext<InvoicesContextType | undefined>(undefined);

export const InvoicesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getInvoices();
      setInvoices(data);
    } catch (e: any) {
      setError('Erreur lors du chargement des factures');
    } finally {
      setLoading(false);
    }
  };

  const addInvoice = async (title: string, clientId: string, total_ttc: number) => {
    setLoading(true);
    setError(null);
    try {
      await createInvoice(title, clientId, total_ttc);
      await fetchInvoices();
    } catch (e: any) {
      setError('Erreur lors de la création de la facture');
    } finally {
      setLoading(false);
    }
  };

  const editInvoice = async (id: string, data: Partial<Omit<Invoice, 'id'>>) => {
    setLoading(true);
    setError(null);
    try {
      await updateInvoice(id, data);
      await fetchInvoices();
    } catch (e: any) {
      setError('Erreur lors de la modification de la facture');
    } finally {
      setLoading(false);
    }
  };

  const removeInvoice = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteInvoice(id);
      await fetchInvoices();
    } catch (e: any) {
      setError('Erreur lors de la suppression de la facture');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <InvoicesContext.Provider value={{ invoices, loading, error, fetchInvoices, addInvoice, editInvoice, removeInvoice }}>
      {children}
    </InvoicesContext.Provider>
  );
};

export const useInvoices = () => {
  const ctx = useContext(InvoicesContext);
  if (!ctx) throw new Error('useInvoices must be used within InvoicesProvider');
  return ctx;
};
