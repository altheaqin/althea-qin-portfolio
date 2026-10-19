import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const workspaceDir = "D:/work/vibe_coding/portfolio";
const runtimeNodeModules = "C:/Users/1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";
process.env.RUNTIME_NODE_MODULES = runtimeNodeModules;
const skillDir = "C:/Users/1/.codex/plugins/cache/openai-primary-runtime/presentations/26.1013.11914/skills/presentations";
const pythonExecutable = "C:/Users/1/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe";
const buildDir = path.join(workspaceDir, ".codex-build/quarvura-brand-identity-v4");
const stagingDir = path.join(workspaceDir, ".codex-finalizer/quarvura-brand-identity-v4");
const pptxDir = path.join(workspaceDir, "output/pptx");
const pdfDir = path.join(workspaceDir, "output/pdf");
const previewDir = path.join(workspaceDir, "output/previews/quarvura-brand-identity-v4");
const finalPptx = path.join(pptxDir, "quarvura-brand-identity-packaging-system-v4.pptx");
const finalPdf = path.join(pdfDir, "quarvura-brand-identity-packaging-system-v4.pdf");

const { Presentation, PresentationFile } = await import(pathToFileURL(
  path.join(runtimeNodeModules, "@oai/artifact-tool/dist/artifact_tool.mjs"),
).href);
console.log("artifact-tool-imported");

const W = 1122.519685;
const H = 793.700787;
const C = {
  paper: "#F0EFEB",
  paper2: "#E8E7E1",
  ink: "#1C1C1A",
  muted: "#6A6963",
  soft: "#8F8E88",
  faint: "#C6C5BF",
  grid: "#DEDDD6",
  seriesA: "#1C1C1A",
  seriesB: "#6A6963",
  seriesC: "#8F8E88",
};
const TITLE = "Georgia";
const BODY = "Arial";

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

function addText(slide, text, position, options = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    position,
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  shape.text = text;
  shape.text.style = {
    typeface: options.fontFamily ?? BODY,
    fontSize: options.fontSize ?? 17,
    color: options.color ?? C.ink,
    bold: options.bold ?? false,
    italic: options.italic ?? false,
    alignment: options.alignment ?? "left",
  };
  return shape;
}

function rect(slide, position, fill, line = "none", lineWidth = 0) {
  return slide.shapes.add({
    geometry: "rect",
    position,
    fill,
    line: { style: "solid", fill: line, width: lineWidth },
  });
}

function rule(slide, x, y, width, color = C.ink, height = 1) {
  rect(slide, { left: x, top: y, width, height }, color);
}

function addPlaceholder(slide, title, guidance, position, options = {}) {
  rect(slide, position, options.fill ?? C.paper2, C.faint, 1);
  addText(slide, "ORIGINAL ASSET NEEDED", {
    left: position.left + 18,
    top: position.top + 16,
    width: position.width - 36,
    height: 22,
  }, { fontSize: 11, bold: true, color: C.muted });
  addText(slide, title, {
    left: position.left + 22,
    top: position.top + position.height * 0.39,
    width: position.width - 44,
    height: options.titleHeight ?? 54,
  }, { fontFamily: TITLE, fontSize: options.titleSize ?? 22, color: C.ink, alignment: "center" });
  if (guidance) {
    addText(slide, guidance, {
      left: position.left + 24,
      top: position.top + position.height - 48,
      width: position.width - 48,
      height: 30,
    }, { fontSize: 12, color: C.muted, alignment: "center" });
  }
}

function addPageMarker(slide, n) {
  rule(slide, 54, H - 52, W - 108, C.grid, 1);
  addText(slide, "QUARVURA  /  BRAND IDENTITY & PACKAGING SYSTEM", {
    left: 54, top: H - 39, width: 590, height: 19,
  }, { fontSize: 10, bold: true, color: C.muted });
  addText(slide, `${String(n).padStart(2, "0")}  /  04`, {
    left: W - 150, top: H - 39, width: 96, height: 19,
  }, { fontSize: 10, bold: true, color: C.muted, alignment: "right" });
}

function addEyebrow(slide, label, page = 0) {
  addText(slide, label.toUpperCase(), {
    left: 54, top: 38, width: 700, height: 22,
  }, { fontSize: 11, bold: true, color: C.muted });
  if (page === 1) rule(slide, 54, 69, 56, C.ink, 2);
}

