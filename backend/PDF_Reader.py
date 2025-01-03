from pypdf import PdfReader

def Reader(Path):
    reader = PdfReader(Path)
    Document = []
    for page in reader.pages:
        Document.append(page.extract_text())
    return Document
