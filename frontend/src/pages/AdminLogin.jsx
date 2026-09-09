import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../api/client';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await adminLogin(form.email, form.password);
      navigate('/admin/pedidos');
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales inválidas.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto py-20">
      <h1 className="font-display text-3xl mb-8 text-center">Acceso vendedor</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="block text-sm font-medium mb-1.5">Correo</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-sage rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium mb-1.5">Contraseña</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-sage rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
          />
        </label>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-forest text-cream px-8 py-3 rounded-sm font-medium hover:bg-forest-light transition-colors disabled:opacity-50"
        >
          {submitting ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}