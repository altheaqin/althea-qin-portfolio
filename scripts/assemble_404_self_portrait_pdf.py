from pathlib import Path

from PIL import Image
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


workspace = Path(r"C:\Users\11477\OneDrive\文档\portfolio")
preview_dir = workspace / "output" / "previews" / "404-self-portrait-v1"
output_pdf = workspace / "output" / "pdf" / "404-self-portrait-v1.pdf"
output_pdf.parent.mkdir(parents=True, exist_ok=True)

page_width = 841.889764  # A4 landscape, points
page_height = 595.275591
images = [preview_dir / f"404-self-portrait-page-{index:02d}.png" for index in range(1, 5)]

pdf = canvas.Canvas(str(output_pdf), pagesize=(page_width, page_height), pageCompression=1)
for image_path in images:
    if not image_path.exists():
        raise FileNotFoundError(image_path)
    with Image.open(image_path) as image:
        image.load()
        pdf.drawImage(ImageReader(image), 0, 0, width=page_width, height=page_height, preserveAspectRatio=False)
    pdf.showPage()
pdf.save()

print(output_pdf)
