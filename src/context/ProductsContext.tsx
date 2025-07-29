import React, { createContext, useContext, useEffect, useState } from 'react';
import { getProducts } from '@/services/productServices';
// import { createProduct, updateProduct, deleteProduct } from '@/services/productServices';

export interface Product {
  id: string;
  userId: string;
  name: string;
  price: number;
  tva: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  setRefreshProduct: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [refreshProduct, setRefreshProduct] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      console.log('Fetched products:', data);
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
    name = name.trim();
    price = parseFloat(price.toString());
    try {
      // await createProduct(name, price);
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
    id = id.trim();
    data.name = data.name?.trim();
    try {
      // await updateProduct(id, data);
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
    id = id.trim();
    try {
      // await deleteProduct(id);
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

  useEffect(() => {
    if (refreshProduct)
      fetchProducts();
  }, [refreshProduct]);

  return (
    <ProductsContext.Provider value={{ products, loading, error, setRefreshProduct, fetchProducts, addProduct, editProduct, removeProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
};