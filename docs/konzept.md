# PlayDate – Produktkonzept

> **Lernkontext:** PlayDate ist mein Trainingsprojekt im React-Modul meiner einjährigen DCI-Weiterbildung zur Web- und Softwareentwicklerin. Das Konzept beschreibt eine simulierte Produktidee und ist keine Freigabe für echte Kinderdaten.

## 0. Ziel des Trainingsprojekts

Das Projekt verbindet die Lerninhalte des React-Moduls mit einer größeren, realitätsnahen Frontend-Aufgabe. Im Mittelpunkt stehen Komponenten, Props, State, Hooks, Context, Routing, Formulare, TypeScript, Tests und responsive Benutzeroberflächen. Produkt-, Datenschutz- und Sicherheitsfragen werden als Konzeptübung betrachtet, damit technische Entscheidungen nicht isoliert von ihren Auswirkungen getroffen werden.

Backend, Datenbank, produktiver Betrieb und echte Rechtsfreigaben sind nicht Teil des abgeschlossenen React-Modul-Umfangs. Die konkreten Lernnachweise stehen in [`lernNachweis.md`](lernNachweis.md).

## 1. Die Idee

PlayDate ist eine private Organisations-App für Eltern und Sorgeberechtigte. Sie hilft dabei, Spieletreffen für Kinder unkompliziert zu planen, mit anderen Familien abzustimmen und zuverlässig im Blick zu behalten.

Heute verteilen sich die nötigen Informationen häufig auf WhatsApp-Nachrichten, Kalender, Notizen und mündliche Absprachen. Dadurch entstehen Rückfragen: Wann treffen wir uns? Wo genau? Welches Kind kommt mit? Wer bringt Snacks mit? PlayDate bündelt diese Informationen in einem geschützten Termin.

## 2. Das Problem

Bei der Organisation eines Spieletreffens müssen Eltern mehrere kleine Aufgaben koordinieren:

- einen passenden Termin finden
- beteiligte Kinder und Eltern abstimmen
- Ort und Uhrzeit festhalten
- klären, wer was mitbringt
- Änderungen an alle Beteiligten weitergeben
- den Termin in den eigenen Kalender übernehmen
- an das Treffen erinnert werden
- Geburtstage befreundeter Kinder im Blick behalten

Messenger sind gut für Gespräche, aber schlecht als dauerhafte Terminübersicht. Kalender enthalten den Termin, bilden jedoch Einladungen, Mitbringsel, Kommentare und private Fotos nur unzureichend ab.

## 3. Das Produktversprechen

> Mit PlayDate können Eltern ein privates Spieletreffen in wenigen Schritten planen, teilen und gemeinsam organisieren, ohne Informationen aus verschiedenen Chats zusammensuchen zu müssen.

PlayDate soll nicht den persönlichen Austausch ersetzen. Die App strukturiert die organisatorischen Informationen und lässt Messenger wie WhatsApp weiterhin als freiwilligen Kommunikationskanal zu.

## 4. Zielgruppe

### Hauptzielgruppe

Eltern und Sorgeberechtigte mit einem oder mehreren Kindern, die regelmäßig Spieletreffen mit bekannten Familien organisieren.

### Bedürfnisse

- wenig Zeit und möglichst wenige Eingaben
- einfache Bedienung auf dem Smartphone
- klare Übersicht über anstehende Treffen
- Vertrauen in den Umgang mit Kinderdaten
- leichte Weitergabe an andere Eltern
- keine zusätzliche komplizierte Kommunikationsplattform

### Nicht vorgesehen

Kinder erhalten im ersten Produktumfang keine eigenen Konten. Öffentliche Profile, eine öffentliche Kindersuche und Treffen mit unbekannten Personen sind ebenfalls nicht vorgesehen.

## 5. Leitprinzipien

### Privat als Standard

PlayDates und Familiendaten sind nur nach Anmeldung sichtbar. Informationen werden nur mit ausdrücklich eingeladenen oder verbundenen Familien geteilt.

### Weniger Daten sind besser

Die App fragt nur Informationen ab, die für die jeweilige Funktion benötigt werden. Ein Geburtstag kann beispielsweise ohne Geburtsjahr geteilt werden.

### Mobile first

Die wichtigsten Abläufe müssen auf kleinen Displays schnell, übersichtlich und mit gut erreichbaren Bedienelementen funktionieren.

### Verständlich statt technisch

Texte, Fehlermeldungen und Einwilligungen werden in einfacher deutscher Sprache formuliert. Nutzer sollen immer erkennen, was eine Aktion bewirkt.

