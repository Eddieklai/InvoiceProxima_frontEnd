import React, { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '@/constants/Colors';
import { useInvoices } from '@/context/InvoicesContext';
import { useModal } from '@/context/ModalContext';
import { Eye, Edit2, Trash2, Plus, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { downloadInvoice } from '@/services/invoiceServices';
import { Table } from '@/components/ui/Table';
import IconButton from '@/components/ui/IconButton';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import FormGroup from '@/components/ui/FormGroup';

import type { Invoice } from '@/services/invoiceServices';

const InvoicesPageContainer = styled.div`
  padding: 32px 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Card = styled.div`
  background: ${Colors.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px ${Colors.shadow};
  padding: 24px;
  overflow-x: auto;
`;

const StatusSelect = styled.select<{ $status?: string }>`
  border-radius: 6px;
  padding: 4px;
  border: 1px solid #ddd;
  font-weight: 600;
  color: ${({ $status }) =>
    $status === 'paid' ? Colors.success :
    $status === 'unpaid' ? Colors.error :
    $status === 'pending' ? Colors.warning :
    Colors.text};
  background: ${Colors.white};
`;

function InvoiceForm({ onSubmit, initial }: { onSubmit: (data: any) => void, initial?: any }) {
  const [form, setForm] = useState({
    clientId: initial?.clientId || '',
    title: initial?.title || '',
    total_ttc: initial?.total_ttc || '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit(form);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ minWidth: 320 }}>
      <FormGroup label="Client ID" htmlFor="clientId">
        <Input
          id="clientId"
          name="clientId"
          value={form.clientId}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup label="Titre" htmlFor="title">
        <Input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup label="Montant TTC (€)" htmlFor="total_ttc">
        <Input
          id="total_ttc"
          name="total_ttc"
          type="number"
          value={form.total_ttc}
          onChange={handleChange}
          required
          min={0}
        />
      </FormGroup>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <Button variant="secondary" type="button" onClick={() => {}} disabled={submitting}>Annuler</Button>
        <Button variant="primary" type="submit" disabled={submitting}>
          {submitting ? 'Envoi...' : (initial ? 'Modifier' : 'Créer')}
        </Button>
      </div>
    </form>
  );
}

function InvoiceDetails({ invoice }: { invoice: Invoice }) {
  return (
    <div style={{ minWidth: 340 }}>
      <h2 style={{ marginBottom: 16, color: Colors.primary }}>Détails de la facture</h2>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontWeight: 600, fontSize: 18 }}>{invoice.title}</div>
        <div style={{ color: Colors.darkGray, marginBottom: 8 }}>Statut : <b>{invoice.status}</b></div>
        <div style={{ color: Colors.text }}>Montant total : <b>{invoice.total_ttc} €</b></div>
        <div style={{ color: Colors.text }}>Date : {new Date(invoice.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  );
}

function InvoiceDeleteModal({ invoice, onDelete, onCancel }: { invoice: Invoice, onDelete: () => void, onCancel: () => void }) {
  return (
    <div style={{ minWidth: 320 }}>
      <h2 style={{ color: Colors.primary, marginBottom: 16 }}>Supprimer la facture ?</h2>
      <p>Cette action est irréversible.</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
        <Button variant="secondary" onClick={onCancel}>Annuler</Button>
        <Button variant="danger" onClick={onDelete}>Supprimer</Button>
      </div>
    </div>
  );
}

export default function Invoices() {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { invoices, loading, editInvoice, removeInvoice, error } = useInvoices();

  const columns = [
    { label: 'Client', render: (invoice: Invoice) => invoice.client?.name || invoice.clientId },
    { label: 'Titre', accessor: 'title' },
    { label: 'Montant', render: (invoice: Invoice) => `${invoice.total_ttc.toFixed(2)} €` },
    {
      label: 'Statut', render: (invoice: Invoice) =>
        <StatusSelect
          $status={invoice.status}
          value={invoice.status}
          onChange={e => editInvoice(invoice.id, { status: e.target.value })}
        >
          <option value="paid">Payée</option>
          <option value="unpaid">Impayée</option>
          <option value="pending">En attente</option>
        </StatusSelect>
    },
    {
      label: 'Actions',
      render: (invoice: Invoice) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <IconButton onClick={() => openModal(<InvoiceDetails invoice={invoice} />)} title="Voir"><Eye size={18} /></IconButton>
          <IconButton onClick={() => openModal(<InvoiceForm initial={invoice} onSubmit={async (data) => await editInvoice(invoice.id, data)} />)} title="Modifier"><Edit2 size={18} /></IconButton>
          <IconButton onClick={() => downloadInvoice(invoice)} title="Télécharger"><Download size={18} /></IconButton>
          <IconButton onClick={() => openModal(<InvoiceDeleteModal invoice={invoice} onDelete={async () => { await removeInvoice(invoice.id); closeModal(); }} onCancel={closeModal} />)} title="Supprimer" variant="danger"><Trash2 size={18} /></IconButton>
        </div>
      ),
    },
  ];

  return (
    <InvoicesPageContainer>
      <Header>
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>Factures</h1>
        <Button variant="primary" iconLeft={<Plus size={18} />} onClick={() => navigate('/invoiceEditor')}>
          Nouvelle facture
        </Button>
      </Header>
      <Card>
        {error && <div style={{ color: Colors.error, marginBottom: 16 }}>{error}</div>}
        <Table
          columns={columns}
          data={invoices}
          loading={loading}
          emptyText="Aucune facture"
        />
      </Card>
    </InvoicesPageContainer>
  );
}