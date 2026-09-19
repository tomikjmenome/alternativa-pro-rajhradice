"""Převede program.md (prostý text z Wordu) do program.html.
Spustit z WEB/:  python tools/build_program.py
Formát program.md (verze „Alternativa_program_konec.docx“):
  řádek 1 titul, 2 podtitul, 3 „Motto: …“ (motto je v hlavičce stránky, do textu se nedává)
  „1. RAJHRADICE 2026–2030“   = část (h2)
  „• NADPIS VERZÁLKAMI“       = kapitola (h3)
  „NÁŠ ZÁVAZEK“               = závěrečná část
  verzálkové řádky v úvodu    = základní pravidla (odrážky)
  „2026–2030 – …“             = seznam etap
  „Že …“                      = odrážky závazku
Po spuštění zkontroluj velká písmena v nadpisech (skript je převádí na věty).
"""
import os, re, html, unicodedata
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
E = html.escape

lines = [re.sub(r"[ \t ]+", " ", l).strip() for l in open("program.md", encoding="utf-8").read().splitlines()]
lines = [l for l in lines if l]
# rovné uvozovky z Wordu („takhle") → typografické („takhle“); spojovník s mezerami → pomlčka
lines = [re.sub(r'„([^"„“]*)"', lambda m: "„" + m.group(1) + "“", l) for l in lines]
lines = [l.replace(" - ", " – ") for l in lines]

# vlastní jména, která mají v nadpisech zůstat s velkým písmenem
PROPER = ["Rajhradice", "Rajhradic", "Rajhradicích", "Rajhradu", "Svratku", "Svratka", "Hlavní", "Na Váze", "ZŠ", "Haló", "Reuse", "Alternativa"]
def sentence_case(t):
    """VERZÁLKOVÝ NADPIS → Verzálkový nadpis (vlastní jména z PROPER zůstávají)."""
    t = t.lower()
    t = re.sub(r"^(\W*)(\w)", lambda m: m.group(1) + m.group(2).upper(), t)
    for w in PROPER:
        t = re.sub(r"(?<!\w)" + re.escape(w) + r"(?!\w)", w, t, flags=re.I)
    return t

def is_upper(l):
    letters = [c for c in l if c.isalpha()]
    return bool(letters) and all(c.isupper() for c in letters)

def slug(t):
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode()
    t = re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")
    return t[:40]

title, sub, motto = lines[0], lines[1], lines[2]
lines = lines[3:]

part_re = re.compile(r"^(\d)\.\s+RAJHRADICE (.+)$")
part_leads = {"1": "Co chceme udělat a začít řešit", "2": "Co musíme začít připravovat", "3": "Kam chceme Rajhradice dlouhodobě směřovat"}
FINAL_START = "Chceme, aby Rajhradice rozumně hospodařily"

out = []; toc = []; in_ul = None; in_intro = True; in_final = False
def close_ul():
    global in_ul
    if in_ul: out.append("  </ul>"); in_ul = None
def open_ul(cls=""):
    global in_ul
    if in_ul != (cls or "plain"):
        close_ul(); out.append(f'  <ul class="{cls}">' if cls else "  <ul>"); in_ul = cls or "plain"

