import { useAuth } from '@/context/AuthContext';

export default function AdressUser() {
  const { user } = useAuth();
  if (!user) return null;

  function formatPhone(phone: string) {
    return phone.replace(/(.{2})/g, '$1 ').trim();
  }

  function formatSiret(siret: string) {
  return siret.replace(/^(\d{3})(\d{3})(\d{3})(\d+)$/, '$1 $2 $3 $4').trim();
}


  return (
    <div style={styles.container}>
      <div style={styles.companyName}>{user.companyName}</div>
      <div style={styles.address}>{user.address}</div>
      {(user.postalCode || user.city || user.country) && (
        <div style={styles.address}>
          {[user.postalCode, user.city, user.country].filter(Boolean).join(' ')}
        </div>
      )}
      <div style={styles.siret}>{user.siret && <>SIRET&nbsp;: <b>{formatSiret(user.siret)}</b></>}</div>
      {user.phone && (
        <div style={styles.phone}>Tél&nbsp;: {formatPhone(user.phone)}</div>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: '#fff',
    borderRadius: 8,
    padding: '18px 24px',
    color: '#222',
    fontSize: 15,
    fontWeight: 500,
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    maxWidth: 340,
    marginBottom: 12,
    lineHeight: 1.6,
    border: '1px solid #eee',
  },
  companyName: {
    fontWeight: 700,
    fontSize: 20,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  siret: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 6,
    color: '#555',
  },
  address: {
    fontSize: 15,
    marginBottom: 2,
    color: '#222',
  },
  email: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
    fontWeight: 400,
  },
  phone: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
    fontWeight: 400,
  },
};