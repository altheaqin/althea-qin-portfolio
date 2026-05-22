import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation';

export function SiteLayout() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto w-full max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <Outlet />
      </main>
    </div>
  );
}
