import './Input.css';

export default function Input({ label, type = 'text', name, value, onChange, placeholder, error, disabled = false }) {
  return (
    <div className="input-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-field ${error ? 'input-error' : ''}`}
        autoComplete={type === 'password' ? 'current-password' : 'on'}
      />
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
}
