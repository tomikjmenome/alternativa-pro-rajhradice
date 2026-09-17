"""Doplní finální doménu všude, kde je placeholder DOPLNIT-DOMENA.cz.
Spustit z WEB/:  python tools/set_domain.py https://www.alternativaprorajhradice.cz
(bez lomítka na konci; https:// je potřeba kvůli Facebooku)

Indexaci to NEZAPÍNÁ. Až má web jít do vyhledávačů, spustit ještě jednou s --index:
  python tools/set_domain.py https://www.alternativaprorajhradice.cz --index
→ odstraní dočasné "noindex" z hlavních stránek a zapne ostrý robots.txt (z robots.live.txt).
"""
import os, re, sys
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
args = [a for a in sys.argv[1:] if not a.startswith("--")]
index = "--index" in sys.argv
if len(args) != 1 or not args[0].startswith("http"):
    sys.exit(__doc__)
new = args[0].rstrip("/")

def rewrite(f, fn, msg):
    s = open(f, encoding="utf-8").read()
    t = fn(s)
    if t != s:
        open(f, "w", encoding="utf-8", newline="\n").write(t); print(msg, f); return 1
    return 0

n = 0
for f in ["index.html", "kandidati.html", "program.html", "videa.html", "jak-volit.html", "transparentnost.html", "gdpr.html", "404.html", "robots.live.txt", "robots.txt", "sitemap.xml", "js/data.js"]:
    if os.path.exists(f):
        n += rewrite(f, lambda s: re.sub(r"https://DOPLNIT-DOMENA\.cz", new, s), "doména:")

if index:
    # dočasný zákaz indexace pryč (gdpr.html a 404.html mají noindex trvale – ty se nemění)
    NOINDEX = re.compile(r'  <meta name="robots" content="noindex, nofollow"><!-- DOČASNĚ[^\n]*-->\n')
    for f in ["index.html", "kandidati.html", "program.html", "videa.html", "jak-volit.html", "transparentnost.html"]:
        rewrite(f, lambda s: NOINDEX.sub("", s), "noindex pryč:")
    if os.path.exists("robots.live.txt"):
        os.replace("robots.live.txt", "robots.txt"); print("robots.txt: ostrá verze")
else:
    print("indexace zůstává vypnutá (zapne se až s --index)")

print(n, "souborů s doménou" if n else "– doména už byla doplněná")
