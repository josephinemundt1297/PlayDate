# PlayDate – Phasenplan

> **Lernkontext:** PlayDate ist mein Trainingsprojekt im React-Modul der einjährigen DCI-Weiterbildung zur Web- und Softwareentwicklerin. Ein Haken bedeutet „als Lernziel umgesetzt oder als Übung dokumentiert“, nicht „produktiv oder rechtlich freigegeben“.

## 1. Zweck des Plans

Dieser Phasenplan ordnet meinen Lernfortschritt und mögliche spätere Erweiterungen. Phase 0 und 1 bilden den abgeschlossenen Kern des React-Trainingsprojekts. Ab Phase 2 beginnt ein optionaler Full-Stack- und Produktionsausblick, der nicht zur abgeschlossenen React-Modul-Leistung gehört.

Die Zeitangaben sind grobe Richtwerte für ein kleines Team. Sie sind keine festen Veröffentlichungstermine. Datenschutz, externe Anbieter, App-Freigaben und Rückmeldungen aus Nutzertests können den Zeitbedarf verändern.

## 2. Überblick

| Phase | Schwerpunkt                          | Richtwert   | Ergebnis                                          |
| ----- | ------------------------------------ | ----------- | ------------------------------------------------- |
| 0     | React-Prototyp und technische Basis  | abgeschlossen | nachweisbare React-Lernleistung                  |
| 1     | Produkt- und Datenschutzübung        | abgeschlossen | dokumentierte fachliche Leitplanken              |
| 2     | Backend und Datenmodell              | 2–4 Wochen  | sichere serverseitige Speicherung                 |
| 3     | Familien und Verbindungen            | 2–3 Wochen  | echte private Familienbeziehungen                 |
| 4     | PlayDates und Einladungen            | 2–4 Wochen  | vollständiger gemeinsamer Planungsablauf          |
| 5     | Kalender und Erinnerungen            | 2–3 Wochen  | zuverlässige Terminübernahme und Benachrichtigung |
| 6     | Datenschutzfunktionen und Sicherheit | 2–4 Wochen  | kontrollierbarer Datenlebenszyklus                |
| 7     | A11Y, Qualität und Pilot             | 2–3 Wochen  | geprüfter MVP für Testfamilien                    |
| 8     | Produktionsstart                     | 1–2 Wochen  | kontrollierter öffentlicher Betrieb               |
| 9     | Ausbau nach dem MVP                  | fortlaufend | Kommentare, Fotos und weitere Komfortfunktionen   |

Phasen 0 und 1 sind anhand der dokumentierten Nachweise abgeschlossen. Die folgenden Phasen sind optionale Ideen für eine spätere Vertiefung und keine offenen Pflichtaufgaben des React-Moduls.

## Zentrale Umsetzungscheckliste

Diese Checkliste zeigt den aktuellen Stand auf einen Blick. Ein Haken bedeutet, dass ein technischer Punkt umgesetzt oder ein Konzeptpunkt für die Übung nachvollziehbar dokumentiert ist. Offene technische Punkte benötigen noch Entwicklung. Vor einem echten Betrieb beginnt eine separate Rechts-, Anbieter- und Betriebsfreigabe unabhängig von diesen Übungshaken neu.

### Phase 0 – Prototyp und technische Basis

- [x] React, TypeScript und Vite eingerichtet
- [x] TanStack Router mit den zentralen App-Routen eingerichtet
- [x] Komponenten nach Atomic Design aufgeteilt
- [x] `app.tsx` auf die minimale App-Verbindung reduziert
- [x] selbst angelegte Dateien und Ordner auf lower camelCase umgestellt
- [x] Clerk-Anmeldung eingebunden
- [x] PlayDate- und Familiendaten hinter der Anmeldung geschützt
- [x] Light Mode, Dark Mode und Systemmodus umgesetzt
- [x] Grün-Blau-Farbwelt als bevorzugtes Theme umgesetzt
- [x] zentrale Dark-Mode-Kontraste rechnerisch auf mindestens 4,5:1 geprüft
- [x] zentrale Light-Mode-Textkontraste und UI-Grenzen nach WCAG 2.2 AA nachgemessen
- [x] Kontrast der primären Theme-Aktionen automatisiert gegen mindestens 4,5:1 getestet
- [x] Tailwind CSS 4 und DaisyUI 5 eingebunden
- [x] eigene DaisyUI-Themes für Light und Dark Mode erstellt
- [x] zentrale Karten, Buttons, Formulare, Badges, Alerts und Navigation auf DaisyUI umgestellt
- [x] mobile-first Oberfläche umgesetzt
- [x] mobile PlayDate-Liste bei 320 CSS-Pixeln gegen horizontales Überlaufen abgesichert
- [x] Tablet- und kleine Laptopbreiten bis 1024 CSS-Pixel mit kompakter Navigation abgesichert
- [x] feste Mindestbreite des Seitenkörpers entfernt und Engstellen bis 240 CSS-Pixel abgesichert
- [x] Kalenderaktionen auf sehr schmalen Ansichten gestapelt
- [x] Datenschutzlink im mobilen Layout wieder sichtbar gemacht
- [x] PWA-Manifest und Service Worker eingerichtet
- [x] App und Repository einheitlich in PlayDate umbenannt
- [x] erste Unit- und Komponententests mit Vitest eingerichtet
- [x] gemeinsame Prüfkette über `npm run check` eingerichtet
- [x] Projektspezifikation und Produktkonzept dokumentiert
- [x] bestehende Oxlint-Warnungen vollständig behoben
- [x] Error Boundary und einheitliche Fehlerzustände ergänzen
- [x] Lade-, Leer- und Offline-Zustände vollständig prüfen
- [x] Formularvalidierung für alle dokumentierten Randfälle erweitern
- [x] Tests für Auth-Grenze, Familienseite und PlayDate-Formular ergänzen
- [x] vollständige End-to-End-Teststrecke einrichten
- [ ] optionaler Zusatznachweis: PWA-Updates auf mehreren Browsern und Geräten prüfen
- [x] Playwright-Prüfung für Service-Worker-Registrierung und Cache-Version eingerichtet
- [x] Chromium, Firefox, WebKit, Pixel 7 und iPhone 14 als Projekte konfiguriert
- [ ] optionaler Zusatznachweis: Browserläufe mit installierten Playwright-Browsern ausführen
- [ ] optionaler Zusatznachweis: PWA-Update auf echten Android- und iOS-Geräten prüfen

**Bewertung Phase 0:** für das React-Modul abgeschlossen. Die drei offenen PWA-/Browserpunkte sind freiwillige Zusatznachweise, die eine Umgebung mit Browser-Binaries beziehungsweise echte Geräte benötigen.

