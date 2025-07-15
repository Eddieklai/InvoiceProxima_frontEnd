import React, { useState } from 'react';
import { useProducts } from '@/context/ProductsContext';
import { Colors } from '@/constants/Colors';
// ... autres imports

const InvoiceEditor: React.FC = () => {
  const { products } = useProducts();
  const [form, setForm] = useState({
    userName: '',
    userAddress: '',
    clientName: '',
    clientAddress: '',
    date: new Date().toISOString().slice(0, 10),
    items: [],
  });

  // Ajout d'un produit
  const addItem = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setForm(f => ({
        ...f,
        items: [...f.items, { productId, name: product.name, price: product.price, quantity: 1 }]
      }));
    }
  };

  // Calculs totaux
  const totalHT = form.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalTTC = totalHT * 1.2; // exemple TVA 20%

  return (
    <div style={{ display: 'flex', gap: 32 }}>
      {/* Formulaire à gauche */}
      <div style={{ flex: 1 }}>
        <h2>Infos facture</h2>
        <input placeholder="Votre nom" value={form.userName} onChange={e => setForm(f => ({ ...f, userName: e.target.value }))} />
        <input placeholder="Votre adresse" value={form.userAddress} onChange={e => setForm(f => ({ ...f, userAddress: e.target.value }))} />
        <input placeholder="Nom client" value={form.clientName} onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} />
        <input placeholder="Adresse client" value={form.clientAddress} onChange={e => setForm(f => ({ ...f, clientAddress: e.target.value }))} />
        <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />

        <h3>Produits</h3>
        <select onChange={e => addItem(e.target.value)}>
          <option value="">Ajouter un produit</option>
          {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <ul>
          {form.items.map((item, idx) => (
            <li key={idx}>
              {item.name} - {item.price}€ x
              <input type="number" min={1} value={item.quantity} onChange={e => {
                const q = Number(e.target.value);
                setForm(f => ({
                  ...f,
                  items: f.items.map((it, i) => i === idx ? { ...it, quantity: q } : it)
                }));
              }} />
            </li>
          ))}
        </ul>
      </div>

      {/* Preview à droite */}
      <div style={{
        flex: 1.5,
        background: Colors.white,
        borderRadius: 12,
        boxShadow: `0 2px 8px ${Colors.shadow}`,
        padding: 32,
        minWidth: 400,
        fontFamily: 'monospace'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700 }}>{form.userName}</div>
            <div>{form.userAddress}</div>
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>{form.clientName}</div>
            <div>{form.clientAddress}</div>
          </div>
        </div>
        <div style={{ margin: '24px 0' }}>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Produit</th>
                <th>PU</th>
                <th>Qté</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {form.items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.price}€</td>
                  <td>{item.quantity}</td>
                  <td>{item.price * item.quantity}€</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ textAlign: 'right', fontWeight: 700 }}>
          Total HT : {totalHT}€<br />
          Total TTC : {totalTTC}€
        </div>
      </div>
    </div>
  );
};

export default InvoiceEditor;