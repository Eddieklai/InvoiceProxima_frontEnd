import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useClients } from '@/context/ClientsContext';
import type { Client } from '@/context/ClientsContext';
import { useModal } from '@/context/ModalContext';
import { useNavigate } from 'react-router-dom';

export default function AdressClient({ client, onChange }: { client?: Client, onChange: (v: Client) => void }) {
    const { openModal, closeModal } = useModal();
    const { clients } = useClients();
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);

    const handleSelectClient = () => {
        openModal(
            <div style={modalStyles.wrapper}>
                <h2 style={modalStyles.title}>Sélectionner un client</h2>
                <select
                    style={modalStyles.select}
                    value={client?.id || ''}
                    onChange={e => {
                        const selectedClient = clients.find(c => String(c.id) === e.target.value);
                        if (selectedClient) {
                            onChange(selectedClient);
                            closeModal();
                        }
                    }}
                >
                    <option value="">Sélectionner un client</option>
                    {clients.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.name} - {c.email}
                        </option>
                    ))}
                </select>
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <button
                        style={modalStyles.createBtn}
                        onClick={() => {
                            closeModal();
                            navigate('/clients');
                        }}
                    >
                        Vous ne trouvez pas votre client ? <b>Créez-le ici</b>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div
            style={{
                ...styles.container,
                boxShadow: hovered ? `0 4px 16px ${Colors.shadowStrong}` : styles.container.boxShadow,
                transform: hovered ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s cubic-bezier(.4,0,.2,1)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleSelectClient}
        >
            {!client ? (
                <div style={styles.placeholder}>
                    <span style={styles.placeholderText}>Sélectionner un client</span>
                </div>
            ) : (
                <div>
                    <div style={styles.header}>
                        <div style={styles.companyName}>{client.name}</div>
                        <button style={styles.changeBtn} >Changer</button>
                    </div>
                    <div style={styles.address}>{client.address}</div>
                    <div style={styles.infoLine}>
                        <span style={styles.label}>Email :</span> {client.email}
                    </div>
                    {client.phone && (
                        <div style={styles.infoLine}>
                            <span style={styles.label}>Téléphone :</span> {client.phone}
                        </div>
                    )}
                    {client.siret && (
                        <div style={styles.infoLine}>
                            <span style={styles.label}>SIRET :</span> {client.siret}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        background: Colors.background,
        borderRadius: 8,
        padding: '18px 24px',
        color: Colors.primary,
        fontSize: 15,
        fontWeight: 500,
        boxShadow: `0 2px 8px ${Colors.shadow}`,
        maxWidth: 340,
        marginBottom: 12,
        lineHeight: 1.6,
        minHeight: 120,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s cubic-bezier(.4,0,.2,1)',
    },
    placeholder: {
        width: '100%',
        textAlign: 'center' as const,
        color: Colors.mediumGray,
        fontWeight: 500,
        fontSize: 16,
        cursor: 'pointer',
        padding: '18px 0',
    },
    placeholderText: {
        color: Colors.mediumGray,
        fontWeight: 500,
        fontSize: 16,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    companyName: {
        fontWeight: 700,
        fontSize: 18,
        color: Colors.primary,
    },
    changeBtn: {
        background: Colors.primary,
        color: Colors.white,
        border: 'none',
        borderRadius: 6,
        padding: '4px 12px',
        fontWeight: 500,
        fontSize: 13,
        cursor: 'pointer',
        marginLeft: 8,
    },
    address: {
        color: Colors.primary,
        marginBottom: 2,
    },
    infoLine: {
        color: Colors.primary,
        marginBottom: 2,
    },
    label: {
        fontWeight: 'bold',
    },
};

const modalStyles = {
    wrapper: {
        padding: 24,
        minWidth: 320,
        background: Colors.white,
        borderRadius: 12,
        boxShadow: `0 2px 8px ${Colors.shadow}`,
    },
    title: {
        fontSize: 20,
        fontWeight: 700,
        color: Colors.primary,
        marginBottom: 16,
        textAlign: 'center' as const,
    },
    select: {
        width: '100%',
        padding: 10,
        borderRadius: 6,
        border: `1px solid ${Colors.mediumGray}`,
        fontSize: 15,
        marginBottom: 8,
    },
    createBtn: {
        background: Colors.secondary,
        color: Colors.primary,
        border: 'none',
        borderRadius: 6,
        padding: '10px 18px',
        fontWeight: 500,
        fontSize: 15,
        cursor: 'pointer',
        marginTop: 8,
        width: '100%',
    },
};