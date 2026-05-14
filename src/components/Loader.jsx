import './Loader.css';

export default function Loader({ fullScreen = false }) {
  return (
    <div className={`loader ${fullScreen ? 'loader-fullscreen' : ''}`}>
      <div className="loader-spinner" />
      <span className="loader-text">Cargando...</span>
    </div>
  );
}
