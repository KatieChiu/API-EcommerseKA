import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCustomer, createOrder } from '../api/client';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, total, cartId, clearLocalCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    primaryPhone: '',
    secondaryPhone: '',
    email: '',
    address: '',
  });
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirmed) {
      setError('Confirma que tus datos son correctos antes de continuar.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const customer = await createCustomer({
        fullName: form.fullName,
        primaryPhone: form.primaryPhone,
        secondaryPhone: form.secondaryPhone || undefined,
        email: form.email || undefined,
        address: form.address,
      });

      const order = await createOrder({
        customerId: customer.id,
        contactName: form.fullName,
        primaryPhone: form.primaryPhone,
        secondaryPhone: form.secondaryPhone || undefined,
        deliveryAddress: form.address,
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      });

      clearLocalCart();
      navigate('/confirmacion', { state: { order } });
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo crear el pedido. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-4xl mb-2">Checkout</h1>
      <p className="text-ink/60 mb-10">
        Total del pedido: <span className="text-forest font-medium">L {total.toLocaleString('es-HN', { minimumFractionDigits: 2 })}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Nombre completo" name="fullName" value={form.fullName} onChange={handleChange} required />
        <Field label="Teléfono principal" name="primaryPhone" value={form.primaryPhone} onChange={handleChange} required placeholder="9999-9999" />
        <Field label="Teléfono alternativo (opcional)" name="secondaryPhone" value={form.secondaryPhone} onChange={handleChange} />
        <Field label="Correo (opcional)" name="email" type="email" value={form.email} onChange={handleChange} />
        <Field label="Dirección de entrega" name="address" value={form.address} onChange={handleChange} required as="textarea" />

        <div className="bg-sage/40 rounded-sm p-4 text-sm text-ink/70">
          Verifica que tus números de teléfono sean correctos. Un encargado
          utilizará estos números para confirmar tu pedido y enviarte
          información relacionada con el pago y la entrega.
        </div>

        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-1"
          />
          Confirmo que mis datos son correctos.
        </label>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-forest text-cream px-8 py-4 rounded-sm font-medium hover:bg-forest-light transition-colors disabled:opacity-50"
        >
          {submitting ? 'Enviando pedido...' : 'Confirmar pedido'}
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, value, onChange, type = 'text', required, placeholder, as }) {
  const Tag = as || 'input';
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1.5">{label}</span>
      <Tag
        name={name}
        type={as ? undefined : type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={as === 'textarea' ? 3 : undefined}
        className="w-full border border-sage rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
      />
    </label>
  );
}