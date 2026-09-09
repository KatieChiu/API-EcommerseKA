import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { isAdminLoggedIn, adminLogout, getAdminUser } from '../api/client';

export default function Navbar() {
  const { count } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const inAdminArea = location.pathname.startsWith('/admin');
  const loggedIn = isAdminLoggedIn();
  const user = getAdminUser();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  // ===== NAVBAR ADMIN =====
  if (inAdminArea && loggedIn) {
    return (
      <header className="border-b border-sage sticky top-0 bg-cream/95 backdrop-blur-sm z-10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/admin/pedidos" className="font-display text-2xl tracking-tight text-forest">
            eKAT <span className="text-sm font-sans font-medium text-ink/40">admin</span>
          </Link>

          <nav className="flex items-center gap-8 text-sm font-medium">
            <Link to="/admin/pedidos" className="hover:text-forest transition-colors">
              Pedidos
            </Link>
            <Link to="/admin/productos" className="hover:text-forest transition-colors">
              Productos
            </Link>
            <Link to="/admin/categorias" className="hover:text-forest transition-colors">
              Categorías
            </Link>

            <div className="h-4 w-px bg-sage" />

            {user && (
              <span className="text-xs text-ink/50 hidden sm:inline">{user.fullName}</span>
            )}
            <button
              onClick={handleLogout}
              className="text-ink/50 hover:text-forest transition-colors"
            >
              Cerrar sesión
            </button>
          </nav>
        </div>
      </header>
    );
  }

  // ===== NAVBAR CLIENTE =====
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
         <Link
          to="/admin/login"
          className="flex items-center gap-1.5 text-xs text-ink/40 hover:text-forest transition-colors">
         
          Vendedor
        </Link>
        </nav>
      </div>
    </header>
  );
}