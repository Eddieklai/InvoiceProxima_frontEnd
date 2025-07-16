import { useState, useEffect } from 'react';
import { Colors } from '@/constants/Colors';

import EditableTitle from '@/components/invoiceEditor/EditableTitle';
// import EditableLogo from '@/components/invoiceEditor/EditableLogo';
import AddressUser from '@/components/invoiceEditor/AdressUser';
import AdressClient from '@/components/invoiceEditor/AdressClient';
import ProductSelector from '@/components/invoiceEditor/ProductSelector';


import type { Client } from '@/context/ClientsContext';

export default function InvoiceEditor() {
  const [selectedProducts, setSelectedProducts] = useState<{ product: any, quantity: number }[]>([]);
  const [showProductEditor, setShowProductEditor] = useState(false);

  const [pageAnim, setPageAnim] = useState<'none' | 'in' | 'out'>('none');
  const [anim, setAnim] = useState<'product-in' | 'product-out'>('product-in');

  const totalHT = selectedProducts.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
  const totalTVA = selectedProducts.reduce((sum, { product, quantity }) => sum + product.price * quantity * (product.tva / 100), 0);
  const totalTTC = totalHT + totalTVA;


  function handleShowEditor() {
    setPageAnim('out');
    setAnim('product-in');
    setTimeout(() => {
      setShowProductEditor(true);
      setPageAnim('in');
    }, 500); // durée de l'animation
  }

  function handleShowFacture() {
    setPageAnim('out');
    setAnim('product-out');
    setTimeout(() => {
      setShowProductEditor(false);
      setPageAnim('in');
    }, 500);
  }


  const [title, setTitle] = useState('');
  // const [logo, setLogo] = useState('');
  const [client, setClient] = useState<Client>();

  useEffect(() => {
    console.log('InvoiceEditor selectedProducts', selectedProducts);
  }, [selectedProducts]);

  return (
    <div style={styles.wrapper}>
      {showProductEditor ? (

        <div className={`product-anim-${anim === 'product-in' ? 'in' : 'out'}`}>
          <ProductSelector
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            onConfirm={handleShowFacture}
          />
        </div>
      ) : (

        <div className={pageAnim === 'out' ? 'page-turn-out' : pageAnim === 'in' ? 'page-turn-in' : ''}>
          <div style={styles.a4}>

            <section style={styles.wrapperLogoTitle}>
              {/* <EditableLogo value={logo} onChange={setLogo}/> */}
              <div />
              <EditableTitle value={title} onChange={setTitle} />
            </section>
            <section style={styles.adresses}>
              <div style={{ flex: 1, padding: 16 }}>
                <AddressUser />
              </div>
              <div style={{ flex: 1, padding: 16 }}>
                <AdressClient client={client} onChange={setClient} />
              </div>
            </section>
            <section className="table-hover" style={styles.table} onClick={handleShowEditor}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={styles.th}>Désignation</th>
                    <th style={styles.th}>Quantité</th>
                    <th style={styles.th}>Prix Unitaire</th>
                    <th style={styles.th}>Tva</th>
                    <th style={styles.th}>Montant HT</th>
                    <th style={styles.th}>Total TTC</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts.map(({ product, quantity }) => (
                    <tr key={product.id}>
                      <td style={styles.td}>{product.name}</td>
                      <td style={styles.td}>{quantity}</td>
                      <td style={styles.td}>{product.price}€</td>
                      <td style={styles.td}>{product.tva}%</td>
                      <td style={styles.td}>{(product.price * quantity).toFixed(2)}€</td>
                      <td style={styles.td}>{((product.price * quantity) * (1 + product.tva / 100)).toFixed(2)}€</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <section style={styles.total}>
              <div style={styles.totalBox}>
                <div>
                  <span style={styles.totalLabel}>Total HT</span>
                  <span style={styles.totalValue}>{totalHT.toFixed(2)} €</span>
                </div>
                <div>
                  <span style={styles.totalLabel}>TVA payée</span>
                  <span style={styles.totalValue}>{totalTVA.toFixed(2)} €</span>
                </div>
                <div>
                  <span style={styles.totalLabel}>Total TTC</span>
                  <span style={styles.totalValue}>{totalTTC.toFixed(2)} €</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

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
    height: 'auto',
    flex: 1,
    padding: 16,
    overflow: 'hidden' as const,
  },
  th: {
    padding: 8,
    textAlign: 'center' as const,
    borderBottom: `1px solid ${Colors.mediumGray}`,
  },
  td: {
    padding: '10px 8px',
    fontSize: 15,
    color: '#222',
    borderBottom: '1px solid #ececec',
    textAlign: 'center' as const,
    transition: 'background 0.2s',
  },
  total: {
    width: '100%',
    padding: 16,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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

  totalBox: {
    width: 320,
    background: '#f5f5f7',
    borderRadius: 10,
    boxShadow: '0 2px 8px #0001',
    padding: '18px 24px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 8,
    alignItems: 'flex-end',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 15,
    color: Colors.mediumGray,
    fontWeight: 500,
  },
  totalValue: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: 700,
  },
};