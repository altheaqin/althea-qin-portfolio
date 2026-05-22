export type ProcessItem = {
  label: string;
  note: string;
};

export type CaseStudySectionData = {
  title: string;
  eyebrow: string;
  body: string;
  bullets?: string[];
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  oneLiner: string;
  summary: string;
  status: string;
  route: string;
  accent: string;
  placeholderLabel: string;
  heroNote: string;
  sections: CaseStudySectionData[];
  process: ProcessItem[];
};

export const projects: Project[] = [
  {
    slug: 'interactive-portfolio-website',
    title: 'Interactive Portfolio Website',
    shortTitle: 'Portfolio Website',
    category: 'Archive Interface / Web',
    oneLiner: 'A visual archive interface that frames the portfolio itself as a case study in identity, navigation, and editorial storytelling.',
    summary: 'This project establishes the website as both container and portfolio object, prioritizing structure, process visibility, and future flexibility over decorative effects.',
    status: 'Day 1 scaffold in progress',
    route: '/projects/interactive-portfolio-website',
    accent: 'from-rust/30 via-transparent to-transparent',
    placeholderLabel: 'Structure placeholder',
    heroNote: 'Replace this panel with your own sitemap, wireframe, or interface screenshot once available.',
    sections: [
      {
        eyebrow: 'Context',
        title: 'A portfolio that also behaves like a project',
        body: 'The site needs to support 2027 Hong Kong master’s applications while proving your ability to turn identity, commerce, cultural memory, and interaction into a coherent visual system.',
      },
      {
        eyebrow: 'Objective',
        title: 'Build an editorial archive instead of a generic template',
        body: 'The current scaffold keeps the logic open enough for project growth, mobile refinement, and future process-heavy pages without locking the final look too early.',
        bullets: ['Image-forward layout', 'Process-friendly sections', 'Clear routing for future case studies'],
      },
      {
        eyebrow: 'Reflection',
        title: 'Day 1 focus',
        body: 'The first milestone is a stable structure: reusable components, pages, docs, and asset folders that make it easy to replace placeholders with your own original materials.',
      },
    ],
    process: [
      { label: 'Sitemap', note: 'Map homepage, project index, detail pages, about, and archive-style 404.' },
      { label: 'Wireframe', note: 'Document layout hierarchy before visual polish.' },
      { label: 'Version Log', note: 'Track structural decisions and future revisions.' },
    ],
  },
  {
    slug: '404-self-live2d-interactive-avatar',
    title: '404 Self Live2D Interactive Avatar',
    shortTitle: '404 Self Live2D',
    category: 'Creative Technology / Identity',
    oneLiner: 'An interactive avatar project translating fragmented identity, glitch language, and original visual motifs into a small but complete Live2D system.',
    summary: 'This case study will eventually connect your original drawings, collage, and interface logic to a rigged character experience.',
    status: 'Placeholder structure ready',
    route: '/projects/404-self-live2d-interactive-avatar',
    accent: 'from-ink/20 via-transparent to-transparent',
    placeholderLabel: 'Avatar placeholder',
    heroNote: 'Replace this with your own concept art, layered PSD preview, or rigging screenshot later.',
    sections: [
      {
        eyebrow: 'Context',
        title: 'Identity under digital pressure',
        body: 'The project centers on 404, fragmentation, Chinese visual elements, pills, skull motifs, overload, and dreamlike interface logic sourced from your own prior work.',
      },
      {
        eyebrow: 'Objective',
        title: 'Turn a visual language into an interactive identity system',
        body: 'The final case study should show how static motifs become layered assets, expression states, and interaction behaviors through a documented rigging process.',
      },
      {
        eyebrow: 'Reflection',
        title: 'Process matters as much as the final demo',
        body: 'This project will be strongest when sketches, redesigns, layer separation, and test states are visible beside the final animation.',
      },
    ],
    process: [
      { label: 'Original Sketches', note: 'Place hand drawings and collage references here.' },
      { label: 'Layer Breakdown', note: 'Show separation for eyes, hair, accessories, and expressions.' },
      { label: 'Rigging States', note: 'Capture screenshots of motion, toggles, and emotional states.' },
    ],
  },
  {
    slug: 'ai-assisted-ecommerce-brand-system',
    title: 'AI-assisted E-commerce Brand System',
    shortTitle: 'E-commerce Brand System',
    category: 'Commerce / Brand / AI Workflow',
    oneLiner: 'A real applied brand case study connecting market research, packaging, AI-assisted workflow, and platform content into one commercial visual system.',
    summary: 'This case study will show AI as a structured workflow tool that supports research, ideation, and execution without replacing design judgment.',
    status: 'Placeholder structure ready',
    route: '/projects/ai-assisted-ecommerce-brand-system',
    accent: 'from-moss/30 via-transparent to-transparent',
    placeholderLabel: 'Brand placeholder',
    heroNote: 'Replace this with your own packaging mockups, content screens, or research boards.',
    sections: [
      {
        eyebrow: 'Context',
        title: 'Commerce is part of the design system',
        body: 'The project should connect category research, SKU logic, packaging, AI-assisted brainstorming, platform content, and brand decision-making into a readable narrative.',
      },
      {
        eyebrow: 'Objective',
        title: 'Prove strategy and execution together',
        body: 'The case study structure is prepared for a research-to-design arc rather than a simple gallery of isolated visuals.',
      },
      {
        eyebrow: 'Reflection',
        title: 'Keep the project real',
        body: 'Only original materials, real workflow evidence, and truthful outcomes should replace the placeholders in this case study.',
      },
    ],
    process: [
      { label: 'Research Snapshot', note: 'Category scans, competitor screenshots, or SKU notes.' },
      { label: 'Design Decisions', note: 'Logo routes, packaging iterations, and visual rationale.' },
      { label: 'Content Funnel', note: 'Xiaohongshu, Amazon, or platform flow diagrams.' },
    ],
  },
  {
    slug: 'portrait-persona-system',
    title: 'Portrait Persona System',
    shortTitle: 'Portrait Persona',
    category: 'Photography / Identity',
    oneLiner: 'A photography-led identity system showing how lighting, styling, editing, and context construct distinct visual personas.',
    summary: 'The case study is designed to present portraits as intentional identity design rather than as a loose image gallery.',
    status: 'Placeholder structure ready',
    route: '/projects/portrait-persona-system',
    accent: 'from-sand/40 via-transparent to-transparent',
    placeholderLabel: 'Portrait placeholder',
    heroNote: 'Replace this with your own contact sheets, retouch comparisons, or final portrait selections.',
    sections: [
      {
        eyebrow: 'Context',
        title: 'Photography as persona construction',
        body: 'The project will compare different persona directions such as minimal attitude, youth social energy, and cultural festive presentation using original portrait work.',
      },
      {
        eyebrow: 'Objective',
        title: 'Show systems, not just aesthetics',
        body: 'By pairing finals with contact sheets, lighting notes, and a persona matrix, the page can demonstrate audience thinking and platform awareness.',
      },
      {
        eyebrow: 'Reflection',
        title: 'Curation is part of the story',
        body: 'Selection logic matters here, so the page structure keeps room for process documents, before-after edits, and reasoning behind the final sequence.',
      },
    ],
    process: [
      { label: 'Contact Sheets', note: 'Place broad selections before narrowing the final set.' },
      { label: 'Persona Matrix', note: 'Map styling, mood, platform, and audience intent.' },
      { label: 'Retouch Notes', note: 'Show before/after edits and visual decision points.' },
    ],
  },
];
