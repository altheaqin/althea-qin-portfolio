import type { ProcessItem } from '../data/projects';

type ProcessStripProps = {
  items: ProcessItem[];
};

export function ProcessStrip({ items }: ProcessStripProps) {
  return (
    <section className="rounded-[2rem] border border-ink/10 bg-white/65 p-6 shadow-panel">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink/45">
            Process Strip
          </p>
          <h2 className="mt-2 font-serif text-2xl text-ink">
            Reserved for your original process materials
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-ink/62">
          Use this zone for sketches, wireframes, screenshots, prompt captures,
          before-after comparisons, and workflow evidence once your assets are ready.
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.label}
            className="rounded-[1.5rem] border border-dashed border-ink/15 bg-fog/65 p-5"
          >
            <div className="flex h-28 items-center justify-center rounded-[1rem] border border-ink/8 bg-paper-grid bg-[size:18px_18px] text-center text-xs uppercase tracking-[0.28em] text-ink/35">
              Placeholder
            </div>
            <h3 className="mt-4 text-sm uppercase tracking-[0.22em] text-ink/55">
              {item.label}
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink/68">{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
