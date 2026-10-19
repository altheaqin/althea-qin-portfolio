from pathlib import Path
from math import cos, pi, sin
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
import textwrap


ROOT = Path(r"D:\work\vibe_coding\portfolio")
OUTPUT = ROOT / "output" / "pdf" / "quarvura-brand-identity-packaging-system-v4.pdf"
PREVIEW = ROOT / "output" / "previews" / "quarvura-brand-identity-v4"
W, H = 1122.519685, 793.700787
S = 0.75
PW, PH = W * S, H * S

PAPER = HexColor("#F0EFEB")
PAPER2 = HexColor("#E8E7E1")
INK = HexColor("#1C1C1A")
MUTED = HexColor("#6A6963")
SOFT = HexColor("#8F8E88")
FAINT = HexColor("#C6C5BF")
GRID = HexColor("#DEDDD6")
SERIES = [INK, MUTED, SOFT]

fonts = {
    "Georgia": r"C:\Windows\Fonts\georgia.ttf",
    "Arial": r"C:\Windows\Fonts\arial.ttf",
    "Arial-Bold": r"C:\Windows\Fonts\arialbd.ttf",
}
for name, filename in fonts.items():
    if Path(filename).exists():
        pdfmetrics.registerFont(TTFont(name, filename))


def xy(x, top):
    return x * S, PH - top * S


def rect(c, x, top, width, height, fill=None, stroke=None, line_width=1):
    c.saveState()
    c.setLineWidth(line_width * S)
    c.setFillColor(fill or PAPER)
    c.setStrokeColor(stroke or fill or PAPER)
    x0, y0 = x * S, PH - (top + height) * S
    c.rect(x0, y0, width * S, height * S, fill=int(fill is not None), stroke=int(stroke is not None))
    c.restoreState()


def rule(c, x, top, width, color=INK, height=1):
    rect(c, x, top, width, height, color)


def wrap_lines(text, font, size, max_width):
    lines = []
    for paragraph in text.split("\n"):
        if not paragraph:
            lines.append("")
            continue
        current = ""
        for word in paragraph.split():
            candidate = f"{current} {word}".strip()
            if pdfmetrics.stringWidth(candidate, font, size * S) <= max_width * S:
                current = candidate
            elif current:
                lines.append(current)
                current = word
            else:
                lines.append(word)
                current = ""
        if current:
            lines.append(current)
    return lines


def text(c, value, x, top, width, height, size=17, color=INK, font="Arial", align="left", leading=None):
    leading = leading or size * 1.28
    c.saveState()
    c.setFillColor(color)
    c.setFont(font, size * S)
    cursor_top = top + size * 0.92
    for line in wrap_lines(value, font, size, width):
        if cursor_top > top + height:
            raise ValueError(f"Text overflows box at x={x}, top={top}: {value[:50]!r}")
        px, py = xy(x, cursor_top)
        if align == "center":
            c.drawCentredString(px + width * S / 2, py, line)
        elif align == "right":
            c.drawRightString(px + width * S, py, line)
        else:
            c.drawString(px, py, line)
        cursor_top += leading
    c.restoreState()


def placeholder(c, title, guidance, x, top, width, height, title_size=22):
    rect(c, x, top, width, height, PAPER2, FAINT, 1)
    text(c, "ORIGINAL ASSET NEEDED", x + 18, top + 16, width - 36, 22, 11, MUTED, "Arial-Bold")
    text(c, title, x + 22, top + height * 0.39, width - 44, 68, title_size, INK, "Georgia", "center", title_size * 1.18)
    if guidance:
        text(c, guidance, x + 24, top + height - 44, width - 48, 30, 12, MUTED, "Arial", "center", 14)


def page_start(c, eyebrow, number, title=None, subtitle=None):
    c.setFillColor(PAPER)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    text(c, eyebrow.upper(), 54, 38, 700, 22, 11, MUTED, "Arial-Bold")
    if number == 1:
        rule(c, 54, 69, 56, INK, 2)
    if title:
        text(c, title, 54, 78, 760, 54, 34, INK, "Georgia", leading=40)
    if subtitle:
        text(c, subtitle, 54, 137, 720, 60, 15, MUTED, "Arial", leading=19)


def page_end(c, number):
    rule(c, 54, H - 52, W - 108, GRID, 1)
    text(c, "QUARVURA  /  BRAND IDENTITY & PACKAGING SYSTEM", 54, H - 39, 590, 19, 10, MUTED, "Arial-Bold")
    text(c, f"{number:02d}  /  04", W - 150, H - 39, 96, 19, 10, MUTED, "Arial-Bold", "right")
    c.showPage()


def concept(c, top, tag, title, detail, assessment):
    text(c, tag, 54, top, 36, 22, 12, MUTED, "Arial-Bold")
    text(c, title, 94, top - 1, 330, 27, 20, INK, "Georgia")
    text(c, detail, 94, top + 31, 350, 52, 14, MUTED, "Arial", leading=17)
    text(c, assessment, 94, top + 89, 350, 34, 13, INK, "Arial", leading=16)
    rule(c, 94, top + 134, 350, GRID, 1)


