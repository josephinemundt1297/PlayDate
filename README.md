# PlayDate – PlayDates einfach planen

PlayDate ist ein mobile-first React-Prototyp, mit dem Eltern sichere und übersichtliche Spieletreffen für ihre Kinder planen können. Die Oberfläche ist deutschsprachig, tastaturbedienbar und für kleine Displays optimiert.

## Aktueller Status

**Stand: 17. Juli 2026 – Frontend-Prototyp, nicht für den Produktivbetrieb freigegeben.**

Login, lokale Familienprofile, Kindergeburtstage, lokale PlayDates, Monatskalender mit Detail-Dialog, Kalenderexport, Teilen, technische Datenschutzseite, Foto-Konzeptbereich, eigene DaisyUI-Themes und PWA funktionieren. Error Boundary, Lade-, Leer- und Offline-Zustände sowie zentrale Formularvalidierung sind vorhanden. Die Prüfkette besteht aktuell aus Oxlint, 43 Vitest-Tests, TypeScript und dem Vite-Produktions-Build und läuft ohne Fehler durch. `npm audit --omit=dev` meldet für die produktiven Abhängigkeiten 0 bekannte Schwachstellen.

Ein Backend, echte Familienverbindungen, gemeinsam beantwortete Einladungen, serverseitige Erinnerungen, Kommentare, Fotos, produktive Datenlöschung und bidirektionale Kalendersynchronisation sind noch nicht umgesetzt. `localStorage` ist ausschließlich die lokale Persistenz des Prototyps.

## Funktionen

- PlayDates erstellen, bearbeiten und löschen
- Familienprofil mit beliebig vielen Kindern verwalten
- Geburtstage je Kind speichern und die Freigabe von Tag und Monat steuern
- Geburtstagsübersicht für eigene und künftig verbundene Familien
- eigenes Kind beim Erstellen eines PlayDates aus dem Familienprofil auswählen
- Treffpunkt, Teilnehmende und Mitbringsel festhalten
- Einladungen über die Web Share-/WhatsApp-Schnittstelle vorbereiten
- alle PlayDates als `.ics`-Kalenderdatei exportieren
- PlayDates in einer responsiven Monatsansicht anzeigen und nach Tagen auswählen
- Kalendertermine in einer modalen Detail-Ebene vergrößern
- PlayDate-Listen ohne horizontales Überlaufen auch in sehr schmalen eingebetteten Ansichten ab 240 CSS-Pixeln nutzen
- kompakte Navigation auf Mobilgeräten und Tablets bis einschließlich 1024 CSS-Pixel
- reine Icon-Navigation unter 320 CSS-Pixeln, mit weiterhin vorhandenen zugänglichen Namen
- einzelne PlayDates direkt in Google Kalender öffnen
- Status für bestätigte und ausstehende Treffen
- Datenschutz-Hinweise für Fotos, Kommentare und eingeladene Familien
- verknüpfte technische Datenschutzübersicht
- eigener Fotomenüpunkt mit transparent dokumentiertem Sicherheitskonzept; Upload noch gesperrt
- Clerk-Login und Abmeldung eingebunden
- PlayDate-Bereich vollständig durch Clerk geschützt; ohne gültige Anmeldung werden keine Termindaten gerendert
- Benutzerspezifische Trennung der lokalen Prototyp-Daten über die Clerk User-ID
- Routing mit TanStack Router
- Light Mode, Dark Mode und automatische Systemeinstellung
- DaisyUI mit eigenen, stark gerundeten Light- und Dark-Themes
- heller Blau-Weiß-Look im Light Mode und fast schwarzer Dark Mode mit gedämpftem Blau
- Grün ausschließlich als unterstützende Farbe für positive Zustände
- nachgemessene WCAG-2.2-AA-Kontraste: mindestens 4,5:1 für normalen Text und 3:1 für erkennbare Grenzen wichtiger Bedienelemente
- installierbare Progressive Web App (PWA) mit Manifest und Service Worker
- Service Worker cached ausschließlich eigene HTTP-/HTTPS-GET-Anfragen und behandelt Cachefehler ohne Seitenabbruch
- Persistenz des Prototyps über `localStorage`

