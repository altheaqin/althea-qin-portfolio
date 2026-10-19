import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const workspaceDir = "C:/Users/11477/OneDrive/文档/portfolio";
const skillDir = "C:/Users/11477/.codex/plugins/cache/openai-primary-runtime/presentations/26.1015.12040/skills/presentations";
const pythonExecutable = "C:/Users/11477/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe";
const buildDir = path.join(workspaceDir, ".codex-build/404-self-portrait-v1");
const stagingDir = path.join(workspaceDir, ".codex-finalizer/404-self-portrait-v1");
const pptxDir = path.join(workspaceDir, "output/pptx");
const previewDir = path.join(workspaceDir, "output/previews/404-self-portrait-v1");
const finalPptx = path.join(pptxDir, "404-self-portrait-v1.pptx");

const W = 1122.519685;
const H = 793.700787;
const PAPER = "#F3F0E8";
const PAPER_2 = "#ECEAE4";
const INK = "#171715";
const MUTED = "#6C6A64";
const LINE = "#B9B6AE";
const PALE = "#E2E0D9";
const ACCENT = "#557A76";
const ACCENT_LIGHT = "#D9E1DE";
const TITLE_FONT = "Georgia";
const BODY_FONT = "Arial";

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
    typeface: options.fontFamily ?? BODY_FONT,
    fontSize: options.fontSize ?? 18,
    color: options.color ?? INK,
    bold: options.bold ?? false,
    italic: options.italic ?? false,
    alignment: options.alignment ?? "left",
  };
  return shape;
}

function addRule(slide, position, color = INK) {
  return slide.shapes.add({
    geometry: "rect",
    position,
    fill: color,
    line: { style: "solid", fill: "none", width: 0 },
  });
}

function addPlaceholder(slide, label, use, position, options = {}) {
  slide.shapes.add({
    geometry: "rect",
    position,
    fill: options.fill ?? "#E8E6E0",
    line: { style: "solid", fill: options.line ?? LINE, width: options.lineWidth ?? 1 },
  });
  addText(slide, options.kicker ?? "ASSET NEEDED", {
    left: position.left + 14,
    top: position.top + 14,
    width: Math.max(80, position.width - 28),
    height: 16,
  }, { fontSize: options.kickerSize ?? 8.5, bold: true, color: options.accent ?? ACCENT });
  addText(slide, label, {
    left: position.left + 14,
    top: position.top + Math.max(38, position.height * 0.40),
    width: Math.max(80, position.width - 28),
    height: options.labelHeight ?? 34,
  }, { fontFamily: options.labelFont ?? TITLE_FONT, fontSize: options.labelSize ?? 16, color: options.labelColor ?? INK, alignment: options.alignment ?? "left" });
  if (use) {
    addText(slide, use, {
      left: position.left + 14,
      top: position.top + position.height - 38,
      width: Math.max(80, position.width - 28),
      height: 22,
    }, { fontSize: options.useSize ?? 8.8, color: options.useColor ?? MUTED, alignment: options.alignment ?? "left" });
  }
}

function addPageMarker(slide, page, color = MUTED) {
  addText(slide, `PROJECT 01   ${String(page).padStart(2, "0")}/04`, {
    left: 52, top: H - 42, width: 190, height: 18,
  }, { fontSize: 10.5, bold: true, color });
}

function addSectionLabel(slide, letter, label, x, y, width) {
  addText(slide, letter, { left: x, top: y, width: 24, height: 20 }, { fontSize: 10, bold: true, color: ACCENT });
  addText(slide, label, { left: x + 28, top: y, width: width - 28, height: 20 }, { fontSize: 10, bold: true, color: MUTED });
}

