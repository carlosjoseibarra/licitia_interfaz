import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import '../styles/dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-content">
        <div className="dashboard-welcome">
          <h1>Bienvenido, {user?.name}</h1>
          <p>Este es tu panel de control personal</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Nombre</h3>
            <p>{user?.name}</p>
            <span className="card-sub">Nombre completo</span>
          </div>

          <div className="dashboard-card">
            <h3>Email</h3>
            <p>{user?.email}</p>
            <span className="card-sub">Correo electronico</span>
          </div>

          <div className="dashboard-card">
            <h3>Estado</h3>
            <p>Activo</p>
            <span className="card-sub">Sesion iniciada</span>
          </div>
        </div>

        <div className="dashboard-actions">
          <Button variant="danger" onClick={handleLogout}>
            Cerrar sesion
          </Button>
        </div>
      </div>
    </div>
  );
}
