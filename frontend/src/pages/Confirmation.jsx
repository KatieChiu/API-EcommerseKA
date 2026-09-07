import { useLocation, Link, Navigate } from 'react-router-dom';

export default function Confirmation() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) return <Navigate to="/" replace />;

  return (
    <div className="max-w-lg mx-auto text-center py-16">
      <p className="text-sm text-forest font-medium mb-3">Pedido #{order.orderNumber}</p>
      <h1 className="font-display text-4xl mb-6">Tu pedido fue recibido</h1>
      <p className="text-ink/70 leading-relaxed mb-10">
        Un encargado revisará tu pedido y se pondrá en contacto contigo al
        número que nos diste para confirmar los detalles y coordinar el pago
        y la entrega.
      </p>
      <Link
        to="/catalogo"
        className="inline-block bg-forest text-cream px-8 py-3 rounded-sm font-medium hover:bg-forest-light transition-colors"
      >
        Seguir comprando
      </Link>
    </div>
  );
}