### Phase 1 – Produkt und Datenschutz

- [x] Zielgruppe und Produktversprechen beschrieben
- [x] MVP und spätere Funktionen im Konzept voneinander getrennt
- [x] grundlegende DSGVO- und A11Y-Anforderungen dokumentiert
- [x] öffentliche Kinderprofile und öffentliche Vermittlung als Nicht-Ziele festgelegt
- [x] MVP-Scope als verbindliche Übungsgrundlage festlegen
- [x] Rollen- und Berechtigungsmatrix erstellen
- [x] mögliche Rechtsgrundlagen je Datenart als Übung bewerten
- [x] Einwilligungsabläufe für das Übungskonzept freigeben
- [x] Speicher- und Löschfristen für das Übungskonzept festlegen
- [x] Auftragsverarbeiter und Drittlandtransfers als Übung prüfen
- [x] Entwürfe für Datenschutzinformation und Impressum erstellen
- [x] Datenschutzinformation und Impressum als klar bezeichnete Übungsmuster einordnen
- [x] technische Vorprüfung zur Datenschutz-Folgenabschätzung dokumentieren
- [x] DSFA-Entscheidung für das Übungsprojekt dokumentieren
- [x] Bedrohungsmodell dokumentieren

Phase 1 ist für den Umfang des Übungsprojekts abgeschlossen. Annahmen und die bei einer echten Veröffentlichung neu nötigen Prüfungen stehen in [`phase1Datenschutz.md`](phase1Datenschutz.md).

**Bewertung Phase 1:** als Produkt-, Datenschutz- und Sicherheitsübung im React-Modul vollständig abgeschlossen.

### Phase 2 – Backend und Datenmodell

- [x] Datenmodelle für den Frontend-Prototyp definiert
- [x] lokale Prototyp-Daten nach Clerk User-ID getrennt
- [x] Migration alter lokaler PlayDate-Schlüssel eingebaut
- [ ] Backend-Technologie und EU-Hosting auswählen
- [ ] relationale Datenbank einrichten
- [ ] produktives Datenmodell mit stabilen IDs erstellen
- [ ] Clerk-Sitzungen serverseitig validieren
- [ ] geschützte API für Familien und PlayDates implementieren
- [ ] serverseitige Eingabevalidierung ergänzen
- [ ] Rollen und Berechtigungen serverseitig durchsetzen
- [ ] Secret-Management einrichten
- [ ] Backups und Wiederherstellung testen
- [ ] `localStorage` als produktiven Hauptspeicher ablösen

### Phase 3 – Familien und Verbindungen

- [x] Familienname lokal verwaltbar
- [x] beliebig viele eigene Kinder lokal verwaltbar
- [x] Geburtstag pro Kind speicherbar
- [x] Freigabeeinstellung für Geburtstage vorhanden
- [x] eigenes Kind im PlayDate-Formular auswählbar
- [x] Oberfläche für freigegebene Geburtstage vorbereitet
- [ ] Familienprofile über die API speichern
- [ ] echte private Familienverbindungen implementieren
- [ ] Verbindungsanfragen annehmen, ablehnen und widerrufen
- [ ] kurzlebige und widerrufbare Einladungstoken verwenden
- [ ] Geburtstagsfreigaben serverseitig prüfen
- [ ] Geburtsjahr standardmäßig ausblenden
- [ ] Blockieren und Entfernen von Verbindungen ermöglichen
- [ ] Rate Limits und Missbrauchsschutz ergänzen

### Phase 4 – PlayDates und Einladungen

- [x] PlayDates lokal erstellen
- [x] PlayDates lokal bearbeiten
- [x] PlayDates nach Rückfrage lokal löschen
- [x] eigenes Kind, anderes Kind, Datum und Uhrzeit erfassen
- [x] Treffpunkt und Mitbringsel erfassen
- [x] Status „Bestätigt“ und „Ausstehend“ anzeigen
- [x] Teilen über Web Share beziehungsweise WhatsApp vorbereitet
- [ ] PlayDates im Backend speichern
- [ ] Teilnehmer über stabile IDs zuordnen
- [ ] echte Einladung an verbundene Familien senden
- [ ] Einladungen annehmen oder ablehnen
- [ ] Änderungen bei allen Beteiligten aktualisieren
- [ ] Absagen statt stiller Löschung umsetzen
- [ ] private Inhalte vor weitergeleiteten Links schützen
- [ ] Mitbringsel mit konkreten Zuständigkeiten erweitern
- [ ] Aktivitätsverlauf für wichtige Änderungen ergänzen

### Phase 5 – Kalender und Erinnerungen

- [x] responsive Monatsansicht mit PlayDates umgesetzt
- [x] vergrößerbare PlayDate-Details als modalen Kalender-Layer umgesetzt
- [x] Kalenderroute in Desktop- und Mobilnavigation eingebunden
- [x] Export aller PlayDates als `.ics`-Datei umgesetzt
- [x] Link zum Öffnen eines PlayDates in Google Kalender umgesetzt
- [x] Kalenderfunktionen durch erste Tests abgesichert
- [x] Erinnerungsoptionen im Formular dargestellt
- [ ] `.ics`-Export mit mehreren Kalenderprogrammen prüfen
- [ ] Zeitzonen und Sommerzeit umfassend testen
- [ ] Erinnerungseinstellungen produktiv speichern
- [ ] Queue oder Worker für Erinnerungen einrichten
- [ ] ersten produktiven Benachrichtigungskanal anbinden
- [ ] Opt-in und Abbestellung vollständig umsetzen
- [ ] Erinnerungen bei Änderung oder Absage neu planen
- [ ] OAuth-Konzept für spätere Kalendersynchronisation erstellen

### Phase 6 – Datenschutz und Sicherheit

- [x] private Bereiche erfordern eine Clerk-Anmeldung
- [x] Hinweise zu privaten Fotos, Kommentaren und Daten eingebaut
- [x] Datenschutzhinweis mit technischer Datenschutzseite verknüpft
- [x] Foto-Menü und sichere technische Anforderungen sichtbar dokumentiert
- [x] Secret Keys aus der Browserkonfiguration ausgeschlossen und dokumentiert
- [ ] serverseitige Autorisierung für jede private Ressource umsetzen
- [ ] Einwilligungsübersicht und Widerruf umsetzen
- [ ] Datenauskunft und Datenexport anbieten
- [ ] vollständige Konto- und Datenlöschung umsetzen
- [ ] technische Löschfristen automatisieren
- [ ] Audit-Protokolle datensparsam einführen
- [ ] Content Security Policy und sichere HTTP-Header einrichten
- [ ] Schutz gegen CSRF, XSS und IDOR testen
- [ ] Abhängigkeiten automatisiert auf Schwachstellen prüfen
- [ ] externe Sicherheitsprüfung durchführen