Auch der Code folgt diesem Prinzip: KISS, kurze nachvollziehbare Datenwege und eine Struktur, die Junior-Entwickler ohne unnötige Abstraktionen verstehen können.

### Barrierearm von Anfang an

Tastaturbedienung, ausreichende Kontraste, sichtbarer Fokus, verständliche Labels und Unterstützung für Screenreader gehören zur Grundarchitektur und sind keine spätere Ergänzung.

## 6. Zentrale Nutzungsszenarien

### 6.1 Einstieg und Familie einrichten

1. Ein Elternteil öffnet PlayDate und meldet sich an.
2. Die Person trägt einen Familiennamen ein.
3. Sie legt die eigenen Kinder mit Name und optionalem Geburtstag an.
4. Pro Kind entscheidet sie, ob der Geburtstag für verbundene Familien sichtbar sein darf.
5. Danach gelangt sie zur persönlichen Übersicht.

### 6.2 PlayDate erstellen

1. Der Nutzer wählt „PlayDate planen“.
2. Er wählt ein oder mehrere eigene Kinder aus dem Familienprofil.
3. Er trägt das andere Kind, Datum, Uhrzeit und Treffpunkt ein.
4. Optional ergänzt er Mitbringsel und eine Erinnerung.
5. Nach dem Speichern erscheint das Treffen in der Übersicht.

### 6.3 Einladung versenden

1. Der Nutzer öffnet ein PlayDate und wählt „Einladung teilen“.
2. PlayDate erzeugt eine verständliche Nachricht beziehungsweise einen geschützten Einladungslink.
3. Die Einladung kann über die Teilen-Funktion des Geräts oder über WhatsApp versendet werden.
4. Der eingeladene Elternteil sieht nur die für diese Einladung freigegebenen Informationen.

### 6.4 Einladung beantworten

1. Der eingeladene Elternteil öffnet den geschützten Link.
2. Nach Anmeldung kann die Einladung angenommen oder abgelehnt werden.
3. Der Status wird für die beteiligten Familien aktualisiert.
4. Änderungen am Termin werden nachvollziehbar angezeigt.

### 6.5 Termin in den Kalender übernehmen

Der Nutzer sieht seine PlayDates in einer responsiven Monatsansicht. Er kann außerdem ein einzelnes PlayDate in Google Kalender öffnen oder alle Termine als `.ics`-Datei exportieren. Eine spätere Synchronisation soll nur nach ausdrücklicher Freigabe und mit minimalen Kalenderberechtigungen erfolgen.

### 6.6 Geburtstag sehen

In der Familienübersicht sieht der Nutzer die freigegebenen Geburtstage eigener Kinder und verbundener Familien. Standardmäßig werden nur Name, Tag und Monat angezeigt.

## 7. Funktionsbereiche

### Persönliche Übersicht

- nächste PlayDates
- Status der Einladungen
- schnelle Aktion zum Erstellen eines Treffens
- Kalenderexport
- Hinweis auf anstehende Geburtstage

### PlayDate-Verwaltung

- erstellen, anzeigen, bearbeiten und löschen
- ein oder mehrere eigene Kinder auswählen
- einen oder mehrere verbundene Kontakte auswählen oder freie Namen ergänzen
- anderes Kind beziehungsweise eingeladene Familie angeben
- Datum, Uhrzeit und Treffpunkt festlegen
- Mitbringsel und Aufgaben eintragen
- Status anzeigen
- Einladung teilen

### Familienbereich

- Familienname verwalten
- beliebig viele eigene Kinder anlegen
- Geburtstage speichern
- Geburtstagsfreigabe pro Kind steuern
- verbundene Familien und freigegebene Geburtstage anzeigen
- bekannte Familien über einen lokalen, einmal verwendbaren Trainingscode verbinden

### Gemeinsamer PlayDate-Bereich

Für eine spätere Version ist ein geschützter Bereich pro Treffen vorgesehen:

- Kommentare für organisatorische Absprachen
- private Fotos mit Einwilligungsprüfung
- übersichtliche Liste der Mitbringsel
- nachvollziehbare Terminänderungen
- Rollen für Organisator und eingeladene Familien

### Einstellungen

- Light Mode, Dark Mode oder Systemeinstellung
- Installation als Progressive Web App
- Benachrichtigungen verwalten
- Einwilligungen prüfen und widerrufen
- eigene Daten exportieren oder löschen

## 8. Informationsarchitektur

| Bereich | Inhalt |
| --- | --- |
| Übersicht | nächste Termine, Schnellaktionen und Erinnerungen |
| PlayDates | vollständige Terminliste und Terminverwaltung |
| Neues PlayDate | geführtes Formular zur Erstellung |
| Familien | eigene Kinder, Geburtstage und Verbindungen |
| Einstellungen | Darstellung, Installation, Datenschutz und Konto |

