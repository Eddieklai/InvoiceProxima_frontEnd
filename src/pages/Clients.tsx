import { Colors } from '@/constants/Colors';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { useClients } from '@/context/ClientsContext';
import { styled } from 'styled-components';

import { createClient, updateClient, deleteClient } from '@/services/clientServices';

import { Table } from '@/components/ui/Table';
import Input from '@/components/ui/Input';
import FormGroup from '@/components/ui/FormGroup';
import Button from '@/components/ui/Button';
import IconButton from '@/components/ui/IconButton';


import { useModal } from '@/context/ModalContext';

export default function Clients() {
  const { clients, loading } = useClients();
  const { openModal } = useModal();

  const columns = [
    // { label: '#', accessor: 'id' },
    { label: 'Nom', accessor: 'name' },
    { label: 'Email', accessor: 'email' },
    { label: 'Adresse', accessor: 'address' },
    {
      label: 'Actions',
      render: (client: any) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <IconButton onClick={() => handleView(client)} title="Voir">
            <Eye size={18} />
          </IconButton>
          <IconButton onClick={() => handleEdit(client)} title="Modifier" variant='neutral'>
            <Edit2 size={18} />
          </IconButton>
          <IconButton onClick={() => handleDelete(client)} title="Supprimer" variant='danger'>
            <Trash2 size={18} />
          </IconButton>
        </div>
      ),
    },
  ];

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
          <FormGroup label="Nom" htmlFor="name">
            <Input name="name" placeholder="Nom" required />
          </FormGroup>
          <FormGroup label="SIRET" htmlFor="siret">
            <Input name="siret" placeholder="SIRET" required />
          </FormGroup>
          <FormGroup label="Adresse" htmlFor="address">
            <Input name="address" placeholder="Adresse" required />
          </FormGroup>
          <Row>
            <Half>
              <FormGroup label="Code postal" htmlFor="postalCode">
                <Input name="postalCode" placeholder="Code postal" required />
              </FormGroup>
            </Half>
            <Half>
              <FormGroup label="Ville" htmlFor="city">
                <Input name="city" placeholder="Ville" required />
              </FormGroup>
            </Half>
          </Row>
          <Row>
            <Half>
              <FormGroup label="Téléphone" htmlFor="phone">
                <Input name="phone" placeholder="Téléphone" />
              </FormGroup>
            </Half>
            <Half>
              <FormGroup label="Email" htmlFor="email">
                <Input name="email" type="email" placeholder="Email" required />
              </FormGroup>
            </Half>
          </Row>
          <FormGroup label="Numéro TVA (optionnel)" htmlFor="numTva">
            <Input name="numTva" placeholder="Numéro TVA" />
          </FormGroup>
          <Button type="submit">Enregistrer</Button>
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
          <FormGroup label="Nom" htmlFor="name">
            <Input name="name" defaultValue={client.name} placeholder="Nom" required />
          </FormGroup>
          <FormGroup label="Email" htmlFor="email">
            <Input name="email" type="email" defaultValue={client.email} placeholder="Email" required />
          </FormGroup>
          <FormGroup label="Adresse" htmlFor="address">
            <Input name="address" defaultValue={client.address} placeholder="Adresse" required />
          </FormGroup>
          <FormGroup label="Téléphone" htmlFor="phone">
            <Input name="phone" defaultValue={client.phone} placeholder="Téléphone" required />
          </FormGroup>
          <Button type="submit">Enregistrer</Button>
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
        <Button onClick={handleCreateClient}>Nouveau client</Button>
      </div>
      <div style={{
        background: Colors.white,
        borderRadius: 12,
        boxShadow: `0 2px 8px ${Colors.shadow}`,
        padding: 24,
      }}>
        <Table
          columns={columns}
          data={clients}
          loading={loading}
          emptyText="Aucun client trouvé"
        />
      </div>
    </>
  );
}

const Row = styled.tr`
  display: flex;
  gap: 16px;
  width: 100%;
  `

const Half = styled.td`
  flex: 1;
  `