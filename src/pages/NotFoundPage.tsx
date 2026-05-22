import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <section className="w-full max-w-3xl rounded-[2.5rem] border border-ink/10 bg-white/68 p-8 text-center shadow-panel md:p-12">
        <p className="text-xs uppercase tracking-[0.4em] text-ink/45">404 / Archive Gap</p>
        <h1 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
          This record has not been placed yet.
        </h1>
        <p className="mt-5 text-base leading-7 text-ink/68">
          The page you tried to open does not exist in the archive yet. Return to
          the project index and continue through the structured paths.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/" className="rounded-full bg-ink px-5 py-3 text-sm text-fog">
            Return home
          </Link>
          <Link
            to="/projects"
            className="rounded-full border border-ink/15 px-5 py-3 text-sm text-ink"
          >
            Browse projects
          </Link>
        </div>
      </section>
    </div>
  );
}
