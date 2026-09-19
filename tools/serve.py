"""Lokální náhled webu s „čistými“ adresami jako na GitHub Pages.
Spustit z WEB/:  python tools/serve.py   (volitelně číslo portu, výchozí 4000)

Odkazy na webu jsou bez .html (/program, /kandidati?k=…, /kandidat/<id>) – GitHub Pages
si k nim soubor .html domyslí sám, obyčejný `python -m http.server` ne. Tenhle server to dělá
stejně: /program → program.html, / → index.html, neznámá adresa → 404.html.
"""
import os, sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4000

class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        p = urlsplit(path).path
        if p.endswith("/"): p += "index.html"
        full = super().translate_path(p)
        if not os.path.exists(full) and not os.path.splitext(p)[1] and os.path.isfile(full + ".html"):
            return full + ".html"
        return full

    def send_error(self, code, message=None, explain=None):
        if code == 404 and os.path.isfile("404.html"):
            body = open("404.html", "rb").read()
            self.send_response(404); self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body))); self.end_headers(); self.wfile.write(body)
        else:
            super().send_error(code, message, explain)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")  # ať se při vývoji nedrží stará verze
        super().end_headers()

print(f"http://localhost:{PORT}/  (Ctrl+C ukončí)")
ThreadingHTTPServer(("", PORT), Handler).serve_forever()
