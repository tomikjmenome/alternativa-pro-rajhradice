/* =========================================================================
   DATA WEBU – Alternativa pro Rajhradice
   Tady se edituje všechno, co se na webu mění: kandidáti, videa, kontakty.
   Do HTML se nesahá.
   ========================================================================= */

const SITE = {
  nazev: "Alternativa pro Rajhradice",
  volby: new Date("2026-10-09T14:00:00+02:00"),      // začátek voleb (pá 14:00)
  volbyKonec: new Date("2026-10-10T14:00:00+02:00"), // uzavření místností (so 14:00)
  volbyText: "9.–10. října 2026",
  // Odkaz na výsledky – po sečtení sem dej přímý odkaz na Rajhradice na volby.cz
  vysledkyUrl: "https://www.volby.cz/",
  telefon: "732 760 085",
  telefonHref: "tel:+420732760085",
  email: "alternativaprorajhradice@gmail.com",
  // Formulář "Napište nám" – Web3Forms (zdarma, 250 zpráv/měsíc).
  // 1) jdi na https://web3forms.com, zadej e-mail, na který mají chodit zprávy
  // 2) přijde ti Access Key – vlož ho sem
  formKey: "bedd374c-8077-4778-b79d-fd49fc3e4be7",
  // YouTube – ID kanálu (pro automatické načítání nejnovějších videí).
  ytChannelId: "UC5KAKrEma-HRZMWTEt9etEw",
  // Volitelné: klíč YouTube Data API v3 (Google Cloud Console, zdarma).
  // Když je prázdný, použije se veřejný RSS kanál přes rss2json.com.
  ytApiKey: "",
  // Kolik nejnovějších videí ukázat na homepage
  ytLatestCount: 4,
};

const SOCIALS = [
  { id: "facebook",  nazev: "Facebook",  url: "https://www.facebook.com/stolarstvimatl",           handle: "Alternativa pro Rajhradice" },
  { id: "instagram", nazev: "Instagram", url: "https://www.instagram.com/alternativa_pro_rajhradice/", handle: "@alternativa_pro_rajhradice" },
  { id: "youtube",   nazev: "YouTube",   url: "https://www.youtube.com/@AlternativaProRajhradice", handle: "@AlternativaProRajhradice" },
];

/* --- Kandidátka ---------------------------------------------------------
   id       – pro URL (kandidati.html?k=id), jen malá písmena bez diakritiky
   foto       – čtvercová fotka do seznamu (assets/img/tym/xxx.jpg); když chybí, ukáže se monogram
   medailonek – grafická karta 4:5 (assets/img/tym/medailonek/xxx.webp), ukáže se na podstránce
   claim      – jedna věta, ukáže se v detailu jako citát
   text       – volitelné odstavce pod medailonkem (nechat [] když nejsou)
   ------------------------------------------------------------------------ */
