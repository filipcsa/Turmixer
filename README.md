<h1>Turmixer</h1>

Music player project for the Client side apps in JS course at CTU

![sample2](https://user-images.githubusercontent.com/46780723/58767173-e58fda80-8587-11e9-8563-df88e0a8e0f0.PNG)
<br>
<br>
<br>

<h1>Turmixer CZ</h1>

Cílem projektu bylo vytvoření hudebního přehrávače s možností tvorby playlistů a vizualizací hudby.
V přehrávači jsou 2 typy playlistů: immutable a custom (upravitelný). Immutable playlist nelze odstranit ani měnit. V projektu je zejména kvůli testovacím účelům a kvůli splnění podmínky prototypové dědičnosti. V immutable playlistu bohužel kvůli CORS nefunguje vizualizace hudby. V Custom playlistech s vizualizací samozřejmě problém není.

Playlist je možné vytvořit stiskem talčítka '+' v levé sekci aplikace. Tuto sekci je možné otevírát a zavírat pomocí tlačítka 'show playlist'. K vytvoření playlistu je nutné zadat jeho název. Playlist je možné odstranit tlačítkem '-'. Písničky lze do playlistu přidávat metodou drag and drop. Cílová oblast je zřejmá: část aplikace zobrazující písničky v playlistu. Hudbu je dále možné příslušnými tlačítky pozastavit nebo ztišit.

![sample3](https://user-images.githubusercontent.com/46780723/58767287-42d85b80-8589-11e9-9708-caad61d8e0b7.PNG)

Vytvořené playlisty setrvají i po ukončení sessiony. Jsou totiž ukládány do <strong>indexedb</strong> ze kterého jsou při otevření aplikace načteny. K hezkému zobrazení písniček je nutné, aby byly správně anotovány ve smyslu <strong>id3v*</strong> tagu.

K rozpoznávání tagů jsem využil knihovnu musicmetadata (https://github.com/leetreveil/musicmetadata). V některých dalších částech kódu jsem se inspiroval příklady na MDN.

## Splněné body dle hodnocení
* Cíl projektu, popis ...
    * uvedeno zde
* Validní použití HTML
   * Jop
* Podpora browserů
   * Testováno v Chrome a Firefox
* Správné použití značek
   * Asi ano
* Grafika SVG / Canvas
   * Obojí se objeví
* Média
   * je to hudební přehrávač ...
* Formulářové prvky
   * validace a placeholder
* Offline aplikace
   * ??? až na immutable playlist není připojení potřeba
* Pokročilé selektory
   * složitý je relativní, ale asi ano
* Vendor prefixy
   * Jop u indexeddb podle MDN
* CSS transformace
   * Nop
* CSS transition
   * Jop, schování sekce s playlisty
* Media queries
   * Jop, sekce s playlisty se schová automagicky
* OOP přístup
   * třídy pro playlisty a songy, i dědičnost
* JS framework
   * Nop
* Pokročilé JS API   
   * S indexeddb jsem dost bojoval, tak je to asi pokročilé. Taky drag n' drop.
* Funkční historie
   * Nenene
* Ovládání médií
   * Jojojo
* Offline aplikace
   * Asi ne?
* JS práce se SVG
   * Jen jako ikonky, takže spíše ne. Vizualizace je pře canvas.
    
