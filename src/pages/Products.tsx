import { Colors } from '@/constants/Colors';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { createProduct, updateProduct, deleteProduct } from '@/services/productServices';

import { Table } from '@/components/ui/Table';
import Input from '@/components/ui/Input';
import FromGroup from '@/components/ui/FormGroup';
import Button from '@/components/ui/Button';
import IconButton from '@/components/ui/IconButton';

import { useProducts } from '@/context/ProductsContext';
import { useModal } from '@/context/ModalContext';

interface Product {
  id: number;
  name: string;
  price: number;
  tva?: number;
  description?: string;
}

interface Column {
  label: string;
  accessor?: keyof Product;
  render?: (product: Product) => React.ReactNode;
}

export default function Products() {
  const { products, loading } = useProducts();

  const { openModal } = useModal();

  const columns: Column[] = [
    // { label: '#', accessor: 'id' },
    { label: 'Nom', accessor: 'name' },
    {
      label: 'Prix',
      render: (product: Product) => `${product.price} €`,
    },
    {
      label: 'Tva (%)',
      render: (product: Product) => product.tva ? `${product.tva} %` : 'Non renseignée'
    },
    {
      label: 'Actions',
      render: (product: Product) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <IconButton onClick={() => handleView(product)}
            title="Voir"
            aria-label="Voir"
            variant="neutral">
            <Eye size={18} />
          </IconButton>
          <IconButton
            onClick={() => handleEdit(product)}
            title="Modifier"
            aria-label="Modifier"
          >
            <Edit2 size={18} />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(product)}
            title="Supprimer"
            aria-label="Supprimer"
            variant="danger"
          >
            <Trash2 size={18} />
          </IconButton>
        </div>
      ),
    },
  ];

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
          <FromGroup label="Nom" htmlFor="name" error={null}>
            <Input
              name="name"
              defaultValue={product.name}
              placeholder="Nom"
              required
            />
          </FromGroup>
          <FromGroup label="Prix" htmlFor="price" error={null}>
            <Input
              name="price"
              type="number"
              step="0.01"
              defaultValue={product.price}
              placeholder="Prix"
              required
            />
          </FromGroup>
          <FromGroup label="TVA (%)" htmlFor="tva" error={null}>
            <Input
              name="tva"
              type="number"
              step="0.01"
              defaultValue={product.tva}
              placeholder="TVA (%)"
            />
          </FromGroup>
          <Button type="submit">Enregistrer</Button>
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
          <button type="submit">Enregistrer</button>
        </form>
      </div>
    );
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>Produits</h1>
        <Button
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
        </Button>
      </div>
      <div style={{
        background: Colors.white,
        borderRadius: 12,
        boxShadow: `0 2px 8px ${Colors.shadow}`,
        padding: 24,
      }}>
        <Table
          columns={columns}
          data={products}
          loading={loading}
          emptyText="Aucun produit trouvé"
        />
      </div>
    </>
  );
}

