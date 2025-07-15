import { Colors } from '@/constants/Colors';

import { useAuth } from '@/context/AuthContext';

export default function AdressUser() {
    const {user} = useAuth();
    if (!user) return null;

  return (
    <div style={styles.container}>
      <div style={styles.companyName}>{user.companyName}</div>
      <div style={styles.address}>{user.address}</div>
      {(user.postalCode || user.city || user.country) && (
          <div style={styles.address}>
          {[user.postalCode, user.city, user.country].filter(Boolean).join(' ')}
        </div>
      )}
      {user.phone && (
        <div style={styles.infoLine}>
          <span style={styles.label}>Téléphone :</span> {user.phone}
        </div>
      )}
      <div style={styles.infoLine}>
        <span style={styles.label}>Email :</span> {user.email}
      </div>
      {user.siret && (
        <div style={styles.infoLine}>
          <span style={styles.label}>SIRET :</span> {user.siret}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: Colors.secondary,
    borderRadius: 8,
    padding: '18px 24px',
    color: Colors.primary,
    fontSize: 15,
    fontWeight: 500,
    boxShadow: `0 2px 8px ${Colors.shadow}`,
    maxWidth: 340,
    marginBottom: 12,
    lineHeight: 1.6,
  },
  companyName: {
    fontWeight: 700,
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 4,
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
    fontWeight: 600,
    color: Colors.primaryLight,
    marginRight: 4,
  },
};