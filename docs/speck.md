# PlayDate – Projektspezifikation

> **Lernkontext:** Diese Spezifikation gehört zu meinem Trainingsprojekt im React-Modul der einjährigen DCI-Weiterbildung zur Web- und Softwareentwicklerin. Erfundene Demo-Daten sind erlaubt, echte personenbezogene Daten nicht.

## 1. Kurzbeschreibung

PlayDate ist eine mobile-first Web-App, mit der Eltern private Spieletreffen für ihre Kinder planen, verwalten und mit anderen Familien abstimmen können. Termine und Familiendaten sind ausschließlich nach einer Anmeldung sichtbar.

Der aktuelle Stand ist ein Frontend-Prototyp. Funktionen, die ein Backend oder externe Freigaben benötigen, sind als Zielanforderungen beschrieben und klar vom bereits umgesetzten Stand getrennt.

Der bewertete Trainingsumfang umfasst Phase 0 und 1. React, TypeScript, Komponentenarchitektur, Routing, Formulare, Hooks, Context, Frontend-Persistenz, Responsive Design und Tests sind praktische Lernnachweise. Backend- und Produktionsanforderungen dienen nur als späterer Ausblick.

**Dokumentationsstand: 18. Juli 2026.** Der Prototyp besteht die lokale Prüfkette aus Oxlint, 66 Vitest-Tests, TypeScript und Produktions-Build ohne Fehler. 40 Playwright-Szenarien sind eingerichtet, aber noch nicht auf realen Browserinstallationen und physischen Geräten nachgewiesen. Er besitzt bewusst kein produktives Backend und ist nicht für echte Kinderdaten freigegeben.

Für die Phasen 2 bis 9 wurde „React-Simulation, lokal zuerst“ gewählt. Repository, Verbindungen, Erinnerungen, Kommentare, Aktivitätsverlauf sowie Export und Löschung werden lokal geübt. Serverseitige Sicherheit, echte Synchronisation und Produktivbetrieb bleiben außerhalb dieser Simulation.

[`phase1Datenschutz.md`](phase1Datenschutz.md) enthält den für die Übung freigegebenen MVP-Entwurf, die Rollenmatrix, das Dateninventar, Übungs-Löschfristen, die Anbieterübersicht, Pflichttext-Muster, eine DSFA-Vorprüfung und das Bedrohungsmodell. Eine echte Rechts- oder Produktfreigabe ist damit ausdrücklich nicht verbunden.

## 2. Produktziele

- PlayDates schnell und übersichtlich planen
- Absprachen zu Ort, Uhrzeit und Mitbringseln an einem Ort sammeln
- eigene Kinder in einem Familienprofil verwalten
- freigegebene Kindergeburtstage verbundener Familien anzeigen
- Einladungen einfach teilen und Termine in Kalender übernehmen
- private Daten von Kindern besonders sparsam und geschützt behandeln
- eine mobile, barrierearme und installierbare Oberfläche anbieten

## 3. Zielgruppe

Die Hauptzielgruppe sind Eltern und Sorgeberechtigte, die regelmäßig Spieletreffen für ein oder mehrere Kinder organisieren. Die App soll auch für Menschen verständlich sein, die wenig Erfahrung mit digitalen Kalendern oder Planungswerkzeugen haben.

## 4. Begriffe und Rollen

- **Nutzer:** angemeldete erwachsene Person mit eigenem Konto
- **Familie:** Profil eines Nutzers mit Familienname und Kindern
- **Kind:** Eintrag mit Name, Geburtstag und Freigabeeinstellung
- **Verbundene Familie:** Familie, mit der Daten ausdrücklich geteilt werden
- **PlayDate:** geplantes Spieletreffen zwischen mindestens zwei Kindern
- **Einladung:** freigegebener Link oder eine Nachricht zu einem PlayDate

Kinder erhalten im ersten Produktumfang keine eigenen Konten.

## 5. Funktionsumfang

### 5.1 Anmeldung und Zugriffsschutz

