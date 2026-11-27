"""Vygeneruje sdílecí obrázky zápisů (1200×630) do assets/img/og/:
zapisy.jpg (seznam /zapisy) a zapis-<datum>-<nazev>.jpg pro každé zasedání – vlevo název a datum,
vpravo náhled první strany PDF, na pozadí letecký pohled jako u og-obec.jpg.
Renderuje headless Chrome.

Spuštění z kořene webu:  python tools/build_og_zapisy.py
Nový zápis = nový řádek v ZASEDANI (od nejstaršího).
Po nasazení je nutné u už sdílené adresy kliknout „Scrape Again“ ve
https://developers.facebook.com/tools/debug/ – FB má náhledy v cache podle URL.
"""
import base64, os, subprocess, tempfile
from PIL import Image

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
W, H = 1200, 630
OUT = "assets/img/og"

# (adresa v /zapis/, soubor v assets/dokumenty/zapisy/ bez přípony, nadpis, datum)
ZASEDANI = [
    ("2026-11-04-ustavujici", "2026-11-04-ustavujici-zasedani", "Ustavující<br>zasedání", "Středa 4. 11. 2026"),
    ("2026-11-25-druhe", "2026-11-25-druhe-zasedani", "Druhé<br>zasedání", "Středa 25. 11. 2026"),
]

def b64(path, mime):
    return f"data:{mime};base64," + base64.b64encode(open(path, "rb").read()).decode()

photo = b64("assets/img/obec/hero-letecky.webp", "image/webp")
logo = b64("assets/img/normal-darkBG.svg", "image/svg+xml")

def page(nazev):
    return b64(f"assets/dokumenty/zapisy/{nazev}.webp", "image/webp")

def render(out, kicker, title, sub, pages, title_px=76, sheet_px=350):
    sheets = "".join(f'<img class="sheet s{i}" src="{p}">' for i, p in enumerate(pages))
    html = f"""<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet"><style>
html,body{{margin:0;width:{W}px;height:{H}px;overflow:hidden;background:#24252d;font-family:Montserrat,Arial,sans-serif}}
.wrap{{position:relative;width:{W}px;height:{H}px;overflow:hidden;color:#f2ebe1}}
.photo{{position:absolute;inset:0;background:url({photo}) 60% 45%/cover;filter:grayscale(1)}}
.tint{{position:absolute;inset:0;background:#ca4e2d;mix-blend-mode:multiply;opacity:.5}}
.shade{{position:absolute;inset:0;background:linear-gradient(90deg, rgba(36,37,45,.95) 0%, rgba(36,37,45,.88) 55%, rgba(36,37,45,.55) 100%)}}
.logo{{position:absolute;left:72px;top:58px;width:300px}}
.text{{position:absolute;left:72px;bottom:66px}}
.kicker{{font-weight:800;font-size:25px;letter-spacing:.13em;text-transform:uppercase;color:#e2694a}}
h1{{margin:16px 0 22px;font-weight:900;font-size:{title_px}px;line-height:1.02;letter-spacing:-.02em;text-transform:uppercase}}
.sub{{font-weight:700;font-size:30px}}
.sheet{{position:absolute;width:{sheet_px}px;border-radius:6px;box-shadow:0 30px 60px -10px rgba(0,0,0,.65)}}
.s0{{right:60px;top:80px;transform:rotate(4deg)}}
.s1{{right:140px;top:115px;transform:rotate(-5deg)}}
.s0:only-of-type{{right:96px;top:70px}}
</style></head><body><div class="wrap">
<div class="photo"></div><div class="tint"></div><div class="shade"></div>
<img class="logo" src="{logo}">{sheets}
<div class="text"><div class="kicker">{kicker}</div><h1>{title}</h1><div class="sub">{sub}</div></div>
</div></body></html>"""
    tmp = tempfile.mkdtemp()
    src = os.path.join(tmp, "og.html"); png = os.path.join(tmp, "og.png")
    open(src, "w", encoding="utf-8").write(html)
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--virtual-time-budget=4000",
                    f"--window-size={W},{H}", f"--screenshot={png}", "file:///" + os.path.abspath(src).replace("\\", "/")], check=True)
    path = f"{OUT}/{out}.jpg"
    Image.open(png).convert("RGB").save(path, quality=88, optimize=True)
    print(path, os.path.getsize(path), "B")

os.makedirs(OUT, exist_ok=True)
for slug, pdf, title, date in ZASEDANI:
    render(f"zapis-{slug}", "Zápis ze zastupitelstva", title, date, [page(pdf)])
# seznam: dvě nejnovější první strany (nejnovější navrchu)
render("zapisy", "Alternativa pro Rajhradice", "Zápisy ze<br>zastupitelstva", "Co se rozhodlo a jak se hlasovalo",
       [page(z[1]) for z in ZASEDANI[-2:]], title_px=64, sheet_px=300)