### Phase 7 – A11Y, Qualität und Pilot

- [x] semantische Grundstruktur und Skip-Link vorhanden
- [x] sichtbare Fokusmarkierungen vorgesehen
- [x] ausreichend große mobile Bedienelemente berücksichtigt
- [x] reduzierte Animation über `prefers-reduced-motion` berücksichtigt
- [x] Light und Dark Mode vorhanden
- [ ] automatisierte axe-Tests einrichten
- [ ] alle Kernabläufe ausschließlich per Tastatur testen
- [ ] manuelle Tests mit VoiceOver und NVDA durchführen
- [x] zentrale Text- und Bedienkontraste für Light und Dark Mode gemessen und dokumentiert
- [ ] unterstützte mobile Geräte und Browser festlegen und testen
- [ ] Pilotgruppe mit freiwilligen Testfamilien durchführen
- [ ] kritische Ergebnisse aus dem Pilot beheben

### Phase 8 – Produktionsstart

- [ ] Produktionsumgebung und eigene Domain einrichten
- [ ] Monitoring, Alarmierung und Fehlertracking aktivieren
- [ ] Rollback und Wiederherstellung praktisch testen
- [ ] finale Datenschutztexte veröffentlichen
- [ ] Verantwortlichkeiten für Betrieb und Vorfälle festlegen
- [ ] kontrollierten Einladungsbetrieb starten
- [ ] datensparsame Produktkennzahlen beobachten

### Phase 9 – Ausbau nach dem MVP

- [ ] strukturierte Mitbringlisten mit Zuständigkeiten
- [ ] Kommentare im geschützten PlayDate-Bereich
- [ ] mehrere Sorgeberechtigte pro Familie
- [ ] private Fotos mit geprüfter Einwilligung
- [ ] bidirektionale Google- und Microsoft-Kalendersynchronisation
- [ ] feinere Benachrichtigungseinstellungen

### Fortschrittsregel

Die Checkliste wird bei jeder abgeschlossenen Funktion aktualisiert. Ein Punkt wird erst abgehakt, wenn die Implementierung geprüft ist und die zugehörigen Abnahmekriterien erfüllt sind. Eine sichtbare Oberfläche ohne produktive Backend-Funktion bleibt deshalb als offener Punkt markiert.

## 3. Phase 0 – Prototyp stabilisieren

**Status:** für das React-Trainingsprojekt abgeschlossen; freiwillige Geräteprüfung offen

**Richtwert:** 1–2 Wochen

### Ziel

Der vorhandene React-Prototyp wird zu einer verlässlichen Grundlage für die Backend-Integration. Bekannte Übergangslösungen werden dokumentiert, Tests ergänzt und technische Schulden reduziert.

### Bereits vorhanden

- React, TypeScript und Vite
- TanStack Router
- Clerk-Anmeldung und geschützte Oberfläche
- Atomic-Design-Struktur
- Familienprofil mit mehreren Kindern und Geburtstagen
- PlayDates erstellen, bearbeiten und löschen
- `.ics`-Export und Google-Kalender-Link
- Light Mode, Dark Mode und PWA
- erste automatisierte Tests

### Arbeitspakete

- doppelte Kommentare und kleine Inkonsistenzen im Code entfernen
- bestehende Oxlint-Warnungen prüfen und möglichst beheben
- Error Boundary und verständliche Fehlerzustände ergänzen
- Lade-, Leer- und Offline-Zustände vereinheitlichen
- Formularvalidierung für Datum, Uhrzeit und Pflichtfelder erweitern
- Tests für Login-Grenze, Familienformular und PlayDate-Formular ergänzen
- mindestens einen vollständigen End-to-End-Test vorbereiten
- PWA-Aktualisierung und Service-Worker-Verhalten testen
- Demo-Daten klar von echten Nutzerdaten trennen

### Ergebnis

Ein reproduzierbar baubarer Frontend-Stand mit klarer Testbasis und dokumentierten Schnittstellen für das Backend.

### Abnahmekriterien

- `npm run check` läuft ohne Fehler
- kritische Abläufe besitzen automatisierte Tests
- keine privaten Beispieldaten erscheinen versehentlich bei neuen Nutzern
- Fehler- und Leerzustände sind verständlich und per Tastatur erreichbar
- responsive Zielbreiten wurden automatisiert beziehungsweise im Layout geprüft; reale Mehrbrowser- und Geräteläufe bleiben Zusatznachweise

## 4. Phase 1 – Produkt- und Datenschutzgrundlage

**Status:** für das Trainingsprojekt abgeschlossen

**Richtwert:** 1–2 Wochen  
**Abhängigkeit:** kann parallel zu Phase 0 beginnen

### Ziel

Der MVP-Umfang, die Datenverarbeitung und die Verantwortlichkeiten werden vor der Speicherung echter Kinderdaten verbindlich festgelegt.

### Arbeitspakete

- MVP-Funktionen aus dem Konzept priorisieren und freigeben
- Nutzerrollen und Freigabeabläufe fachlich beschreiben
- Rechtsgrundlagen für Konto-, Familien-, Termin- und Kommunikationsdaten klären
- Einwilligungsablauf für Kindergeburtstage festlegen
- Speicher- und Löschfristen je Datenart bestimmen
- Hosting-Region und eingesetzte Auftragsverarbeiter prüfen
- Drittlandtransfers von Clerk und weiteren Anbietern bewerten
- Datenschutzinformation und Impressum vorbereiten
- Notwendigkeit einer Datenschutz-Folgenabschätzung fachkundig prüfen
- Bedrohungsmodell für Einladungslinks und private Kinderdaten erstellen

Der abgeschlossene Übungsstand mit MVP-Grenze, Berechtigungsmatrix, Dateninventar, Fristannahmen, Anbieterübersicht, Pflichttext-Mustern, DSFA-Vorprüfung und Bedrohungsmodell liegt in [`phase1Datenschutz.md`](phase1Datenschutz.md).

### Ergebnis

Ein freigegebener MVP-Scope sowie ein dokumentiertes Datenschutz- und Berechtigungskonzept.

### Abnahmekriterien

- jede erhobene Information besitzt Zweck und Löschfrist
- Rollen und erlaubte Aktionen sind als Berechtigungsmatrix dokumentiert
- Einwilligungen sind getrennt, verständlich und widerrufbar geplant
- Anbieter und Datenflüsse sind vollständig erfasst
- reale rechtliche Risiken sind klar vom abgeschlossenen Übungsumfang getrennt

## 5. Phase 2 – Backend und Datenmodell (optionale Full-Stack-Vertiefung)

