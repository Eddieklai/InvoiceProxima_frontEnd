import React, { useState } from 'react';
import { useProducts } from '@/context/ProductsContext';
import { Plus, Trash2 } from 'lucide-react';
import { Colors } from '@/constants/Colors';


import type { Product } from '@/context/ProductsContext';
import { useModal } from '@/context/ModalContext';
import { useEffect } from 'react';

type ProductSelectorProps = {
  selectedProducts: { product: any; quantity: number }[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<{ product: any; quantity: number }[]>>;
  onConfirm?: () => void;
};

export default function ProductSelector({ selectedProducts, setSelectedProducts, onConfirm }: ProductSelectorProps) {
  const { closeModal } = useModal();
  const { products } = useProducts();
  const [listProducts, setListProducts] = useState(selectedProducts);
  const [removingIdx, setRemovingIdx] = useState<number | null>(null);
  const [addedIdx, setAddedIdx] = useState<number | null>(null);



  function handleAddBox() {
    setListProducts(prev => {
      const newList = [...prev, { product: {}, quantity: 1 }];
      setAddedIdx(newList.length - 1);
      setTimeout(() => setAddedIdx(null), 350); // durée du fade-in
      return newList;
    });
  }

  // Change le produit sélectionné
  function handleProductChange(idx: number, productId: string) {
    const product = products.find((p: any) => String(p.id) === productId);
    setListProducts(
      listProducts.map((item, i) =>
        i === idx ? { ...item, product } : item
      )
    );
  }

  // Change la quantité
  function handleQtyChange(idx: number, qty: number) {
    setListProducts(
      listProducts.map((item, i) =>
        i === idx ? { ...item, quantity: qty } : item
      )
    );
  }

  // Supprime la box
  function handleRemove(idx: number) {
    setRemovingIdx(idx);
    setTimeout(() => {
      setListProducts(listProducts.filter((_, i) => i !== idx));
      setRemovingIdx(null);
    }, 350); // durée du fade-out
  }

  function handleConfirm() {
    setSelectedProducts(listProducts);
    if (onConfirm) {
      onConfirm();
    }
    closeModal();
  }

  return (
    <div>
      <button
        style={{
          background: Colors.primary,
          color: Colors.white,
          border: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 600,
          fontSize: 16,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 16,
        }}
        onClick={handleAddBox}
      >
        <Plus size={20} /> Ajouter un produit
      </button>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {listProducts.length === 0 && (
          <div style={{ color: Colors.mediumGray, fontStyle: 'italic', textAlign: 'center' }}>
            Aucun produit ajouté
          </div>
        )}
        {listProducts.map((item, idx) => (
          <div key={idx}
            style={styles.productBox}
            className={
              removingIdx === idx
                ? 'fade-out'
                : addedIdx === idx
                  ? 'fade-in'
                  : ''
            }>
            <select
              value={item.product?.id || ''}
              onChange={e => handleProductChange(idx, e.target.value)}
              style={styles.select}
            >
              <option value="">Sélectionner un produit</option>
              {products.map((p: any) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={e => handleQtyChange(idx, Number(e.target.value))}
              style={styles.qtyInput}
            />
            <span style={{ fontSize: 14, minWidth: 90, textAlign: 'right' }}>
              {item.product
                ? <>
                  HT : {(item.product.price * item.quantity).toFixed(2)}€<br />
                  TVA : {(item.product.price * item.quantity * 0.2).toFixed(2)}€<br />
                  TTC : {(item.product.price * item.quantity * 1.2).toFixed(2)}€
                </>
                : <span style={{ color: Colors.mediumGray }}>Prix</span>
              }
            </span>
            <button
              style={styles.removeBtn}
              onClick={() => handleRemove(idx)}
              title="Retirer ce produit"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
      <button
        style={{
          background: Colors.secondary,
          color: Colors.primary,
          border: 'none',
          borderRadius: 6,
          padding: '8px 18px',
          fontWeight: 500,
          cursor: 'pointer',
          fontSize: 15,
          marginTop: 16,
        }}
        onClick={handleConfirm}
      >
        Confirmer les produits
      </button>
    </div>
  );
}

const styles = {
  productBox: {
    display: 'flex',
    alignItems: 'center',
    background: Colors.white,
    borderRadius: 8,
    boxShadow: `0 2px 8px ${Colors.shadow}`,
    padding: '12px 20px',
    gap: 16,
    border: `1px solid ${Colors.mediumGray}`,
  },
  select: {
    flex: 2,
    padding: 6,
    borderRadius: 6,
    border: `1px solid ${Colors.mediumGray}`,
    fontSize: 15,
    marginRight: 8,
  },
  qtyInput: {
    width: 50,
    borderRadius: 4,
    border: `1px solid ${Colors.mediumGray}`,
    padding: 4,
    fontSize: 15,
    textAlign: 'center' as const,
    marginRight: 8,
  },
  removeBtn: {
    background: Colors.error,
    color: Colors.white,
    border: 'none',
    borderRadius: 6,
    padding: '6px 10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 8,
  },
};