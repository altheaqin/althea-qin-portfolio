import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const workspaceDir = "C:/Users/11477/OneDrive/文档/portfolio";
const skillDir = "C:/Users/11477/.codex/plugins/cache/openai-primary-runtime/presentations/26.1015.12040/skills/presentations";
const pythonExecutable = "C:/Users/11477/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe";
const assetDir = path.join(workspaceDir, "assets/photography/the-space-to-be/originals");
const buildDir = path.join(workspaceDir, ".codex-build/the-space-to-be-v1");
const stagingDir = path.join(workspaceDir, ".codex-finalizer/the-space-to-be-v1");
const pptxDir = path.join(workspaceDir, "output/pptx");
const pdfDir = path.join(workspaceDir, "output/pdf");
const previewDir = path.join(workspaceDir, "output/previews/the-space-to-be-v1");
const finalPptx = path.join(pptxDir, "the-space-to-be-v1.pptx");
const finalPdf = path.join(pdfDir, "the-space-to-be-v1.pdf");

const W = 1122.519685;
const H = 793.700787;
const PAPER = "#F3F0E8";
const INK = "#171715";
const MUTED = "#6C6A64";
const BLUE = "#127A9A";
const RED = "#8D211E";
const WHITE = "#FFFFFF";
const TITLE_FONT = "Georgia";
const BODY_FONT = "Arial";

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