**Richtwert:** 2–4 Wochen  
**Abhängigkeit:** Phase 1

### Ziel

Private Daten werden nicht länger als Hauptspeicher im Browser abgelegt, sondern in einem geschützten Backend mit serverseitiger Autorisierung verwaltet.

### Arbeitspakete

- Backend-Technologie und EU-Hosting auswählen
- relationale Datenbank einrichten
- Tabellen für Nutzer, Familien, Kinder, PlayDates und Einwilligungen anlegen
- Clerk-Identität serverseitig prüfen
- API für Familien und PlayDates implementieren
- Berechtigungen bei jeder Lese- und Schreiboperation prüfen
- Schema-Migrationen und Seed-Daten sauber trennen
- Validierung auf Client und Server umsetzen
- verschlüsselte Verbindungen und Secret-Management einrichten
- Backups und Wiederherstellung testen
- lokale Prototyp-Daten optional in das Backend migrieren

### Empfohlenes Kernmodell

- `users`
- `families`
- `familyMembers`
- `children`
- `playDates`
- `playDateParticipants`
- `consents`
- `auditEvents`

Namen dürfen nicht als technische Beziehungsschlüssel verwendet werden. Beziehungen benötigen unveränderliche IDs.

### Ergebnis

Eine versionierte API mit Datenbank, die Familien- und PlayDate-Daten sicher und nutzerbezogen speichert.

### Abnahmekriterien

- ein Nutzer kann niemals Daten einer fremden Familie über die API abrufen
- ungültige oder abgelaufene Clerk-Sitzungen werden abgewiesen
- Eingaben werden serverseitig validiert
- Datenbankmigrationen funktionieren auf einer leeren und einer bestehenden Umgebung
- Backup und Wiederherstellung wurden praktisch getestet
- Secrets befinden sich weder im Frontend-Bundle noch im Repository

## 6. Phase 3 – Familien und private Verbindungen

**Richtwert:** 2–3 Wochen  
**Abhängigkeit:** Phase 2

### Ziel

Familien können sich kontrolliert verbinden. Freigegebene Geburtstage werden nur innerhalb bestätigter Beziehungen sichtbar.

### Arbeitspakete

- Familienprofile über die API verwalten
- mehrere Kinder sicher einer Familie zuordnen
- Einladungsablauf für Familienverbindungen entwickeln
- kurzlebige und nicht erratbare Verbindungstoken verwenden
- Einladungen annehmen, ablehnen und widerrufen
- Berechtigung für Geburtstagsfreigaben serverseitig prüfen
- standardmäßig nur Tag und Monat anzeigen
- Verbindungen blockieren beziehungsweise entfernen können
- verständliche Zustände für offen, bestätigt, abgelehnt und abgelaufen gestalten
- Missbrauchsschutz und Rate Limits für Einladungen ergänzen

### Ergebnis

Zwei bekannte Familien können sich ausdrücklich verbinden und nur freigegebene Informationen sehen.

### Abnahmekriterien

- ohne bestätigte Verbindung sind keine Geburtstage sichtbar
- eine entfernte Verbindung verliert den Zugriff unmittelbar
- das Geburtsjahr bleibt standardmäßig verborgen
- Einladungslinks laufen ab und können widerrufen werden
- alle Verbindungszustände sind per Tastatur und Screenreader verständlich

## 7. Phase 4 – PlayDates und Einladungen

**Richtwert:** 2–4 Wochen  
**Abhängigkeit:** Phasen 2 und 3

### Ziel

Der zentrale Ablauf funktioniert zwischen zwei echten Familien: erstellen, einladen, beantworten, ändern und absagen.

### Arbeitspakete

- PlayDates vollständig über das Backend speichern
- eigenes Kind über eine stabile ID auswählen
- verbundene Familie oder eingeladenes Kind auswählen
- Teilnehmerrollen und Organisator festlegen
- Einladungsstatus offen, angenommen und abgelehnt abbilden
- PlayDate-Änderungen für Beteiligte sichtbar machen
- Absage statt unbemerktem Löschen bei angenommenen Terminen verwenden
- Einladung über Web Share und WhatsApp vorbereiten
- öffentliche Links von privaten Inhalten trennen
- Mitbringsel und Zuständigkeiten strukturiert speichern
- Aktivitätsverlauf für wichtige Terminänderungen ergänzen

### Ergebnis

Ein PlayDate kann zwischen verbundenen Familien vollständig geplant und abgestimmt werden.

### Abnahmekriterien

- nur Organisator und eingeladene Familien sehen den Termin
- eingeladene Personen können zu- oder absagen
- Statusänderungen erscheinen bei allen Beteiligten
- entfernte Teilnehmer verlieren sofort den Zugriff
- ein weitergeleiteter Link allein gewährt keinen Zugriff
- Terminänderungen und Absagen sind eindeutig erkennbar

## 8. Phase 5 – Kalender und Erinnerungen

**Richtwert:** 2–3 Wochen  
**Abhängigkeit:** Phase 4

### Ziel

Termine lassen sich zuverlässig übernehmen. Freiwillige Erinnerungen erreichen Nutzer zur richtigen Zeit.

### Arbeitspakete

- bestehenden `.ics`-Export mit verschiedenen Kalendern testen
- Zeitzonen und Sommerzeit durchgängig berücksichtigen
- Google-Kalender-Link weiter absichern
- Erinnerungsoptionen im Datenmodell speichern
- Queue beziehungsweise Worker für geplante Zustellung einrichten
- zunächst E-Mail oder Web Push als einen Kanal auswählen
- Opt-in, Abbestellung und fehlgeschlagene Zustellung abbilden
- Erinnerungen bei Änderungen neu planen und bei Absage entfernen
- Konzept für spätere Google- und Microsoft-OAuth-Synchronisation vorbereiten

### Ergebnis

Nutzer können Termine übernehmen und auf Wunsch zuverlässig erinnert werden.

### Abnahmekriterien

- exportierte Termine zeigen Datum, Uhrzeit und Zeitzone korrekt
- abgesagte Termine lösen keine Erinnerung aus
- geänderte Termine erzeugen keine doppelten Erinnerungen
- Benachrichtigungen können jederzeit deaktiviert werden
- ohne ausdrückliche Freigabe erfolgt kein Kalenderzugriff

## 9. Phase 6 – Datenschutzfunktionen und Sicherheit

**Richtwert:** 2–4 Wochen  
**Abhängigkeit:** Phasen 2 bis 5

### Ziel

Nutzer können ihre Daten und Freigaben selbst kontrollieren. Technische Schutzmaßnahmen werden vor dem Pilotbetrieb systematisch geprüft.

### Arbeitspakete