async function build() {
  await Promise.all([
    fs.mkdir(buildDir, { recursive: true }),
    fs.mkdir(stagingDir, { recursive: true }),
    fs.mkdir(pptxDir, { recursive: true }),
    fs.mkdir(previewDir, { recursive: true }),
  ]);

  const presentation = Presentation.create({ slideSize: { width: W, height: H } });

  // Page 1 - Project introduction.
  {
    const slide = presentation.slides.add();
    slide.background.fill = PAPER;
    addRule(slide, { left: 0, top: 0, width: 14, height: H }, ACCENT);
    addText(slide, "ILLUSTRATION / MOTION / INTERACTIVE WEB EXPERIMENT", {
      left: 54, top: 48, width: 390, height: 22,
    }, { fontSize: 10.5, bold: true, color: ACCENT });
    addText(slide, "404\nSelf-Portrait", {
      left: 52, top: 102, width: 380, height: 142,
    }, { fontFamily: TITLE_FONT, fontSize: 52, color: INK });
    addRule(slide, { left: 54, top: 270, width: 84, height: 3 }, ACCENT);
    const intro = "404 Self-Portrait uses the artist's own image as an entry point into a broader contemporary condition. It explores how information overload, social platforms, smart devices, and artificial intelligence destabilize our sense of identity, judgment, and human value. Here, '404' does not mean that the self has disappeared, but that within a state of constant connection, it has become increasingly difficult to distinguish our own voice from the information, expectations, and automated systems surrounding us.";
    addText(slide, intro, {
      left: 54, top: 305, width: 360, height: 270,
    }, { fontSize: 16.2, color: INK });
    addText(slide, "INFORMATION OVERLOAD\nALGORITHMIC IDENTITY\nHUMAN VALUE IN THE AGE OF AI", {
      left: 54, top: 606, width: 335, height: 70,
    }, { fontSize: 10.5, bold: true, color: ACCENT });
    addPlaceholder(slide, "Final coloured key visual", "Portrait illustration / high resolution / 4:5", {
      left: 460, top: 54, width: 610, height: 618,
    }, { fill: ACCENT_LIGHT, labelSize: 24, labelHeight: 44 });
    addPageMarker(slide, 1);
  }

  // Page 2 - Visual development.
  {
    const slide = presentation.slides.add();
    slide.background.fill = PAPER_2;
    addText(slide, "Building the Inner System", {
      left: 54, top: 42, width: 520, height: 54,
    }, { fontFamily: TITLE_FONT, fontSize: 34, color: INK });
    addText(slide, "Sketch, symbol, composition, and colour development", {
      left: 56, top: 99, width: 430, height: 22,
    }, { fontSize: 11, bold: true, color: MUTED });

    addSectionLabel(slide, "A", "INITIAL SKETCH", 54, 146, 280);
    addPlaceholder(slide, "01-original-sketch.jpg", "Initial hand-drawn sketch / 4:5", {
      left: 54, top: 174, width: 280, height: 326,
    }, { labelSize: 16 });
    addText(slide, "The open head transforms the mind into a space that can be entered, examined, and occupied. A small headless figure searches within this space, while the '404 NOT FOUND' sign suggests that the system cannot return a stable or complete definition of the self.", {
      left: 54, top: 520, width: 280, height: 142,
    }, { fontSize: 12.8, color: INK });

    addSectionLabel(slide, "B", "SYMBOL EXPLORATION", 370, 146, 698);
    const symbols = [
      ["Plugs / cables", "mismatched interfaces; cables as nerves"],
      ["Signs / windows", "conflicting directions; fragmented feeds"],
      ["Duplicated faces", "partial generation and repeated identity"],
      ["Hand / machine", "handwriting versus generated copies"],
      ["Identity record", "missing names and incomplete fields"],
      ["Body selection", "cursor, scan frame, or selection box"],
    ];
    symbols.forEach(([label, use], i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      addPlaceholder(slide, label, use, {
        left: 370 + col * 226,
        top: 174 + row * 142,
        width: 202,
        height: 122,
      }, { labelSize: 13, labelHeight: 28, useSize: 7.8, kickerSize: 7.8 });
    });

    addSectionLabel(slide, "C", "COMPOSITION AND COLOUR TESTS", 370, 478, 698);
    addPlaceholder(slide, "composition-test-01", "4:3 landscape", {
      left: 370, top: 506, width: 168, height: 118,
    }, { labelSize: 12, kickerSize: 7.5, useSize: 8 });
    addPlaceholder(slide, "composition-test-02", "4:3 landscape", {
      left: 552, top: 506, width: 168, height: 118,
    }, { labelSize: 12, kickerSize: 7.5, useSize: 8 });
    addPlaceholder(slide, "colour-palette", "3:2 landscape", {
      left: 734, top: 506, width: 150, height: 118,
    }, { labelSize: 12, kickerSize: 7.5, useSize: 8 });
    addText(slide, "Warm, muted tones represent memory and embodied experience, while cool greys, blues and desaturated greens refer to technological systems and continuous information flow. Graphite lines and paper texture remain visible beneath the colour.", {
      left: 908, top: 506, width: 160, height: 150,
    }, { fontSize: 11.2, color: INK });
    addPageMarker(slide, 2);
  }

  // Page 3 - Final illustration and detail crops.
  {
    const slide = presentation.slides.add();
    slide.background.fill = PAPER;
    addText(slide, "Anatomy of Overconnection", {
      left: 54, top: 42, width: 540, height: 54,
    }, { fontFamily: TITLE_FONT, fontSize: 34, color: INK });
    addText(slide, "FINAL ILLUSTRATION / WORK IN PROGRESS", {
      left: 56, top: 100, width: 360, height: 20,
    }, { fontSize: 10.5, bold: true, color: ACCENT });
    addPlaceholder(slide, "final-colour-illustration", "03-final-colour-illustration.png / 4:5 portrait", {
      left: 54, top: 146, width: 720, height: 520,
    }, { fill: ACCENT_LIGHT, labelSize: 25, kicker: "WORK IN PROGRESS", labelHeight: 46 });

    const details = [
      ["The Inner Figure", "The remaining internal voice, reduced but not erased.", "detail-inner-figure"],
      ["Unmatched Connections", "Constant connectivity does not guarantee understanding.", "detail-connections"],
      ["Fragmented Feeds", "Contradictory information accumulates faster than it can be processed.", "detail-fragmented-\nfeeds"],
      ["The Reproduced Self", "Repeated identities question what remains uniquely human.", "detail-reproduced-\nself"],
    ];
    details.forEach(([title, copy, asset], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 804 + col * 138;
      const y = 146 + row * 266;
      addPlaceholder(slide, asset, "1:1 crop", {
        left: x, top: y, width: 124, height: 124,
      }, { labelFont: BODY_FONT, labelSize: 8.8, kickerSize: 7, useSize: 7.5 });
      addText(slide, title, { left: x, top: y + 138, width: 124, height: 32 }, {
        fontFamily: TITLE_FONT, fontSize: 13.2, color: INK,
      });
      addText(slide, copy, { left: x, top: y + 176, width: 124, height: 72 }, {
        fontSize: 9.5, color: MUTED,
      });
    });
    addPageMarker(slide, 3);
  }

  // Page 4 - Motion and interaction states.
  {
    const slide = presentation.slides.add();
    slide.background.fill = "#1C1D1B";
    const LIGHT = "#EEEAE1";
    const DIM = "#BDBCB6";
    addText(slide, "From Connection to Overload", {
      left: 52, top: 42, width: 520, height: 54,
    }, { fontFamily: TITLE_FONT, fontSize: 34, color: LIGHT });
    addText(slide, "The viewer's scrolling gradually introduces more information into the portrait. The act of continuing to browse becomes the mechanism that produces information overload.", {
      left: 590, top: 48, width: 478, height: 62,
    }, { fontSize: 13.5, color: LIGHT });

    const states = [
      ["01", "DORMANT", "state-01-dormant", "The figure remains quiet. The inner character walks slowly, the cables are inactive, and the sign displays '404 NOT FOUND'."],
      ["02", "CONNECTED", "state-02-connected", "Scrolling activates the cables and introduces the first fragments of external information."],
      ["03", "OVERLOADED", "state-03-overloaded", "Windows, notifications, repeated faces and contradictory messages accumulate until the inner figure is partially obscured."],
      ["04", "UNRESOLVED", "state-04-unresolved", "The flow suddenly freezes or fades into empty frames. The system becomes quiet, but no definitive answer is returned."],
    ];
    states.forEach(([number, title, asset, copy], i) => {
      const x = 52 + i * 259;
      addText(slide, number, { left: x, top: 140, width: 34, height: 20 }, { fontSize: 10, bold: true, color: "#83A7A1" });
      addText(slide, title, { left: x + 42, top: 140, width: 182, height: 20 }, { fontSize: 10, bold: true, color: DIM });
      addPlaceholder(slide, asset, "16:10 interaction state", {
        left: x, top: 170, width: 232, height: 144,
      }, { fill: "#30322F", line: "#666862", accent: "#83A7A1", labelColor: LIGHT, useColor: DIM, labelFont: BODY_FONT, labelSize: 11, kickerSize: 7.5, useSize: 8 });
      addText(slide, copy, { left: x, top: 330, width: 232, height: 92 }, { fontSize: 10.3, color: LIGHT });
    });

    addPlaceholder(slide, "interaction-demo", "Browser mockup / GIF or MP4 / 16:9", {
      left: 52, top: 458, width: 620, height: 230,
    }, { fill: "#292A28", line: "#666862", accent: "#83A7A1", labelColor: LIGHT, useColor: DIM, labelSize: 20, kicker: "WEB / MOTION DEMO" });
    addText(slide, "INTERACTION", { left: 708, top: 462, width: 170, height: 20 }, { fontSize: 9.5, bold: true, color: "#83A7A1" });
    addText(slide, "Scrolling does not simply reveal content. Each continued movement adds signals, windows, and copies until the portrait can no longer be read as a stable whole.", {
      left: 708, top: 492, width: 218, height: 112,
    }, { fontFamily: TITLE_FONT, fontSize: 14.2, color: LIGHT });
    addText(slide, "TOOLS", { left: 708, top: 624, width: 80, height: 18 }, { fontSize: 9, bold: true, color: "#83A7A1" });
    addText(slide, "Illustration / Image Editing / HTML / CSS / JavaScript", {
      left: 708, top: 648, width: 218, height: 48,
    }, { fontSize: 10.5, color: DIM });
    addPlaceholder(slide, "project-link-qr", "18-project-link-qr.png / 1:1", {
      left: 952, top: 492, width: 116, height: 116,
    }, { fill: "#292A28", line: "#666862", accent: "#83A7A1", labelColor: LIGHT, useColor: DIM, labelFont: BODY_FONT, labelSize: 9.2, kickerSize: 7, useSize: 7.2, alignment: "center" });
    addText(slide, "PROJECT LINK", { left: 952, top: 620, width: 116, height: 18 }, { fontSize: 8.5, bold: true, color: DIM, alignment: "center" });
    addPageMarker(slide, 4, DIM);
  }

  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `404-self-portrait-page-${String(index + 1).padStart(2, "0")}`;
    const png = await presentation.export({ slide, format: "png", scale: 1.5 });
    await writeBlob(path.join(previewDir, `${stem}.png`), png);
  }
  await writeBlob(path.join(previewDir, "404-self-portrait-montage.webp"), await presentation.export({ format: "webp", montage: true }));

  const { finalizePresentation } = await import(pathToFileURL(
    path.join(skillDir, "container_tools/artifact_tool_utils.mjs"),
  ).href);
  const candidatePath = path.join(stagingDir, "candidate.pptx");
  await (await PresentationFile.exportPptx(presentation)).save(candidatePath);
  await finalizePresentation({
    explicitTotalSlideCount: 4,
    requiredNativeTableOwnerSlides: [],
    requiredNativeChartOwnerSlides: [],
    workspaceDir,
    candidatePath,
    finalPath: finalPptx,
    pythonExecutable,
    integrityValidatorPath: path.join(skillDir, "container_tools/inspect_presentation_package_integrity.py"),
    layoutValidatorPath: path.join(skillDir, "container_tools/inspect_presentation_layout_geometry.py"),
    layoutArgs: [
      "--expected-slide-size-emu", "10692000,7560000",
      "--validate-heading-fit",
    ],
    requiredNativeTableOwnerSlides: [],
    fontPolicy: { basis: "design", families: [TITLE_FONT, BODY_FONT] },
    verifyArtifactToolImport: true,
    receiptPath: path.join(stagingDir, "404-self-portrait-v1.pptx.validation.json"),
  });

  console.log(JSON.stringify({ finalPptx, previewDir }, null, 2));
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
