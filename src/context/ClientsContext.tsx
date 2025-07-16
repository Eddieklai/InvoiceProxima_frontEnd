import React, { createContext, useContext, useEffect, useState } from 'react';
import { getClients, createClient, updateClient, deleteClient } from '@/services/clientServices';

export interface Client {
  id: string;
  userId: string;
  name: string;
  siret?: string;
  address: string;
  postalCode?: string;
  city?: string;
  email: string;
  numTva?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

interface ClientsContextType {
  clients: Client[];
  loading: boolean;
  error: string | null;
  fetchClients: () => Promise<void>;
  addClient: (name: string, email: string, adress: string, phone: string) => Promise<void>;
  editClient: (id: string, data: Partial<Omit<Client, 'id'>>) => Promise<void>;
  removeClient: (id: string) => Promise<void>;
}

const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

export const ClientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getClients();
      setClients(data);
    } catch (e: any) {
      setError('Erreur lors du chargement des clients');
    } finally {
      setLoading(false);
    }
  };

  const addClient = async (name: string, email: string, adress: string, phone: string) => {
    setLoading(true);
    setError(null);
    try {
      await createClient(name, email, adress, phone);
      await fetchClients();
    } catch (e: any) {
      setError('Erreur lors de la création du client');
    } finally {
      setLoading(false);
    }
  };

  const editClient = async (id: string, data: Partial<Omit<Client, 'id'>>) => {
    setLoading(true);
    setError(null);
    try {
      await updateClient(id, data);
      await fetchClients();
    } catch (e: any) {
      setError('Erreur lors de la modification du client');
    } finally {
      setLoading(false);
    }
  };

  const removeClient = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteClient(id);
      await fetchClients();
    } catch (e: any) {
      setError('Erreur lors de la suppression du client');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <ClientsContext.Provider value={{ clients, loading, error, fetchClients, addClient, editClient, removeClient }}>
      {children}
    </ClientsContext.Provider>
  );
};

export const useClients = () => {
  const ctx = useContext(ClientsContext);
  if (!ctx) throw new Error('useClients must be used within ClientsProvider');
  return ctx;
};