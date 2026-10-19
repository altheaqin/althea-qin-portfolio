from pathlib import Path

from reportlab.lib.pagesizes import landscape, A4
from reportlab.pdfgen import canvas


WORKSPACE = Path(r"C:\Users\11477\OneDrive\文档\portfolio")
PREVIEW_DIR = WORKSPACE / "output" / "previews" / "the-space-to-be-v1"
OUTPUT = WORKSPACE / "output" / "pdf" / "the-space-to-be-v1.pdf"


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    page_width, page_height = landscape(A4)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=(page_width, page_height), pageCompression=1)
    pdf.setTitle("The Space to Be")
    pdf.setAuthor("Althea Qin")

    for page_number in range(1, 4):
        image_path = PREVIEW_DIR / f"the-space-to-be-page-{page_number:02d}.png"
        if not image_path.exists():
            raise FileNotFoundError(image_path)
        pdf.drawImage(
            str(image_path),
            0,
            0,
            width=page_width,
            height=page_height,
            preserveAspectRatio=False,
            mask="auto",
        )
        pdf.showPage()

    pdf.save()
    print(OUTPUT)


if __name__ == "__main__":
    main()
