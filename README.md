# Web – Alternativa pro Rajhradice

Statický web, žádný build, žádný framework. Čisté HTML + CSS + JS.

## Struktura

| soubor | co je |
|---|---|
| `index.html` | homepage: hero, sociální sítě, tým, program, videa, kontakt |
| `kandidati.html` | podstránka kandidátů (levý seznam + detail), `?k=id` |
| `videa.html` | videoarchiv (levý seznam témat + shrnutí + YouTube), `?v=id` |
| `program.html` | celý text programového prohlášení |
| `program.md` + `tools/build_program.py` | zdrojový text programu a skript, který z něj dělá `program.html` |
| `gdpr.html` | ochrana osobních údajů + cookies (doplnit místa označená [DOPLNIT]) |
| `404.html` | stránka „nenalezeno“ – Netlify i GitHub Pages ji berou automaticky |
| `robots.txt`, `sitemap.xml` | pro vyhledávače (obsahují doménu – viz „Co doplnit“ bod 5) |
| `tools/set_domain.py` | jednorázově doplní finální doménu do všech souborů |
| `js/data.js` | **VŠECHNA DATA** – kandidáti, videa, odkazy na sítě, telefon, klíč formuláře |
| `js/main.js` | logika (vykreslení seznamů, odpočet, formulář) |
| `css/style.css` | styl – paleta a fonty z brand kitu videí |
| `assets/` | logo, fotky týmu, medailonky, mozaika do hero, dokumenty (PDF). Jen to, co web opravdu používá – zdrojové fotky jsou v `../medailonky/`, loga v `../Alternativa-logo/` |

## Co doplnit

1. **Kandidáti** – `js/data.js` → `CANDIDATES`. Čtvercová fotka do seznamu je `foto` (`assets/img/tym/`),
   grafická karta 4:5 na podstránce je `medailonek` (`assets/img/tym/medailonek/`, WebP 900×1125).
   Bez fotky se ukáže monogram. Text v `text: []` je volitelný – zobrazí se vedle karty.
2. **Videa** – `js/data.js` → `VIDEOS`. Nové video = nový objekt v poli, `yt` je ID z adresy `watch?v=XXXX`.
   PDF ke stažení pod videem: `dokumenty: [{ nazev, soubor, nahled, popis }]` (soubory do `assets/dokumenty/`).
3. **Formulář** – zaregistruj e-mail na https://web3forms.com (zdarma, 250 zpráv/měsíc),
   přijde Access Key → `SITE.formKey` v `js/data.js`. Do té doby formulář hlásí, že není zapojený.
4. **Program** – text je v `program.md`; po změně spusť `python tools/build_program.py` (přegeneruje `program.html`).
   Časová osa na homepage bere kapitoly z `PROGRAM` v `js/data.js` – při přidání kapitoly doplnit i tam.
   Obsah vpravo na stránce programu se staví automaticky z nadpisů. Skript na konci zkontroluje,
   že osa v `data.js` sedí na kapitoly (vypíše POZOR, když něco chybí nebo přebývá).
5. **Doména** – jakmile je známá, spusť jednou `python tools/set_domain.py https://www.domena.cz`.
   Indexaci to nezapne – na to je až `python tools/set_domain.py https://www.domena.cz --index`.
   Nahradí placeholder `DOPLNIT-DOMENA.cz` v canonical/og tazích, sitemap, robots a JSON-LD.
   S `--index` odstraní dočasné `noindex` a zapne ostrý `robots.txt` (do té doby Google web neindexuje).
   Bez toho nefunguje náhled při sdílení na Facebooku (potřebuje absolutní adresu obrázku).
6. **Po volbách** – `SITE.vysledkyUrl` míří rovnou na Rajhradice na volby.cz (formát z roku 2022);
   večer 10. 10. ověřit, že odkaz opravdu otevře Rajhradice.

Texty začínající slovem „Doplnit" (v `text`, `body`, `shrnuti`) se návštěvníkům nezobrazují –
jsou to poznámky pro redakci.

Po každé změně `css/style.css` nebo `js/*.js` zvedni číslo `?v=` v odkazech v HTML
(např. `js/main.js?v=20260915`), jinak si prohlížeče nechají starou verzi.

## Videa na homepage

Čtyři nejnovější videa se tahají **automaticky z YouTube kanálu** (`SITE.ytChannelId`).
Bez klíče jde přes veřejný RSS a službu rss2json.com (zdarma, 10 000 dotazů/den).
Pro jistotu můžeš doplnit `SITE.ytApiKey` (YouTube Data API v3 z Google Cloud Console,
zdarma) – pak jde načítání přímo z Googlu. Když nic nejde, ukáže se seznam z `VIDEOS`.

Video, které je na YouTube, ale ještě není ve `VIDEOS`, se na homepage ukáže taky
(bez shrnutí) a v archivu se otevře jen s přehrávačem – shrnutí doplníš přidáním záznamu.

## Cookies / GDPR

Web neukládá žádné sledovací cookies. YouTube přehrávač se načte až po souhlasu
(cookie lišta nebo tlačítko „Přehrát video“). Text v `gdpr.html` má místa
označená `[DOPLNIT]` – adresa správce, e-mail, datum.

## Lokální náhled

```
python -m http.server 8765
```
a otevřít http://localhost:8765 (přímo z disku přes `file://` nefunguje YouTube embed).

## Nasazení (zdarma)

- **Netlify Drop** – https://app.netlify.com/drop, přetáhnout složku `WEB`, hotovo. Vlastní doména se dá připojit v nastavení.
- nebo **GitHub Pages** / **Cloudflare Pages** – nahrát obsah složky.
