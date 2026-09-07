import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { count } = useCart();

  return (
    <header className="border-b border-sage sticky top-0 bg-cream/95 backdrop-blur-sm z-10">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-tight text-forest">
          eKAT
        </Link>
        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link to="/catalogo" className="hover:text-forest transition-colors">
            Catálogo
          </Link>
          <Link to="/carrito" className="relative flex items-center gap-2 hover:text-forest transition-colors">
            Carrito
            {count > 0 && (
              <span className="bg-mustard text-ink text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}