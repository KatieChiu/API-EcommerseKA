import { Link } from 'react-router-dom';

const formatL = (n) => `L ${Number(n).toLocaleString('es-HN', { minimumFractionDigits: 2 })}`;

export default function ProductCard({ product }) {
  return (
    <Link to={`/producto/${product.id}`} className="group block">
      <div className="aspect-square bg-sage/60 rounded-sm overflow-hidden mb-4 flex items-center justify-center">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="font-display text-4xl text-forest/30">{product.name[0]}</span>
        )}
      </div>
      <h3 className="font-display text-lg leading-snug mb-1">{product.name}</h3>
      <p className="text-forest font-medium">{formatL(product.price)}</p>
    </Link>
  );
}