import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import QuantityStepper from '../components/QuantityStepper';

const formatL = (n) => `L ${Number(n).toLocaleString('es-HN', { minimumFractionDigits: 2 })}`;

export default function Cart() {
  const { items, total, changeQuantity, removeItem, loading } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="font-display text-3xl mb-4">Tu carrito está vacío</h1>
        <Link to="/catalogo" className="text-forest font-medium underline underline-offset-4">
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-4xl mb-10">Tu carrito</h1>

      <div className="divide-y divide-sage">
        {items.map((item) => (
          <div key={item.id} className="py-6 flex items-center gap-6">
            <div className="w-20 h-20 bg-sage/60 rounded-sm flex items-center justify-center shrink-0">
              <span className="font-display text-xl text-forest/30">{item.product.name[0]}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg mb-1">{item.product.name}</h3>
              <p className="text-sm text-ink/50">{formatL(item.unitPrice)} c/u</p>
            </div>
            <QuantityStepper
              value={item.quantity}
              onChange={(q) => changeQuantity(item.id, q)}
            />
            <p className="font-medium w-24 text-right">{formatL(item.subtotal)}</p>
            <button
              onClick={() => removeItem(item.id)}
              className="text-ink/40 hover:text-ink transition-colors text-sm"
            >
              Quitar
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-10 pt-6 border-t border-sage">
        <span className="font-display text-2xl">Total</span>
        <span className="font-display text-2xl text-forest">{formatL(total)}</span>
      </div>

      <button
        onClick={() => navigate('/checkout')}
        disabled={loading}
        className="mt-8 w-full md:w-auto bg-forest text-cream px-10 py-4 rounded-sm font-medium hover:bg-forest-light transition-colors"
      >
        Continuar al checkout
      </button>
    </div>
  );
}