- Übersicht der gespeicherten Daten und Einwilligungen erstellen
- Einwilligungen widerrufbar machen
- Datenexport in verständlichem Format anbieten
- Berichtigung und Kontolöschung umsetzen
- Löschfristen automatisieren
- vollständige Löschung in Datenbank, Dateispeicher und Backups planen
- Audit-Protokolle ohne unnötige Inhaltsdaten einführen
- Content Security Policy und sichere HTTP-Header konfigurieren
- Schutz gegen CSRF, XSS, IDOR und Rate-Limit-Umgehung testen
- Abhängigkeiten auf bekannte Schwachstellen prüfen
- Sicherheits- und Datenschutzvorfälle als Prozess beschreiben
- externe Sicherheitsprüfung vor größerem Rollout einplanen

### Ergebnis

Ein datenschutzbewusster MVP mit nachvollziehbaren Freigaben, Export und Löschung.

### Abnahmekriterien

- Nutzer können sehen, welche Daten und Einwilligungen gespeichert sind
- ein Widerruf wirkt auf zukünftige Zugriffe und Verarbeitungen
- Export enthält die eigenen Daten in verständlicher Form
- Kontolöschung entfernt oder anonymisiert Daten nach festgelegten Regeln
- automatisierte Autorisierungstests decken fremde Ressourcen ab
- kritische und hohe Sicherheitsbefunde sind behoben

## 10. Phase 7 – Barrierefreiheit, Qualität und Pilot

**Richtwert:** 2–3 Wochen  
**Abhängigkeit:** Phasen 3 bis 6

### Ziel

Der MVP wird mit realistischen Geräten, Hilfsmitteln und einer kleinen Gruppe freiwilliger Testfamilien geprüft.

### Arbeitspakete

- automatisierte axe-Tests in die Prüfkette aufnehmen
- zentrale Abläufe vollständig per Tastatur testen
- Tests mit VoiceOver und NVDA durchführen
- Kontraste in Light und Dark Mode messen
- mobile Tests mit verschiedenen Displaygrößen durchführen
- End-to-End-Tests für Registrierung, Familie, Einladung und PlayDate ergänzen
- Fehler-, Offline- und langsame Netzwerkzustände testen
- kleine Pilotgruppe mit klarer Einwilligung zusammenstellen
- strukturiertes Feedback zu Verständnis, Vertrauen und Bedienbarkeit sammeln
- Support- und Rückmeldekanal vorbereiten
- gefundene Blocker vor dem Produktionsstart beheben

### Ergebnis

Ein mit echten Nutzungsszenarien geprüfter Release Candidate.

### Abnahmekriterien

- Kernabläufe funktionieren ohne Maus
- keine bekannten kritischen WCAG-2.2-AA-Verstöße
- keine horizontalen Überläufe auf unterstützten Mobilgeräten
- End-to-End-Tests decken die Hauptabläufe ab
- Pilotfamilien verstehen Freigaben und Einladungsstatus ohne Erklärung
- alle kritischen Pilotfehler sind behoben

## 11. Phase 8 – Kontrollierter Produktionsstart

**Richtwert:** 1–2 Wochen  
**Abhängigkeit:** Phase 7 und fachliche Freigaben aus Phase 1

### Ziel

PlayDate geht schrittweise und beobachtbar in den produktiven Betrieb.

### Arbeitspakete

- Produktionsumgebung und eigene Domain konfigurieren
- Monitoring, Alarmierung und Fehlertracking aktivieren
- Backups und Wiederherstellungsplan final prüfen
- Datenschutzinformation und Impressum veröffentlichen
- Betriebs- und Incident-Verantwortung festlegen
- Release-Checkliste und Rollback-Verfahren testen
- zunächst begrenzte Registrierungen oder Einladungsbetrieb verwenden
- Kennzahlen ausschließlich datensparsam erfassen
- Supportanfragen und technische Fehler eng beobachten

### Ergebnis

Ein stabiler MVP im kontrollierten Echtbetrieb.

### Abnahmekriterien

- Monitoring erkennt Ausfälle und ungewöhnliche Fehlerraten
- Rollback und Wiederherstellung sind dokumentiert und getestet
- rechtlich erforderliche Informationen sind erreichbar
- keine kritischen offenen Sicherheits- oder Datenschutzbefunde
- Verantwortlichkeiten für Betrieb und Vorfälle sind eindeutig

## 12. Phase 9 – Ausbau nach dem MVP

**Richtwert:** fortlaufend  
**Abhängigkeit:** stabiler Produktionsbetrieb

Neue Funktionen werden anhand von Pilotfeedback und tatsächlichem Nutzen priorisiert.

### Mögliche Reihenfolge

1. strukturierte Mitbringlisten und Zuständigkeiten
2. Kommentare im geschützten PlayDate-Bereich
3. mehrere Sorgeberechtigte pro Familie
4. private Fotos mit dokumentierter Einwilligung
5. bidirektionale Google- und Microsoft-Kalendersynchronisation
6. feinere Benachrichtigungseinstellungen

### Besondere Freigabe für Fotos

Fotos werden erst umgesetzt, wenn Einwilligung, Widerruf, Berechtigungen, EU-Dateispeicher, Löschfristen und Moderationsprozess vollständig geklärt und technisch testbar sind.

## 13. Phasenübergreifende Qualitätsregeln

Diese Regeln gelten in jeder Phase:

- jede Änderung wird überprüft und durch passende Tests abgesichert
- selbst angelegte Dateien und Ordner verwenden lower camelCase
- Komponenten folgen weiterhin Atomic Design
- private Daten werden serverseitig autorisiert
- neue Datenfelder benötigen Zweck, Sichtbarkeit und Löschfrist
- neue Oberflächen werden in Light und Dark Mode geprüft
- neue Farbpaare erreichen für normalen Text und wichtige Bedienelemente mindestens 4,5:1
- Code und Styling folgen KISS und bleiben für Junior-Entwickler nachvollziehbar
- neue Abläufe müssen per Tastatur bedienbar sein
- Geheimnisse gehören weder in den Browser noch in Git
- externe Dienste werden nur mit minimalen Berechtigungen angebunden
- Dokumentation, Konzept und Spezifikation werden bei relevanten Änderungen aktualisiert

## 14. Auditplan

Der Auditplan begleitet die Entwicklung und ist nicht nur eine einmalige Kontrolle kurz vor dem Release. Jede Prüfung erzeugt nachvollziehbare Nachweise, konkrete Feststellungen und eine Entscheidung darüber, ob die nächste Phase beginnen darf.

### Aktueller Auditstatus

**Prüfdatum:** 17. Juli 2026

**Geprüfter Stand:** Frontend-Prototyp im lokalen Projektordner

