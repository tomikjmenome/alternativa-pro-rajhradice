"""Převede program.md (prostý text z Wordu) do program.html.
Spustit z WEB/:  python tools/build_program.py
Nadpisy = řádky verzálkami, části = "1. RAJHRADICE V OBDOBÍ ...", odrážky = "·".
Po spuštění zkontroluj velká písmena v nadpisech (skript je převádí na věty).
"""
import os, re, html
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
E = html.escape
# ---------- 5) program.html z program.md ----------
lines = [l.strip().replace("\u00a0", " ") for l in open("program.md", encoding="utf-8").read().splitlines()]
lines = [l for l in lines if l]
# rovné uvozovky z Wordu („takhle") → typografické („takhle“)
lines = [re.sub(r'„([^"„“]*)"', lambda m: "„" + m.group(1) + "“", l) for l in lines]
E = html.escape

# vlastní jména, která mají v nadpisech zůstat s velkým písmenem
PROPER = ["Rajhradice", "Rajhradic", "Rajhradicích", "Rajhradu", "Svratku", "Svratka", "Hlavní", "Na Váze", "ZŠ", "Haló"]
def sentence_case(t):
    """VERZÁLKOVÝ NADPIS → Verzálkový nadpis (vlastní jména z PROPER zůstávají)."""
    t = t.lower()
    t = re.sub(r"^(\W*)(\w)", lambda m: m.group(1) + m.group(2).upper(), t)
    for w in PROPER:
        t = re.sub(r"(?<!\w)" + re.escape(w) + r"(?!\w)", w, t, flags=re.I)
    return t

def is_upper(l):
    letters = [c for c in l if c.isalpha()]
    return letters and all(c.isupper() for c in letters)

def slug(t):
    import unicodedata
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode()
    t = re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")
    return t[:40]

out = []; toc = []
i = 0
# titul + podtitul
title = lines[0]; sub = lines[1]; i = 2
part_re = re.compile(r"^(\d)\.\s+RAJHRADICE V OBDOBÍ (.+)$")
part_leads = {"1": "Co chceme udělat a začít řešit", "2": "Co musíme začít připravovat", "3": "Kam chceme Rajhradice dlouhodobě směřovat"}
in_ul = False
def close_ul():
    global in_ul
    if in_ul: out.append("  </ul>"); in_ul = False

while i < len(lines):
    l = lines[i]
    m = part_re.match(l)
    if m:
        close_ul()
        pid = "obdobi-" + m.group(1)
        out.append(f'\n  <h2 id="{pid}"><small>Část {m.group(1)}</small>Rajhradice {E(m.group(2))}</h2>')
        out.append(f'  <p class="part-lead">{E(part_leads[m.group(1)])}</p>')
        toc.append((pid, m.group(2)))
    elif l == "NÁŠ ZÁVAZEK":
        close_ul()
        out.append('\n  <h2 id="zavazek"><small>Na závěr</small>Náš závazek</h2>')
        toc.append(("zavazek", "Náš závazek"))
    elif l.startswith("·"):
        if not in_ul: out.append('  <ul class="rules">'); in_ul = True
        out.append(f"    <li>{E(l.lstrip('· ').strip())}</li>")
    elif re.match(r"^\d\.\s+Období", l):
        if not in_ul: out.append("  <ul>"); in_ul = True
        out.append(f"    <li>{E(re.sub(r'^\d\.\s+', '', l))}</li>")
    elif l.startswith("Že ") or l == "Slibujeme něco jiného.":
        if l == "Slibujeme něco jiného.":
            close_ul(); out.append(f'  <p class="claim">{E(l)}</p>')
        else:
            if not in_ul: out.append("  <ul>"); in_ul = True
            out.append(f"    <li>{E(l)}</li>")
    elif is_upper(l) and len(l) < 90:
        close_ul()
        # závěrečné čtyři hesla
        if l in ("ROZUMNĚ HOSPODAŘIT.", "OTEVŘENĚ ROZHODOVAT.", "MYSLET NA BUDOUCNOST.", "PRACOVAT ZKUŠENĚ A ODPOVĚDNĚ."):
            if l == "ROZUMNĚ HOSPODAŘIT.": out.append('  <div class="final">')
            out.append(f"    <span>{E(sentence_case(l))}</span>")
            if l == "PRACOVAT ZKUŠENĚ A ODPOVĚDNĚ.": out.append("  </div>")
        else:
            out.append(f'\n  <h3 id="{slug(l)}"><span>{E(sentence_case(l))}</span></h3>')
    else:
        close_ul()
        out.append(f"  <p>{E(l)}</p>")
    i += 1
close_ul()
body = "\n".join(out)

p = "program.html"; s = open(p, encoding="utf-8").read()
h1i = s.index('<h1 class="h-l">'); head_old = s[h1i:s.index("</nav>", h1i) + 6]
head_new = f'''<h1 class="h-l">Rozumně hospodařit.<br>Otevřeně rozhodovat.<br><span class="brick">Myslet na budoucnost.</span></h1>
    <p class="lead">Volební program pro komunální volby 2026. Záleží nám na tom, jakým směrem se budou Rajhradice v příštích letech ubírat.</p>
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
s = s.replace('<span class="kicker"><i class="mark"></i>Programové prohlášení</span>', '<span class="kicker"><i class="mark"></i>Volební program 2026</span>')
open(p, "w", encoding="utf-8").write(s)
print("ok", len(toc), "částí")
