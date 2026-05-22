import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
];

export function Navigation() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-fog/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <NavLink to="/" className="max-w-[18rem]">
          <p className="text-[0.7rem] uppercase tracking-[0.35em] text-ink/55">
            Visual Systems Archive
          </p>
          <p className="mt-1 font-serif text-lg text-ink">
            Identity, commerce, and interactive storytelling
          </p>
        </NavLink>
        <nav className="flex items-center gap-2 text-sm text-ink/75">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${
                  isActive ? 'bg-ink text-fog' : 'hover:bg-ink/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
