import React, { createContext, useContext, useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/services/productServices';

export interface Product {
  id: string;
  name: string;
  price: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (name: string, price: number) => Promise<void>;
  editProduct: (id: string, data: Partial<Omit<Product, 'id'>>) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e: any) {
      setError('Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (name: string, price: number) => {
    setLoading(true);
    setError(null);
    try {
      await createProduct(name, price);
      await fetchProducts();
    } catch (e: any) {
      setError('Erreur lors de la création du produit');
    } finally {
      setLoading(false);
    }
  };

  const editProduct = async (id: string, data: Partial<Omit<Product, 'id'>>) => {
    setLoading(true);
    setError(null);
    try {
      await updateProduct(id, data);
      await fetchProducts();
    } catch (e: any) {
      setError('Erreur lors de la modification du produit');
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProduct(id);
      await fetchProducts();
    } catch (e: any) {
      setError('Erreur lors de la suppression du produit');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error, fetchProducts, addProduct, editProduct, removeProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
};