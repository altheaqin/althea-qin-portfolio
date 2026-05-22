import type { CaseStudySectionData } from '../data/projects';

type CaseStudySectionProps = {
  section: CaseStudySectionData;
};

export function CaseStudySection({ section }: CaseStudySectionProps) {
  return (
    <section className="grid gap-4 border-t border-ink/10 py-8 md:grid-cols-[180px_1fr] md:gap-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-ink/45">
          {section.eyebrow}
        </p>
      </div>
      <div>
        <h2 className="font-serif text-2xl text-ink">{section.title}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink/72">
          {section.body}
        </p>
        {section.bullets ? (
          <ul className="mt-4 space-y-2 text-sm text-ink/62">
            {section.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
