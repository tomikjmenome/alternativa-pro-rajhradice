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
  // Odkaz na výsledky – přímo obec Rajhradice na volby.cz (kód obce 583766, okres Brno-venkov 6203).
  // Adresa je odvozená ze stejného formátu, jaký ČSÚ používal v letech 2014, 2018 a 2022 (jen "kv2022" → "kv2026").
  // 10. 10. 2026 večer ověřit, že opravdu otevře Rajhradice; kdyby ne, kliknout na volby.cz → Zastupitelstva obcí 2026 → Brno-venkov → Rajhradice.
  vysledkyUrl: "https://www.volby.cz/pls/kv2026/kv1111?xjazyk=CZ&xid=1&xdz=1&xnumnuts=6203&xobec=583766&xstat=0&xvyber=0",
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
  // Statistiky návštěvnosti – GoatCounter (goatcounter.com, zdarma, bez cookies → bez souhlasu).
  // Založit účet, zvolit kód webu (např. "alternativa") a sem dát celou adresu: "https://alternativa.goatcounter.com/count"
  goatcounter: "https://alternativaprorajhradice.goatcounter.com/count",
  // Heatmapy a nahrávky – Microsoft Clarity (clarity.microsoft.com, zdarma). Ukládá cookies,
  // proto se načte AŽ PO souhlasu v cookie liště ("Povolit vše"). Sem patří Project ID (10 znaků).
  clarity: "yj41rf8rxu",
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
    id: "spolky", yt: "MrJFwcPxU6E", typ: "prispevek", cislo: 8,
    titul: "Spolky", podtitul: "Tradice a spolky, které drží obec pohromadě",
    delka: "2:54", datum: "2026-09-18",
    shrnuti: "Hrkač, který před 28 lety vyrobil táta, jako připomínka, jak hluboko sahají rajhradické tradice. Spolky a sdružení chceme podporovat podle toho, co skutečně dělají a potřebují.",
    text: [
      "Ať jde o tradice jako hrkání a vynášení morény, nebo o spolky – stárci a stárky, chasa, rajhradické baby, fotbal, rybáři, Sokol, včelaři, vodáci, myslivci či senioři – všichni si zaslouží podporu obce, zastupitelstva i každého, kdo je ochotný přiložit ruku k dílu.",
      "Neříkáme, že obec spolky dosud nepodporovala – to rozhodně ne. Chceme se ale v dalším volebním období podívat, jak se jednotlivým spolkům vyvíjí členská základna, co potřebují ke své činnosti a jaké mají nároky – a podle toho je dotovat a pomáhat jim. Pokud jsme na někoho ve videu zapomněli, omlouváme se; myslíme i na něj.",
    ],
    body: [
      "Podpora tradic – hrkání, vynášení morény a dalších zvyků",
      "Podpora všech rajhradických spolků a sdružení ze strany obce",
      "Zjistit, jak se spolkům vyvíjí členská základna a co ke své činnosti potřebují",
      "Dotace rozdělovat podle skutečné činnosti a potřeb spolků",
    ],
  },
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
    delka: "5:20", datum: "2026-09-04",
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
    titul: "Most", podtitul: "Bezpečná cesta přes Svratku – a jízda na voru",
    delka: "2:58", datum: "2026-08-29",
    shrnuti: "Ryby už svůj přechod přes Svratku mají. Lidé na mostě do Rajhradu pořád balancují mezi kamiony. Chceme s krajem jednat o rozšíření mostu pro pěší nebo o samostatné lávce.",
    text: [
      "Most přes Svratku je jediná cesta na rajhradskou stranu – a pro pěší je to loterie: úzký profil, žádný bezpečný prostor a čekání, jestli kamion uhne o půl metru doleva, nebo doprava.",
      "Pokud dostaneme mandát, budeme usilovně jednat s Jihomoravským krajem a Správou a údržbou silnic JMK, aby se most vyřešil co nejdřív – buď opravou a rozšířením o prostor pro pěší, nebo samostatnou lávkou vedle stávajícího mostu. Kandidujeme s podporou Starostů a nezávislých, takže když bude potřeba, otevřeme téma i na celostátní úrovni.",
      "Jízda na voru – informace pro ty, kteří se na ni těší: pokud budeme ve vedení obce a úpravu mostu se nám nepodaří do čtyř let zrealizovat, bude lídr kandidátky demonstrativně převážet lidi z jedné strany na druhou na vlastnoručně vyrobeném voru. Ne v případě, že budeme v opozici.",
      "Děkujeme panu Petru Mixovi za účast a spolupráci při natáčení tohoto klipu.",
    ],
    body: [
      "Jednat s Jihomoravským krajem a SÚS JMK o řešení mostu",
      "Varianta 1: oprava a rozšíření mostu o prostor pro pěší",
      "Varianta 2: samostatná lávka pro pěší vedle mostu",
      "Využít podporu Starostů a nezávislých i na celostátní úrovni",
      "Když se to do čtyř let nepovede – vor",
    ],
  },
  {
    id: "nova-skola", yt: "WvZahOAc4mc", typ: "prispevek", cislo: 4,
    titul: "„Nová“ škola", podtitul: "Budova, která si o opravy neřekla",
    delka: "1:50", datum: "2026-08-26",
    shrnuti: "Před začátkem září se děti vrací do „nové“ i staré budovy školy. Ta si za desítky let neřekla o peníze na opravy a údržbu věcí, které měly sloužit dlouho – a není to vina budovy.",
    text: [
      "Blíží se konec prázdnin a s ním návrat žáků do obou budov základní školy. Krátký vzkaz z místa: škola si neřekla o poslední peníze na opravy a údržbu věcí, které měly sloužit desítky let – a zůstalo to bez povšimnutí. Není to vina té budovy.",
      "Druhou půlku videa tvoří lidová píseň „Chlapče, chlapče“ v našem podání – o tom, že když se něco zlomí, má se to dát spravit, a že hospodařit se člověk musí naučit. Přesně o tom je náš přístup k obecnímu majetku: starat se o to, co už máme.",
    ],
    body: [
      "Starat se o to, co už máme – pravidelná údržba místo odkládání",
      "Opravy plánovat dřív, než se z drobné závady stane havárie",
      "Audit stavu obecních budov jako první krok",
    ],
  },
  {
    id: "skolka-plot", yt: "so_Zh07OqZ8", typ: "prispevek", cislo: 3,
    titul: "Školka – plot", podtitul: "Brána, branka a plot, které nechrání",
    delka: "2:18", datum: "2026-08-23",
    shrnuti: "Areál mateřské školy je ráno i odpoledne otevřený komukoli – branky nejsou zabezpečené, plot je nízký a podezdívka chátrá. Jde o bezpečnost dětí.",
    text: [
      "Mateřská škola je krásné místo, ale kazí ho brána, plot a branka za rohem. Vstup do budovy zabezpečený je, branky do areálu ne – takže v ranních a odpoledních hodinách může dovnitř kdokoli.",
      "Plot je nízký (přes jeho horní hranu bez problémů vidí i člověk se 172 cm), podezdívka chátrá. Součástí našeho plánu na nové oplocení je i kóje na popelnice, aby k nádobám měli přístup jen pracovníci školky – a nestávalo se, že si u nich kdokoli něco „vybere“.",
    ],
    body: [
      "Nové oplocení areálu mateřské školy v dostatečné výšce",
      "Zabezpečené branky – do areálu jen ti, kdo tam patří",
      "Uzavřená kóje na popelnice s přístupem jen pro školku",
      "Oprava chátrající podezdívky",
    ],
  },
  {
    id: "vaha", yt: "qv4EMyDAgcU", typ: "prispevek", cislo: 2,
    titul: "Váha", podtitul: "Chodník k halám, přecházecí místa a střecha v havarijním stavu",
    delka: "3:44", datum: "2026-08-20",
    shrnuti: "Dopravní uzel „Na Váze“ slouží jako zastávka MHD, ale chybí chodník k průmyslové zóně, přecházet se musí v křižovatce a střecha váhy je v havarijním stavu.",
    text: [
      "„Na Váze“ je náš dopravní uzel a zastávka MHD. Co chybí pod nohama, je chodník – ten, který by vedl k halám v malé průmyslové zóně za obcí. Lidí tam proudí hodně a je to tady opravdu nebezpečné.",
      "Součástí chodníku by mělo být i přecházecí místo. Přecházet v tělese křižovatky je nereálné; pár desítek metrů dál, u vjezdu do areálu pana Zedníčka, by ale minimálně přecházecí místo vzniknout mohlo. Druhé by mohlo být u křižovatky u sýpky – podle katastru tam obec vlastní pruh, který by na chodník stačil.",
      "A do třetice samotná budova váhy: střešní krytina a plášť jsou v havarijním stavu. Zvenku průměr, uvnitř jsme nebyli, takže nesoudíme – ale střechu je potřeba řešit.",
    ],
    body: [
      "Chodník od Váhy k halám v průmyslové zóně",
      "Přecházecí místo u vjezdu do areálu, ne v tělese křižovatky",
      "Druhé přecházecí místo u křižovatky u sýpky na obecním pruhu",
      "Oprava střechy a pláště budovy váhy",
    ],
  },
  {
    id: "zahajeni", yt: "SIZeh_vMlas", typ: "prispevek", cislo: 1,
    titul: "Zahájení kampaně", podtitul: "Máme tým, máme plán, máme sílu věci měnit",
    delka: "3:22", datum: "2026-08-16",
    shrnuti: "Václav Mátl představuje Alternativu pro Rajhradice: vedení postavené na odpovědnosti, otevřenosti a zdravém rozumu. První krok? Poznat skutečný stav obce.",
    text: [
      "Jmenuji se Václav Mátl a jsem lídrem kandidátky Alternativa pro Rajhradice. Moje rodina tu má hluboké kořeny a stejně jako většině z vás mi záleží na tom, jak bude obec vypadat za 10, 20 nebo 50 let. Když člověk vidí, že by se některé věci daly dělat lépe nebo jinak, nestačí o tom mluvit – měl by pro to i něco udělat.",
      "Pokud nám dáte důvěru, naším prvním krokem bude důkladně poznat skutečný stav věcí: prověřit hospodaření, rozpracované i uzavřené projekty, závazky a nakládání s obecním majetkem. Nejde o hledání viníků – odpovědná rozhodnutí prostě nejdou dělat bez znalosti všech okolností.",
      "Starosta není člověk, který rozhoduje podle toho, koho zná nebo komu bude přát. Má být starostou všech občanů: naslouchat, být nestranný, lidi spojovat a vytvářet podmínky, aby se v Rajhradicích dobře žilo každému – kdo tu chce žít, vychovávat děti a jednou prožít důstojné stáří.",
      "V následujících týdnech vám postupně představíme naše hodnoty, vize a konkrétní návrhy – a taky styl komunikace, ve kterém chceme pokračovat i po volbách.",
    ],
    body: [
      "Nejdřív poznat skutečný stav: hospodaření, projekty, závazky, majetek",
      "Vedení postavené na odpovědnosti, otevřenosti a zdravém rozumu",
      "Starosta všech občanů – nestranný, naslouchající, spojující",
      "Konkrétní návrhy a otevřená komunikace i po volbách",
    ],
  },
  {
    id: "vitr-do-plachet", yt: "Og7AbaCcnms", typ: "song",
    titul: "Vítr do plachet", podtitul: "Kampaňový song",
    delka: "2:34", datum: "2026-09-08",
    shrnuti: "", text: [],
    body: [],
  },
  {
    id: "chlapce-chlapce", yt: "U6VuY1Eh0FM", typ: "song",
    titul: "Chlapče, chlapče", podtitul: "Lidová v našem podání",
    delka: "1:20", datum: "2026-09-08",
    shrnuti: "", text: [],
    body: [],
  },
  {
    id: "volebni-song", yt: "pmDTKAC59uc", typ: "song",
    titul: "Volební song", podtitul: "Znělka kampaně",
    delka: "1:31", datum: "2026-09-08",
    shrnuti: "", text: [],
    body: [],
  },
];

