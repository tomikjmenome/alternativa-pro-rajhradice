"""Ostré spuštění: doplní finální doménu všude, kde je placeholder DOPLNIT-DOMENA.cz,
odstraní dočasné "noindex" z hlavních stránek a zapne ostrý robots.txt (z robots.live.txt).
Spustit z WEB/:  python tools/set_domain.py https://www.alternativaprorajhradice.cz
(bez lomítka na konci; https:// je potřeba kvůli Facebooku)
"""
import os, re, sys
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if len(sys.argv) != 2 or not sys.argv[1].startswith("http"):
    sys.exit(__doc__)
new = sys.argv[1].rstrip("/")

def rewrite(f, fn, msg):
    s = open(f, encoding="utf-8").read()
    t = fn(s)
    if t != s:
        open(f, "w", encoding="utf-8", newline="\n").write(t); print(msg, f); return 1
    return 0

n = 0
for f in ["index.html", "kandidati.html", "program.html", "videa.html", "gdpr.html", "404.html", "robots.live.txt", "robots.txt", "sitemap.xml", "js/data.js"]:
    if os.path.exists(f):
        n += rewrite(f, lambda s: re.sub(r"https://DOPLNIT-DOMENA\.cz", new, s), "doména:")

# dočasný zákaz indexace pryč (gdpr.html a 404.html mají noindex trvale – ty se nemění)
NOINDEX = re.compile(r'  <meta name="robots" content="noindex, nofollow"><!-- DOČASNĚ[^\n]*-->\n')
for f in ["index.html", "kandidati.html", "program.html", "videa.html"]:
    rewrite(f, lambda s: NOINDEX.sub("", s), "noindex pryč:")

if os.path.exists("robots.live.txt"):
    os.replace("robots.live.txt", "robots.txt"); print("robots.txt: ostrá verze")

print(n, "souborů s doménou" if n else "– doména už byla doplněná")
