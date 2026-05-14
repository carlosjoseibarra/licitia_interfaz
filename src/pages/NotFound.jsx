import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <h1>404</h1>
        <p>La pagina que buscas no existe</p>
        <Link to="/login">
          <Button variant="primary">Volver al inicio</Button>
        </Link>
      </div>
    </div>
  );
}