## Lokale Entwicklung

Voraussetzungen: Node.js 20 oder neuer und npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Die App läuft anschließend normalerweise unter `http://localhost:5173`.

## Clerk einrichten

1. In Clerk eine neue Anwendung anlegen.
2. Den Publishable Key kopieren.
3. In `.env.local` eintragen:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

Ohne gültigen Key bleibt der PlayDate-Bereich gesperrt und zeigt ausschließlich einen Konfigurationshinweis. Geheimnisse wie der Clerk Secret Key gehören nie in eine `VITE_`-Variable oder ins Repository.

## Atomic Design

Die Oberfläche folgt dem Atomic-Design-Pattern:

```text
src/components/
├── atoms/       # Buttons, Status und Theme-Steuerung
├── molecules/   # Quick Actions, Karten und Datenschutzhinweis
├── organisms/   # Header, Navigation, Grid und Formular
├── templates/   # App-Shell und Authentifizierungsgrenze
└── pages/       # Routenseiten als höchste Atomic-Design-Ebene
```

`src/app.tsx` enthält ausschließlich die minimale Verbindung aus Authentifizierungsgrenze und Router. Alle selbst angelegten Dateinamen verwenden lower camelCase. Geschäftsmodelle liegen in `src/domain`, wiederverwendbarer Zustand in `src/hooks` und globale UI-Zustände in `src/context`.

Der Code folgt KISS und soll auch für Junior-Entwickler gut lesbar bleiben. Selbst definierte TypeScript-Typen verwenden lower camelCase. React-Komponentenbezeichner bleiben wegen der JSX-Erkennung die technische Ausnahme; ihre Dateien verwenden weiterhin lower camelCase. DaisyUI stellt die semantischen UI-Bausteine bereit; eigenes CSS ergänzt nur das PlayDate-spezifische Layout und Branding.

## App installieren

PlayDate ist als PWA konfiguriert. Unterstützt der Browser die direkte Installation, öffnet **App laden** den Installationsdialog. Andernfalls wird eine `PlayDate.url`-Website-Verknüpfung heruntergeladen. Auf iOS kann zusätzlich in Safari **Teilen → Zum Home-Bildschirm** verwendet werden.

## Skripte

```bash
npm run dev      # Entwicklungsserver
npm run build    # TypeScript-Prüfung und Produktions-Build
npm run lint     # Statische Codeprüfung
npm run test     # Alle Vitest-Tests einmal ausführen
npm run test:watch # Tests beim Entwickeln automatisch wiederholen
npm run test:e2e   # Playwright-Abläufe in Desktop- und Mobilbrowsern
npm run test:e2e:install # benötigte Playwright-Browser installieren
npm run test:pwa   # Service-Worker- und Cache-Update prüfen
npm run check    # Linting, Tests und Build als komplette Prüfkette
npm run preview  # Produktions-Build lokal ansehen
```

## Tests

Die Testbasis verwendet Vitest, Testing Library, jest-dom und jsdom. Abgedeckt sind aktuell:

- Migration alter Familienprofile in das neue Kinderformat
- Lesen freigegebener Geburtstage
- Google-Kalender-Links und `.ics`-Download
- Monatsraster, Terminzuordnung und Monatswechsel der Kalenderansicht
- modale Kalenderdetails, Website-Verknüpfung und Theme-Kontrastregression
- Viewport, Tablet-Breakpoint und schrumpfbare Navigation als Responsive-Regression
- erlaubte Cache-Anfragen und behandelte Service-Worker-Promises
- Darstellung bestätigter und ausstehender Status-Badges
- Auth-Grenze, Error Boundary, Lade-, Leer- und Offline-Zustände
- Familienseite, PlayDate-Formular und Validierungsrandfälle

Die Tests haben bereits einen echten Zeitzonenfehler bei der Google-Kalender-Endzeit gefunden und abgesichert.

Zusätzlich sind 40 Playwright-Szenarien für Chromium, Firefox, WebKit, Pixel 7 und iPhone 14 eingerichtet. Sie prüfen Responsive-Überlauf, einen angemeldeten Familien-/PlayDate-Ablauf und PWA-Cache-Updates. Für den angemeldeten Ablauf wird ein nicht eingecheckter Clerk-Storage-State benötigt:

