# Velkommen til Kon2ro! 
en "kontor kalender".

![Demo gif av Kontoro, hvordan sette inn tidspunkt i kalenderen. Musepeker som markerer område i kalenderen som skaper et "event" i kalender á la Google Calendar](https://i.ibb.co/s9by4shq/How-to-use-for-readme.gif)

Denne veiledningen krever at du har blitt lagt til av eier (Maklotin) til i Firebase. 

[Sjekk ut liste over dependencies her!](#liste-over-dependencies)

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

# Liste over dependencies

## Dependencies
Disse pakkene er nødvendige for at prosjektet skal fungere:

- **@fullcalendar/core**: ^6.1.17 - FullCalendar.
- **@fullcalendar/daygrid**: ^6.1.17 - Dagsplugin for FullCalendar.
- **@fullcalendar/interaction**: ^6.1.17 - Interaksjonsfunksjoner for FullCalendar (her blir det brukt for å legge til tidspunkt i kalenderen).
- **@fullcalendar/react**: ^6.1.17 - React-integrasjon for FullCalendar.
- **@fullcalendar/timegrid**: ^6.1.17 - Kloskkeslettvisning for FullCalendar.
- **@remix-run/node**: ^2.16.6 - Remix runtime for Node.js.
- **@remix-run/react**: ^2.16.6 - Remix runtime for React.
- **@remix-run/serve**: ^2.16.6 - Server for Remix-applikasjoner.
- **clsx**: ^2.1.1 - Sammenslåing av CSS-klasser, blir brukt sammen med Tailwind merge for å slå sammen CSS klasser i komponenter.
- **date-fns**: ^4.1.0 - Verktøy for å vise ukenummer.
- **firebase**: ^11.7.3 - Firebase SDK for klientapplikasjoner.
- **firebase-admin**: ^13.4.0 - Firebase SDK for serveradministrasjon.
- **react**: ^18.2.0 - Bibliotek for å bygge brukergrensesnitt.
- **react-dom**: ^18.2.0 - React DOM-spesifikke metoder.
- **remixicon**: ^4.6.0 - Ikonbibliotek for React Remix.
- **tailwind-merge**: ^3.3.0 - Slår sammen Tailwind CSS-klasser, blir brukt sammen med clsx.
- **uuid**: ^11.1.0 - Genererer unike ID-er.
- **zod**: ^3.24.4 - Validerings- og typesikkerhetsbibliotek - basically Typescript for API data.

---

## DevDependencies
Disse pakkene brukes under utvikling:

- **@remix-run/dev**: ^2.16.6 - Remix utviklingsverktøy.
- **@types/react**: ^18.2.20 - TypeScript-typer for React.
- **@types/react-dom**: ^18.2.7 - TypeScript-typer for React DOM.
- **@typescript-eslint/eslint-plugin**: ^6.7.4 - ESLint-plugin for TypeScript.
- **@typescript-eslint/parser**: ^6.7.4 - ESLint-parser for TypeScript.
- **autoprefixer**: ^10.4.19 - Legger til leverandørspesifikke CSS-prefikser.
- **eslint**: ^8.38.0 - Linter for JavaScript og TypeScript.
- **eslint-import-resolver-typescript**: ^3.6.1 - ESLint-importløser for TypeScript.
- **eslint-plugin-import**: ^2.28.1 - ESLint-plugin for importregler.
- **eslint-plugin-jsx-a11y**: ^6.7.1 - ESLint-plugin for tilgjengelighet i JSX.
- **eslint-plugin-react**: ^7.33.2 - ESLint-plugin for React-spesifikke regler.
- **eslint-plugin-react-hooks**: ^4.6.0 - ESLint-plugin for React-hooks.
- **postcss**: ^8.4.38 - CSS-transformasjonsverktøy.
- **tailwindcss**: ^3.4.4 - CSS-rammeverk for rask utvikling.
- **typescript**: ^5.1.6 - TypeScript-kompilator.
- **vite**: ^6.0.0 - Byggeverktøy for moderne webapplikasjoner.
- **vite-tsconfig-paths**: ^4.2.1 - Vite-plugin for TypeScript-konfigurasjonsstier.