for l in lines:
    m = part_re.match(l)
    if m:
        close_ul(); in_intro = False
        pid = "obdobi-" + m.group(1)
        out.append(f'\n  <h2 id="{pid}"><small>Část {m.group(1)}</small>Rajhradice {E(m.group(2))}</h2>')
        out.append(f'  <p class="part-lead">{E(part_leads[m.group(1)])}</p>')
        toc.append((pid, m.group(2)))
    elif l == "NÁŠ ZÁVAZEK":
        close_ul()
        out.append('\n  <h2 id="zavazek"><small>Na závěr</small>Náš závazek</h2>')
        toc.append(("zavazek", "Náš závazek"))
    elif l.startswith("•"):
        close_ul()
        t = l.lstrip("• ").strip()
        out.append(f'\n  <h3 id="{slug(t)}"><span>{E(sentence_case(t))}</span></h3>')
    elif in_intro and is_upper(l):
        open_ul("rules"); out.append(f"    <li>{E(l)}</li>")
    elif re.match(r"^\d{4}", l) and " – " in l:
        open_ul(); out.append(f"    <li>{E(l)}</li>")
    elif l.startswith("Že "):
        open_ul(); out.append(f"    <li>{E(l)}</li>")
    elif l == "Slibujeme něco jiného.":
        close_ul(); out.append(f'  <p class="claim">{E(l)}</p>')
    elif l.startswith(FINAL_START):
        close_ul(); in_final = True
        out.append('  <div class="final">')
        out.append(f'    <p class="final__claim">{E(l)}</p>')
    elif in_final:
        if is_upper(l): out.append(f'    <span class="final__brand">{E(l)}</span>')
        elif l.endswith("odpovědnost."): out.append(f'    <span class="final__offer">{E(l)}</span>')
        else: out.append(f"    <p>{E(l)}</p>")
    elif is_upper(l) and len(l) < 90:
        # zvýrazněná otázka / heslo uprostřed textu
        close_ul(); out.append(f'  <p class="claim">{E(l)}</p>')
    else:
        close_ul(); out.append(f"  <p>{E(l)}</p>")
close_ul()
if in_final: out.append("  </div>")
body = "\n".join(out)

p = "program.html"; s = open(p, encoding="utf-8").read()
h1i = s.index('<h1 class="h-l">'); head_old = s[h1i:s.index("</nav>", h1i) + 6]
head_new = f'''<h1 class="h-l">Rozumně hospodařit.<br>Otevřeně rozhodovat.<br><span class="brick">Myslet na budoucnost.</span></h1>
    <p class="lead">{E(sub)}. Záleží nám na tom, jakým směrem se budou Rajhradice v příštích letech ubírat.</p>
    <nav class="toc" aria-label="Obsah">
      <a href="#uvod">Úvod</a>
''' + "\n".join(f'      <a href="#{pid}">{E(t)}</a>' for pid, t in toc) + "\n    </nav>"
s = s.replace(head_old, head_new)
main_old = s[s.index("<!-- ====") : s.index("</main>") + 7]
main_new = f'''<!-- =====================================================================
     TEXT PROGRAMU – generováno z program.md (skript v README).
     Ručně upravovat jde, ale při změně program.md se přepíše.
     ===================================================================== -->
<main class="container prose" id="uvod">
{body}

  <div class="notice" style="margin-top:44px">
    <strong>Máte k programu připomínku?</strong>
    <span>Přesně to chceme slyšet. <a href="index.html#kontakt" style="color:var(--brick);text-decoration:underline">Napište nám</a> nebo zavolejte na <a href="tel:+420732760085" style="color:var(--brick);text-decoration:underline">732 760 085</a>.</span>
  </div>
</main>'''
s = s.replace(main_old, main_new)
open(p, "w", encoding="utf-8").write(s)
print("ok", len(toc), "částí,", body.count("<h3 "), "kapitol")

# ---------- kontrola: časová osa na homepage (PROGRAM v js/data.js) musí sedět na kapitoly ----------
# Krátké názvy kapitol pro osu se píšou ručně (dlouhé nadpisy by se tam nevešly),
# tak aspoň ohlídáme, že každý odkaz vede na existující nadpis a že žádná kapitola nechybí.
js = open("js/data.js", encoding="utf-8").read()
js_ids = set(re.findall(r'^\s*\["([a-z0-9-]+)",\s*"', js, re.M))
html_ids = {m for m in re.findall(r'<h3 id="([^"]+)">', body)}
chybi = html_ids - js_ids; navic = js_ids - html_ids
if navic: print("POZOR – v js/data.js PROGRAM jsou id, která v programu nejsou:", ", ".join(sorted(navic)))
if chybi: print("POZOR – kapitoly bez položky v js/data.js PROGRAM (na časové ose chybí):", ", ".join(sorted(chybi)))
if not navic and not chybi: print("ok – časová osa v data.js sedí na kapitoly programu")