/* --- Struktura programu (kapitoly z program.html) -----------------------
   Ukazuje se na homepage jako časová osa. id kapitol = kotvy v program.html.
   ------------------------------------------------------------------------ */
const PROGRAM = [
  { id: "obdobi-1", roky: "2026–2030", sub: "Co chceme udělat a začít řešit", kapitoly: [
    ["otevrena-radnice-halo-radnice", "Otevřená radnice – „Haló, radnice“"],
    ["prehledne-hospodareni", "Přehledné hospodaření"],
    ["dlouhodobe-udrzitelne-investice", "Dlouhodobě udržitelné investice"],
    ["transparentni-odmenovani-zastupitelu", "Transparentní odměňování zastupitelů"],
    ["pece-o-obecni-majetek", "Péče o obecní majetek"],
    ["bezpecnejsi-doprava-a-omezeni-tranzitu", "Bezpečnější doprava a omezení tranzitu"],
    ["ulice-ktere-funguji", "Ulice, které fungují"],
    ["most-pres-svratku-a-bezpecnejsi-cesta-do", "Most přes Svratku"],
    ["materska-skola-a-jeji-okoli", "Mateřská škola a její okolí"],
    ["zakladni-skola-dalsi-rozvoj", "Základní škola – další rozvoj"],
    ["spolky-hriste-a-ziva-obec", "Spolky, hřiště a živá obec"],
    ["reuse-centrum-dejme-vecem-druhou-sanci", "Reuse centrum"],
    ["krizove-a-hmotne-rezervy-obce", "Krizové a hmotné rezervy obce"],
    ["promena-prostoru-na-vaze", "Proměna prostoru Na Váze"],
    ["misto-pro-seniory-a-setkavani", "Místo pro seniory a setkávání"],
  ] },
  { id: "obdobi-2", roky: "2030–2038", sub: "Co musíme začít připravovat", kapitoly: [
    ["investicni-plan-pro-dalsi-desetileti", "Investiční plán pro další desetiletí"],
    ["centrum-obce-pro-dalsi-generace", "Centrum obce pro další generace"],
    ["pece-o-seniory-nove-sluzby", "Péče o seniory – nové služby"],
  ] },
  { id: "obdobi-3", roky: "2040+", sub: "Kam chceme Rajhradice dlouhodobě směřovat", kapitoly: [
    ["vize-pro-dalsi-generace", "Vize pro další generace"],
    ["spoluprace-v-regionu", "Spolupráce v regionu"],
    ["voda-v-krajine-a-bezpeci-obce", "Voda v krajině a bezpečí obce"],
    ["cistirna-odpadnich-vod", "Čistírna odpadních vod"],
  ] },
];

const VIDEO_TYPY = {
  prispevek: "Příspěvky",
  song: "Songy",
  ostatni: "Ostatní",
};