def radar(c):
    cx, cy, r = 810, 398, 135
    angles = [-pi / 2 + i * 2 * pi / 5 for i in range(5)]
    c.saveState()
    c.setStrokeColor(GRID)
    c.setLineWidth(0.8)
    for level in range(1, 6):
        rr = r * level / 5
        points = [(cx + rr * cos(a), cy + rr * sin(a)) for a in angles]
        p = c.beginPath()
        p.moveTo(points[0][0] * S, PH - points[0][1] * S)
        for x, y in points[1:]:
            p.lineTo(x * S, PH - y * S)
        p.close()
        c.drawPath(p, fill=0, stroke=1)
    for a in angles:
        c.line(cx * S, PH - cy * S, (cx + r * cos(a)) * S, PH - (cy + r * sin(a)) * S)

    values = [[3, 2, 5, 5, 2], [4, 5, 2, 3, 4], [4, 5, 3, 3, 5]]
    for series_i, series in enumerate(values):
        points = [(cx + r * value / 5 * cos(a), cy + r * value / 5 * sin(a)) for a, value in zip(angles, series)]
        color = SERIES[series_i]
        c.setStrokeColor(color)
        c.setFillColor(color)
        c.setLineWidth(2.2 if series_i == 0 else 1.8)
        if series_i == 1:
            c.setDash(4, 2)
        p = c.beginPath()
        p.moveTo(points[0][0] * S, PH - points[0][1] * S)
        for x, y in points[1:]:
            p.lineTo(x * S, PH - y * S)
        p.close()
        c.drawPath(p, fill=0, stroke=1)
        c.setDash()
        for x, y in points:
            c.circle(x * S, PH - y * S, 2.2 * S, fill=1, stroke=0)

    labels = [
        ("Product protection", cx - 66, cy + r + 11, 132, "center"),
        ("Quality & cohesion", cx + r + 12, cy + 57, 145, "left"),
        ("Cost efficiency", cx + r + 12, cy - 56, 145, "left"),
        ("Production feasibility", cx - 90, cy - r - 28, 180, "center"),
        ("Unboxing experience", cx - r - 156, cy - 56, 145, "right"),
    ]
    for label, x, y, width, align in labels:
        text(c, label, x, H - y - 14, width, 21, 10, MUTED, "Arial-Bold", align)

    legend = [("A  Essential", SERIES[0]), ("B  Premium Gift", SERIES[1]), ("C  Natural Ritual", SERIES[2])]
    x0, top = 600, 579
    for label, color in legend:
        c.setStrokeColor(color)
        c.setLineWidth(2)
        c.line(x0 * S, PH - (top + 6) * S, (x0 + 24) * S, PH - (top + 6) * S)
        text(c, label, x0 + 30, top, 120, 18, 11, MUTED, "Arial")
        x0 += 146
    c.restoreState()


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PREVIEW.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=(PW, PH), pageCompression=1)
    pdf.setTitle("QUARVURA - Brand Identity & Packaging System")
    pdf.setAuthor("Althea Qin")

    # Page 1: overview.
    page_start(pdf, "Brand Identity / Packaging System Design", 1)
    text(pdf, "QUARVURA", 54, 102, 450, 82, 58, INK, "Georgia")
    text(pdf, "Brand Identity &\nPackaging System", 54, 198, 425, 108, 34, INK, "Georgia", leading=40)
    rule(pdf, 54, 330, 58, INK, 2)
    text(pdf, "Building a cohesive, gift-worthy packaging experience under real-world constraints.", 54, 356, 400, 80, 20, MUTED, "Arial", leading=25)
    text(pdf, "A natural crystal collection for the U.S. Amazon marketplace. I led naming and visual identity development, material research, packaging design, supplier coordination, and production refinement.", 54, 456, 400, 108, 15, INK, "Arial", leading=19)
    text(pdf, "NAMING / IDENTITY", 54, 570, 105, 30, 10, MUTED, "Arial-Bold")
    text(pdf, "~60-100 names; preliminary trademark screening. Q mark refined through 11 iterations for print, foil, and embossing.", 164, 569, 310, 42, 11, INK, "Arial")
    facts = [("ROLE", "Independent project lead / Brand & packaging designer"), ("MARKET", "United States / Amazon"), ("COST TARGET", "≤ RMB 10 per set")]
    for i, (label, value) in enumerate(facts):
        y = 616 + i * 38
        text(pdf, label, 54, y, 105, 18, 10, MUTED, "Arial-Bold")
        text(pdf, value, 164, y - 1, 310, 38, 12, INK, "Arial")
    placeholder(pdf, "Complete packaging set", "Original product + packaging photograph / landscape", 505, 58, 563, 616, 24)
    page_end(pdf, 1)

    # Page 2: comparison and native-style radar.
    page_start(pdf, "02 / Research & Design Decisions", 2, "Three routes, five criteria", "Packaging directions were compared against protection, perceived quality and visual cohesion, cost efficiency, production feasibility, and unboxing experience.")
    concept(pdf, 229, "A", "Essential", "Pouch, protective wrap, kraft box, and basic printed inserts.", "Low-cost and easy to source; less distinctive as a gift.")
    concept(pdf, 383, "B", "Premium Gift", "Rigid drawer box, branded pouch, tissue, and foil details.", "High presentation value; more cost, volume, and production complexity.")
    concept(pdf, 537, "C", "Natural Ritual", "Product-specific pouches, coconut bowl, honeycomb wrap, and raffia.", "Selected for a more coherent, layered unboxing experience.")
    text(pdf, "QUALITATIVE CONCEPT COMPARISON", 548, 190, 520, 20, 11, MUTED, "Arial-Bold")
    radar(pdf)
    text(pdf, "1 = low / 5 = high. Scores are comparative design judgments, not test results. Cost rankings require final supplier quotations.", 555, 615, 510, 42, 11, MUTED, "Arial", leading=14)
    page_end(pdf, 2)

    # Page 3: system layers.
    page_start(pdf, "03 / Final Packaging System", 3, "A layered packaging experience", "Each component has a clear role in protection, organization, and presentation.")
    placeholder(pdf, "Open package / overhead view", "Original photograph showing all layers in order", 54, 197, 555, 450, 21)
    layers = [
        ("01  TOP LAYER", "Brand card", "Brand communication"),
        ("02  PROTECTIVE LAYER", "Honeycomb paper", "Cushioning and surface protection"),
        ("03  PRODUCT ARRANGEMENT", "Coconut bowl / snap pouch / mesh pouch", "Display, bracelet protection, crystal storage"),
        ("04  BOTTOM + OUTER STRUCTURE", "Raffia filling / corrugated mailer", "Cushioning, texture, and containment"),
    ]
    for i, (tag, title, detail) in enumerate(layers):
        y = 201 + i * 107
        text(pdf, tag, 650, y, 414, 18, 10, MUTED, "Arial-Bold")
        text(pdf, title, 650, y + 25, 414, 40, 18 if i == 2 else 20, INK, "Georgia", leading=22)
        text(pdf, detail, 650, y + 65, 414, 32, 13, MUTED, "Arial", leading=16)
        if i < 3:
            rule(pdf, 650, y + 96, 414, GRID, 1)
    text(pdf, "OTHER PRODUCT VARIATIONS", 650, 641, 414, 18, 10, MUTED, "Arial-Bold")
    text(pdf, "Raw crystal set: individually protected stones + canvas pouch\nTumbled crystal set: individually protected stones + microfiber pouch", 650, 663, 414, 45, 11, INK, "Arial", leading=14)
    page_end(pdf, 3)

    # Page 4: refinement and reflection.
    page_start(pdf, "04 / Production & Reflection", 4, "Designed for production", "Supplier feedback and material behavior informed the final refinements.")
    placeholder(pdf, "Early card design", "Original design iteration / before", 54, 197, 280, 228, 17)
    placeholder(pdf, "Refined card design", "Original production-ready iteration / after", 354, 197, 280, 228, 17)
    placeholder(pdf, "Physical package in use", "Original production photograph / packaging detail", 54, 447, 580, 217, 20)
    text(pdf, "PRODUCTION REFINEMENT", 685, 199, 382, 20, 11, MUTED, "Arial-Bold")
    text(pdf, "Decorative card borders proved difficult to reproduce consistently in small batches. After supplier feedback, I simplified the layout and removed a border where trimming variation could be visible.", 685, 230, 382, 112, 15, INK, "Arial", leading=19)
    rule(pdf, 685, 359, 382, GRID, 1)
    text(pdf, "AI-ASSISTED EXPLORATION", 685, 380, 382, 20, 11, MUTED, "Arial-Bold")
    text(pdf, "AI-assisted concept generation helped explore the seven-chakra card, but often introduced incorrect symbol counts, color sequences, or duplicated text. I refined the constraints and corrected the final design manually in Photoshop.", 685, 411, 382, 116, 15, INK, "Arial", leading=19)
    rule(pdf, 685, 545, 382, GRID, 1)
    text(pdf, "REFLECTION", 685, 567, 382, 20, 11, MUTED, "Arial-Bold")
    text(pdf, "I moved from individual graphics to a system shaped by material behavior, cost limits, and production tolerances.", 685, 598, 382, 62, 18, INK, "Georgia", leading=22)
    text(pdf, "NEXT: verify final unit cost and run standardized transit testing.", 685, 674, 382, 25, 11, MUTED, "Arial-Bold")
    page_end(pdf, 4)

    pdf.save()
    print(OUTPUT)


if __name__ == "__main__":
    build()