- Nutzer können sich über Clerk anmelden und abmelden.
- PlayDates und Familiendaten werden nur nach erfolgreicher Anmeldung angezeigt.
- Lokal gespeicherte Prototyp-Daten werden anhand der Clerk User-ID getrennt.
- Nicht angemeldete Personen sehen keine privaten Termindetails.

### 5.2 Familienprofil

- Nutzer können einen Familiennamen speichern.
- Nutzer können beliebig viele Kinder hinzufügen, bearbeiten und entfernen.
- Pro Kind können Name und Geburtstag gespeichert werden.
- Pro Kind kann festgelegt werden, ob der Geburtstag geteilt wird.
- Beim Erstellen eines PlayDates wird das eigene Kind aus dieser Liste ausgewählt.
- Freigegebene Geburtstage verbundener Familien werden in einer Übersicht angezeigt.

Für die produktive Version soll standardmäßig nur Tag und Monat geteilt werden. Das Geburtsjahr darf nur mit einer eigenen, ausdrücklichen Einwilligung sichtbar sein.

### 5.3 PlayDates

Ein PlayDate enthält mindestens:

- Titel
- eigenes Kind
- anderes Kind beziehungsweise Kontakt
- Datum
- Uhrzeit
- Treffpunkt
- Mitbringsel oder Aufgaben
- Status „Bestätigt“ oder „Ausstehend“

Nutzer können PlayDates erstellen, anzeigen, bearbeiten und löschen. Vor dem Löschen muss eine Bestätigung erscheinen.

### 5.4 Einladungen und WhatsApp

- Einladungen können über die Web-Share-Funktion geteilt werden.
- WhatsApp kann über einen vorbereiteten Teilen-Link geöffnet werden.
- Eine Einladung darf nur die für den Zweck notwendigen Informationen enthalten.
- Automatische WhatsApp-Nachrichten gehören nicht zum Prototyp und benötigen später die offizielle WhatsApp Business Platform sowie ein ausdrückliches Opt-in.

### 5.5 Kalender

- Eine responsive Monatsansicht zeigt die vorhandenen PlayDates am jeweiligen Tag.
- Auf kleinen Displays wird nach der Monatsmatrix eine gut lesbare Liste für den ausgewählten Tag angezeigt.
- Der Monat kann über beschriftete, tastaturbedienbare Schaltflächen gewechselt werden.
- Ein Klick auf einen Termin öffnet dessen Details in einem modalen Layer; Fokus und Schließen per Escape werden vom nativen Dialog unterstützt.
- Alle PlayDates können als standardkonforme `.ics`-Datei exportiert werden.
- Einzelne PlayDates können über einen vorbereiteten Link in Google Kalender geöffnet werden.
- Eine echte, dauerhafte Synchronisation mit Google oder Microsoft Kalender ist ein späterer Produktionsschritt und benötigt OAuth, ein Backend und möglichst kleine Kalenderberechtigungen.

### 5.6 Fotos und Kommentare

Fotos und Kommentare gehören zum geplanten Produktumfang, sind im aktuellen Prototyp aber noch nicht technisch umgesetzt.

Die Route `/photos` macht den geplanten Ablauf sichtbar, nimmt aber noch keine Dateien entgegen. Ein produktiver Freigabelink benötigt Anmeldung, kurzlebige widerrufbare Tokens, serverseitige Berechtigungsprüfung, verschlüsselten EU-Dateispeicher und dokumentierte Einwilligung. Der Schlüssel darf nicht als alleiniger Schutz im Link liegen.

Für die produktive Umsetzung gelten folgende Anforderungen:

- Zugriff nur für ausdrücklich eingeladene Familien
- dokumentierte Einwilligung der Sorgeberechtigten vor Foto-Uploads
- widerrufbare Einwilligungen
- Rollen- und Berechtigungsprüfung auf dem Server
- definierte Löschfristen und vollständige Löschmöglichkeit
- verschlüsselte Übertragung und bevorzugt Hosting in der EU beziehungsweise im EWR

### 5.7 Erinnerungen

- Im Formular kann eine Erinnerung vorgesehen werden.
- Produktive E-Mail-, Push- oder Kalendererinnerungen benötigen ein Backend mit Queue oder Worker.
- Erinnerungen müssen freiwillig aktivierbar und wieder abschaltbar sein.
- Zeitzone und Sommerzeit müssen korrekt berücksichtigt werden.

