import { FileText, FilePlus } from 'lucide-react';
import { Colors } from '@/constants/Colors';

export default function InvoiceLayout(handleExportPDF: () => void, handleFinishInvoice: () => void) {
    
    return (
        <aside style={styles.actionsMenu}>
            <button style={styles.actionBtn} onClick={handleFinishInvoice}>
                <FileText size={20} />
                Finaliser la facture
            </button>
            <button style={styles.actionBtn} onClick={handleExportPDF}>
                <FilePlus size={20} />
                exporter en PDF
            </button>
        </aside>
    );
}

const styles = {
    actionsMenu: {
        position: 'absolute' as 'absolute',
        top: 32,
        right: 32,
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 16,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 16px #0002',
        padding: '24px 18px',
        zIndex: 10,
        minWidth: 220,
        alignItems: 'flex-start',
    },
    actionBtn: {
        background: Colors.primary,
        color: Colors.white,
        border: 'none',
        borderRadius: 8,
        padding: '10px 18px',
        fontWeight: 600,
        fontSize: 15,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        transition: 'background 0.2s',
    },
};