Die mobile Navigation enthält Start, Kalender, den mittigen Button für neue PlayDates, Familien und Fotos. Einstellungen, Download, Darstellung und Clerk-Konto liegen platzsparend in einem aufklappbaren Menü oben rechts. Die technische Datenschutzübersicht ist über Hinweise und Einstellungen erreichbar.

## 9. MVP

Das Minimum Viable Product soll einen vollständigen, aber bewusst kleinen Ablauf ermöglichen.

### Im MVP enthalten

- Anmeldung und geschützte Bereiche
- Familienprofil mit mehreren Kindern
- optionaler Geburtstag und Freigabe pro Kind
- PlayDates erstellen, bearbeiten und löschen
- Mehrfachauswahl der eigenen Kinder
- Termin, Ort und Mitbringsel
- Einladungslink und Teilen über WhatsApp beziehungsweise Web Share
- Einladung annehmen oder ablehnen
- `.ics`-Export und Google-Kalender-Link
- einfache Erinnerungen
- Light und Dark Mode
- installierbare PWA
- Datenschutzfunktionen für Auskunft, Export und Löschung

### Nach dem MVP

- Kommentare
- private Fotoalben
- bidirektionale Kalendersynchronisation
- Push-Benachrichtigungen
- Aufgaben- und Mitbringlisten mit Zuständigkeiten
- mehrere Sorgeberechtigte innerhalb einer Familie
- feinere Rollen und Berechtigungen

## 10. Datenschutz- und Sicherheitskonzept

PlayDate verarbeitet besonders schützenswerte Informationen über Kinder. Deshalb folgt das Produkt dem Prinzip „Privacy by Design“.

### Grundregeln

- keine öffentlichen Kinderprofile
- keine Suche nach unbekannten Kindern oder Familien
- keine privaten Inhalte in frei lesbaren Einladungslinks
- serverseitige Prüfung jeder Zugriffsberechtigung
- standardmäßig minimale Sichtbarkeit
- getrennte und widerrufbare Einwilligung für Kinderfotos
- Geburtstage ohne Geburtsjahr teilen, sofern dieses nicht benötigt wird
- klare Löschfristen für Termine, Kommentare und Fotos
- verschlüsselte Übertragung und verschlüsselte Speicherung
- bevorzugtes Hosting in der EU beziehungsweise im EWR
- keine Werbung und kein Profiling von Kindern

Vor einem Produktivstart sind Rechtsgrundlagen, Auftragsverarbeitungsverträge, Drittlandtransfers und eine mögliche Datenschutz-Folgenabschätzung fachkundig zu prüfen.

Der Übungsstand für diese Entscheidungen ist in [`phase1Datenschutz.md`](phase1Datenschutz.md) dokumentiert. Für den simulierten MVP sind Konten nur für Erwachsene vorgesehen; Fotos, Kommentare, öffentliche Vermittlung und das Teilen des Geburtsjahres bleiben außerhalb des MVP.

## 11. Barrierefreiheitskonzept

PlayDate strebt WCAG 2.2 AA an. Die Qualität wird nicht nur automatisiert, sondern auch manuell geprüft.

- semantisches HTML und logische Überschriftenstruktur
- vollständige Tastaturbedienung
- sichtbare Fokuszustände
- ausreichend große Touch-Ziele
- kontrastreiche Light- und Dark-Modi mit mindestens 4,5:1 für normalen Text und wichtige Bedienelemente
- verständliche Fehlertexte direkt am jeweiligen Feld
- Statusinformationen nicht nur über Farben
- Unterstützung für Screenreader
- reduzierte Animation bei entsprechender Systemeinstellung
- Tests mit axe, Tastatur, VoiceOver und NVDA

## 12. Technisches Konzept

Der Prototyp verwendet React, TypeScript, Vite, TanStack Router und Clerk. Die Oberfläche folgt Atomic Design. Vitest und Testing Library bilden die Testbasis.

Die visuelle Richtung nutzt DaisyUI mit eigenen PlayDate-Themes. Der Light Mode ist hell, neutral und blau akzentuiert. Der Dark Mode verwendet einen fast schwarzen Hintergrund und gedämpftes Blau. Grün bleibt positiven Zuständen vorbehalten. Große Rundungen sorgen für Freundlichkeit, ohne den klaren, modernen Charakter aufzugeben.

Für den produktiven Betrieb wird zusätzlich benötigt:

