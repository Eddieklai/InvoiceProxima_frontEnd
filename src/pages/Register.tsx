import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ padding: 32, borderRadius: 8, boxShadow: '0 2px 8px #0001', background: '#fff', minWidth: 320 }}>
        <h2>Créer un compte</h2>
        <form>
          <div style={{ marginBottom: 16 }}>
            <input type="email" placeholder="Email" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <input type="password" placeholder="Mot de passe" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 4, background: '#6C4F3D', color: '#fff', border: 'none', fontWeight: 600 }}>Créer un compte</button>
        </form>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <span>Déjà un compte ? </span>
          <Link to="/login" style={{ color: '#D9A066', fontWeight: 500 }}>Se connecter</Link>
        </div>
      </div>
    </div>
  )
} 