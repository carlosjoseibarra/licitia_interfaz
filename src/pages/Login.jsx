import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validateLoginForm, hasErrors } from '../utils/validations';
import Input from '../components/Input';
import Button from '../components/Button';
import '../styles/login.css';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(form);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) return;

    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setFormError(err.message || 'Error al iniciar sesion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Left Panel - Branding */}
      <div className="login-left">
        <div className="login-decor-circle-1" />
        <div className="login-decor-circle-2" />
        <div className="login-decor-ring" />
        <div className="login-decor-ring-2" />

        <div className="login-left-content">
          <div className="login-logo">licit<span>IA</span></div>
          <h2 className="login-welcome">Bienvenido de nuevo</h2>
          <p className="login-welcome-sub">
            Inicia sesion para acceder a la plataforma y continuar con tus procesos.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <h1>Iniciar sesion</h1>
            <p>Ingresa tus credenciales para acceder</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {formError && <div className="form-error">{formError}</div>}

            <div className="form-group">
              <Input
                label="Correo electronico"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="@email.com"
                error={errors.email}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <Input
                label="Contrasena"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="password"
                error={errors.password}
                disabled={loading}
              />
            </div>

            <Button type="submit" variant="primary" loading={loading}>
              Iniciar sesion
            </Button>
          </form>

          
        </div>
      </div>
    </div>
  );
}
