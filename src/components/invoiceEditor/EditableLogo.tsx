import { useModal } from '@/context/ModalContext';
import { Colors } from '@/constants/Colors';

export default function EditableLogo({ value, onChange }: { value?: string, onChange: (v: string) => void }) {
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
        <label style={{ fontWeight: 600, color: Colors.primary }}>URL du logo</label>
        <input
          autoFocus
          defaultValue={value}
          onChange={e => (temp = e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: `1px solid ${Colors.mediumGray}` }}
          placeholder="https://..."
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
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: Colors.mediumGray,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      onClick={handleEdit}
      title="Cliquer pour ajouter/modifier le logo"
    >
      {value
        ? <img src={value} alt="Logo" style={{ width: 32, height: 32, objectFit: 'cover' }} />
        : <span style={{ color: Colors.primary, fontSize: 12 }}>Logo</span>
      }
    </div>
  );
}