**Gesamtergebnis:** Phase 0 und 1 als React-Trainingsprojekt bestanden; freiwillige Geräteprüfungen und spätere Full-Stack-Phasen offen; keine Freigabe für echte Daten oder Produktivbetrieb

- [x] Oxlint ausgeführt
- [x] alle 46 vorhandenen Vitest-Tests bestanden
- [x] 40 Playwright-Szenarien werden von der E2E-Konfiguration erkannt
- [ ] Playwright-Szenarien in echten Browser-Engines ausführen
- [x] TypeScript-Prüfung bestanden
- [x] Produktions-Build mit Vite erfolgreich erstellt
- [x] Dependency-Audit für produktive npm-Abhängigkeiten ausgeführt
- [x] Dependency-Audit meldet 0 bekannte Schwachstellen
- [x] die beiden zuvor dokumentierten Oxlint-Warnungen behoben
- [x] Monatsraster, Terminzuordnung und Monatswechsel automatisiert getestet
- [x] zentrale Light-Mode-Kontraste für Text, Fokus und UI-Grenzen rechnerisch geprüft
- [x] responsive Regression der PlayDate-Liste anhand der gemeldeten schmalen Ansicht behoben
- [x] Regressionstest für unsichtbare primäre Aktionen in Light und Dark Mode ergänzt
- [x] Kalender-Detail-Layer und Website-Verknüpfung automatisiert geprüft
- [x] Responsive-Regressionstest für Viewport, Tablet-Breakpoint und Navigation ergänzt
- [x] fremde URL-Schemas im Service Worker vom Cache ausgeschlossen
- [x] Cache- und Registrierungs-Promises gegen unbehandelte Fehler abgesichert
- [x] Service-Worker-Regeln durch Regressionstests geschützt
- [x] Testabdeckung für Authentifizierungsgrenze, Familienseite und PlayDate-Formular erweitert
- [ ] Backend-, API- und Datenbank-Audit durchführen
- [ ] formales Berechtigungs- und IDOR-Audit durchführen
- [ ] vollständiges DSGVO-Audit mit fachkundiger rechtlicher Prüfung durchführen
- [ ] manuelles WCAG-Audit mit Tastatur, VoiceOver und NVDA durchführen
- [ ] PWA auf echten Android- und iOS-Geräten auditieren
- [ ] Betriebs-, Backup- und Wiederherstellungs-Audit durchführen
- [ ] externen Security- beziehungsweise Penetrationstest durchführen

**Offene Feststellungen:**

| ID      | Schweregrad | Feststellung                                                                                                          | Status                                                                        |
| ------- | ----------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| AUD-001 | Niedrig     | `themeContext.tsx` löste eine Fast-Refresh-Warnung aus, weil dieselbe Datei Komponenten und weitere Exporte enthielt. | behoben und mit Oxlint erneut geprüft                                         |
| AUD-002 | Niedrig     | `main.tsx` löste eine Fast-Refresh-Warnung zur Komponentenstruktur aus.                                               | behoben und mit Oxlint erneut geprüft                                         |
| AUD-003 | Hoch        | Das Projekt besitzt noch kein produktives Backend; private Daten liegen im Prototyp in `localStorage`.                | bekannt, Phase 2 geplant                                                      |
| AUD-004 | Hoch        | Serverseitige Autorisierungs-, IDOR- und Rollenprüfungen können ohne Backend noch nicht stattfinden.                  | bekannt, Phasen 2 bis 4 geplant                                               |
| AUD-005 | Hoch        | Eine echte rechtliche DSGVO-Prüfung ist für das Übungsprojekt nicht vorgesehen.                                      | Übungskonzept abgeschlossen; vor realem Betrieb neu zu öffnen                 |

Die erfolgreichen Prüfungen belegen ausschließlich den aktuellen Frontend-Build und die vorhandene Testbasis. Sie sind keine Aussage darüber, dass die Anwendung bereits produktionsreif, vollständig barrierefrei oder rechtlich DSGVO-konform ist.

### Auditziele

- private Familien- und Kinderdaten vor unberechtigtem Zugriff schützen
- nachweisen, dass Datenschutzentscheidungen technisch umgesetzt werden
- Barrieren früh erkennen und vor dem Pilotbetrieb beheben
- Code-, Test- und Betriebsqualität messbar prüfen
- externe Integrationen nur mit notwendigen Berechtigungen verwenden
- offene Risiken sichtbar priorisieren und nachverfolgen

### Auditarten und Zeitpunkte

| Audit                                 | Erster Zeitpunkt                     | Wiederholung                                                       | Ergebnis beziehungsweise Nachweis                                   |
| ------------------------------------- | ------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| Code- und Architektur-Audit           | Ende Phase 0                         | vor jedem Meilenstein                                              | Review-Protokoll, technische Schulden und Architekturentscheidungen |
| Datenschutz-Audit                     | Ende Phase 1                         | bei neuen Datenarten oder Anbietern, mindestens jährlich           | Dateninventar, Rechtsgrundlagen, Löschfristen und Maßnahmenliste    |
| Berechtigungs-Audit                   | Ende Phase 2                         | nach Änderungen am Rollenmodell und vor Releases                   | Rollenmatrix und automatisierte Autorisierungstests                 |
| Einladungs- und Token-Audit           | Ende Phase 3                         | bei Änderungen am Einladungsablauf                                 | Missbrauchsszenarien, Token-Prüfung und Testnachweise               |
| PlayDate-Datenfluss-Audit             | Ende Phase 4                         | vor jedem größeren Release                                         | Datenflussdiagramm und Prüfung fremder Zugriffsversuche             |
| Kalender- und Benachrichtigungs-Audit | Ende Phase 5                         | bei jeder neuen Integration                                        | Berechtigungsumfang, Opt-in-Nachweis und Zeitzonentests             |
| Security-Audit                        | Ende Phase 6                         | vor Produktion, nach kritischen Änderungen und mindestens jährlich | Schwachstellenbericht, Risikoeinstufung und Behebungsnachweis       |
| A11Y-Audit                            | Ende Phase 7                         | vor Releases und bei größeren UI-Änderungen                        | WCAG-Prüfbericht mit automatischen und manuellen Tests              |
| Betriebs-Audit                        | vor Phase 8                          | halbjährlich sowie nach schweren Vorfällen                         | Backup-, Restore-, Monitoring- und Incident-Nachweise               |
| Lieferanten-Audit                     | vor Produktivnutzung eines Anbieters | jährlich und bei Vertragsänderungen                                | Anbieterübersicht, AV-Verträge und Transferbewertung                |

### Audit 1 – Code und Architektur

**Prüfumfang:**

