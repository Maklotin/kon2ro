# Velkommen til Kon2ro! 
en "kontor kalender".

![Demo gif av Kontoro, hvordan sette inn tidspunkt i kalenderen. Musepeker som markerer område i kalenderen som skaper et "event" i kalender á la Google Calendar](https://i.ibb.co/s9by4shq/How-to-use-for-readme.gif)

Denne veiledningen krever at du har blitt lagt til av eier (Maklotin) til i Firebase. 

## Lokalt setup
### "Utstyr":
- Kodeeditor (Visual Studio Code, Notepad++)
    - [Last ned Visual Studio Code her](https://code.visualstudio.com/download)
    - Denne veiledningen tar utgangspunkt i Visual Studio Code.
- Github bruker 
    - [Registrer en Github bruker her](https://github.com/signup)
    - Github bruker er mest nødvendig for å laste opp kodeendringer. 
- Git
    - [Last ned Git her](https://git-scm.com/downloads)
    - Git brukes til å laste ned og eventuelt laste opp endringer til og fra prosjektet.
- NodeJS
    - [Last ned NodeJS her](https://nodejs.org/en/download)
    - NodeJS trengs for å laste ned pakker til prosjektet og kjøre prosjektet lokalt.
- Nettleser

### Veiledninger for å sette opp utstyret
Det skal stort sett bare være å laste ned og installere det, men hvis du er usikker så kan du sjekke ut disse veiledningene:
- [Videoveiledning på å installere Visual Studio Code](https://www.youtube.com/watch?v=cu_ykIfBprI)
- [Tekstveiledning på å sette opp NodeJS og npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Videoveiledning på å installere Git og klone repo](https://www.youtube.com/watch?v=ne5ACsz-k2o)

### Steg 1
Klon dette repoet. f. Eks åpne Git Bash, naviger til mappen du ønsker å ha prosjektet i (sjekk videoveiledning om det trengs) og skriv:
```bash
git clone https://github.com/Maklotin/kon2ro.git
```

### Steg 2
Åpne prosjektet i Visual Studio Code, trykk oppe på menyen "Terminal" -> "New Terminal".

### Steg 3
I terminallen skriver du:
```bash
npm install
```
Dette installerer alle pakker som blir brukt. Pakkene trengs for blant annet at innlogging og brukerregistrering kan funke.

### Steg 4
Installer firebase-tools på maskinen ved å skrive i terminalen
```bash
npm install -g firebase-tools
```
"-g" laster ned firebase-tools globalt på PCen i motsetning til de andre pakkene som bare installeres lokalt til prosjektet. 

### Steg 5
Etter firebase har blitt installert så skriver du i terminalen
```bash
firebase login
```
Så vil du få spørsmål om 
```bash
Allow Firebase to collect CLI and Emulator Suite usage and error reporting information? (Y/n) 
```
Og da svarer du med hva du vil, det påvirker ikke veiledningen. Svar med å skrive "y" for "yes", eller "n" for "no" og trykk enter. 
Etter du har svart vil nettleseren åpne og da velger du kontoen som har blitt lagt til i firebase prosjektet (kontakt Maklotin om du er usikker). 

### Steg 6
Når innlogging er ferdig så skriver du
```bash
npm run dev
```
i terminalen. Da vil det først stå
```bash
> dev
> remix vite:dev
```
også når det står
```bash
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
kan du åpne nettleseren din og skrive inn [http://localhost:5173](http://localhost:5173/) for å få opp nettsiden lokalt. Da er det bare å begynne å kode eller hva enn du ønsker!


### BONUS - Steg 7
Åpne nettleseren, gå til [firebase.google.com](https://firebase.google.com/) og trykk på "Go to console". Logg inn på Google brukeren som Maklotin har lagt til i firebase (kontakt Maklotin om du er usikker). Velg kon2ro prosjektet, og vipps så har du tilgang til database
n, brukerinnloggingsmetoder og alt annet av skytjenester!