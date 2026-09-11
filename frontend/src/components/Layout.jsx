import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <Outlet />
      </main>
      <footer className="border-t border-sage py-8 text-center text-sm text-ink/60">
        e-commerceKAT — Tienda en línea
      </footer>
    </div>
  );
}