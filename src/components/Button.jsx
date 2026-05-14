import './Button.css';

export default function Button({ children, type = 'button', variant = 'primary', loading = false, disabled = false, onClick, className = '' }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <span className="btn-spinner" /> : children}
    </button>
  );
}
