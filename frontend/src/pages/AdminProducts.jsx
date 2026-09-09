import { useEffect, useState } from 'react';
import {
  getProductsadmin,
  getCategoriesadmin,
  postProduct,
  updateProduct,
  deleteProduct,
} from '../api/client';

const emptyForm = {
  name: '',
  categoryId: '',
  price: '',
  description: '',
  isActive: true,
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        getProductsadmin(),
        getCategoriesadmin(),
      ]);
      setProducts(Array.isArray(productsData) ? productsData : productsData?.products || []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : categoriesData?.categories || []);
    } catch (err) {
      setError('No se pudieron cargar los productos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || '',
      categoryId: product.categoryId || '',
      price: product.price ?? '',
      description: product.description || '',
      isActive: product.isActive ?? true,
    });
    setFormError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.categoryId || !form.price) {
      setFormError('Nombre, categoría y precio son obligatorios.');
      return;
    }

    setSaving(true);
    setFormError('');
    try {
      const payload = {
        name: form.name,
        categoryId: form.categoryId,
        price: Number(form.price),
        description: form.description || undefined,
        isActive: form.isActive,
      };

      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await postProduct(payload);
      }

      cancelEdit();
      loadData();
    } catch (err) {
      setFormError(err.response?.data?.message || 'No se pudo guardar el producto.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este producto? Esta acción no se puede deshacer.')) return;
    try {
      await deleteProduct(id);
      loadData();
    } catch (err) {
      alert('No se pudo eliminar el producto.');
    }
  };

  const categoryName = (categoryId) =>
    categories.find((c) => c.id === categoryId)?.name || '—';

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Productos</h1>

      {/* Formulario crear/editar */}
      <form
        onSubmit={handleSubmit}
        className="bg-sage/20 border border-sage rounded-sm p-6 mb-10 space-y-4"
      >
        <h2 className="font-display text-xl mb-2">
          {editingId ? 'Editar producto' : 'Nuevo producto'}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm font-medium mb-1.5">Nombre</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-sage rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium mb-1.5">Categoría</span>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
              className="w-full border border-sage rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium mb-1.5">Precio (L)</span>
            <input
              type="number"
              step="0.01"
              min="0"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border border-sage rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
            />
          </label>

          <label className="flex items-center gap-2 mt-7">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            <span className="text-sm font-medium">Producto activo</span>
          </label>
        </div>

        <label className="block">
          <span className="block text-sm font-medium mb-1.5">Descripción</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full border border-sage rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
          />
        </label>

        {formError && <p className="text-sm text-red-700">{formError}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-forest text-cream px-6 py-2.5 rounded-sm font-medium hover:bg-forest-light transition-colors disabled:opacity-50"
          >
            {saving ? 'Guardando...' : editingId ? 'Guardar cambios' : 'Crear producto'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="border border-ink/20 px-6 py-2.5 rounded-sm font-medium hover:bg-sage/40 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de productos */}
      {loading && <p className="text-ink/50">Cargando productos...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="text-ink/50">No hay productos todavía.</p>
      )}

      {!loading && products.length > 0 && (
        <div className="divide-y divide-sage">
          {products.map((product) => (
            <div key={product.id} className="py-4 flex items-center justify-between gap-6">
              <div className="flex-1">
                <p className="font-medium">
                  {product.name}{' '}
                  {!product.isActive && (
                    <span className="text-xs text-red-600 font-normal">(inactivo)</span>
                  )}
                </p>
                <p className="text-sm text-ink/50">
                  {categoryName(product.categoryId)} · L{' '}
                  {Number(product.price).toLocaleString('es-HN', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="flex gap-4 text-sm shrink-0">
                <button
                  onClick={() => startEdit(product)}
                  className="text-forest font-medium hover:underline underline-offset-4"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 font-medium hover:underline underline-offset-4"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}