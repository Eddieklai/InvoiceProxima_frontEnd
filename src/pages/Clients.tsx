import { Colors } from '@/constants/Colors';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { useClients } from '@/context/ClientsContext';

import { createClient, updateClient, deleteClient } from '@/services/clientServices';

import { useModal } from '@/context/ModalContext';

export default function Clients() {
  const { clients, loading } = useClients();
  const { openModal } = useModal();

  const handleCreateClient = async () => {
    openModal(
      <div style={{ padding: 24 }}>
        <h2 style={{ marginBottom: 16 }}>Créer un nouveau client</h2>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const data = {
            name: formData.get('name') as string,
            siret: formData.get('siret') as string,
            address: formData.get('address') as string,
            postalCode: formData.get('postalCode') as string,
            city: formData.get('city') as string,
            numTva: formData.get('numTva') as string,
            phone: formData.get('phone') as string,
            email: formData.get('email') as string,
          };
          // Pour la création
          await createClient(data);
          // Pour l'édition
          // await updateClient(client.id, data);
        }}>
          <input name="name" placeholder="Nom" required />
          <input name="siret" placeholder="SIRET" required />
          <input name="address" placeholder="Adresse" required />
          <input name="postalCode" placeholder="Code postal" required />
          <input name="city" placeholder="Ville" required />
          <input name="numTva" placeholder="Numéro TVA (optionnel)" />
          <input name="phone" placeholder="Téléphone" />
          <input name="email" type="email" placeholder="Email" />
          <button type="submit">Enregistrer</button>
        </form>
      </div>
    )
  }

  const handleView = (client: any) => {
    openModal(
      <div style={{ padding: 24 }}>
        <h2 style={{ marginBottom: 16 }}>Détails du client</h2>
        <p><strong>Nom:</strong> {client.name}</p>
        <p><strong>Email:</strong> {client.email}</p>
        <p><strong>Adresse:</strong> {client.address}</p>
        <p><strong>Téléphone:</strong> {client.phone}</p>
      </div>
    );
  };

  const handleEdit = (client: any) => {
    openModal(
      <div style={{ padding: 24 }}>
        <h2 style={{ marginBottom: 16 }}>Éditer le client</h2>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            address: formData.get('address') as string,
            phone: formData.get('phone') as string,
          };
          await updateClient(client.id, data);

        }}>
          <input name="name" defaultValue={client.name} placeholder="Nom" required />
          <input name="email" type="email" defaultValue={client.email} placeholder="Email" required />
          <input name="address" defaultValue={client.address} placeholder="Adresse" required />
          <input name="phone" defaultValue={client.phone} placeholder="Téléphone" required />
          <button type="submit">Enregistrer</button>
        </form>
      </div>
    );
  };

  const handleDelete = async (client: any) => {
    if (window.confirm(`Supprimer le client ${client.name} ?`)) {
      await deleteClient(client.id);
      // Rafraîchis la liste après suppression
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>Clients</h1>
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
          onClick={() => handleCreateClient()}
        >
          Nouveau client
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
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Adresse</th>
              <th style={thStyle}>Téléphone</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: 32 }}>Chargement...</td>
              </tr>
            ) : clients.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: 32 }}>Aucun client</td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr key={client.id} style={{ borderBottom: `1px solid ${Colors.mediumGray}` }}>
                  <td style={tdStyle}>{client.id}</td>
                  <td style={tdStyle}>{client.name}</td>
                  <td style={tdStyle}>{client.email}</td>
                  <td style={tdStyle}>{client.address}</td>
                  <td style={tdStyle}>{client.phone}</td>
                  <td style={tdStyle}>
                    <button style={iconBtn} title="Voir" onClick={() => handleView(client)}><Eye size={18} /></button>
                    <button style={iconBtn} title="Éditer" onClick={() => handleEdit(client)}><Edit2 size={18} /></button>
                    <button style={iconBtn} title="Supprimer" onClick={() => handleDelete(client)}><Trash2 size={18} /></button>
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