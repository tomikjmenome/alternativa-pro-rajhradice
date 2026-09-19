"""Vygeneruje sdílecí stránky kandidátů: kandidat/<id>.html + náhledový obrázek assets/img/tym/og/<id>.jpg.

Proč: Facebook, WhatsApp ani Messenger nespouští JavaScript, takže u odkazu kandidati.html?k=id
vidí vždy stejný obecný og.png. Každý kandidát má proto vlastní malou HTML stránku, která nese
jeho og:image (1200×630 s medailonkem) a návštěvníka hned přesměruje na kandidati.html?k=id.

Spustit z WEB/ po každé změně kandidátů nebo medailonků:  python tools/build_kandidati.py
Doménu bere z canonical v kandidati.html (doplňuje ji tools/set_domain.py).
"""
import json, os, re, subprocess, sys
from PIL import Image, ImageFilter

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# --- data z js/data.js (načte je Node, aby se nemusel parsovat JS ručně) ----
try:
    out = subprocess.run(["node", "-e", "const fs=require('fs');new Function(fs.readFileSync('js/data.js','utf8')+';console.log(JSON.stringify({SITE,CANDIDATES}))')()"],
                         capture_output=True, text=True, encoding="utf-8", check=True).stdout
except (OSError, subprocess.CalledProcessError) as e:
    sys.exit(f"Nepodařilo se načíst js/data.js přes Node: {e}")
data = json.loads(out)
SITE, CANDIDATES = data["SITE"], sorted(data["CANDIDATES"], key=lambda c: c["poradi"])

m = re.search(r'<link rel="canonical" href="(https://[^/"]+)/kandidati\.html">', open("kandidati.html", encoding="utf-8").read())
if not m:
    sys.exit("V kandidati.html chybí canonical s doménou – nejdřív spustit tools/set_domain.py")
DOMAIN = m.group(1)

os.makedirs("kandidat", exist_ok=True)
os.makedirs("assets/img/tym/og", exist_ok=True)

CREAM, W, H = (242, 235, 225), 1200, 630

def og_image(src, dst):
    """Medailonek uprostřed na 1200×630: vzadu rozmazaná verze fotky, vpředu ostrá karta se stínem."""
    card = Image.open(src).convert("RGB")
    ch = H - 60
    card = card.resize((round(card.width * ch / card.height), ch), Image.LANCZOS)
    # pozadí: medailonek roztažený přes celou plochu, silně rozmazaný a prosvětlený do krémové
    bg = card.resize((W, round(W * card.height / card.width)), Image.LANCZOS)
    bg = bg.crop((0, (bg.height - H) // 2, W, (bg.height - H) // 2 + H)).filter(ImageFilter.GaussianBlur(40))
    bg = Image.blend(bg, Image.new("RGB", (W, H), CREAM), 0.55)
    # stín
    x, y = (W - card.width) // 2, (H - card.height) // 2
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    shadow.paste((36, 37, 45, 120), (x, y + 14, x + card.width, y + card.height + 14))
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    bg = Image.alpha_composite(bg.convert("RGBA"), shadow).convert("RGB")
    bg.paste(card, (x, y))
    bg.save(dst, "JPEG", quality=86, optimize=True, progressive=True)

PAGE = """<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{jmeno} · Kandidáti · {site}</title>
  <meta name="description" content="{popis}">
  <meta name="robots" content="noindex, follow"><!-- jen sdílecí stránka, do vyhledávačů patří kandidati.html -->
  <link rel="canonical" href="{domain}/kandidati.html?k={id}">
  <meta property="og:type" content="profile">
  <meta property="og:site_name" content="{site}">
  <meta property="og:locale" content="cs_CZ">
  <meta property="og:url" content="{domain}/kandidat/{id}.html">
  <meta property="og:title" content="{jmeno} – kandidát č. {poradi}">
  <meta property="og:description" content="{popis}">
  <meta property="og:image" content="{domain}/assets/img/tym/og/{id}.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Medailonek: {jmeno}, kandidát č. {poradi}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#24252d">
  <link rel="icon" href="../assets/img/Icon.svg" type="image/svg+xml">
  <script>location.replace("../kandidati.html?k={id}");</script>
  <style>body{{margin:0;min-height:100vh;display:grid;place-items:center;background:#f2ebe1;color:#24252d;font:500 16px/1.5 system-ui,sans-serif;text-align:center;padding:24px}}a{{color:#c8502f}}</style>
</head>
<body>
  <p><strong>{jmeno}</strong> – kandidát č. {poradi}<br><a href="../kandidati.html?k={id}">Zobrazit medailonek →</a></p>
</body>
</html>
"""

n = 0
for c in CANDIDATES:
    if not c.get("medailonek"):
        print("bez medailonku, přeskočeno:", c["id"]); continue
    og_image(c["medailonek"], f"assets/img/tym/og/{c['id']}.jpg")
    popis = f"{c['jmeno']}" + (f", {c['vek']} let" if c.get("vek") else "") + (f", {c['profese']}" if c.get("profese") else "") \
            + f". Kandidát č. {c['poradi']} – {SITE['nazev']}, komunální volby {SITE['volbyText']}."
    html = PAGE.format(id=c["id"], jmeno=c["jmeno"], poradi=c["poradi"], popis=popis.replace('"', "&quot;"), site=SITE["nazev"], domain=DOMAIN)
    open(f"kandidat/{c['id']}.html", "w", encoding="utf-8", newline="\n").write(html)
    n += 1

# stránky kandidátů, kteří už v datech nejsou, pryč
ids = {c["id"] for c in CANDIDATES}
for f in os.listdir("kandidat"):
    if f.endswith(".html") and f[:-5] not in ids:
        os.remove(f"kandidat/{f}"); os.path.exists(f"assets/img/tym/og/{f[:-5]}.jpg") and os.remove(f"assets/img/tym/og/{f[:-5]}.jpg")
        print("smazáno:", f)

print(f"{n} sdílecích stránek v kandidat/ + náhledy v assets/img/tym/og/ ({DOMAIN})")