function conceptBlock(slide, y, tag, title, detail, assessment) {
  addText(slide, tag, { left: 54, top: y, width: 36, height: 22 }, { fontSize: 12, bold: true, color: C.muted });
  addText(slide, title, { left: 94, top: y - 1, width: 330, height: 27 }, { fontFamily: TITLE, fontSize: 20 });
  addText(slide, detail, { left: 94, top: y + 31, width: 350, height: 52 }, { fontSize: 14, color: C.muted });
  addText(slide, assessment, { left: 94, top: y + 89, width: 350, height: 34 }, { fontSize: 13, color: C.ink });
  rule(slide, 94, y + 134, 350, C.grid, 1);
}

function addProjectOverview(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addEyebrow(slide, "Brand Identity / Packaging System Design", 1);
  addText(slide, "QUARVURA", { left: 54, top: 102, width: 450, height: 82 }, {
    fontFamily: TITLE, fontSize: 58, color: C.ink,
  });
  addText(slide, "Brand Identity &\nPackaging System", {
    left: 54, top: 198, width: 425, height: 108,
  }, { fontFamily: TITLE, fontSize: 34, color: C.ink });
  rule(slide, 54, 330, 58, C.ink, 2);
  addText(slide, "Building a cohesive, gift-worthy packaging experience under real-world constraints.", {
    left: 54, top: 356, width: 400, height: 80,
  }, { fontSize: 20, color: C.muted });
  addText(slide, "A natural crystal collection for the U.S. Amazon marketplace. I led naming and visual identity development, material research, packaging design, supplier coordination, and production refinement.", {
    left: 54, top: 456, width: 400, height: 108,
  }, { fontSize: 15, color: C.ink });
  addText(slide, "NAMING / IDENTITY", { left: 54, top: 570, width: 105, height: 30 }, { fontSize: 10, bold: true, color: C.muted });
  addText(slide, "~60-100 names; preliminary trademark screening. Q mark refined through 11 iterations for print, foil, and embossing.", {
    left: 164, top: 569, width: 310, height: 42,
  }, { fontSize: 11, color: C.ink });

  const facts = [
    ["ROLE", "Independent project lead / Brand & packaging designer"],
    ["MARKET", "United States / Amazon"],
    ["COST TARGET", "≤ RMB 10 per set"],
  ];
  facts.forEach(([label, value], i) => {
    const y = 616 + i * 38;
    addText(slide, label, { left: 54, top: y, width: 105, height: 18 }, { fontSize: 10, bold: true, color: C.muted });
    addText(slide, value, { left: 164, top: y - 1, width: 310, height: 38 }, { fontSize: 12, color: C.ink });
  });
  addPlaceholder(slide, "Complete packaging set", "Original product + packaging photograph / landscape", {
    left: 505, top: 58, width: 563, height: 616,
  }, { titleSize: 24 });
  addPageMarker(slide, 1);
}

