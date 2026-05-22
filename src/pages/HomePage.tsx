import { Link } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';

export function HomePage() {
  return (
    <div className="space-y-14">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2.5rem] border border-ink/10 bg-white/68 p-8 shadow-panel md:p-10">
          <p className="text-xs uppercase tracking-[0.35em] text-ink/45">
            Working Title
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-ink md:text-6xl">
            Visual Systems for Identity, Commerce, and Interactive Storytelling
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-ink/72 md:text-lg">
            This portfolio is being built as a visual archive rather than a
            generic gallery. It is designed to hold original work, process
            evidence, and applied creative thinking for 2027 Hong Kong master’s
            applications.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-ink/70">
            <span className="rounded-full border border-ink/10 px-4 py-2">
              Original work only
            </span>
            <span className="rounded-full border border-ink/10 px-4 py-2">
              Process visible
            </span>
            <span className="rounded-full border border-ink/10 px-4 py-2">
              Structure before effects
            </span>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="rounded-full bg-ink px-5 py-3 text-sm text-fog"
            >
              Enter project index
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-ink/15 px-5 py-3 text-sm text-ink"
            >
              Read positioning notes
            </Link>
          </div>
        </div>
        <aside className="rounded-[2.5rem] border border-ink/10 bg-paper-grid bg-[size:20px_20px] p-8 shadow-panel">
          <p className="text-xs uppercase tracking-[0.35em] text-ink/45">
            Day 1 status
          </p>
          <div className="mt-6 space-y-5 text-sm leading-7 text-ink/70">
            <p>
              The scaffold is intentionally neutral. Replace the placeholders only
              after you add your own original images, process documents, and real
              project materials.
            </p>
            <p>
              No stock imagery, invented clients, or fake outcomes should enter the
              final site.
            </p>
            <p>
              The visual direction can evolve later toward quiet archive, dreamlike
              interface, or fragmented identity aesthetics once content is in place.
            </p>
          </div>
        </aside>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-ink/45">
              Main Projects
            </p>
            <h2 className="mt-2 font-serif text-3xl text-ink">
              Four case studies prepared for growth
            </h2>
          </div>
          <Link to="/projects" className="text-sm text-ink/60">
            View all projects
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
