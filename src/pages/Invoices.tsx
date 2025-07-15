import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';

import { useInvoices } from '@/context/InvoicesContext';
import { useModal } from '@/context/ModalContext';

const Factures: React.FC = () => {
    const { openModal, closeModal } = useModal();
    const { invoices, loading } = useInvoices();

    function MonFormulaire() {
        return (
            <div>
                {/* ...formulaire... */}
                <h2>Créer une nouvelle facture</h2>
                <form>
                    <label>
                        Client:
                        <input type="text" name="client" required />
                    </label>
                    <label>
                        Titre:
                        <input type="text" name="title" required />
                    </label>
                    <label>
                        Montant:
                        <input type="number" name="amount" required />
                    </label>
                    <button type="submit">Créer</button>
                </form>
            </div>
        );
    }

    function viewInvoice(id: string) {
        const invoice = invoices.find(inv => inv.id === id);
        if (!invoice) return;

        openModal(
            <div style={{ minWidth: 340 }}>
                <h2 style={{ marginBottom: 16, color: Colors.primary }}>Détails de la facture</h2>
                <div style={{ marginBottom: 24 }}>
                    <div style={{ fontWeight: 600, fontSize: 18 }}>{invoice.title}</div>
                    <div style={{ color: Colors.darkGray, marginBottom: 8 }}>Statut : <b>{invoice.status}</b></div>
                    <div style={{ color: Colors.text }}>Montant total : <b>{invoice.total_ttc} €</b></div>
                    <div style={{ color: Colors.text }}>Date : {new Date(invoice.createdAt).toLocaleDateString()}</div>
                </div>
                <div style={{
                    background: Colors.primaryLight,
                    borderRadius: 8,
                    padding: 16,
                    marginBottom: 8,
                }}>
                    <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>Client</div>
                    <div>Nom : <b>{invoice.client.name}</b></div>
                    <div>Email : <b>{invoice.client.email}</b></div>
                    <div>Adresse : <b>{invoice.client.adress}</b></div>
                    <div>Téléphone : <b>{invoice.client.phone || '—'}</b></div>
                </div>
            </div>
        );
    }

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
                    }}
                    onClick={() => openModal(MonFormulaire())}
                >
                    Nouvelle facture
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
                                <td colSpan={6} style={{ textAlign: 'center', padding: 32 }}>Chargement...</td>
                            </tr>
                        ) : invoices.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: 32 }}>Aucune facture</td>
                            </tr>
                        ) : (
                            invoices.map((inv) => (
                                <tr key={inv.id} style={{ borderBottom: `1px solid ${Colors.mediumGray}` }}>
                                    <td style={tdStyle}>{inv.client.name}</td>
                                    <td style={tdStyle}>{inv.title}</td>
                                    <td style={tdStyle}>{inv.total_ttc}€</td>
                                    <td style={tdStyle}>{inv.status}</td>
                                    <td style={tdStyle}>
                                        <button style={actionBtn} onClick={() => viewInvoice(inv.id)}>Voir</button>
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

export default Factures;