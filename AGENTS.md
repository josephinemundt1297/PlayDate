# AGENTS.md – Arbeitsregeln für PlayDate

Diese Datei gilt für das gesamte Repository. Sie richtet sich an Coding-Agents und Entwickler, die PlayDate prüfen oder verändern.

## Projektziel und aktueller Stand

PlayDate ist ein deutschsprachiges React-Trainingsprojekt im Rahmen einer einjährigen DCI-Weiterbildung zur Web- und Softwareentwicklung. Es dient als Lern- und Portfolio-Nachweis für das React-Modul und zeigt eine mobile-first App zur privaten Planung von Spieletreffen.

Der aktuelle Stand ist ein Frontend-Prototyp:

- Clerk schützt die Oberfläche und stellt den Login bereit.
- Familien, Kinder, Geburtstage und PlayDates werden lokal und pro Clerk User-ID getrennt gespeichert.
- Monatskalender mit Detail-Dialog, Kalenderexport, Google-Kalender-Link, Web Share, WhatsApp-Link, technische Datenschutzseite, Foto-Konzeptseite, Themes und PWA sind vorhanden.
- Ein produktives Backend, echte Familienverbindungen, gemeinsame Einladungsantworten, serverseitige Erinnerungen, Kommentare, Foto-Uploads und bidirektionale Kalendersynchronisation fehlen noch.

Behaupte deshalb niemals, dass der aktuelle Stand produktionsreif oder rechtlich vollständig DSGVO-konform ist. Verwende keine echten personenbezogenen Daten. Rechtliche Checklisten gelten nur als Übungsunterlagen und müssen vor einem echten Betrieb neu fachkundig geprüft werden.

## Lernorientierung

- Bevorzuge Lösungen, an denen React-Grundlagen und Datenflüsse gut nachvollziehbar bleiben.
- Erkläre bei größeren Änderungen, welches Lernziel damit geübt oder nachgewiesen wird.
- Verstecke verständliche React-Logik nicht hinter unnötigen Abstraktionen oder Magie.
- Unterscheide klar zwischen React-Trainingsumfang und späterem Backend-/Produktionsumfang.
- Pflege `docs/lernNachweis.md`, wenn sich der belegte Lernstand von Phase 0 oder 1 ändert.
- Formuliere Dokumentation als persönliche Projekt- und Lernleistung, nicht als offizielle Aussage oder Bewertung des DCI.

## Vor jeder Änderung

1. Lies `README.md`, `docs/konzept.md`, `docs/speck.md` und die betroffene Phase in `docs/phasenPlan.md`.
2. Prüfe `git status`, damit fremde oder unfertige Änderungen erhalten bleiben.
3. Suche zuerst nach bestehenden Komponenten, Hooks und Typen, bevor du etwas Neues anlegst.
4. Kläre bei Kinderdaten immer Sichtbarkeit, Zweck, Berechtigung und Löschung mit.

## Architektur

- Halte `src/app.tsx` so klein wie möglich.
- Verwende die vorhandene Atomic-Design-Struktur:
  - `atoms`: kleinste UI-Bausteine
  - `molecules`: kleine Kombinationen aus Atoms
  - `organisms`: größere Funktionsbereiche
  - `templates`: Seitenrahmen und globale Grenzen
  - `pages`: Komponenten für Routen
- Lege Geschäftsmodelle in `src/domain` ab.
- Lege wiederverwendbare Zustands- und Datenlogik in `src/hooks` ab.
- Lege globale React-Kontexte in `src/context` ab.
- Lege allgemeine Hilfsfunktionen in `src/utils` ab.
- Pages koordinieren Abläufe. Sie sollen keine mehrfach verwendbare Geschäftslogik duplizieren.
- Verwende stabile IDs für Beziehungen. Namen sind Anzeigeinhalte und keine verlässlichen Fremdschlüssel.

## Benennung und Code-Stil

