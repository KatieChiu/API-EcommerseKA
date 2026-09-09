import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import AdminLogin from './pages/AdminLogin';
import AdminOrders from './pages/AdminOrders';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProducts from './pages/AdminProducts';
import AdminCategories from './pages/AdminCategories';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Routes>
          
<Route
  path="/admin/products"
  element={
    <ProtectedRoute>
      <AdminProducts />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/categorias"
  element={
    <ProtectedRoute>
      <AdminCategories />
    </ProtectedRoute>
  }
/>
 <Route
            path="/admin/pedidos"
            element={
              <ProtectedRoute>
                <AdminOrders />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmacion" element={<Confirmation />} />
          <Route path="/admin/login" element={<AdminLogin />} />
         
        </Routes>
      </main>
    </>
  );
}