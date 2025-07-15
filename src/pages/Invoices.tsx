import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useInvoices } from '@/context/InvoicesContext';
import { useModal } from '@/context/ModalContext';
import { Eye, Edit2, Trash2, Plus } from 'lucide-react';

const Factures: React.FC = () => {
  const { openModal, closeModal } = useModal();
  const { invoices, loading, addInvoice, editInvoice, removeInvoice, error } = useInvoices();

  // --- Formulaire réutilisable pour création/édition ---
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
      closeModal();
    };

    return (
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 320 }}>
        <h2 style={{ color: Colors.primary, marginBottom: 8 }}>
          {initial ? 'Modifier la facture' : 'Nouvelle facture'}
        </h2>
        <label>
          <span style={labelStyle}>Client ID</span>
          <input
            name="clientId"
            value={form.clientId}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="ID du client"
          />
        </label>
        <label>
          <span style={labelStyle}>Titre</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="Titre de la facture"
          />
        </label>
        <label>
          <span style={labelStyle}>Montant TTC (€)</span>
          <input
            name="total_ttc"
            type="number"
            value={form.total_ttc}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="Montant TTC"
            min={0}
          />
        </label>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
          <button
            type="button"
            onClick={closeModal}
            style={{ ...btnStyle, background: Colors.mediumGray, color: Colors.text }}
            disabled={submitting}
          >
            Annuler
          </button>
          <button
            type="submit"
            style={{ ...btnStyle, background: Colors.primary, color: Colors.white }}
            disabled={submitting}
          >
            {submitting ? 'Envoi...' : (initial ? 'Modifier' : 'Créer')}
          </button>
        </div>
      </form>
    );
  }

  // --- Détail facture ---
  function InvoiceDetails({ invoice }: { invoice: any }) {
    return (
      <div style={{ minWidth: 340 }}>
        <h2 style={{ marginBottom: 16, color: Colors.primary }}>Détails de la facture</h2>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 600, fontSize: 18 }}>{invoice.title}</div>
          <div style={{ color: Colors.darkGray, marginBottom: 8 }}>Statut : <b>{invoice.status}</b></div>
          <div style={{ color: Colors.text }}>Montant total : <b>{invoice.total_ttc} €</b></div>
          <div style={{ color: Colors.text }}>Date : {new Date(invoice.createdAt).toLocaleDateString()}</div>
        </div>
        {/* Ajoute ici les infos client si tu veux */}
      </div>
    );
  }

  // --- Actions ---
  const handleCreate = () => {
    openModal(<InvoiceForm onSubmit={async (data) => await addInvoice(data.title, data.clientId, Number(data.total_ttc))} />);
  };

  const handleEdit = (invoice: any) => {
    openModal(<InvoiceForm initial={invoice} onSubmit={async (data) => await editInvoice(invoice.id, data)} />);
  };

  const handleView = (invoice: any) => {
    openModal(<InvoiceDetails invoice={invoice} />);
  };

  const handleDelete = (invoice: any) => {
    openModal(
      <div style={{ minWidth: 320 }}>
        <h2 style={{ color: Colors.primary, marginBottom: 16 }}>Supprimer la facture ?</h2>
        <p>Cette action est irréversible.</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
          <button onClick={closeModal} style={{ ...btnStyle, background: Colors.mediumGray, color: Colors.text }}>Annuler</button>
          <button
            onClick={async () => { await removeInvoice(invoice.id); closeModal(); }}
            style={{ ...btnStyle, background: Colors.error, color: Colors.white }}
          >
            Supprimer
          </button>
        </div>
      </div>
    );
  };

  // --- Statut coloré ---
  const statusColor = (status: string) => {
    switch (status) {
      case 'paid': return { color: Colors.success, fontWeight: 600 };
      case 'unpaid': return { color: Colors.error, fontWeight: 600 };
      case 'pending': return { color: Colors.warning, fontWeight: 600 };
      default: return { color: Colors.text };
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>Factures</h1>
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
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
          onClick={handleCreate}
        >
          <Plus size={18} /> Nouvelle facture
        </button>
      </div>
      <div style={{
        background: Colors.white,
        borderRadius: 12,
        boxShadow: `0 2px 8px ${Colors.shadow}`,
        padding: 24,
        overflowX: 'auto'
      }}>
        {error && <div style={{ color: Colors.error, marginBottom: 16 }}>{error}</div>}
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
          <thead>
            <tr style={{ background: Colors.primaryLight }}>
              <th style={thStyle}>Client</th>
              <th style={thStyle}>Titre</th>
              <th style={thStyle}>Montant</th>
              <th style={thStyle}>Statut</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 32 }}>Chargement...</td>
              </tr>
            ) : invoices.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 32 }}>Aucune facture</td>
              </tr>
            ) : (
              invoices.map((inv) => (
                <tr key={inv.id} style={{ borderBottom: `1px solid ${Colors.mediumGray}`, transition: 'background 0.2s' }}>
                  <td style={tdStyle}>{inv.client?.name || inv.clientId}</td>
                  <td style={tdStyle}>{inv.title}</td>
                  <td style={tdStyle}>{inv.total_ttc}€</td>
                  <td style={{ ...tdStyle, ...statusColor(inv.status) }}>{inv.status}</td>
                  <td style={tdStyle}>
                    <button style={iconBtn} title="Voir" onClick={() => handleView(inv)}><Eye size={18} /></button>
                    <button style={iconBtn} title="Éditer" onClick={() => handleEdit(inv)}><Edit2 size={18} /></button>
                    <button style={iconBtn} title="Supprimer" onClick={() => handleDelete(inv)}><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

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

const labelStyle = {
  fontWeight: 500,
  color: Colors.text,
  marginBottom: 4,
  display: 'block',
};

const inputStyle = {
  width: '100%',
  padding: '8px 10px',
  borderRadius: 6,
  border: `1px solid ${Colors.mediumGray}`,
  fontSize: 15,
  marginTop: 4,
  marginBottom: 8,
};

export default Factures;