- Einhaltung der Atomic-Design-Struktur
- klare Trennung zwischen UI, Zustand, Domain und API
- kleine und verständliche Komponenten
- TypeScript ohne unnötige unsichere Typen
- konsistente lower-camelCase-Dateinamen
- keine doppelten oder veralteten Codepfade
- verständliche Kommentare ohne irreführende Aussagen
- Abhängigkeiten, Bundle-Größe und Wartbarkeit

**Prüfungen und Nachweise:**

- [x] `npm run check` protokollieren
- [x] offene Oxlint-Warnungen bewertet und behoben
- [ ] Architekturdiagramm mit tatsächlichem Code abgleichen
- [ ] veraltete und ungenutzte Abhängigkeiten prüfen
- [ ] zentrale Komponenten stichprobenartig im Vier-Augen-Prinzip reviewen
- [ ] technische Schulden als priorisierte Issues dokumentieren

### Audit 2 – Datenschutz

**Prüfumfang:**

- Zweck und Rechtsgrundlage jeder Datenart
- Datensparsamkeit bei Kinder- und Familiendaten
- Einwilligungen und Widerrufe
- Auskunft, Berichtigung, Export und Löschung
- Aufbewahrungsfristen und Backups
- Auftragsverarbeiter und Drittlandtransfers
- Datenschutzinformation und verständliche Nutzertexte

**Prüfungen und Nachweise:**

- [x] Dateninventar für den Übungsumfang erstellt
- [x] bekannte und geplante Datenflüsse zu Anbietern dokumentiert
- [x] Zweck, Sichtbarkeit und Übungs-Löschfrist je Datenart festgehalten
- [ ] Einwilligungen mit Zeitstempel und Version nachweisen
- [ ] Widerruf und Kontolöschung praktisch testen
- [ ] Datenexport auf Vollständigkeit und Verständlichkeit prüfen
- [x] mögliche Auftragsverarbeiter und Transfermechanismen für die Übung dokumentiert
- [x] DSFA-Vorprüfung und Übungsentscheidung dokumentiert

Die konzeptionellen Nachweise stehen in [`phase1Datenschutz.md`](phase1Datenschutz.md). Praktische Nachweise für Einwilligung, Widerruf, Löschung und Export bleiben offen, weil die zugehörigen Backend-Funktionen noch fehlen. Vor einem echten Produktivstart wäre unabhängig vom Übungsstatus eine fachkundige rechtliche Bewertung nötig.

### Audit 3 – Authentifizierung und Berechtigungen

**Prüfumfang:**

- gültige und ungültige Clerk-Sitzungen
- Familien-, Kinder- und PlayDate-Zugehörigkeit
- Organisator- und Teilnehmerrechte
- entfernte oder blockierte Verbindungen
- Schutz vor IDOR und erratenen Ressourcen-IDs
- unmittelbare Wirkung von Widerrufen

**Prüfungen und Nachweise:**

- [ ] Zugriff ohne Anmeldung abweisen
- [ ] manipulierte Nutzer-, Familien- und PlayDate-IDs testen
- [ ] Zugriff einer fremden Familie automatisiert prüfen
- [ ] Rechte nach Entfernen einer Verbindung erneut prüfen
- [ ] Rechte nach Absage, Widerruf und Kontolöschung prüfen
- [ ] Server-Endpunkte mit einer Berechtigungsmatrix abgleichen
- [ ] negative Autorisierungstests in die CI aufnehmen

### Audit 4 – Einladungen und Freigabelinks

**Prüfumfang:**

- Entropie und Ablaufzeit von Tokens
- einmalige oder widerrufbare Verwendung
- Schutz privater Inhalte vor Anmeldung
- Weiterleitung eines Links an Dritte
- Rate Limits und Missbrauchserkennung
- sichere Vorschautexte in WhatsApp und Messengern

**Prüfungen und Nachweise:**

- [ ] abgelaufene und widerrufene Tokens testen
- [ ] manipulierte Tokens ablehnen
- [ ] Weiterleitung an ein falsches Konto simulieren
- [ ] prüfen, dass Link-Vorschauen keine Kinderdaten zeigen
- [ ] Rate Limits mit kontrollierten Lasttests prüfen
- [ ] Einladungsereignisse datensparsam protokollieren

### Audit 5 – Anwendungssicherheit

**Prüfumfang:**

- XSS, CSRF, IDOR und Injection
- sichere HTTP-Header und Content Security Policy
- Secret-Management
- Abhängigkeiten und bekannte Schwachstellen
- Transport- und Speicherverschlüsselung
- Logging ohne private Inhaltsdaten
- Schutz vor automatisiertem Missbrauch

**Prüfungen und Nachweise:**

- [x] automatisierten Dependency-Scan ausführen
- [ ] Secret-Scan für Repository und Build-Artefakte ausführen
- [ ] Security-Header in der Produktionsumgebung prüfen
- [ ] Eingabefelder und API-Endpunkte mit ungültigen Daten testen
- [ ] Logs auf Tokens, Kinderdaten und andere Geheimnisse prüfen
- [ ] Rate Limits und Sperrmechanismen testen
- [ ] externen Penetrationstest vor größerem Rollout durchführen
- [ ] behobene kritische Befunde gezielt erneut testen

### Audit 6 – Barrierefreiheit

**Prüfumfang:**

- WCAG 2.2 auf Konformitätsstufe AA
- Tastaturbedienung und Fokusreihenfolge
- Screenreader-Ausgabe
- Farbkontraste in Light und Dark Mode
- Formularfehler und Statusmeldungen
- Vergrößerung, kleine Displays und reduzierte Animation

**Prüfungen und Nachweise:**

- [ ] axe-Prüfung für jede zentrale Route durchführen
- [ ] alle Kernabläufe ohne Maus abschließen
- [ ] VoiceOver auf Safari testen
- [ ] NVDA mit einem unterstützten Browser testen
- [x] zentrale Kontrastwerte für Theme-Texte und Hauptaktionen dokumentiert
- [ ] Ansicht bei 200 Prozent Vergrößerung prüfen
- [ ] Fehlertexte und `aria-live`-Meldungen kontrollieren
- [ ] gefundene Barrieren mit WCAG-Kriterium dokumentieren

**Gemessene zentrale Farbpaare, Stand 17. Juli 2026:**

