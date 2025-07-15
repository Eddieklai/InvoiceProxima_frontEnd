import React from 'react';
import { Colors } from '@/constants/Colors';
import { useProducts } from '@/context/ProductsContext';

export default function Products() {
  const { products, loading } = useProducts();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>Produits</h1>
        <button
          style={{
            background: Colors.primary,
            color: Colors.white,
            border: 'none',
            borderRadius: 8,
            padding: '12px 24px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 16,
          }}
          // onClick={() => ...}
        >
          Nouveau produit
        </button>
      </div>
      <div style={{
        background: Colors.white,
        borderRadius: 12,
        boxShadow: `0 2px 8px ${Colors.shadow}`,
        padding: 24,
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: Colors.primaryLight }}>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Nom</th>
              <th style={thStyle}>Prix</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: 32 }}>Chargement...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: 32 }}>Aucun produit</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} style={{ borderBottom: `1px solid ${Colors.mediumGray}` }}>
                  <td style={tdStyle}>{product.id}</td>
                  <td style={tdStyle}>{product.name}</td>
                  <td style={tdStyle}>{product.price}€</td>
                  <td style={tdStyle}>
                    <button style={actionBtn}>Voir</button>
                    <button style={actionBtn}>Edit</button>
                    <button style={actionBtn}>Suppr</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

const thStyle = {
  padding: '12px 8px',
  fontWeight: 700,
  color: Colors.primary,
  textAlign: 'left' as const,
  fontSize: 15,
};

const tdStyle = {
  padding: '10px 8px',
  fontSize: 15,
  color: Colors.text,
};

const actionBtn = {
  marginRight: 8,
  background: Colors.secondary,
  color: Colors.primary,
  border: 'none',
  borderRadius: 6,
  padding: '6px 12px',
  cursor: 'pointer',
  fontWeight: 500,
};