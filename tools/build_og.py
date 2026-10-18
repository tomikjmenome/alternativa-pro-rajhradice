"""Vygeneruje sdílecí obrázek assets/img/og-obec.jpg (1200×630, formát pro Facebook):
letecký pohled na obec (assets/img/obec/hero-letecky.webp, stejný jako v hero na webu),
černobíle, přes něj cihlový tint a ztmavení, uprostřed logo a „Zastupitelstvo 2026–2030“.
Renderuje headless Chrome. (Do voleb 2026 to byla mozaika kandidátů og-tym.jpg – viz tag volby-2026.)

Spuštění z kořene webu:  python tools/build_og.py
Po nasazení je nutné u každé sdílené adresy kliknout „Scrape Again“ ve
https://developers.facebook.com/tools/debug/ – FB má náhledy v cache podle URL.
"""
import base64, os, subprocess, tempfile
from PIL import Image

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
W, H = 1200, 630
OUT = "assets/img/og-obec.jpg"

def b64(path, mime):
    return f"data:{mime};base64," + base64.b64encode(open(path, "rb").read()).decode()

photo = b64("assets/img/obec/hero-letecky.webp", "image/webp")
logo = b64("assets/img/normal-darkBG.svg", "image/svg+xml")

html = f"""<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" rel="stylesheet"><style>
html,body{{margin:0;width:{W}px;height:{H}px;overflow:hidden;background:#24252d;font-family:Montserrat,Arial,sans-serif}}
.wrap{{position:relative;width:{W}px;height:{H}px;overflow:hidden}}
.photo{{position:absolute;inset:0;background:url({photo}) 60% 45%/cover;filter:grayscale(1)}}
.tint{{position:absolute;inset:0;background:#ca4e2d;mix-blend-mode:multiply;opacity:.5}}
.shade{{position:absolute;inset:0;background:radial-gradient(ellipse 62% 70% at 50% 50%, rgba(36,37,45,.88) 0%, rgba(36,37,45,.65) 50%, rgba(36,37,45,.35) 100%)}}
.logo{{position:absolute;left:50%;top:45%;transform:translate(-50%,-50%);width:600px}}
.sub{{position:absolute;left:0;right:0;bottom:64px;text-align:center;color:#f2ebe1;font-weight:800;font-size:22px;letter-spacing:.14em;text-transform:uppercase}}
.sub b{{color:#e2694a}}
</style></head><body><div class="wrap">
<div class="photo"></div><div class="tint"></div><div class="shade"></div>
<img class="logo" src="{logo}"><div class="sub">Zastupitelstvo <b>2026–2030</b></div>
</div></body></html>"""

tmp = tempfile.mkdtemp()
src = os.path.join(tmp, "og.html"); png = os.path.join(tmp, "og.png")
open(src, "w", encoding="utf-8").write(html)
subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--virtual-time-budget=4000",
                f"--window-size={W},{H}", f"--screenshot={png}", "file:///" + os.path.abspath(src).replace("\\", "/")], check=True)
Image.open(png).convert("RGB").save(OUT, quality=88, optimize=True)
print(OUT, os.path.getsize(OUT), "B")
