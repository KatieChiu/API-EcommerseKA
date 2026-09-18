import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminOrders, updateOrderStatus, adminLogout, getAdminUser } from '../api/client';

const STATUS_OPTIONS = ['Completed', 'Rejected', 'PaymentFailed'];
const COUNTRY_CODE = '504';

// Construye el enlace de WhatsApp Web con el mensaje del pedido ya redactado.
// No envía nada automáticamente: solo abre el chat con el texto precargado.
function buildWhatsappLink(order) {
  const cleanPhone = (order.primaryPhone || '').replace(/[^0-9]/g, '');
  const phoneWithCountryCode = `${COUNTRY_CODE}${cleanPhone}`;

  const items = order.items || [];
  const productsList = items
    .map((item) => `• ${item.productName} × ${item.quantity}`)
    .join('\n');

  const message = `Hola ${order.contactName}, te contactamos de eKAT para confirmar tu pedido #${order.orderNumber || order.id}.
Productos:
${productsList}
Total: L ${order.total}
¿Podemos confirmar tu pedido para continuar con el proceso de pago?`;

  return `https://wa.me/${phoneWithCountryCode}?text=${encodeURIComponent(message)}`;
}

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

  const handleContactCustomer = (order) => {
    window.open(buildWhatsappLink(order), '_blank');
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
        <div className="space-y-4">
          {orders.map((order) => {
            const items = order.items || [];
            const orderDate = order.createdAt
              ? new Date(order.createdAt).toLocaleString('es-HN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })
              : null;

            return (
              <div
                key={order.id}
                className="border border-sage rounded-sm p-5 bg-white"
              >
                {/* Encabezado: número de pedido, fecha y estado */}
                <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                  <div>
                    <p className="font-medium">
                      Pedido #{order.orderNumber || order.id}
                    </p>
                    {orderDate && (
                      <p className="text-xs text-ink/50">{orderDate}</p>
                    )}
                  </div>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-sage/40 text-forest">
                    {order.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Datos del cliente */}
                  <div>
                    <h3 className="text-xs uppercase tracking-wide text-ink/40 mb-2">
                      Cliente
                    </h3>
                    <p className="text-sm">{order.contactName}</p>
                    <p className="text-sm text-ink/60">
                      Tel: {order.primaryPhone}
                      {order.secondaryPhone && ` · ${order.secondaryPhone}`}
                    </p>
                    <p className="text-sm text-ink/60 mt-1">
                      {order.deliveryAddress}
                    </p>
                  </div>

                  {/* Productos del pedido */}
                  <div>
                    <h3 className="text-xs uppercase tracking-wide text-ink/40 mb-2">
                      Productos
                    </h3>
                    {items.length > 0 ? (
                      <ul className="text-sm space-y-1">
                        {items.map((item) => (
                          <li
                            key={item.id}
                            className="flex justify-between gap-4"
                          >
                            <span>
                              {item.productName} × {item.quantity}
                            </span>
                            <span className="text-ink/60 whitespace-nowrap">
                              L {Number(item.subtotal).toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-ink/50">
                        Sin detalle de productos.
                      </p>
                    )}
                    <div className="flex justify-between text-sm font-medium mt-2 pt-2 border-t border-sage/60">
                      <span>Total</span>
                      <span>L {Number(order.total).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-sage/60">
                  <button
                    type="button"
                    onClick={() => handleContactCustomer(order)}
                    className="bg-forest text-cream px-4 py-2 rounded-sm text-sm font-medium hover:bg-forest-light transition-colors whitespace-nowrap"
                  >
                    💬 Contactar cliente
                  </button>
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
