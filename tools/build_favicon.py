"""Vygeneruje ikony webu z assets/img/Icon.svg: favicon.ico (16–256 px),
favicon-48/96/192/512.png a apple-touch-icon.png. SVG se renderuje headless
Chromem v 1024 px a zmenšuje Lanczosem, aby ikona nebyla zrnitá.

Spuštění z kořene webu:  python tools/build_favicon.py
Google má favicony v cache – nová se ve výsledcích hledání projeví až za dny/týdny
(urychlí to „Požádat o indexování“ úvodní stránky v Search Console).
"""
import base64, os, subprocess, tempfile
from PIL import Image

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
BIG = 1024
svg = base64.b64encode(open("assets/img/Icon.svg", "rb").read()).decode()

html = f"""<!doctype html><html><head><style>
html,body{{margin:0;width:{BIG}px;height:{BIG}px;overflow:hidden;background:transparent}}
img{{width:{BIG}px;height:{BIG}px;display:block;object-fit:contain}}
</style></head><body><img src="data:image/svg+xml;base64,{svg}"></body></html>"""

with tempfile.TemporaryDirectory() as tmp:
    page, shot = os.path.join(tmp, "icon.html"), os.path.join(tmp, "icon.png")
    open(page, "w", encoding="utf-8").write(html)
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                    "--default-background-color=00000000", "--force-device-scale-factor=1",
                    f"--window-size={BIG},{BIG}", f"--screenshot={shot}", "file:///" + page.replace("\\", "/")],
                   check=True, capture_output=True)
    big = Image.open(shot).convert("RGBA")

def size(px):
    return big.resize((px, px), Image.LANCZOS)

for px in (48, 96, 192, 512):
    size(px).save(f"assets/img/favicon-{px}.png", optimize=True)
# iOS nepodporuje průhlednost – podklad v barvě pozadí ikony
touch = Image.new("RGBA", (180, 180), "#f2ebe1")
touch.alpha_composite(size(180))
touch.convert("RGB").save("assets/img/apple-touch-icon.png", optimize=True)
size(256).save("favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
print("hotovo")