### 5.8 Darstellung und Installation

- Die App bietet Light Mode, Dark Mode und die Systemeinstellung.
- Die Oberfläche folgt dem mobile-first-Prinzip.
- PlayDate ist als Progressive Web App installierbar.
- Manifest, App-Name, Symbole und Metadaten verwenden einheitlich den Namen „PlayDate“.

## 6. Routen

| Route | Zweck | Zugriff |
| --- | --- | --- |
| `/` | Übersicht der nächsten PlayDates | angemeldet |
| `/playdates` | Übersicht aller PlayDates | angemeldet |
| `/calendar` | Monatsansicht aller PlayDates und Kalenderexport | angemeldet |
| `/new` | neues PlayDate erstellen | angemeldet |
| `/edit/$playDateId` | PlayDate bearbeiten | angemeldet |
| `/families` | Familie, Kinder und Geburtstage verwalten | angemeldet |
| `/photos` | Sicherheitskonzept und späterer privater Fotobereich | angemeldet |
| `/privacy` | technische Datenschutzübersicht des Prototyps | angemeldet |
| `/settings` | Darstellung und Installation | angemeldet |

## 7. Datenmodell des Prototyps

### PlayDate

```ts
type playDate = {
  id: number;
  title: string;
  children: string[];
  friends: string[];
  date: string;
  time: string;
  location: string;
  bring: string;
  status: "Bestätigt" | "Ausstehend";
  color: "mint" | "peach" | "lilac";
};
```

### Kind und Familie

```ts
type childProfile = {
  id: string;
  name: string;
  birthday: string;
  shareBirthday: boolean;
};

type familyProfile = {
  familyName: string;
  children: childProfile[];
};
```

In einer produktiven Datenbank werden Beziehungen über unveränderliche IDs statt über Namen hergestellt.

## 8. Architektur und Technik

- React mit TypeScript
- Vite als Entwicklungs- und Build-Werkzeug
- Tailwind CSS 4 und DaisyUI 5 mit eigenen Light- und Dark-Themes
- TanStack Router für die Navigation
- Clerk für Authentifizierung
- Atomic Design für die Komponentenstruktur
- Vitest, Testing Library, jest-dom und jsdom für Tests
- Oxlint für statische Codeprüfung
- PWA mit Web App Manifest und Service Worker
- Cache-Strategie nur für eigene HTTP-/HTTPS-GET-Anfragen mit abgefangenen Promise-Fehlern
- `localStorage` ausschließlich als Persistenz des Prototyps

Die Atomic-Design-Ebenen sind:

```text
src/components/
├── atoms/
├── molecules/
├── organisms/
├── templates/
└── pages/
```

Geschäftsmodelle liegen unter `src/domain`, wiederverwendbare Zustandslogik unter `src/hooks` und globale UI-Zustände unter `src/context`. Selbst angelegte Datei- und Ordnernamen sowie selbst definierte TypeScript-Typen verwenden lower camelCase. React-Komponentenbezeichner bilden wegen der JSX-Erkennung die technische Ausnahme; ihre Dateien bleiben lower camelCase. Der Code folgt KISS und muss für Junior-Entwickler gut lesbar bleiben.

## 9. Barrierefreiheit

PlayDate soll mindestens WCAG 2.2 auf Konformitätsstufe AA anstreben.

- vollständige Bedienbarkeit mit Tastatur
- sichtbare Fokusmarkierungen
- semantische Überschriften und Navigationen
- verständliche Formularbeschriftungen und Fehlermeldungen
- mindestens 4,5:1 Farbkontrast für normalen Text und wichtige Bedienelemente in Light und Dark Mode
- fast schwarzer Dark Mode mit gedämpftem Blau als Haupt- und Grün als positiver Statusfarbe
- stark gerundete DaisyUI-Komponenten mit ausgewogenen Abständen
- Touch-Ziele von möglichst mindestens 44 × 44 CSS-Pixeln
- skalierbare Abstände, Größen und Radien grundsätzlich in `rem`; Pixel nur für feine Linien und feste Breakpoints
- Inhalte dürfen nicht ausschließlich über Farbe erklärt werden
- Unterstützung für `prefers-reduced-motion`
- sinnvolle Statusmeldungen über `aria-live`
- Prüfung mit axe sowie manuelle Tests mit Tastatur, VoiceOver und NVDA vor einem Release