const CANDIDATES = [
  {
    id: "vaclav-matl",
    poradi: 1,
    jmeno: "Václav Mátl",
    role: "Lídr kandidátky · kandidát na starostu",
    profese: "Podnikatel, automobilový průmysl a obchod",
    vek: 33,
    foto: "assets/img/tym/01-vaclav-matl.jpg",
    medailonek: "assets/img/tym/medailonek/01-vaclav-matl.webp",
    claim: "",
    text: [],
    temata: [],
  },
  { id: "vendula-kadlcikova", poradi:  2, jmeno: "Ing. Vendula Kadlčíková", role: "Kandidátka č. 2", profese: "Podnikatelka, výroba ocelových konstrukcí", vek: 31, foto: "assets/img/tym/02-vendula-kadlcikova.jpg", medailonek: "assets/img/tym/medailonek/02-vendula-kadlcikova.webp", claim: "", text: [], temata: [] },
  { id: "michal-matl", poradi:  3, jmeno: "Michal Mátl", role: "Kandidát č. 3", profese: "Podnikatel, stavebnictví", vek: 29, foto: "assets/img/tym/03-michal-matl.jpg", medailonek: "assets/img/tym/medailonek/03-michal-matl.webp", claim: "", text: [], temata: [] },
  { id: "filip-vagner", poradi:  4, jmeno: "Filip Vágner", role: "Kandidát č. 4", profese: "OSVČ, výrobce nábytku", vek: 32, foto: "assets/img/tym/04-filip-vagner.jpg", medailonek: "assets/img/tym/medailonek/04-filip-vagner.webp", claim: "", text: [], temata: [] },
  { id: "ondrej-vykoupil", poradi:  5, jmeno: "Ondřej Vykoupil", role: "Kandidát č. 5", profese: "OSVČ, stavebnictví", vek: 32, foto: "assets/img/tym/05-ondrej-vykoupil.jpg", medailonek: "assets/img/tym/medailonek/05-ondrej-vykoupil.webp", claim: "", text: [], temata: [] },
  { id: "daniel-biznar", poradi:  6, jmeno: "Mgr. Daniel Biznár", role: "Kandidát č. 6", profese: "Servisní manažer", vek: 46, foto: "assets/img/tym/06-daniel-biznar.jpg", medailonek: "assets/img/tym/medailonek/06-daniel-biznar.webp", claim: "", text: [], temata: [] },
  { id: "natalie-wismekova", poradi:  7, jmeno: "Ing. Natalie Wismeková", role: "Kandidátka č. 7", profese: "Strategická analytička (obor obchod)", vek: 26, foto: "assets/img/tym/07-natalie-wismekova.jpg", medailonek: "assets/img/tym/medailonek/07-natalie-wismekova.webp", claim: "", text: [], temata: [] },
  { id: "tomas-hajek", poradi:  8, jmeno: "Tomáš Hájek", role: "Kandidát č. 8", profese: "Student VUT", vek: 20, foto: "assets/img/tym/08-tomas-hajek.jpg", medailonek: "assets/img/tym/medailonek/08-tomas-hajek.webp", claim: "", text: [], temata: [] },
  { id: "jan-matl", poradi:  9, jmeno: "Jan Mátl", role: "Kandidát č. 9", profese: "Zámečník", vek: 38, foto: "assets/img/tym/09-jan-matl.jpg", medailonek: "assets/img/tym/medailonek/09-jan-matl.webp", claim: "", text: [], temata: [] },
  { id: "lukas-kordik", poradi: 10, jmeno: "Lukáš Kordík", role: "Kandidát č. 10", profese: "Projektant elektro", vek: 28, foto: "assets/img/tym/10-lukas-kordik.jpg", medailonek: "assets/img/tym/medailonek/10-lukas-kordik.webp", claim: "", text: [], temata: [] },
  { id: "ondrej-matl", poradi: 11, jmeno: "Ondřej Mátl", role: "Kandidát č. 11", profese: "Zámečník", vek: 36, foto: "assets/img/tym/11-ondrej-matl.jpg", medailonek: "assets/img/tym/medailonek/11-ondrej-matl.webp", claim: "", text: [], temata: [] },
  { id: "vaclav-matl-58", poradi: 12, jmeno: "Václav Mátl", role: "Kandidát č. 12", profese: "OSVČ, truhlář", vek: 58, foto: "assets/img/tym/12-vaclav-matl.jpg", medailonek: "assets/img/tym/medailonek/12-vaclav-matl-58.webp", claim: "", text: [], temata: [] },
  { id: "vladimir-nerud", poradi: 13, jmeno: "Vladimír Nerud", role: "Kandidát č. 13", profese: "Masér, důchodce", vek: 67, foto: "assets/img/tym/13-vladimir-nerud.jpg", medailonek: "assets/img/tym/medailonek/13-vladimir-nerud.webp", claim: "", text: [], temata: [] },
  { id: "jan-skorpik", poradi: 14, jmeno: "Jan Škorpík", role: "Kandidát č. 14", profese: "Obráběč kovů", vek: 50, foto: "assets/img/tym/14-jan-skorpik.jpg", medailonek: "assets/img/tym/medailonek/14-jan-skorpik.webp", claim: "", text: [], temata: [] },
  { id: "jiri-minarik", poradi: 15, jmeno: "Jiří Minařík", role: "Kandidát č. 15", profese: "Operátor výroby", vek: 55, foto: "assets/img/tym/15-jiri-minarik.jpg", medailonek: "assets/img/tym/medailonek/15-jiri-minarik.webp", claim: "", text: [], temata: [] },
];

