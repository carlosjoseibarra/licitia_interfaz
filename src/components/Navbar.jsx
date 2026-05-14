import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          AuthApp
        </Link>
        <div className="navbar-links">
          {user ? (
            <div className="navbar-user">
              <span className="navbar-greeting">Hola, {user.name}</span>
              <Button variant="secondary" onClick={handleLogout}>
                Cerrar sesion
              </Button>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="navbar-link">Iniciar sesion</Link>
              <Link to="/register" className="navbar-link navbar-link-cta">Registrarse</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
