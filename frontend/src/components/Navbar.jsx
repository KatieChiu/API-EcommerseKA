import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { isAdminLoggedIn, adminLogout, getAdminUser } from '../api/client';

// Iconos como componentes SVG simples (sin dependencias externas)
const IconClipboard = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M9 5h6a2 2 0 012 2v11a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5a2 2 0 012-2h2a2 2 0 012 2v0H9v0z" />
  </svg>
);

const IconBox = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-8.25 4.5L3.75 7.5M20.25 7.5l-8.25-4.5L3.75 7.5M20.25 7.5v9l-8.25 4.5m0-13.5v13.5m0-13.5L3.75 7.5m8.25 13.5L3.75 16.5v-9" />
  </svg>
);

const IconTags = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
);

const IconLogout = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H3" />
  </svg>
);

const IconStore = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-16.5 0V9.349m14.25 11.65V9.35m0 0a3.001 3.001 0 003.75-4.669l-2.3-3.877a1.5 1.5 0 00-1.286-.729H5.383a1.5 1.5 0 00-1.286.729l-2.3 3.877a3 3 0 003.75 4.669m14.25 0a3 3 0 01-3.75 0M6.75 16.5h.008v.008H6.75V16.5z" />
  </svg>
);

const IconCart = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.694 2.595-7.152.19-.777-.412-1.548-1.213-1.548H5.625M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

const IconUserTie = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconUserCircle = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

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
          <Link to="/admin/pedidos" className="font-display text-2xl tracking-tight text-forest flex items-center gap-2">
            <IconStore />
            eKAT <span className="text-sm font-sans font-medium text-ink/40">Consola de administrador</span>
          </Link>

          <nav className="flex items-center gap-8 text-sm font-medium">
            <Link to="/admin/pedidos" className="flex items-center gap-2 hover:text-forest transition-colors">
              <IconClipboard />
              Pedidos
            </Link>
            <Link to="/admin/product" className="flex items-center gap-2 hover:text-forest transition-colors">
              <IconBox />
              Productos
            </Link>
            <Link to="/admin/categorias" className="flex items-center gap-2 hover:text-forest transition-colors">
              <IconTags />
              Categorías
            </Link>

            <div className="h-4 w-px bg-sage" />

            {user && (
              <span className="text-xs text-ink/50 hidden sm:inline flex items-center gap-1.5">
                <IconUserCircle />
                {user.fullName}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-ink/50 hover:text-forest transition-colors"
            >
              <IconLogout />
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
          <Link to="/catalogo" className="flex items-center gap-2 hover:text-forest transition-colors">
            <IconStore />
            Catálogo
          </Link>
          <Link to="/carrito" className="relative flex items-center gap-2 hover:text-forest transition-colors">
            <IconCart />
            Carrito
            {count > 0 && (
              <span className="bg-mustard text-ink text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/admin/login"
            className="flex items-center gap-1.5 text-xs text-ink/40 hover:text-forest transition-colors"
          >
            <IconUserTie />
            Vendedor
          </Link>
        </nav>
      </div>
    </header>
  );
}