- Selbst angelegte Datei- und Ordnernamen verwenden lower camelCase.
- Vorgeschriebene Standarddateien wie `AGENTS.md`, `README.md` und `LICENSE` behalten ihre übliche Schreibweise.
- Selbst definierte TypeScript-Typen und Interfaces verwenden immer lower camelCase.
- Funktionen, Hooks und Variablen verwenden immer lower camelCase.
- React-Komponenten sind die einzige technische Ausnahme bei eigenen Bezeichnern: JSX erkennt Komponenten nur mit großem Anfangsbuchstaben als Komponenten. Deshalb bleibt der Komponentenbezeichner PascalCase, während die zugehörige Datei lower camelCase verwendet. Eine künstliche Umgehung mit `createElement` würde KISS und Lesbarkeit verschlechtern.
- Namen aus externen APIs und Bibliotheken werden nicht umbenannt. Dazu gehören zum Beispiel `ReactNode` und TanStacks vorgeschriebenes `Register`-Interface.
- Hooks beginnen mit `use`.
- Benutzertexte sind auf Deutsch und in einfacher, freundlicher Sprache formuliert.
- Kommentare sind kurz, locker und für Junior-Entwickler verständlich. Erkläre das Warum, nicht jede offensichtliche Codezeile.
- Vermeide doppelte Kommentare, tote Dateien und unnötige Abstraktionen.
- Verwende TypeScript-Typen präzise und führe kein `any` ohne nachvollziehbare Begründung ein.
- Halte dich an KISS: Bevorzuge die kleinste verständliche Lösung und abstrahiere erst, wenn echte Wiederverwendung entsteht.
- Schreibe den Code so, dass ein Junior-Entwickler Kontrollfluss, Datenweg und Zuständigkeit ohne Rätselraten nachvollziehen kann.

## Styling

- Bevorzuge eine ruhige Grün-Blau-Farbwelt. Neue Hauptfarben sollen dazu passen.
- DaisyUI ist eingebunden und die bevorzugte Komponentenbibliothek für Buttons, Formulare, Karten, Badges, Alerts und ähnliche UI-Bausteine.
- Nutze zuerst semantische DaisyUI-Klassen und ergänze eigenes CSS nur für PlayDate-spezifische Gestaltung oder Layouts.
- Vermische DaisyUI nicht unnötig mit einem zweiten Komponentenframework.
- Halte Styling ebenfalls nach KISS: wenige wiederverwendbare Variablen, klare Zustände und keine unnötigen Sonderregeln.
- Prüfe neue oder geänderte Farben in Light und Dark Mode.
- Primäre Aktionen müssen ihre semantische DaisyUI-Textfarbe behalten. Ergänze bei Kontrastfehlern einen automatisierten Regressionstest.
- Datenschutz- und Fotoseite verwenden gemeinsam `safetyPage.tsx`. Warnung, Farben, Kartenraster und Abstände dürfen nicht separat pro Seite nachgebaut werden.

## Authentifizierung, Datenschutz und Sicherheit

- Private PlayDate- und Familiendaten dürfen niemals außerhalb der Authentifizierungsgrenze gerendert werden.
- `localStorage` ist ausschließlich eine Prototyp-Lösung. Neue produktive Funktionen dürfen es nicht als Hauptdatenbank einplanen.
- Ein späteres Backend muss jede Ressource serverseitig autorisieren. Eine versteckte Schaltfläche ist kein Zugriffsschutz.
- Sammle nur Daten, die für die Funktion notwendig sind.
- Teile bei Geburtstagen standardmäßig nur Tag und Monat. Das Geburtsjahr benötigt eine getrennte fachliche Entscheidung.
- Fotos benötigen eine dokumentierte, widerrufbare Einwilligung der Sorgeberechtigten und serverseitige Berechtigungen.
- Öffentliche Links dürfen keine privaten Kinder- oder Termindaten preisgeben.
- Schreibe keine Tokens, Clerk Secret Keys, Zugangsdaten oder produktiven Kinderdaten in Code, Tests, Logs, Screenshots oder Dokumentation.
- Nur der Clerk Publishable Key darf als `VITE_`-Variable im Browser verwendet werden. Serverseitige Secrets dürfen nie mit `VITE_` beginnen.
- Ein technischer Hinweis ersetzt keine rechtliche Prüfung. Formuliere DSGVO-Aussagen entsprechend vorsichtig.