- ein geschütztes Backend
- eine relationale Datenbank mit Familien- und Berechtigungsbeziehungen
- objektbasierter Speicher für Fotos
- Queue oder Worker für Erinnerungen
- kurzlebige, nicht erratbare Einladungstoken
- serverseitige Autorisierung für jeden Datenzugriff
- Audit-Protokolle für sicherheitsrelevante Vorgänge
- Monitoring, Backups und Wiederherstellungstests

`localStorage` ist nur für den aktuellen Prototyp geeignet und darf nicht die produktive Hauptspeicherung privater Daten übernehmen.

## 13. Lern- und Projekterfolg

Im React-Modul wird der Erfolg zuerst daran gemessen, ob die Lernziele verständlich und überprüfbar umgesetzt sind:

- nachvollziehbare Komponenten- und Datenstruktur
- funktionierende Formulare, State-Updates und Routennavigation
- wiederverwendbare Hooks und Context ohne unnötige Komplexität
- mobile und tastaturbedienbare Kernabläufe
- automatisierte Tests für zentrale Logik und Fehlerfälle
- verständliche Dokumentation der Entscheidungen und Grenzen

Für eine rein gedachte spätere Produktphase wären zusätzlich folgende Kennzahlen sinnvoll:

- Anteil erfolgreich abgeschlossener PlayDate-Erstellungen
- benötigte Zeit bis zum gespeicherten ersten PlayDate
- Anteil beantworteter Einladungen
- Anteil der Termine, die ohne zusätzliche organisatorische Rückfrage stattfinden
- freiwillige Wiederverwendung der App
- Anzahl und Schwere von Bedienungs- und Barrierefreiheitsproblemen
- Anzahl von Datenschutz- oder Sicherheitsvorfällen

Analysen müssen datensparsam und möglichst ohne personenbezogenes Tracking erfolgen.

## 14. Risiken und Gegenmaßnahmen

| Risiko | Gegenmaßnahme |
| --- | --- |
| Einladung wird an falsche Person weitergeleitet | Anmeldung, kurzlebiges Token und Freigabeprüfung |
| Zu viele Daten über Kinder werden sichtbar | minimale Standardfreigaben und klare Einwilligungen |
| Eltern nutzen weiterhin nur WhatsApp | Teilen einfach integrieren statt Messenger ersetzen zu wollen |
| Terminänderungen werden übersehen | Änderungsstatus und freiwillige Benachrichtigungen |
| Kalenderzugriff wirkt zu umfassend | kleinste Berechtigungen und transparente Erklärung |
| App ist für gestresste Nutzer zu kompliziert | kurze Formulare, klare Sprache und Nutzertests |
| Fotos werden ohne passende Zustimmung geteilt | Einwilligungsstatus vor Upload und Ansicht prüfen |

## 15. Abgrenzung

PlayDate ist keine öffentliche Vermittlungsplattform, kein soziales Netzwerk für Kinder und kein Ortungsdienst. Die App bewertet weder Kinder noch Eltern und erstellt keine Verhaltensprofile. Der Fokus liegt ausschließlich auf der privaten Organisation bereits bekannter Familien.

## 16. Aktueller Stand

**Stand: 18. Juli 2026.**

Der vorhandene Frontend-Prototyp bildet bereits wesentliche Teile des Konzepts ab:

- geschützter PlayDate-Bereich mit Clerk
- PlayDate-Verwaltung
- Familienprofil und Kindergeburtstage
- Kalenderexport
- responsive Monatsansicht mit den vorhandenen PlayDates
- vergrößerbare Kalenderdetails in einer modalen Ebene
- technische Datenschutzseite und sicher abgegrenzter Foto-Konzeptbereich
- PWA-Installation mit Website-Verknüpfung als Browser-Fallback
- Teilen über die Geräteschnittstelle und WhatsApp
- Light und Dark Mode
- mobile PWA
- Atomic-Design-Struktur und erste automatisierte Tests

Die lokale Prüfkette aus Oxlint, 66 Vitest-Tests, TypeScript und Vite-Build läuft ohne Fehler. Eine Playwright-Strecke mit 40 Desktop-, Mobil-, Responsive- und PWA-Szenarien ist eingerichtet; reale Mehrbrowser- und Geräteläufe stehen noch aus. Der aktuelle Auditstand wird in [`phasenPlan.md`](phasenPlan.md) gepflegt.

Noch nicht produktiv umgesetzt sind insbesondere ein Backend, echte Familienverbindungen, gemeinsam beantwortete Einladungen, serverseitige Erinnerungen, Kommentare, Fotos und eine dauerhafte Kalendersynchronisation.
