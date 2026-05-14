export function validateEmail(email) {
  if (!email) return 'El email es obligatorio';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return 'El email no es valido';
  return '';
}

export function validatePassword(password) {
  if (!password) return 'La contrasena es obligatoria';
  if (password.length < 6) return 'La contrasena debe tener al menos 6 caracteres';
  return '';
}

export function validateName(name) {
  if (!name) return 'El nombre es obligatorio';
  if (name.length < 2) return 'El nombre debe tener al menos 2 caracteres';
  return '';
}

export function validateLoginForm({ email, password }) {
  return {
    email: validateEmail(email),
    password: validatePassword(password),
  };
}

export function validateRegisterForm({ name, email, password }) {
  return {
    name: validateName(name),
    email: validateEmail(email),
    password: validatePassword(password),
  };
}

export function hasErrors(errors) {
  return Object.values(errors).some((msg) => msg !== '');
}
