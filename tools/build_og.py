"""Vygeneruje sdílecí obrázek assets/img/og-tym.jpg (1200×630, formát pro Facebook):
mozaika 5×3 = všech 15 kandidátů z assets/img/tym/mozaika, přes ni cihlový tint a
ztmavení jako v hero na webu, uprostřed logo. Renderuje headless Chrome.

Spuštění z kořene webu:  python tools/build_og.py
Po nasazení je nutné u každé sdílené adresy kliknout „Scrape Again“ ve
https://developers.facebook.com/tools/debug/ – FB má náhledy v cache podle URL.
"""
import base64, glob, os, subprocess, tempfile
from PIL import Image

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
W, H = 1200, 630
OUT = "assets/img/og-tym.jpg"

def b64(path, mime):
    return f"data:{mime};base64," + base64.b64encode(open(path, "rb").read()).decode()

tiles = sorted(glob.glob("assets/img/tym/mozaika/*.webp"))
assert len(tiles) == 15, tiles
figs = "".join(f'<figure><img src="{b64(t, "image/webp")}"></figure>' for t in tiles)
logo = b64("assets/img/normal-darkBG.svg", "image/svg+xml")

html = f"""<!doctype html><html><head><meta charset="utf-8"><style>
html,body{{margin:0;width:{W}px;height:{H}px;overflow:hidden;background:#24252d;font-family:Arial,sans-serif}}
.wrap{{position:relative;width:{W}px;height:{H}px}}
.mosaic{{position:absolute;inset:0;display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:repeat(3,1fr);gap:4px;background:#24252d}}
.mosaic figure{{margin:0;overflow:hidden;background:#24252d}}
.mosaic img{{width:100%;height:100%;object-fit:cover;object-position:50% 22%;display:block}}
.tint{{position:absolute;inset:0;background:#ca4e2d;mix-blend-mode:multiply;opacity:.5}}
.shade{{position:absolute;inset:0;background:radial-gradient(ellipse 62% 70% at 50% 50%, rgba(36,37,45,.88) 0%, rgba(36,37,45,.7) 45%, rgba(36,37,45,.3) 100%)}}
.logo{{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:620px;filter:drop-shadow(0 6px 24px rgba(0,0,0,.55))}}
</style></head><body><div class="wrap">
<div class="mosaic">{figs}</div><div class="tint"></div><div class="shade"></div>
<img class="logo" src="{logo}">
</div></body></html>"""

tmp = tempfile.mkdtemp()
src = os.path.join(tmp, "og.html"); png = os.path.join(tmp, "og.png")
open(src, "w", encoding="utf-8").write(html)
subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
                f"--window-size={W},{H}", f"--screenshot={png}", "file:///" + os.path.abspath(src).replace("\\", "/")], check=True)
Image.open(png).convert("RGB").save(OUT, quality=88, optimize=True)
print(OUT, os.path.getsize(OUT), "B")