/* --- Videoarchiv --------------------------------------------------------
   yt       – ID videa z YouTube (to za watch?v=)
   typ      – "prispevek" (kampaňový příspěvek) | "song" | "ostatni"
   cislo    – číslo příspěvku (jen u typu prispevek)
   shrnuti  – 1–2 věty, co video říká (ukazuje se v seznamu)
   body     – "co navrhujeme" – odrážky na podstránce
   text     – odstavce delšího popisu na podstránce
   dokumenty – [{ nazev, soubor, nahled, popis }] – PDF ke stažení pod videem (volitelné)
   ------------------------------------------------------------------------ */
const VIDEOS = [
  {
    id: "chodniky", yt: "GzWIg-RnGag", typ: "prispevek", cislo: 7,
    titul: "Chodníky", podtitul: "Známkujeme stav – od 1 do 5",
    delka: "4:08", datum: "2026-09-11",
    shrnuti: "Procházka obcí za soumraku. Každý chodník dostane známku jako ve škole – a podle známky se určí pořadí oprav.",
    text: [
      "Dnes se opravuje to, na co zrovna dojde řeč. Nikde není soupis, v jakém stavu který chodník je. Navrhujeme jednoduchý systém: projít a oznámkovat každý chodník v obci stupnicí 1 až 5 – stejnou jako ve škole.",
      "Pětka je havarijní stav (ostré hrany, riziko úrazu) a řeší se okamžitě. Čtyřky jdou do plánu oprav a rozpočtu. Celý soupis zveřejníme, ať každý vidí, co je na řadě a proč.",
    ],
    body: [
      "Projít a oznámkovat všechny chodníky v obci",
      "Stupnice 1 až 5 – stejná jako ve škole",
      "Pětky řešit okamžitě, hrozí úraz",
      "Čtyřky zařadit do plánu oprav a rozpočtu",
      "Celý soupis zveřejnit, ať to každý vidí",
    ],
    dokumenty: [
      { nazev: "Hodnocení stavu chodníků a plán oprav", soubor: "assets/dokumenty/chodniky-hodnoceni-a-plan-oprav.pdf", nahled: "assets/dokumenty/chodniky-hodnoceni-a-plan-oprav.webp", popis: "Kompletní návrh: pětibodová stupnice, pořadí oprav, veřejný plán. PDF, 1 strana, 61 kB." },
    ],
  },
  {
    id: "parkovani", yt: "2JCeqDv1BW4", typ: "prispevek", cislo: 6,
    titul: "Parkování na Hlavní", podtitul: "Kiss & Ride, chodník 120 cm a stání pod 30°",
    delka: "4:14", datum: "2026-09-04",
    shrnuti: "K+R před školou funguje, ale je ho málo. Protáhnout ho k obchodu a školce = 8 až 10 míst navíc a konec ranního chaosu na Trávníkách.",
    text: [
      "Parkoviště Kiss & Ride před školou je dobře vymyšlené a funguje – jen je ho málo. Navrhujeme s ním pokračovat před obchodem a před školkou, tím získáme minimálně 8 až 10 míst a ulevíme ulici Trávníky i rannímu chaosu.",
      "Naproti škole je chodník široký 120 cm. Když u něj zaparkuje kombík, zabere 60 cm – a maminka s kočárkem nebo vozíčkář už neprojede. Jedna z variant je stání pod úhlem 30°: pětimetrové auto zabere zhruba o 120 cm méně, auta stojí bezpečněji a chodník i krajnice se uvolní.",
      "Jde zatím jen o vizualizaci možného řešení. Konkrétní podobu bychom před realizací probrali s Policií ČR, příslušnými úřady i s lidmi, kterých se úpravy přímo dotknou.",
    ],
    body: [
      "Zónu K+R protáhnout od školy přes obchod ke školce",
      "+8 až 10 parkovacích míst",
      "Chodník na Hlavní držet průchozí pro kočárek i vozík",
      "Zvážit šikmé stání pod 30° – ušetří ~120 cm na auto",
      "Řešení probrat s policií, úřady a sousedy",
    ],
  },
  {
    id: "most", yt: "v_AmuNhgtZY", typ: "prispevek", cislo: 5,
    titul: "Most", podtitul: "Úprava mostu – a jízda na voru",
    delka: "", datum: "2026-08-29",
    shrnuti: "Úprava mostu je jeden z hlavních bodů. A pokud by se ji do čtyř let nepodařilo zrealizovat, vezmeme vás na vor.",
    text: [
      "Doplnit shrnutí videa: v jakém stavu most je, co přesně chceme upravit a proč to nejde odkládat.",
      "Jízda na voru – informace pro ty, kteří se na ni těší: platí pouze v případě, že budeme ve vedení obce a úpravu mostu se nám nepodaří zrealizovat během čtyř let. Ne v případě, že budeme v opozici.",
      "Děkujeme panu Petru Mixovi za účast a spolupráci při natáčení tohoto klipu.",
    ],
    body: ["Doplnit body návrhu"],
  },
  {
    id: "nova-skola", yt: "WvZahOAc4mc", typ: "prispevek", cislo: 4,
    titul: "„Nová“ škola", podtitul: "",
    delka: "", datum: "2026-08-26",
    shrnuti: "Doplnit shrnutí videa.",
    text: ["Doplnit shrnutí videa."],
    body: ["Doplnit body návrhu"],
  },
  {
    id: "skolka-plot", yt: "so_Zh07OqZ8", typ: "prispevek", cislo: 3,
    titul: "Školka – plot", podtitul: "",
    delka: "", datum: "2026-08-23",
    shrnuti: "Doplnit shrnutí videa.",
    text: ["Doplnit shrnutí videa."],
    body: ["Doplnit body návrhu"],
  },
  {
    id: "vaha", yt: "qv4EMyDAgcU", typ: "prispevek", cislo: 2,
    titul: "Váha", podtitul: "",
    delka: "", datum: "2026-08-20",
    shrnuti: "Doplnit shrnutí videa.",
    text: ["Doplnit shrnutí videa."],
    body: ["Doplnit body návrhu"],
  },
  {
    id: "zahajeni", yt: "SIZeh_vMlas", typ: "prispevek", cislo: 1,
    titul: "Zahájení kampaně", podtitul: "Máme tým, máme plán, máme sílu věci měnit",
    delka: "", datum: "2026-08-16",
    shrnuti: "Je čas na změnu. Rajhradice si zaslouží vedení, které bude pracovat efektivně, otevřeně a s jasnou vizí.",
    text: [
      "Nechceme jen pokračovat ve starých kolejích – chceme naši obec posunout dál odpovědným přístupem, transparentností a skutečnými výsledky.",
      "V kampani se můžete těšit na věcné připomínky (co v obci drhne), nápady a vize (kam se posuneme) a varianty řešení (vždy je víc cest).",
    ],
    body: ["Věcné připomínky – co v obci drhne", "Nápady a vize – kam se posuneme", "Varianty řešení – vždy je víc cest"],
  },
  {
    id: "vitr-do-plachet", yt: "Og7AbaCcnms", typ: "song",
    titul: "Vítr do plachet", podtitul: "Song",
    delka: "2:34", datum: "2026-09-08",
    shrnuti: "Kampaňový song.",
    text: ["Doplnit pár vět o písničce – kdo ji složil, kdo zpívá."],
    body: [],
  },
  {
    id: "chlapce-chlapce", yt: "U6VuY1Eh0FM", typ: "song",
    titul: "Chlapče, chlapče", podtitul: "Song",
    delka: "", datum: "2026-09-08",
    shrnuti: "Kampaňový song.",
    text: ["Doplnit pár vět o písničce."],
    body: [],
  },
  {
    id: "volebni-song", yt: "pmDTKAC59uc", typ: "song",
    titul: "Volební song", podtitul: "Song",
    delka: "", datum: "2026-09-08",
    shrnuti: "Kampaňový song.",
    text: ["Doplnit pár vět o písničce."],
    body: [],
  },
];

const VIDEO_TYPY = {
  prispevek: "Příspěvky",
  song: "Songy",
  ostatni: "Ostatní",
};
