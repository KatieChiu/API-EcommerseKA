import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../api/client';
import { useCart } from '../context/CartContext';
import QuantityStepper from '../components/QuantityStepper';

const formatL = (n) => `L ${Number(n).toLocaleString('es-HN', { minimumFractionDigits: 2 })}`;

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, loading } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    let cancelled = false;

    setFetching(true);
    setError(null);
    setProduct(null);

    getProduct(id)
      .then((data) => {
        if (cancelled) return;
        if (!data || !data.id) {
          setError('El producto no existe o ya no está disponible.');
          return;
        }
        setProduct(data);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Error cargando producto:', err);
        setError('No se pudo cargar el producto. Intenta de nuevo.');
      })
      .finally(() => {
        if (!cancelled) setFetching(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleAdd = async () => {
    if (!product) return;
    try {
      await addItem(product.id, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error('Error agregando al carrito:', err);
      setError('No se pudo agregar el producto al carrito.');
    }
  };

  if (fetching) {
    return <p className="text-ink/50">Cargando producto...</p>;
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate('/catalogo')}
          className="text-forest font-medium underline underline-offset-4"
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div className="aspect-square bg-sage/60 rounded-sm flex items-center justify-center">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <span className="font-display text-6xl text-forest/30">
            {product.name ? product.name[0] : '?'}
          </span>
        )}
      </div>

      <div>
        {product.category && (
          <p className="text-sm text-ink/50 mb-2">{product.category.name}</p>
        )}
        <h1 className="font-display text-4xl mb-4">{product.name}</h1>
        <p className="text-2xl text-forest font-medium mb-6">{formatL(product.price)}</p>
        {product.description && (
          <p className="text-ink/70 leading-relaxed mb-8 max-w-md">{product.description}</p>
        )}

        <div className="flex items-center gap-4 mb-6">
          <QuantityStepper value={quantity} onChange={setQuantity} />
        </div>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <div className="flex gap-3">
          <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-forest text-cream px-8 py-3 rounded-sm font-medium hover:bg-forest-light transition-colors disabled:opacity-40"
          >
            {added ? 'Agregado ✓' : 'Agregar al carrito'}
          </button>
          <button
            onClick={() => navigate('/carrito')}
            className="border border-forest text-forest px-6 py-3 rounded-sm font-medium hover:bg-sage/40 transition-colors"
          >
            Ver carrito
          </button>
        </div>
      </div>
    </div>
  );
}