function addComparison(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addEyebrow(slide, "02 / Research & Design Decisions");
  addText(slide, "Three routes, five criteria", {
    left: 54, top: 78, width: 600, height: 52,
  }, { fontFamily: TITLE, fontSize: 34 });
  addText(slide, "Packaging directions were compared against protection, perceived quality, cost efficiency, production feasibility, and unboxing experience.", {
    left: 54, top: 137, width: 460, height: 60,
  }, { fontSize: 15, color: C.muted });

  conceptBlock(slide, 229, "A", "Essential", "Pouch, protective wrap, kraft box, and basic printed inserts.", "Low-cost and easy to source; less distinctive as a gift.");
  conceptBlock(slide, 383, "B", "Premium Gift", "Rigid drawer box, branded pouch, tissue, and foil details.", "High presentation value; more cost, volume, and production complexity.");
  conceptBlock(slide, 537, "C", "Natural Ritual", "Product-specific pouches, coconut bowl, honeycomb wrap, and raffia.", "Selected for a more coherent, layered unboxing experience.");

  addText(slide, "QUALITATIVE CONCEPT COMPARISON", {
    left: 548, top: 190, width: 520, height: 20,
  }, { fontSize: 11, bold: true, color: C.muted });
  slide.charts.add("radar", {
    position: { left: 538, top: 214, width: 545, height: 390 },
    categories: ["Product protection", "Quality & visual cohesion", "Cost efficiency", "Production feasibility", "Unboxing experience"],
    series: [
      { name: "A  Essential", values: [3, 2, 5, 5, 2], line: { style: "solid", fill: C.seriesA, width: 2 }, marker: { symbol: "circle", size: 5, fill: C.seriesA } },
      { name: "B  Premium Gift", values: [4, 5, 2, 3, 4], line: { style: "solid", fill: C.seriesB, width: 2 }, marker: { symbol: "circle", size: 5, fill: C.seriesB } },
      { name: "C  Natural Ritual", values: [4, 5, 3, 3, 5], line: { style: "solid", fill: C.seriesC, width: 2 }, marker: { symbol: "circle", size: 5, fill: C.seriesC } },
    ],
    radarOptions: { style: "standard", varyColors: false },
    hasLegend: true,
    legend: { position: "bottom", overlay: false, textStyle: { fill: C.muted, fontSize: 12 } },
    xAxis: { textStyle: { fill: C.muted, fontSize: 12 } },
    yAxis: { min: 0, max: 5, majorUnit: 1, textStyle: { fill: C.soft, fontSize: 10 }, majorGridlines: { style: "solid", fill: C.grid, width: 1 } },
    chartFill: C.paper,
    chartLine: { style: "solid", fill: C.paper, width: 0 },
    plotAreaFill: C.paper,
    plotAreaLine: { style: "solid", fill: C.paper, width: 0 },
  });
  addText(slide, "1 = low / 5 = high. Scores are comparative design judgments, not test results. Cost rankings require final supplier quotations.", {
    left: 555, top: 615, width: 510, height: 42,
  }, { fontSize: 11, color: C.muted });
  addPageMarker(slide, 2);
}

function addPackagingSystem(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addEyebrow(slide, "03 / Final Packaging System");
  addText(slide, "A layered packaging experience", {
    left: 54, top: 78, width: 700, height: 52,
  }, { fontFamily: TITLE, fontSize: 34 });
  addText(slide, "Each component has a clear role in protection, organization, and presentation.", {
    left: 54, top: 137, width: 670, height: 32,
  }, { fontSize: 15, color: C.muted });

  addPlaceholder(slide, "Open package / overhead view", "Original photograph showing all layers in order", {
    left: 54, top: 197, width: 555, height: 450,
  }, { titleSize: 21 });

  const layers = [
    ["01  TOP LAYER", "Brand card", "Brand communication"],
    ["02  PROTECTIVE LAYER", "Honeycomb paper", "Cushioning and surface protection"],
    ["03  PRODUCT ARRANGEMENT", "Coconut bowl / snap pouch / mesh pouch", "Display, bracelet protection, crystal storage"],
    ["04  BOTTOM + OUTER STRUCTURE", "Raffia filling / corrugated mailer", "Cushioning, texture, and containment"],
  ];
  layers.forEach(([tag, title, detail], i) => {
    const y = 201 + i * 107;
    addText(slide, tag, { left: 650, top: y, width: 414, height: 18 }, { fontSize: 10, bold: true, color: C.muted });
    addText(slide, title, { left: 650, top: y + 25, width: 414, height: 34 }, { fontFamily: TITLE, fontSize: 20 });
    addText(slide, detail, { left: 650, top: y + 62, width: 414, height: 32 }, { fontSize: 13, color: C.muted });
    if (i < layers.length - 1) rule(slide, 650, y + 96, 414, C.grid, 1);
  });
  addText(slide, "OTHER PRODUCT VARIATIONS", { left: 650, top: 641, width: 414, height: 18 }, { fontSize: 10, bold: true, color: C.muted });
  addText(slide, "Raw crystal set: individually protected stones + canvas pouch\nTumbled crystal set: individually protected stones + microfiber pouch", {
    left: 650, top: 663, width: 414, height: 45,
  }, { fontSize: 11, color: C.ink });
  addPageMarker(slide, 3);
}