async function imageBytes(name) {
  const bytes = await fs.readFile(path.join(assetDir, name));
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
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

function addRule(slide, position, color = INK, width = 1) {
  return slide.shapes.add({
    geometry: "rect",
    position,
    fill: color,
    line: { style: "solid", fill: "none", width: 0 },
  });
}

async function addPhoto(slide, name, position, alt, fit = "cover") {
  return slide.images.add({
    blob: await imageBytes(name),
    contentType: "image/jpeg",
    alt,
    fit,
    position,
    geometry: "rect",
  });
}

function addProjectMarker(slide, index, color = MUTED) {
  addText(slide, `PROJECT 03   ${String(index).padStart(2, "0")}/03`, {
    left: 52,
    top: H - 42,
    width: 190,
    height: 18,
  }, { fontSize: 10.5, bold: true, color });
}

async function build() {
  await Promise.all([
    fs.mkdir(buildDir, { recursive: true }),
    fs.mkdir(stagingDir, { recursive: true }),
    fs.mkdir(pptxDir, { recursive: true }),
    fs.mkdir(pdfDir, { recursive: true }),
    fs.mkdir(previewDir, { recursive: true }),
  ]);

  const presentation = Presentation.create({ slideSize: { width: W, height: H } });

  // Page 1: project premise and environmental portrait.
  {
    const slide = presentation.slides.add();
    slide.background.fill = PAPER;
    addRule(slide, { left: 0, top: 0, width: 14, height: H }, BLUE);
    addText(slide, "PORTRAIT PHOTOGRAPHY / CREATIVE DIRECTION", {
      left: 54, top: 48, width: 326, height: 22,
    }, { fontSize: 11, bold: true, color: BLUE });
    addText(slide, "The Space\nto Be", {
      left: 52, top: 102, width: 345, height: 150,
    }, { fontFamily: TITLE_FONT, fontSize: 55, color: INK });
    addRule(slide, { left: 54, top: 278, width: 84, height: 3 }, BLUE);
    const body = "Portrait photography often begins with a simple wish: to see a beautiful version of oneself. Yet the camera can turn self-expression into self-judgment.\n\nI begin with conversation. Before each shoot, I listen to how each subject wants to be seen, then translate those expectations into styling, setting, and visual direction. During the session, I use imagination and gentle guidance rather than fixed poses.\n\nBy building trust around the image-making process, I aim to create portraits that hold both individuality and aspiration.";
    addText(slide, body, {
      left: 54, top: 311, width: 338, height: 352,
    }, { fontSize: 17.2, color: INK });
    await addPhoto(slide, "DSC05689-恢复的.jpg", {
      left: 430, top: 54, width: 640, height: 604,
    }, "A subject in a blue dress sits in sunlight beside a blue shutter, surrounded by tree shadows.");
    addText(slide, "A portrait begins before the camera is raised.", {
      left: 666, top: 680, width: 404, height: 30,
    }, { fontFamily: TITLE_FONT, fontSize: 17, italic: true, color: MUTED, alignment: "right" });
    addProjectMarker(slide, 1);
  }

  // Page 2: fashion portrait as a translation from wish to expression.
  {
    const slide = presentation.slides.add();
    slide.background.fill = "#ECEBE7";
    addText(slide, "From Conversation to Character", {
      left: 54, top: 48, width: 520, height: 54,
    }, { fontFamily: TITLE_FONT, fontSize: 35, color: INK });
    addText(slide, "A fashion-inspired portrait session", {
      left: 56, top: 105, width: 350, height: 22,
    }, { fontSize: 12, bold: true, color: MUTED });
    await addPhoto(slide, "DSC09905.jpg", {
      left: 54, top: 150, width: 378, height: 506,
    }, "Black-and-white fashion portrait with the subject holding white sunglasses near her face.");
    await addPhoto(slide, "DSC09910.jpg", {
      left: 458, top: 86, width: 286, height: 382,
    }, "Black-and-white fashion portrait with the subject smiling in white sunglasses.");
    const body = "The subject wanted portraits that felt like a magazine editorial. I translated that aspiration into a visual direction and invited her to imagine herself as a professional model. Rather than prescribe every gesture, I guided the role and let her explore expressions and poses with greater confidence.";
    addText(slide, body, {
      left: 782, top: 112, width: 286, height: 208,
    }, { fontSize: 17, color: INK });
    addRule(slide, { left: 782, top: 346, width: 286, height: 1 }, "#A8A6A0");

    const stages = [
      ["01", "SUBJECT'S WISH", "Fashion magazine-inspired portraits"],
      ["02", "CREATIVE DIRECTION", "Editorial styling and role-based imagination"],
      ["03", "PHOTOGRAPHIC EXPRESSION", "Gestures and expressions discovered through character"],
    ];
    stages.forEach(([number, label, copy], i) => {
      const y = 370 + i * 104;
      addText(slide, number, { left: 782, top: y, width: 34, height: 20 }, { fontSize: 11, bold: true, color: BLUE });
      addText(slide, label, { left: 826, top: y, width: 244, height: 20 }, { fontSize: 10.5, bold: true, color: MUTED });
      addText(slide, copy, { left: 826, top: y + 24, width: 244, height: 50 }, { fontFamily: TITLE_FONT, fontSize: 15.5, color: INK });
    });
    addProjectMarker(slide, 2);
  }

  // Page 3: a shared imagined world shaped through costume, objects, light, and space.
  {
    const slide = presentation.slides.add();
    slide.background.fill = "#181512";
    addText(slide, "Building a Story Together", {
      left: 52, top: 52, width: 306, height: 94,
    }, { fontFamily: TITLE_FONT, fontSize: 36, color: WHITE });
    addRule(slide, { left: 54, top: 174, width: 72, height: 3 }, RED);
    const body = "For the traditional costume portraits, I began by discussing each subject's preferences and expectations. Those conversations informed the costumes, props, and setting. During the shoot, I invited the subjects to inhabit a world inspired by the past, allowing gesture and expression to emerge through the imagined role.";
    addText(slide, body, {
      left: 54, top: 204, width: 288, height: 252,
    }, { fontSize: 17, color: "#EEEAE1" });
    addText(slide, "COLLABORATIVE VISUAL DIRECTION", {
      left: 54, top: 494, width: 286, height: 22,
    }, { fontSize: 10.5, bold: true, color: "#C98A79" });
    addText(slide, "Costume, props, light, and spatial composition establish the atmosphere. The subject interprets the imagined role through her own gestures and expressions.", {
      left: 54, top: 526, width: 286, height: 112,
    }, { fontFamily: TITLE_FONT, fontSize: 15.5, italic: true, color: "#D8D1C4" });
    await addPhoto(slide, "DSC04387.jpg", {
      left: 382, top: 48, width: 326, height: 650,
    }, "Traditional costume portrait framed by green leaves, red fabric, pearls, flowers, and soft haze.");
    await addPhoto(slide, "DSC03536.jpg", {
      left: 738, top: 112, width: 332, height: 596,
    }, "Traditional costume portrait in red and gold with theatrical lighting and staged objects.");
    addProjectMarker(slide, 3, "#BFB8AA");
  }

  // Draft previews and PDF.
  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `the-space-to-be-page-${String(index + 1).padStart(2, "0")}`;
    const png = await presentation.export({ slide, format: "png", scale: 1.5 });
    await writeBlob(path.join(previewDir, `${stem}.png`), png);
  }
  await writeBlob(path.join(previewDir, "the-space-to-be-montage.webp"), await presentation.export({ format: "webp", montage: true }));
  const { finalizePresentation } = await import(pathToFileURL(
    path.join(skillDir, "container_tools/artifact_tool_utils.mjs"),
  ).href);
  const candidatePath = path.join(stagingDir, "candidate.pptx");
  await (await PresentationFile.exportPptx(presentation)).save(candidatePath);
  await finalizePresentation({
    explicitTotalSlideCount: 3,
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
    receiptPath: path.join(stagingDir, "the-space-to-be-v1.pptx.validation.json"),
  });

  console.log(JSON.stringify({ finalPptx, previewDir }, null, 2));
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