## 10. Datenschutz und Sicherheit

Da Daten von Kindern verarbeitet werden, gelten besonders hohe Anforderungen. Die App ist nicht allein durch technische Maßnahmen automatisch DSGVO-konform. Vor einem Produktivstart müssen mindestens umgesetzt und rechtlich geprüft werden:

- Datensparsamkeit und klare Zweckbindung
- verständliche Datenschutzinformation und Impressum
- getrennte, nachweisbare und widerrufbare Einwilligungen
- Auskunft, Berichtigung, Export und vollständige Löschung
- technische Lösch- und Aufbewahrungsfristen
- serverseitige Autorisierung für jede private Ressource
- keine privaten Daten in öffentlichen Einladungslinks
- Verschlüsselung bei Übertragung und Speicherung
- Auftragsverarbeitungsverträge und Prüfung von Drittlandtransfers
- Verzeichnis der Verarbeitungstätigkeiten
- Prüfung einer Datenschutz-Folgenabschätzung
- Protokollierung sicherheitsrelevanter Vorgänge ohne unnötige Inhaltsdaten

Geheimnisse dürfen niemals über `VITE_`-Umgebungsvariablen an den Browser ausgeliefert oder in Git eingecheckt werden.

## 11. Abnahmekriterien für das React-Trainingsprojekt

Phase 0 des Trainingsprojekts gilt als technisch abgeschlossen, weil:

1. ohne Anmeldung keine PlayDate- oder Familiendaten sichtbar sind;
2. ein angemeldeter Nutzer Kinder mit Geburtstag verwalten kann;
3. beim Erstellen eines PlayDates ein oder mehrere eigene Kinder auswählbar sind;
4. PlayDates erstellt, bearbeitet und nach Rückfrage gelöscht werden können;
5. Kalenderexport und Google-Kalender-Link gültige Termindaten erzeugen;
6. der Name „PlayDate“ in Oberfläche, Metadaten und PWA einheitlich erscheint;
7. Light Mode, Dark Mode und Systemmodus funktionieren;
8. die wichtigsten Abläufe per Tastatur bedienbar sind;
9. `npm run check` ohne Fehler durchläuft;
10. die Anwendung auf kleinen Displays ohne horizontales Scrollen nutzbar ist.

Phase 1 gilt als konzeptionell abgeschlossen, wenn Zielgruppe, MVP, Rollen, Datenarten, Datenschutzannahmen und Bedrohungen nachvollziehbar dokumentiert sind. Der Nachweis liegt in [`phase1Datenschutz.md`](phase1Datenschutz.md).

## 12. Mögliche Vertiefungen außerhalb des React-Moduls

- geschütztes Backend und relationale Datenbank
- echte Familienverbindungen und Einladungsstatus
- serverseitige Rollen und Berechtigungen
- Foto-Uploads und Kommentare
- echte Erinnerungszustellung
- bidirektionale Kalendersynchronisation
- Datenschutz-Dashboard mit Export, Widerruf und Löschung
- Missbrauchsschutz, Rate Limits und Monitoring
- Ausführung der eingerichteten End-to-End-Tests mit Clerk-Testlogin in der CI
- automatisierte A11Y-Prüfungen in der CI-Pipeline

## 13. Nicht-Ziele des ersten Releases

- eigene Konten für Kinder
- öffentliche Profile oder öffentliche PlayDates
- Standortverfolgung in Echtzeit
- Werbung oder Profiling von Kindern
- ungefragte automatische Nachrichten
- Speicherung vollständiger Kalenderinhalte, die nichts mit PlayDates zu tun haben

## 14. Qualitätsprüfung

Vor jeder Veröffentlichung wird ausgeführt:

```bash
npm run check
```

Die Prüfung umfasst Linting, automatisierte Tests, TypeScript und den Produktions-Build.
