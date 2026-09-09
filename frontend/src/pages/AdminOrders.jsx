import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminOrders, updateOrderStatus, adminLogout, getAdminUser } from '../api/client';

const STATUS_OPTIONS = ['Completed', 'Rejected', 'PaymentFailed'];

export default function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = getAdminUser();

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getAdminOrders();
      setOrders(Array.isArray(data) ? data : data?.orders || []);
    } catch (err) {
      setError('No se pudieron cargar los pedidos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      loadOrders();
    } catch (err) {
      alert('No se pudo actualizar el estado del pedido.');
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl mb-1">Pedidos</h1>
          {user && <p className="text-sm text-ink/50">Sesión: {user.fullName}</p>}
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-ink/50 hover:text-forest underline underline-offset-4"
        >
          Cerrar sesión
        </button>
      </div>

      {loading && <p className="text-ink/50">Cargando pedidos...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p className="text-ink/50">No hay pedidos todavía.</p>
      )}

      {!loading && orders.length > 0 && (
        <div className="divide-y divide-sage">
          {orders.map((order) => (
            <div key={order.id} className="py-5 flex items-center justify-between gap-6">
              <div>
                <p className="font-medium">Pedido #{order.orderNumber || order.id}</p>
                <p className="text-sm text-ink/50">
                  {order.contactName} · {order.primaryPhone}
                </p>
              </div>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className="border border-sage rounded-sm px-3 py-2 text-sm"
              >
                <option value={order.status} disabled>
                  {order.status}
                </option>
                {STATUS_OPTIONS.filter((s) => s !== order.status).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}