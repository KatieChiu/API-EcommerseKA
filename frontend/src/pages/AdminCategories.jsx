import { useEffect, useState } from 'react';
import { getCategoriesadmin, postCategory, updateCategory } from '../api/client';

const emptyForm = { name: '', slug: '' };

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategoriesadmin();
      setCategories(Array.isArray(data) ? data : data?.categories || []);
    } catch (err) {
      setError('No se pudieron cargar las categorías.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const startEdit = (category) => {
    setEditingId(category.id);
    setForm({ name: category.name || '', slug: category.slug || '' });
    setFormError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.slug) {
      setFormError('Nombre y slug son obligatorios.');
      return;
    }

    setSaving(true);
    setFormError('');
    try {
      if (editingId) {
        await updateCategory(editingId, form);
      } else {
        await postCategory(form);
      }
      cancelEdit();
      loadCategories();
    } catch (err) {
      setFormError(err.response?.data?.message || 'No se pudo guardar la categoría.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Categorías</h1>

      {/* Formulario crear/editar */}
      <form
        onSubmit={handleSubmit}
        className="bg-sage/20 border border-sage rounded-sm p-6 mb-10 space-y-4"
      >
        <h2 className="font-display text-xl mb-2">
          {editingId ? 'Editar categoría' : 'Nueva categoría'}
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
              placeholder="Electrónica"
              className="w-full border border-sage rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium mb-1.5">Slug</span>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              placeholder="electronica"
              className="w-full border border-sage rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
            />
          </label>
        </div>

        {formError && <p className="text-sm text-red-700">{formError}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-forest text-cream px-6 py-2.5 rounded-sm font-medium hover:bg-forest-light transition-colors disabled:opacity-50"
          >
            {saving ? 'Guardando...' : editingId ? 'Guardar cambios' : 'Crear categoría'}
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

      {/* Lista de categorías */}
      {loading && <p className="text-ink/50">Cargando categorías...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && categories.length === 0 && (
        <p className="text-ink/50">No hay categorías todavía.</p>
      )}

      {!loading && categories.length > 0 && (
        <div className="divide-y divide-sage">
          {categories.map((category) => (
            <div key={category.id} className="py-4 flex items-center justify-between gap-6">
              <div>
                <p className="font-medium">{category.name}</p>
                <p className="text-sm text-ink/50">{category.slug}</p>
              </div>
              <button
                onClick={() => startEdit(category)}
                className="text-forest font-medium text-sm hover:underline underline-offset-4"
              >
                Editar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}