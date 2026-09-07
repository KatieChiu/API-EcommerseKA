import { Link } from 'react-router-dom';

const featuredProducts = [
  {
    id: 1,
    name: 'Taladro inalámbrico',
    category: 'Herramientas eléctricas',
    price: '$89.99',
    image:
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=85',
  },
  {
    id: 2,
    name: 'Kit de herramientas',
    category: 'Herramientas manuales',
    price: '$59.99',
    image:
      'https://images.unsplash.com/photo-1581147036324-c17ac41a75b9?w=800&q=85',
  },
  {
    id: 3,
    name: 'Caja de herramientas',
    category: 'Almacenamiento',
    price: '$74.99',
    image:
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=85',
  },
];

const categories = [
  {
    name: 'Herramientas eléctricas',
    description: 'Potencia para cada proyecto',
    image:
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=85',
  },
  {
    name: 'Herramientas manuales',
    description: 'Precisión para cada trabajo',
    image:
      'https://images.unsplash.com/photo-1581147036324-c17ac41a75b9?w=800&q=85',
  },
  {
    name: 'Seguridad y accesorios',
    description: 'Equípate para trabajar seguro',
    image:
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&q=85',
  },
];

export default function Home() {
  return (
    <div className="space-y-24">

      {/* HERO */}
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:min-h-[600px]">

        <div className="max-w-xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-forest">
            Bienvenido a eKAT
          </p>

          <h1 className="font-display text-5xl leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Las herramientas que necesitas,
            <span className="block text-forest">
              para hacer el trabajo.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-ink/65">
            Encuentra herramientas, equipos y accesorios para construcción,
            reparación, mantenimiento y tus proyectos del día a día.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-forest-light"
            >
              Ver herramientas
            </Link>

            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center rounded-full border border-ink/20 px-7 py-3.5 text-sm font-semibold transition hover:bg-sage"
            >
              Explorar catálogo
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-sage">
            <img
              src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1200&q=85"
              alt="Herramientas eKAT"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-cream p-5 shadow-xl sm:block">
            <p className="text-xs uppercase tracking-widest text-ink/50">
              Equípate mejor
            </p>

            <p className="mt-1 font-display text-2xl">
              Calidad para cada proyecto
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-y border-ink/10 py-10">
        <div className="grid gap-8 sm:grid-cols-3">

          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage text-forest">
              ✓
            </div>

            <div>
              <h3 className="font-semibold">
                Productos de calidad
              </h3>

              <p className="mt-1 text-sm text-ink/60">
                Herramientas para trabajos exigentes.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage text-forest">
              ✓
            </div>

            <div>
              <h3 className="font-semibold">
                Compra fácil
              </h3>

              <p className="mt-1 text-sm text-ink/60">
                Encuentra lo que necesitas rápidamente.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage text-forest">
              ✓
            </div>

            <div>
              <h3 className="font-semibold">
                Compra segura
              </h3>

              <p className="mt-1 text-sm text-ink/60">
                Tu información protegida en cada compra.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CATEGORIES */}
      <section>

        <div className="mb-10 flex items-end justify-between gap-4">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest">
              Categorías
            </p>

            <h2 className="mt-2 font-display text-4xl sm:text-5xl">
              Encuentra lo que necesitas
            </h2>
          </div>

          <Link
            to="/catalogo"
            className="hidden text-sm font-semibold underline underline-offset-4 sm:block"
          >
            Ver todo
          </Link>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {categories.map((category) => (
            <Link
              key={category.name}
              to="/catalogo"
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-sage"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 p-7 text-white">

                <h3 className="font-display text-3xl">
                  {category.name}
                </h3>

                <p className="mt-1 text-sm text-white/75">
                  {category.description}
                </p>

                <span className="mt-5 inline-block text-sm font-semibold underline underline-offset-4">
                  Ver productos →
                </span>

              </div>
            </Link>
          ))}

        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section>

        <div className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest">
            Productos destacados
          </p>

          <h2 className="mt-2 font-display text-4xl sm:text-5xl">
            Lo más buscado
          </h2>

          <p className="mt-4 max-w-xl text-ink/60">
            Descubre algunas de las herramientas y productos disponibles
            para tus proyectos.
          </p>

        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/producto/${product.id}`}
              className="group"
            >

              <div className="aspect-square overflow-hidden rounded-3xl bg-sage">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

              </div>

              <div className="mt-5 flex items-start justify-between gap-4">

                <div>

                  <p className="text-xs uppercase tracking-wider text-ink/45">
                    {product.category}
                  </p>

                  <h3 className="mt-1 font-display text-2xl">
                    {product.name}
                  </h3>

                </div>

                <p className="font-semibold">
                  {product.price}
                </p>

              </div>

            </Link>
          ))}

        </div>

        <div className="mt-10 text-center">

          <Link
            to="/catalogo"
            className="inline-flex rounded-full border border-ink/20 px-7 py-3.5 text-sm font-semibold transition hover:bg-ink hover:text-white"
          >
            Ver todas las herramientas
          </Link>

        </div>

      </section>

      {/* PROMO */}
      <section className="overflow-hidden rounded-[2rem] bg-forest px-8 py-16 text-white sm:px-14 lg:px-20">

        <div className="grid items-center gap-10 lg:grid-cols-2">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mustard">
              Equipa tu proyecto
            </p>

            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              Todo lo necesario para trabajar mejor.
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-white/70">
              Desde herramientas manuales hasta equipos eléctricos y
              accesorios. Encuentra lo que necesitas en un solo lugar.
            </p>

            <Link
              to="/catalogo"
              className="mt-8 inline-flex rounded-full bg-mustard px-7 py-3.5 text-sm font-semibold text-ink transition hover:opacity-90"
            >
              Comprar ahora
            </Link>

          </div>

          <div className="hidden lg:block">

            <div className="aspect-[4/3] overflow-hidden rounded-3xl">

              <img
                src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1000&q=85"
                alt="Herramientas para proyectos"
                className="h-full w-full object-cover"
              />

            </div>

          </div>

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="pb-10 text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest">
          eKAT
        </p>

        <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl sm:text-5xl">
          Prepárate para tu próximo proyecto.
        </h2>

        <Link
          to="/catalogo"
          className="mt-7 inline-flex rounded-full bg-ink px-8 py-4 text-sm font-semibold text-white transition hover:bg-forest"
        >
          Explorar catálogo
        </Link>

      </section>

    </div>
  );
}