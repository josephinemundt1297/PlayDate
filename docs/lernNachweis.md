# SpielZeit – Lernnachweis für das DCI React-Modul

## Einordnung

SpielZeit ist mein Trainingsprojekt im React-Modul meiner einjährigen Weiterbildung zur Web- und Softwareentwicklerin beim Digital Career Institute (DCI). Das Repository dient dazu, gelernte Frontend-Themen an einer zusammenhängenden Anwendung praktisch anzuwenden, Entscheidungen zu erklären und meinen Lernfortschritt nachvollziehbar zu machen.

Es handelt sich nicht um ein Kundenprojekt und nicht um eine produktiv freigegebene Anwendung. Alle Personen-, Familien- und Kinderdaten sind ausschließlich erfundene Demo-Daten.

**Aktualisiert: 20. Oktober 2026.** Die lokale Prüfkette besteht mit 99 Tests in 29 Testdateien. Der neue asynchrone Terminabruf ist durch automatisierte Tests und einen gezielten angemeldeten Browsercheck belegt. Die vollständige Mehrbrowser- und Geräteprüfung bleibt offen.

## Lernziele

Mit SpielZeit übe und belege ich:

- eine React-Anwendung mit Vite und TypeScript aufzubauen
- Komponenten sinnvoll aufzuteilen und über Props zusammenzusetzen
- State, Events, Formulare und bedingtes Rendering zu verwenden
- wiederverwendbare Logik in eigenen Hooks zu kapseln
- globalen UI-Zustand mit Context zu verwalten
- mehrere Seiten mit TanStack Router zu verbinden
- CRUD-Abläufe für Spieletreffen und Kinderprofile umzusetzen
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
| Formulare und CRUD | Familienprofil und Spieletreffen erstellen, bearbeiten und löschen | erledigt |
| TypeScript | typisierte Domainmodelle, Props und Hilfsfunktionen | erledigt |
| Responsive Design | mobile Navigation, Kalender und schmale Viewports | erledigt |
| Skalierbares Styling | Abstände und Größen in `rem`, abgesichert durch Regressionstest | erledigt |
| UI und Themes | DaisyUI, Light/Dark/Systemmodus | erledigt |
| A11Y | Semantik, Fokus, Tastatur, Kontraste und Statusmeldungen | als Frontend-Basis erledigt |
| Authentifizierung | Clerk-Grenze vor privaten Routen | erledigt |
| Persistenz | benutzerbezogener Prototyp mit `localStorage` | erledigt |
| Asynchroner Datenfluss | `fetch` einer statischen JSON-Datei, Lade-/Erfolgs-/Fehler-/Leerzustand, erneuter Versuch und Abbruch | automatisiert getestet; Lade-/Erfolgs-/Fehler-/Leerzustand und erneuter Versuch zusätzlich im Browser geprüft |
| Laufzeitprüfung | Struktur eingelesener Termine, gültige Kalendertage und fehlerhaftes JSON im Terminspeicher | automatisiert getestet |
| Tests | 99 Unit- und Komponententests in 29 Dateien unter `src/tests` | erledigt |
| E2E-Vorbereitung | 40 Playwright-Szenarien konfiguriert | erledigt |
| E2E auf realen Browsern/Geräten | Browser-Binaries und physische Geräte nötig | freiwilliger Zusatznachweis offen |
| Produktkonzept | Zielgruppe, MVP, Rollen und Nicht-Ziele | erledigt |
| Datenschutzübung | Dateninventar, Fristen, Anbieter und Bedrohungsmodell | erledigt |

## Bewertung von Phase 0 und 1

### Phase 0 – React-Prototyp und technische Basis

**Ergebnis: für das React-Trainingsprojekt abgeschlossen.**

Die App lässt sich bauen, besitzt eine nachvollziehbare Komponentenstruktur und deckt zentrale React-Themen ab. Linting, 99 automatisierte Tests, TypeScript und der Produktions-Build laufen fehlerfrei. Der neue Datenfluss ist automatisiert und gezielt im angemeldeten Browser geprüft. Weitere Mehrbrowser- und Gerätetests sowie die Behebung der im Browser gefundenen Bedienprobleme stehen noch aus; die Einzelheiten stehen in [`browserPruefung.md`](browserPruefung.md).