function addProductionReflection(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addEyebrow(slide, "04 / Production & Reflection");
  addText(slide, "Designed for production", {
    left: 54, top: 78, width: 620, height: 52,
  }, { fontFamily: TITLE, fontSize: 34 });
  addText(slide, "Supplier feedback and material behavior informed the final refinements.", {
    left: 54, top: 137, width: 600, height: 32,
  }, { fontSize: 15, color: C.muted });

  addPlaceholder(slide, "Early card design", "Original design iteration / before", {
    left: 54, top: 197, width: 280, height: 228,
  }, { titleSize: 17 });
  addPlaceholder(slide, "Refined card design", "Original production-ready iteration / after", {
    left: 354, top: 197, width: 280, height: 228,
  }, { titleSize: 17 });
  addPlaceholder(slide, "Physical package in use", "Original production photograph / packaging detail", {
    left: 54, top: 447, width: 580, height: 217,
  }, { titleSize: 20 });

  addText(slide, "PRODUCTION REFINEMENT", { left: 685, top: 199, width: 382, height: 20 }, { fontSize: 11, bold: true, color: C.muted });
  addText(slide, "Decorative card borders proved difficult to reproduce consistently in small batches. After supplier feedback, I simplified the layout and removed a border where trimming variation could be visible.", {
    left: 685, top: 230, width: 382, height: 112,
  }, { fontSize: 15, color: C.ink });
  rule(slide, 685, 359, 382, C.grid, 1);
  addText(slide, "AI-ASSISTED EXPLORATION", { left: 685, top: 380, width: 382, height: 20 }, { fontSize: 11, bold: true, color: C.muted });
  addText(slide, "AI-assisted concept generation helped explore the seven-chakra card, but often introduced incorrect symbol counts, color sequences, or duplicated text. I refined the constraints and corrected the final design manually in Photoshop.", {
    left: 685, top: 411, width: 382, height: 116,
  }, { fontSize: 15, color: C.ink });
  rule(slide, 685, 545, 382, C.grid, 1);
  addText(slide, "REFLECTION", { left: 685, top: 567, width: 382, height: 20 }, { fontSize: 11, bold: true, color: C.muted });
  addText(slide, "I moved from individual graphics to a system shaped by material behavior, cost limits, and production tolerances.", {
    left: 685, top: 598, width: 382, height: 62,
  }, { fontFamily: TITLE, fontSize: 18, color: C.ink });
  addText(slide, "NEXT: verify final unit cost and run standardized transit testing.", {
    left: 685, top: 674, width: 382, height: 25,
  }, { fontSize: 11, bold: true, color: C.muted });
  addPageMarker(slide, 4);
}

async function build() {
  console.log("build-started");
  await Promise.all([
    fs.mkdir(buildDir, { recursive: true }),
    fs.mkdir(stagingDir, { recursive: true }),
    fs.mkdir(pptxDir, { recursive: true }),
    fs.mkdir(pdfDir, { recursive: true }),
  ]);

  const presentation = Presentation.create({ slideSize: { width: W, height: H } });
  console.log("presentation-created");
  addProjectOverview(presentation);
  addComparison(presentation);
  addPackagingSystem(presentation);
  addProductionReflection(presentation);
  console.log("slides-created");

  const { finalizePresentation } = await import(pathToFileURL(
    path.join(skillDir, "container_tools/artifact_tool_utils.mjs"),
  ).href);
  const candidatePath = path.join(stagingDir, "candidate.pptx");
  await (await PresentationFile.exportPptx(presentation)).save(candidatePath);
  await finalizePresentation({
    explicitTotalSlideCount: 4,
    requiredNativeTableOwnerSlides: [],
    requiredNativeChartOwnerSlides: [2],
    materializeLiteralChartWorkbooks: true,
    nativeChartTargetApplication: "powerpoint",
    workspaceDir,
    candidatePath,
    finalPath: finalPptx,
    pythonExecutable,
    integrityValidatorPath: path.join(skillDir, "container_tools/inspect_presentation_package_integrity.py"),
    layoutValidatorPath: path.join(skillDir, "container_tools/inspect_presentation_layout_geometry.py"),
    layoutArgs: ["--expected-slide-size-emu", "10692000,7560000", "--validate-heading-fit"],
    fontPolicy: { basis: "design", families: [TITLE, BODY, "Aptos"] },
    verifyArtifactToolImport: true,
    receiptPath: path.join(stagingDir, "quarvura-brand-identity-v4.validation.json"),
  });
  await fs.mkdir(previewDir, { recursive: true });
  console.log(JSON.stringify({ finalPptx, finalPdf, previewDir }, null, 2));
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
