import { useState } from 'react';
import { Colors } from '@/constants/Colors';

import EditableTitle from '@/components/invoiceEditor/EditableTitle';
import EditableLogo from '@/components/invoiceEditor/EditableLogo';
import AddressUser from '@/components/invoiceEditor/AdressUser';
import AdressClient from '@/components/invoiceEditor/AdressClient';

import { useProducts } from '@/context/ProductsContext';
// import { useClients } from '@/context/ClientsContext';

import type { Client } from '@/context/ClientsContext';

export default function InvoiceEditor() {
  const { products } = useProducts();

  const [title, setTitle] = useState('');
  const [logo, setLogo] = useState('');
  const [client, setClient] = useState<Client>();

  return (
    <div style={styles.wrapper}>
      <div style={styles.a4}>
        <section style={styles.wrapperLogoTitle}>
          <EditableLogo value={logo} onChange={setLogo}/>
          <EditableTitle value={title} onChange={setTitle}/>
        </section>
        <section style={styles.adresses}>
            <div style={{ flex: 1, padding: 16 }}>
              <AddressUser />
            </div>
            <div style={{ flex: 1, padding: 16 }}>
              <AdressClient client={client} onChange={setClient}/>
            </div>
        </section>
        <section style={styles.table}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: 8, borderBottom: `1px solid ${Colors.mediumGray}` }}>Désignation</th>
                <th style={{ padding: 8, borderBottom: `1px solid ${Colors.mediumGray}` }}>Quantité</th>
                <th style={{ padding: 8, borderBottom: `1px solid ${Colors.mediumGray}` }}>Prix Unitaire</th>
                <th style={{ padding: 8, borderBottom: `1px solid ${Colors.mediumGray}` }}>Tva</th>
                <th style={{ padding: 8, borderBottom: `1px solid ${Colors.mediumGray}` }}>Montant HT</th>
                <th style={{ padding: 8, borderBottom: `1px solid ${Colors.mediumGray}` }}>Total TTC</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} - {product.price}€
                  </option>
                ))}
            </tbody>
          </table>
        </section>
        <div style={styles.placeholder}>
          <span style={styles.text}>Prévisualisation A4</span>
        </div>
        <section style={styles.total}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: 16 }}>
            <span style={{ fontSize: 18, fontWeight: 600 }}>Total</span>
            <span style={{ fontSize: 18, fontWeight: 600 }}>0.00€</span>
          </div>
        </section>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: Colors.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  a4: {
    width: 794, // 210mm à 96dpi ≈ 794px
    height: 1123, // 297mm à 96dpi ≈ 1123px
    background: Colors.white,
    borderRadius: 12,
    boxShadow: `0 8px 32px ${Colors.shadowStrong}`,
    border: `1.5px solid ${Colors.mediumGray}`,
    overflow: 'hidden',
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperLogoTitle: {
    width: '100%',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adresses: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row' as const,
    padding: 16,
  },
  table: {
    width: '100%',
    height: '100%',
    padding: 16,
    overflowX: 'auto' as const,
  },
  total: {
    width: '100%',
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: `1px solid ${Colors.mediumGray}`,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.25,
  },
  text: {
    fontSize: 32,
    color: Colors.primary,
    fontWeight: 700,
    letterSpacing: 2,
  },
};