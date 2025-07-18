import { useModal } from '@/context/ModalContext';
import { Colors } from '@/constants/Colors';

export default function EditableTitle({ value, onChange }: { value?: string, onChange: (v: string) => void }) {
  const { openModal, closeModal } = useModal();

  const handleEdit = () => {
    let temp = value || '';
    openModal(
      <form
        onSubmit={e => {
          e.preventDefault();
          onChange(temp);
          closeModal();
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 320 }}
      >
        <label style={{ fontWeight: 600, color: Colors.primary }}>Titre du document</label>
        <input
          autoFocus
          defaultValue={value}
          onChange={e => (temp = e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: `1px solid ${Colors.mediumGray}` }}
          placeholder="Titre de la facture"
        />
        <button type="submit" style={{
          background: Colors.primary,
          color: Colors.white,
          border: 'none',
          borderRadius: 6,
          padding: '10px 0',
          fontWeight: 600,
          cursor: 'pointer'
        }}>
          Valider
        </button>
      </form>
    );
  };

  return (
    <span
      style={{
        fontSize: 24,
        fontWeight: 700,
        color: Colors.primary,
        cursor: 'pointer',
        opacity: value ? 1 : 0.5,
        borderBottom: value ? 'none' : `1px dashed ${Colors.primaryLight}`,
      }}
      onClick={handleEdit}
      title="Cliquer pour éditer"
    >
      {value || 'Cliquez ici pour ajouter un titre'}
    </span>
  );
}