## A11Y und mobile Bedienung

- Strebe WCAG 2.2 AA an.
- Verwende semantisches HTML und verständliche Labels.
- Jeder Ablauf muss per Tastatur bedienbar sein.
- Fokuszustände müssen sichtbar bleiben.
- Status darf nicht ausschließlich über Farbe vermittelt werden.
- Prüfe Light und Dark Mode nach WCAG 2.2 AA: normaler Text benötigt mindestens 4,5:1, große Schrift und erkennbare Grenzen wichtiger Bedienelemente mindestens 3:1.
- Plane Touch-Ziele möglichst mit mindestens 44 × 44 CSS-Pixeln.
- Prüfe nach Änderungen an Header oder Navigation immer 240, 320, 375, 768, 1024 und 1280 CSS-Pixel. Der kompakte Navigationsmodus beginnt spätestens bei 1024 CSS-Pixeln; kein Seitenkörper darf eine feste Mindestbreite erzwingen.
- Service Worker dürfen nur GET-Anfragen über HTTP oder HTTPS von der eigenen Origin cachen. Jeder Cache- und Registrierungs-Promise benötigt eine Fehlerbehandlung.
- Beachte `prefers-reduced-motion`.
- Neue Dialoge, Formulare und Statusmeldungen benötigen eine sinnvolle Screenreader-Ausgabe.

## Tests und Qualitätsprüfung

Führe nach Codeänderungen grundsätzlich aus:

```bash
npm run check
```

Das umfasst Oxlint, Vitest, TypeScript und den Vite-Produktions-Build.

Für Browserabläufe zusätzlich `npm run test:e2e` ausführen. Angemeldete Abläufe benötigen einen sicheren Clerk-Testlogin über `E2E_STORAGE_STATE`; diese Datei darf nie committed werden.

- Ergänze Tests für neue Logik und behobene Fehler.
- Tests dürfen keine echten personenbezogenen Daten enthalten.
- Prüfe Datums- und Kalenderlogik mit festen Testwerten und relevanten Zeitzonen.
- Teste sowohl erfolgreiche Abläufe als auch Fehler- und Berechtigungsfälle.
- Markiere einen Punkt im Audit- oder Phasenplan erst als erledigt, wenn ein nachvollziehbarer Nachweis vorliegt.
- Führe bei Änderungen an produktiven Abhängigkeiten zusätzlich `npm audit --omit=dev` aus.

## Dokumentation aktuell halten

- `README.md`: tatsächliche Einrichtung, Funktionen, Grenzen und Befehle
- `docs/README.md`: Einstiegspunkt für alle ausführlichen Projektunterlagen
- `docs/lernNachweis.md`: Lernziele, Nachweise und Reflexion für das React-Modul
- `docs/konzept.md`: Produktidee, Zielgruppe, MVP und fachliche Leitplanken
- `docs/speck.md`: detaillierte Anforderungen und Abnahmekriterien
- `docs/phasenPlan.md`: Reihenfolge, Statuscheckliste, Risiken und Auditnachweise
- `docs/phase1Datenschutz.md`: Übungskonzept für Rollen, Datenschutz und Bedrohungen

Wenn eine Änderung den dokumentierten Status beeinflusst, aktualisiere die passenden Dateien im selben Commit. Ein sichtbarer Platzhalter zählt nicht als fertige produktive Funktion.

## Fertig-Definition

Eine Änderung ist erst fertig, wenn:

- sie im vorgesehenen Umfang funktioniert;
- Authentifizierung, Datenschutz und A11Y mitgedacht wurden;
- passende Tests vorhanden sind;
- `npm run check` ohne Fehler und möglichst ohne Warnungen durchläuft;
- Dokumentation und Checklisten dem neuen Stand entsprechen;
- keine Secrets oder echten personenbezogenen Daten im Diff stehen.
