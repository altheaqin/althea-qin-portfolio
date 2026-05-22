export function AboutPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="rounded-[2.5rem] border border-ink/10 bg-paper-grid bg-[size:20px_20px] p-8 shadow-panel">
        <p className="text-xs uppercase tracking-[0.35em] text-ink/45">Positioning</p>
        <h1 className="mt-4 font-serif text-4xl text-ink">About this portfolio</h1>
      </section>
      <section className="rounded-[2.5rem] border border-ink/10 bg-white/68 p-8 shadow-panel md:p-10">
        <div className="space-y-5 text-base leading-8 text-ink/72">
          <p>
            This site is being shaped for portfolio-driven master’s applications
            in Hong Kong across creative communication, interactive media, art
            management, learning technology design, multimedia entertainment, and
            adjacent creative technology pathways.
          </p>
          <p>
            It is not intended to read like a traditional fine art portfolio or a
            random gallery. The portfolio should present visual systems thinking:
            how identity, audience, commerce, cultural memory, and interaction are
            translated into applied creative work.
          </p>
          <p>
            Final materials on this site should always come from original work,
            original photography, real process documents, and truthful case study
            evidence. Placeholders exist only until those materials are ready.
          </p>
        </div>
      </section>
    </div>
  );
}