```bash
E2E_STORAGE_STATE=e2e/.auth/clerk.json npm run test:e2e
```

Die Einrichtung ersetzt keine abschließenden Tests auf echten physischen Geräten.

## Integrationen: nächste Produktionsschritte

Der aktuelle Stand ist ein funktionsfähiger Frontend-Prototyp. Für den Produktivbetrieb werden serverseitige Dienste benötigt:

- **Authentifizierung:** Clerk-Sitzungen später zusätzlich im Backend prüfen und jede private Ressource serverseitig autorisieren.
- **Datenbank:** PlayDates, Einladungen, Kommentare und Einwilligungen mandantenfähig speichern (z. B. PostgreSQL).
- **WhatsApp:** Einladungslinks über WhatsApp teilen; für automatisierte Nachrichten ausschließlich die offizielle WhatsApp Business Platform und ausdrückliches Opt-in verwenden.
- **Kalender:** OAuth-Integration für Google/Microsoft sowie `.ics`-Export; nur die minimal notwendigen Kalenderrechte anfordern.
- **Fotos:** EU-Hosting, kurzlebige Upload-URLs, rollenbasierter Zugriff, Löschfristen und dokumentierte Einwilligung der Sorgeberechtigten.
- **Erinnerungen:** Queue/Worker mit E-Mail oder Push; Opt-in, Abbestellung und Zeitzonen beachten.

## A11Y

Die Oberfläche nutzt semantische Überschriften, Navigationen, sichtbare Fokusmarkierungen, einen Skip-Link, ausreichend große Touch-Ziele, verständliche Labels und `aria-live`-Statusmeldungen. Animationen werden bei `prefers-reduced-motion` deaktiviert. Vor einem Release sollten zusätzlich automatisierte axe-Tests und manuelle Tests mit Tastatur, VoiceOver und NVDA erfolgen.

## DSGVO-Checkliste

Technische Gestaltung allein macht eine App nicht automatisch DSGVO-konform. Vor einem Produktivstart sind mindestens erforderlich:

- Rechtsgrundlage und Einwilligung für Kinderfotos und Kommunikationskanäle dokumentieren
- Datensparsamkeit, Zweckbindung und getrennte Einwilligungen umsetzen
- EU/EWR-Auftragsverarbeitung und Drittlandtransfers der Anbieter prüfen
- Auskunft, Export, Berichtigung und vollständige Löschung ermöglichen
- Lösch- und Aufbewahrungsfristen technisch erzwingen
- Rollen- und Berechtigungskonzept für eingeladene Familien einführen
- Datenschutzinformation, Impressum und Verzeichnis von Verarbeitungstätigkeiten erstellen
- Datenschutz-Folgenabschätzung mit fachkundiger Beratung prüfen

## Architektur

```text
src/
├── components/  # Atomic-Design-Ebenen
├── context/     # Theme-Zustand
├── domain/      # PlayDate-Modell und Beispieldaten
├── hooks/       # Daten- und Installationslogik
├── app.tsx      # minimaler App-Einstieg
├── router.tsx   # TanStack-Routen
└── main.tsx     # Clerk-Grenze und App-Start
```

## Projektdokumentation

- [`konzept.md`](./konzept.md): Produktidee, Zielgruppe, MVP und Leitplanken
- [`speck.md`](./speck.md): Anforderungen, Datenmodell und Abnahmekriterien
- [`phasenPlan.md`](./phasenPlan.md): Phasen, Statuscheckliste, Risiken und Auditplan
- [`AGENTS.md`](./AGENTS.md): verbindliche Arbeitsregeln für Entwickler und Coding-Agents

### Hinweis zur Kalendersynchronisation

Der aktuelle Frontend-Stand unterstützt standardkonformen `.ics`-Export und das Öffnen einzelner Termine in Google Kalender. Eine dauerhaft bidirektionale Synchronisation benötigt OAuth, ein geschütztes Backend und die jeweilige Google- beziehungsweise Microsoft-Calendar-API.

## Lizenz

Privates Projekt – alle Rechte vorbehalten.
