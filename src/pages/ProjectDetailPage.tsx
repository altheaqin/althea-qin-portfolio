import { CaseStudySection } from '../components/CaseStudySection';
import { ProcessStrip } from '../components/ProcessStrip';
import type { Project } from '../data/projects';

type ProjectDetailPageProps = {
  project: Project;
};

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  return (
    <article className="space-y-8">
      <section className="grid gap-8 rounded-[2.5rem] border border-ink/10 bg-white/68 p-8 shadow-panel md:grid-cols-[1.1fr_0.9fr] md:p-10">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-ink/45">
            {project.category}
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink/72">
            {project.oneLiner}
          </p>
          <div className="mt-8 rounded-[1.5rem] border border-ink/10 bg-fog/75 p-5 text-sm leading-6 text-ink/65">
            {project.heroNote}
          </div>
        </div>
        <div
          className={`flex min-h-[22rem] items-end rounded-[2rem] border border-dashed border-ink/15 bg-gradient-to-br ${project.accent} p-6`}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink/45">
              Placeholder hero
            </p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-ink/68">
              Replace this area with your own original final work, interface
              capture, photograph, or documented process image.
            </p>
          </div>
        </div>
      </section>

      <ProcessStrip items={project.process} />

      <section className="rounded-[2rem] border border-ink/10 bg-white/60 px-6 py-2 shadow-panel md:px-8">
        {project.sections.map((section) => (
          <CaseStudySection key={section.title} section={section} />
        ))}
      </section>
    </article>
  );
}