### Lernnachweis – Asynchroner Terminabruf

Ich lade die erfundenen Beispiel-Spieletreffen beim ersten Öffnen eines Terminbereichs asynchron aus einer statischen JSON-Datei. Dabei unterscheide ich Lade-, Erfolgs-, Fehler- und Leerzustand. Vorhandene lokale Termine werden erhalten; eine bewusst gespeicherte leere Liste wird nicht mit Beispielen aufgefüllt. Die vorhandenen Karten, Formulare und CSS-Klassen bleiben bestehen.

Ich übe dabei `useEffect`, `fetch`, `async`/`await`, Fehlerbehandlung und das Beenden verlassener Anfragen mit `AbortController`. Die Daten werden zur Laufzeit geprüft, weil ein TypeScript-Typ allein keine JSON-Inhalte validiert. Tests sichern Netzwerkfehler, erneute Versuche, leere Listen, beschädigte Speicherdaten und ungültige Kalendertage einschließlich Schaltjahren ab. Die Statuskomponente zeigt im Erfolgsfall ihren Inhalt ohne zusätzliches Layout-Element.

Im Test ersetzt ein Clerk-Stellvertreter den echten Login durch eine erfundene User-ID. Das macht den Datenfluss unabhängig vom externen Dienst prüfbar; es ersetzt keinen Test der echten Anmeldung. Die öffentliche JSON-Datei enthält ausschließlich erfundene Beispiele. Der Datenabruf ist keine produktive API oder Mehrbenutzersynchronisation. Intern bleibt das Datum im Format `YYYY-MM-DD`, während die Oberfläche es getrennt davon deutsch formatiert.

Beim ergänzenden Browsercheck wurde ein echter Clerk-Testlogin verwendet. Getrennte lokale Testadressen lieferten gezielt eine verzögerte Antwort, einen HTTP-Fehler mit anschließend erfolgreichem Versuch und eine leere Liste. Dadurch konnten die sichtbaren Zustände mit demselben gebauten App-Code geprüft werden. Ein erfundener Termin ließ sich außerdem erstellen, bearbeiten und nach direktem erneutem Aufruf mit gespeichertem Treffpunkt öffnen. Dabei wurden auch die bereits vermuteten Formular- und Profilprobleme sowie ein Überlauf im schmalen Kalenderdialog sichtbar. Erfolgreiche Einzeltests bedeuten deshalb keine vollständige Abnahme der Anwendung.

Anschließend habe ich die veralteten Profilwerte im Verbindungsbereich durch Props-Weitergabe behoben. Dabei wurde deutlich: Zwei Aufrufe desselben eigenen Hooks teilen nicht automatisch ihren State. Die Familienseite besitzt jetzt das gespeicherte Profil und gibt es an die untergeordnete Komponente weiter. Ein Komponententest und ein erneuter Browsercheck belegen die sofortige Aktualisierung ohne Reload.

## Spätere Phasen als React-Simulation

Da Backend noch nicht Teil meines Lernstands ist, werden ausgewählte Inhalte der Phasen 2 bis 9 bewusst lokal geübt:

- Repository-Schicht als Trennung zwischen React und Speicherung
- sichere Behandlung beschädigter `localStorage`-Daten
- Demo-Familienverbindungen mit offenen, verbundenen und blockierten Zuständen
- lokal erzeugte, einmal verwendbare Trainingscodes für bekannte Familien
- Mehrfachauswahl eigener Kinder bei einem Spieletreffen mit Migration alter Termine
- Mehrfachauswahl verbundener Kontakte plus frei ergänzbare Namen
- gut sichtbare Auswahlzustände mit Haken sowie lockere Lernkommentare an den neuen Datenwegen
- mehrere Sorgeberechtigte als dynamische React-Formularliste
- Absagen, Mitbringsel-Zuständigkeiten und Aktivitätsverlauf
- lokale Erinnerungsoptionen und Kommentare
- Export und vollständiges Entfernen der lokalen Trainingsdaten
- axe-Basisprüfungen zusätzlich zu Kontrast- und Responsive-Tests

Diese Simulationen belegen React-State und UI-Logik. Sie werden nicht als Backend, Verschlüsselung oder Mehrbenutzerbetrieb bezeichnet.

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
