import { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../api/client';
import ProductCard from '../components/ProductCard';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        setLoading(true);
        setError('');

        const [productsResponse, categoriesResponse] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        // Productos
        const productsData = Array.isArray(productsResponse)
          ? productsResponse
          : productsResponse?.products || productsResponse?.data || [];

        // Categorías
        const categoriesData = Array.isArray(categoriesResponse)
          ? categoriesResponse
          : categoriesResponse?.categories || categoriesResponse?.data || [];

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error cargando catálogo:', error);
        setError('No se pudo cargar el catálogo.');
      } finally {
        setLoading(false);
      }
    };

    loadCatalog();
  }, []);

  const filteredProducts = activeCategory
    ? products.filter((product) => product.categoryId === activeCategory)
    : products;

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-ink/50">Cargando catálogo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Título */}
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-2">
          Catálogo
        </h1>

        <p className="text-ink/60">
          Explora todos nuestros productos.
        </p>
      </div>

      {/* Filtros de categorías */}
      {categories.length > 0 && (
        <div className="flex gap-2 mb-10 flex-wrap">
          {/* Todos */}
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
              activeCategory === null
                ? 'bg-forest text-cream'
                : 'bg-sage/50 hover:bg-sage'
            }`}
          >
            Todos
          </button>

          {/* Categorías */}
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-forest text-cream'
                  : 'bg-sage/50 hover:bg-sage'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {/* Productos */}
      {filteredProducts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-ink/50">
            {activeCategory
              ? 'No hay productos en esta categoría todavía.'
              : 'No hay productos disponibles.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}