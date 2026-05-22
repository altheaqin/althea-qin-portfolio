import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';

export function ProjectsPage() {
  return (
    <div>
      <section className="rounded-[2.5rem] border border-ink/10 bg-white/68 p-8 shadow-panel md:p-10">
        <p className="text-xs uppercase tracking-[0.35em] text-ink/45">
          Projects Index
        </p>
        <h1 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
          A flexible structure for four core portfolio projects
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-ink/70">
          Each project page is prepared for both final outputs and selected
          process materials. The current placeholders are neutral on purpose so
          your original materials can define the final voice of the site.
        </p>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </div>
  );
}