| Modus | Farbpaar                                         | Verhältnis |
| ----- | ------------------------------------------------ | ---------: |
| Light | Haupttext auf Seitenhintergrund                  |    14,33:1 |
| Light | Sekundärtext auf Seitenhintergrund               |     5,53:1 |
| Light | weißer Text auf Hauptaktion                      |     6,74:1 |
| Light | UI-Linie auf weißer Oberfläche                   |     3,55:1 |
| Light | Fokusmarkierung auf weißer Oberfläche            |     6,70:1 |
| Light | blaues Schnellaktions-Icon auf hellblauer Fläche |     4,79:1 |
| Light | grünes Schnellaktions-Icon auf hellgrüner Fläche |     4,53:1 |
| Dark  | Haupttext auf Seitenhintergrund                  |    18,08:1 |
| Dark  | Sekundärtext auf Seitenhintergrund               |    10,67:1 |
| Dark  | blauer Akzent auf Oberfläche                     |     7,76:1 |
| Dark  | grüner Akzent auf Oberfläche                     |     8,28:1 |
| Dark  | weißer Text auf Hauptaktion                      |     4,65:1 |

Damit erfüllen die geprüften Textpaare mindestens 4,5:1 und die geprüfte erkennbare UI-Grenze mindestens 3:1. Das vollständige WCAG-Audit aller Komponenten, Zustände, Zoomstufen und Screenreader-Ausgaben bleibt offen.

### Audit 7 – Kalender, Erinnerungen und PWA

**Prüfumfang:**

- korrekte Termine in verschiedenen Zeitzonen
- Sommer- und Winterzeit
- Kalenderberechtigungen und OAuth-Scopes
- Opt-in und Abbestellung von Erinnerungen
- Offline-Verhalten und Service-Worker-Updates
- installierte Darstellung und App-Symbole

**Prüfungen und Nachweise:**

- [x] Kalenderansicht ordnet PlayDates in einem Montag-basierten Monatsraster zu
- [x] Monatswechsel und Jahreswechsel automatisiert getestet
- [ ] `.ics`-Dateien in Google, Apple und Microsoft Kalender testen
- [ ] Zeitumstellungen und Zeitzonenwechsel testen
- [ ] doppelte und veraltete Erinnerungen ausschließen
- [ ] Kalenderzugriff ohne Freigabe verhindern
- [ ] PWA-Installation auf Android und iOS prüfen
- [ ] Update von einer älteren PWA-Version testen
- [ ] Offline- und Wiederverbindungsverhalten dokumentieren

### Audit 8 – Betrieb und Notfallvorsorge

**Prüfumfang:**

- Monitoring und Alarmierung
- Backups und Wiederherstellung
- Verfügbarkeit und Fehlerbehandlung
- Incident Response und Datenschutzverletzungen
- Rollback eines fehlerhaften Releases
- Zuständigkeiten und Erreichbarkeit

**Prüfungen und Nachweise:**

- [ ] Restore aus einem echten Backup durchführen
- [ ] Produktionsausfall simulieren
- [ ] Alarmwege und Reaktionszeiten prüfen
- [ ] Rollback auf die vorherige Version testen
- [ ] Ablauf für Datenschutzverletzungen üben
- [ ] Status- und Supportkommunikation vorbereiten
- [ ] Verantwortliche und Vertretungen dokumentieren

### Umgang mit Auditfeststellungen

Jede Feststellung erhält:

- eine eindeutige ID
- Beschreibung und nachvollziehbaren Nachweis
- betroffene Daten, Funktionen und Nutzergruppen
- Schweregrad
- verantwortliche Person
- Zieldatum
- Status „offen“, „in Arbeit“, „behoben“ oder „akzeptiertes Risiko“
- Ergebnis des erneuten Tests

| Schweregrad | Bedeutung                                                              | Reaktion                                             |
| ----------- | ---------------------------------------------------------------------- | ---------------------------------------------------- |
| Kritisch    | akuter unberechtigter Zugriff, Datenverlust oder vollständiger Ausfall | Release stoppen, sofort bearbeiten und erneut prüfen |
| Hoch        | erheblicher Schutz-, Datenschutz- oder A11Y-Verstoß                    | vor Pilot beziehungsweise Release beheben            |
| Mittel      | begrenztes Risiko oder deutliche Qualitätsabweichung                   | verbindlich terminieren und zeitnah beheben          |
| Niedrig     | geringe Auswirkung oder Verbesserung                                   | ins Backlog aufnehmen und priorisieren               |

Ein akzeptiertes Risiko muss begründet, zeitlich begrenzt und von der fachlich verantwortlichen Person bestätigt werden. Kritische Befunde dürfen nicht als akzeptiertes Risiko in einen Release übernommen werden.

### Audit-Freigaben je Meilenstein

- **Meilenstein A:** Code-, Architektur-, Datenschutz- und erstes Berechtigungs-Audit abgeschlossen
- **Meilenstein B:** Berechtigungs-, Einladungs- und PlayDate-Datenfluss-Audit ohne kritische offene Befunde
- **Meilenstein C:** Security-, A11Y-, Kalender-, PWA- und Betriebs-Audit abgeschlossen
- **Meilenstein D:** alle kritischen und hohen Befunde behoben und erneut geprüft

### Audit-Dokumentation

Auditberichte dürfen keine produktiven Kinderdaten, Tokens oder andere Geheimnisse enthalten. Sensible Berichte werden nicht öffentlich im Repository gespeichert. Im Repository können bereinigte Zusammenfassungen, Checklisten und verlinkte Issue-IDs abgelegt werden.

Für jedes Audit werden mindestens Datum, geprüfte Version beziehungsweise Commit, Prüfer, Umfang, verwendete Werkzeuge, Einschränkungen, Feststellungen und Freigabeentscheidung dokumentiert.

## 15. Empfohlene Meilensteine

### Meilenstein A – React-Trainingsbasis abgeschlossen

Phasen 0 bis 2 abgeschlossen. Der Prototyp verwendet ein sicheres Backend.

### Meilenstein B – Kernablauf vollständig

Phasen 3 und 4 abgeschlossen. Zwei Familien können sich verbinden und ein PlayDate gemeinsam abstimmen.

### Meilenstein C – MVP Release Candidate

Phasen 5 bis 7 abgeschlossen. Kalender, Erinnerungen, Datenschutzfunktionen und Qualitätsprüfungen sind vorhanden.

### Meilenstein D – Produktiver MVP

Phase 8 abgeschlossen. PlayDate läuft kontrolliert mit echten Nutzern.

## 16. Unmittelbar nächste Schritte

1. Phase 0 als GitHub-Meilenstein anlegen.
2. vorhandene Warnungen, Testlücken und technische Übergangslösungen als Issues erfassen.
3. MVP-Scope und Rollenmodell aus Phase 1 fachlich bestätigen.
4. Datenschutzberatung für Kinderdaten und Einladungsabläufe einplanen.
5. Backend, Datenbank und EU-Hosting anhand einer kurzen Entscheidungsmatrix auswählen.
6. erst danach mit der Speicherung echter Familien- und Kinderdaten beginnen.
