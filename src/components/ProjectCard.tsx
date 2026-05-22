import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={project.route}
      className="group flex h-full flex-col justify-between rounded-[2rem] border border-ink/10 bg-white/70 p-6 shadow-panel transition hover:-translate-y-1 hover:border-ink/20"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-ink/45">
          {project.category}
        </p>
        <h3 className="mt-3 font-serif text-2xl text-ink">{project.title}</h3>
        <p className="mt-4 text-sm leading-6 text-ink/70">{project.summary}</p>
      </div>
      <div className="mt-8">
        <div
          className={`flex min-h-40 items-end rounded-[1.5rem] border border-dashed border-ink/15 bg-gradient-to-br ${project.accent} p-4`}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-ink/45">
              Placeholder
            </p>
            <p className="mt-2 text-sm text-ink/70">{project.placeholderLabel}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-ink/55">
          <span>{project.status}</span>
          <span className="transition group-hover:translate-x-1">Open</span>
        </div>
      </div>
    </Link>
  );
}
