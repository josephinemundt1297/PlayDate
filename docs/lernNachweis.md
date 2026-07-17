# PlayDate – Lernnachweis für das DCI React-Modul

## Einordnung

PlayDate ist mein Trainingsprojekt im React-Modul meiner einjährigen Weiterbildung zur Web- und Softwareentwicklerin beim Digital Career Institute (DCI). Das Repository dient dazu, gelernte Frontend-Themen an einer zusammenhängenden Anwendung praktisch anzuwenden, Entscheidungen zu erklären und meinen Lernfortschritt nachvollziehbar zu machen.

Es handelt sich nicht um ein Kundenprojekt und nicht um eine produktiv freigegebene Anwendung. Alle Personen-, Familien- und Kinderdaten sind ausschließlich erfundene Demo-Daten.

## Lernziele

Mit PlayDate übe und belege ich:

- eine React-Anwendung mit Vite und TypeScript aufzubauen
- Komponenten sinnvoll aufzuteilen und über Props zusammenzusetzen
- State, Events, Formulare und bedingtes Rendering zu verwenden
- wiederverwendbare Logik in eigenen Hooks zu kapseln
- globalen UI-Zustand mit Context zu verwalten
- mehrere Seiten mit TanStack Router zu verbinden
- CRUD-Abläufe für PlayDates und Kinderprofile umzusetzen
- Browserdaten für einen Prototyp kontrolliert in `localStorage` zu speichern
- asynchrone Lade-, Fehler-, Leer- und Offline-Zustände verständlich darzustellen
- eine externe Authentifizierung mit Clerk einzubinden
- mobile-first und responsiv zu gestalten
- Light und Dark Mode mit DaisyUI umzusetzen
- Barrierefreiheit und Datenschutz schon im Frontend mitzudenken
- Logik und Komponenten mit Vitest und Testing Library zu testen
- Git, GitHub und Projektdokumentation als Teil des Entwicklungsablaufs zu nutzen

## Nachweise im Projekt

| Lernbereich | Nachweis | Status |
| --- | --- | --- |
| React-Grundlagen | funktionale Komponenten, Props, State und Events | erledigt |
| Komponentenarchitektur | Atomic Design mit Atoms bis Pages | erledigt |
| Hooks und Context | eigene Daten-Hooks und Theme-Context | erledigt |
| Routing | geschützte Routen mit TanStack Router | erledigt |
| Formulare und CRUD | Familienprofil und PlayDates erstellen, bearbeiten und löschen | erledigt |
| TypeScript | typisierte Domainmodelle, Props und Hilfsfunktionen | erledigt |
| Responsive Design | mobile Navigation, Kalender und schmale Viewports | erledigt |
| UI und Themes | DaisyUI, Light/Dark/Systemmodus | erledigt |
| A11Y | Semantik, Fokus, Tastatur, Kontraste und Statusmeldungen | als Frontend-Basis erledigt |
| Authentifizierung | Clerk-Grenze vor privaten Routen | erledigt |
| Persistenz | benutzerbezogener Prototyp mit `localStorage` | erledigt |
| Tests | 46 Unit- und Komponententests | erledigt |
| E2E-Vorbereitung | 40 Playwright-Szenarien konfiguriert | erledigt |
| E2E auf realen Browsern/Geräten | Browser-Binaries und physische Geräte nötig | freiwilliger Zusatznachweis offen |
| Produktkonzept | Zielgruppe, MVP, Rollen und Nicht-Ziele | erledigt |
| Datenschutzübung | Dateninventar, Fristen, Anbieter und Bedrohungsmodell | erledigt |

## Bewertung von Phase 0 und 1

### Phase 0 – React-Prototyp und technische Basis

**Ergebnis: für das React-Trainingsprojekt abgeschlossen.**

Die App lässt sich bauen, besitzt eine nachvollziehbare Komponentenstruktur und deckt zentrale React-Themen ab. Linting, 46 automatisierte Tests, TypeScript und der Produktions-Build laufen fehlerfrei. Reale Mehrbrowser- und Gerätetests bleiben als zusätzlicher Praxisnachweis offen und sind kein fehlendes React-Lernziel.

### Phase 1 – Produkt- und Datenschutzkonzept

**Ergebnis: für das Trainingsprojekt abgeschlossen.**

MVP, Zielgruppe, Rollen, Datenarten, Einwilligungsabläufe, Aufbewahrungsannahmen, Anbieter, Pflichttext-Muster, DSFA-Vorprüfung und Bedrohungsmodell sind dokumentiert. Diese Arbeit zeigt, dass Frontend-Entscheidungen Auswirkungen auf Datenschutz und Sicherheit haben. Sie ersetzt keine Rechtsberatung.

## Bewusste Grenzen

Folgende Themen sind nicht Teil der abgeschlossenen React-Modul-Leistung:

- produktives Backend und relationale Datenbank
- serverseitige Autorisierung und Rollenprüfung
- echte Familienverbindungen und gemeinsame Daten
- produktive Foto-Uploads und Kommentare
- echte Erinnerungsdienste und Push-Nachrichten
- vollständige Kalender-OAuth-Synchronisation
- produktive Verträge, Rechtsprüfung, Hosting und Betriebsprozesse

Diese Punkte können später als Full-Stack-, Backend- oder Deployment-Vertiefung dienen.

## Persönliche Reflexion

Das Projekt ist deutlich größer als eine einzelne React-Übung. Dadurch konnte ich nicht nur Komponenten schreiben, sondern auch lernen, Anforderungen zu sortieren, Fehler reproduzierbar abzusichern und zwischen sichtbarer Oberfläche, echter Geschäftslogik und späterer Serverfunktion zu unterscheiden. Besonders wichtig war die Erkenntnis, dass Responsive Design, A11Y, Tests und Datenschutz keine einmaligen Abschlussaufgaben sind, sondern bei jeder Änderung mitgedacht werden müssen.
