Music player project for the Client side apps in JS course at CTU
<br>
<br>
<br>

<h1>Turmixer CZ</h1>

Hudební přehrávač s možností tvorby playlistů a vizualizací hudby.
V přehrávači jsou 2 typy playlistů: immutable a custom (upravitelný). Immutable playlist nelze odstranit ani měnit. V projektu je zejména kvůli testovacím účelům a kvůli splnění podmínky prototypové dědičnosti. V immutable playlistu bohužel kvůli CORS nefunguje vizualizace hudby. V Custom playlistech s vizualizací samozřejmě problém není.

Playlist je možné vytvořit stiskem talčítka '+' v levé sekci aplikace. Tuto sekci je možné otevírát a zavírat pomocí tlačítka 'show playlist'. K vytvoření playlistu je nutné zadat jeho název. Playlist je možné odstranit tlačítkem '-'. Písničky lze do playlistu přidávat metodou drag and drop. Cílová oblast je zřejmá: část aplikace zobrazující písničky v playlistu. Hudbu je dále možné příslušnými tlačítky pozastavit nebo ztišit.

Vytvořené playlisty setrvají i po ukončení sessiony. Jsou totiž ukládány do <strong>indexedb</strong> ze kterého jsou při otevření aplikace načteny. K hezkému zobrazení písniček je nutné, aby byly správně anotovány ve smyslu <strong>id3v*</strong> tagu.

## Splněné body dle hodnocení
