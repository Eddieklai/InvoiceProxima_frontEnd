import { Colors } from '@/constants/Colors';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { createProduct, updateProduct, deleteProduct } from '@/services/productServices';

import { useProducts } from '@/context/ProductsContext';
import { useModal } from '@/context/ModalContext';

export default function Products() {
  const { products, loading } = useProducts();

  const { openModal } = useModal();

  const handleView = (product: any) => {
    openModal(
      <div style={{ padding: 24 }}>
        <h2 style={{ marginBottom: 16 }}>Détails du produit</h2>
        <p><strong>Nom :</strong> {product.name}</p>
        <p><strong>Prix :</strong> {product.price} €</p>
        <p><strong>TVA :</strong> {product.tva ?? 'Non renseignée'} %</p>
        <p><strong>Description :</strong> {product.description ?? 'Non renseignée'}</p>
      </div>
    );
  };

  const handleEdit = (product: any) => {
    openModal(
      <div style={{ padding: 24 }}>
        <h2 style={{ marginBottom: 16 }}>Éditer le produit</h2>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const data = {
            name: formData.get('name') as string,
            price: Number(formData.get('price')),
            tva: Number(formData.get('tva')),
            description: formData.get('description') as string,
          };
          await updateProduct(product.id, data);
        }}>
          <input name="name" defaultValue={product.name} placeholder="Nom" required />
          <input name="price" type="number" step="0.01" defaultValue={product.price} placeholder="Prix" required />
          <input name="tva" type="number" step="0.01" defaultValue={product.tva} placeholder="TVA (%)" />
          <input name="description" defaultValue={product.description} placeholder="Description" />
          <button type="submit" style={btnStyle}>Enregistrer</button>
        </form>
      </div>
    );
  };

  const handleDelete = async (product: any) => {
    if (window.confirm(`Supprimer le produit ${product.name} ?`)) {
      await deleteProduct(product.id);
      // Rafraîchis la liste après suppression si besoin
    }
  };

  const handleCreateProduct = () => {
    openModal(
      <div style={{ padding: 24 }}>
        <h2 style={{ marginBottom: 16 }}>Créer un nouveau produit</h2>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const data = {
            name: formData.get('name') as string,
            price: Number(formData.get('price')),
            tva: Number(formData.get('tva')),
            description: formData.get('description') as string,
          };
          await createProduct(data);
        }}>
          <input name="name" placeholder="Nom" required />
          <input name="price" type="number" step="0.01" placeholder="Prix" required />
          <input name="tva" type="number" step="0.01" placeholder="TVA (%)" />
          <input name="description" placeholder="Description" />
          <button type="submit" style={btnStyle}>Enregistrer</button>
        </form>
      </div>
    );
  };

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
          onClick={handleCreateProduct}
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
                    <td style={tdStyle}>
                      <button style={iconBtn} title="Voir" onClick={() => handleView(product)}><Eye size={18} /></button>
                      <button style={iconBtn} title="Éditer" onClick={() => handleEdit(product)}><Edit2 size={18} /></button>
                      <button style={iconBtn} title="Supprimer" onClick={() => handleDelete(product)}><Trash2 size={18} /></button>
                    </td>
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

const btnStyle = {
  border: 'none',
  borderRadius: 6,
  padding: '8px 18px',
  fontWeight: 500,
  cursor: 'pointer',
  fontSize: 15,
};

const iconBtn = {
  ...btnStyle,
  background: Colors.primaryLight,
  color: Colors.primary,
  padding: '6px 10px',
  marginRight: 6,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};