# PlayDate – Phase 1: Produkt und Datenschutz

**Stand:** 17. Juli 2026

**Status:** Für das Übungsprojekt abgeschlossen

**Geltungsbereich:** simuliertes Produkt für erwachsene Sorgeberechtigte in Deutschland; keine echten personenbezogenen Daten

Dieses Dokument macht die fachlichen Entscheidungen für Phase 1 prüfbar. Es ist keine Rechtsberatung. Alle Freigaben gelten nur als Produktannahmen der Übung und niemals als Aussage, dass eine reale App DSGVO-konform wäre.

## 1. Verbindlicher MVP-Scope

### Für den MVP vorgesehen

- Anmeldung erwachsener Sorgeberechtigter und geschützter App-Bereich
- eigenes Familienprofil mit mehreren Kindern
- Vorname oder selbst gewählter Anzeigename des Kindes
- optionaler Geburtstag; für verbundene Familien höchstens Tag und Monat
- private PlayDates erstellen, bearbeiten, absagen und löschen
- eigenes Kind, eingeladene Familie, Termin, Treffpunkt und Mitbringsel
- Einladung an eine bereits bekannte Familie; annehmen, ablehnen und widerrufen
- Monatskalender, `.ics`-Export und bewusst ausgelöster Google-Kalender-Link
- bewusst ausgelöstes Teilen über Web Share oder WhatsApp
- freiwillige Erinnerungen
- Datenexport, Berichtigung, Einwilligungsübersicht und Konto-/Datenlöschung
- mobile-first PWA, Light/Dark Mode und WCAG 2.2 AA als Qualitätsziel

### Nicht Teil des MVP

- öffentliche Kinderprofile, Suche oder Vermittlung unbekannter Familien
- Konten oder direkte Ansprache für Kinder
- Fotos und Kommentare
- Geburtsjahr für verbundene Familien
- Standortverfolgung oder automatische Adressermittlung
- automatische WhatsApp-Nachrichten
- bidirektionale Kalender-Synchronisation per OAuth
- Werbung, Tracking, Profiling oder Verkauf personenbezogener Daten
- mehrere Sorgeberechtigte in einem gemeinsamen Familienkonto

### Übungsfreigabe

Der Scope ist als verbindliche Grundlage für die weitere Übung festgelegt. Der vorhandene Stand bleibt ein Frontend-Prototyp ohne Freigabe für echte Kinderdaten.

| Entscheidung | Vorschlag | Verantwortlich | Status |
| --- | --- | --- | --- |
| Pilot | nur simuliert; keine echten Testfamilien | Übungsprojekt | festgelegt |
| Konten | nur Personen ab 18 Jahren; Kinder erhalten kein Konto | Übungsprojekt | festgelegt |
| Fotos/Kommentare | erst nach dem MVP und neuer Datenschutzprüfung | Übungsprojekt | festgelegt |
| MVP-Scope oben | Grundlage für die weiteren Übungsphasen | Übungsprojekt | festgelegt |

## 2. Rollen- und Berechtigungsmatrix

Der Server muss jede Aktion prüfen. Ausgeblendete Buttons und schwer erratbare Links sind kein Zugriffsschutz.

| Aktion / Daten | Nicht angemeldet | Kontoinhaber | Verbundene Familie | Support | Hintergrunddienst |
| --- | --- | --- | --- | --- | --- |
| öffentliche Login-/Pflichttexte sehen | ja | ja | ja | ja | nein |
| eigenes Konto und Familienprofil sehen/ändern | nein | ja | nein | nur nach dokumentiertem Supportfall und minimal | nein |
| eigenes Kind anlegen/ändern/löschen | nein | ja | nein | nein | nein |
| freigegebenen Geburtstag sehen | nein | ja | nur bei bestätigter Verbindung und Freigabe | nein | nein |
| eigenes PlayDate erstellen/ändern/absagen | nein | als Organisator | nur als berechtigter Teilnehmer im erlaubten Umfang | nein | technische Zustellung |
| Einladung annehmen/ablehnen | nein | wenn Empfänger | wenn Empfänger | nein | Status zustellen |
| Verbindung widerrufen/blockieren | nein | ja | eigene Verbindung beenden | nein | Zugriff entziehen |
| eigene Daten exportieren/löschen | nein | ja | nein | nur unterstützend, protokolliert | Löschauftrag ausführen |
| Sicherheitsprotokolle einsehen | nein | nein | nein | nur autorisierte Betriebsrolle | schreiben, nicht lesen |

Zusätzliche Regeln:

- Ein Kind ist betroffene Person, aber keine App-Rolle und besitzt kein Konto.
- Support erhält standardmäßig keinen Zugriff auf Kinder-, Termin- oder Nachrichteninhalte.
- Verbindungen und PlayDate-Teilnahmen verwenden stabile IDs, nicht Namen.
- Jeder Zugriff wird serverseitig anhand Konto, Familie, Ressource und Beziehung geprüft.
- Kurzlebige Einladungstoken sind zufällig, widerrufbar, nur einmal beziehungsweise zweckgebunden nutzbar und werden nicht im Klartext protokolliert.

## 3. Dateninventar und Entwurf der Rechtsgrundlagen

Die folgende Zuordnung ist die dokumentierte Übungsannahme. Bei einer echten Veröffentlichung müsste sie für den konkreten Betreiber fachkundig rechtlich geprüft werden.

| Datenart | Zweck | Minimalumfang | Mögliche Grundlage | Status |
| --- | --- | --- | --- | --- |
| Konto, E-Mail, Sitzungsdaten | Anmeldung und Kontosicherheit | Erwachsenen-Konto, technische Kennungen | Art. 6 Abs. 1 lit. b DSGVO; Sicherheitsprotokolle ggf. lit. f | als Übung bewertet |
| Familienprofil | eigene Familie organisieren | Anzeigename der Familie | Art. 6 Abs. 1 lit. b | als Übung bewertet |
| Kindprofil | eigenes Kind einem Termin zuordnen | Vor-/Anzeigename, stabile ID | für Kinderdaten ggf. Art. 6 Abs. 1 lit. f mit Interessenabwägung | als Übung bewertet |
| Geburtstag | Geburtstage merken/teilen | intern Datum; geteilt nur Tag/Monat | Speichern/Teilen getrennt; freiwillige Einwilligung nach Art. 6 Abs. 1 lit. a als Kandidat | als Übung bewertet |
| PlayDate | Treffen planen | Teilnehmer-IDs, Datum, Uhrzeit, Ort, Mitbringsel, Status | für Kontoinhaber lit. b; Daten Dritter ggf. lit. f | als Übung bewertet |
| Einladung/Verbindung | bekannte Familien verbinden | Token-Hash, Empfänger, Status, Ablauf | lit. b / lit. f | als Übung bewertet |
| Erinnerung | gewünschte Benachrichtigung | Kanal, Zeitpunkt, Zustellstatus | lit. b; zusätzliche Kanäle ggf. Einwilligung | als Übung bewertet |
| Sicherheits-/Auditdaten | Missbrauch erkennen und nachweisen | Ereignis, pseudonyme IDs, Zeit, Ergebnis | lit. f; ggf. lit. c | als Übung bewertet |
| Theme/PWA-Speicher | gewünschte Darstellung/Offline-Funktion | lokale technische Einstellung | § 25 Abs. 2 TDDDG als Kandidat bei ausdrücklich gewünschter Funktion | als Übung bewertet |
| Fotos/Kommentare | spätere private Erinnerung/Absprache | noch nicht erhoben | separate Prüfung inklusive Einwilligung und Recht am Bild | nicht im MVP |

Art. 8 DSGVO ist gesondert zu prüfen, falls sich das Angebot künftig direkt an Kinder richtet oder Kinder eigene Konten bekommen. Das ist im MVP ausdrücklich ausgeschlossen.

## 4. Einwilligungsabläufe

Einwilligung wird nicht pauschal beim Login eingeholt. Notwendige Vertragsverarbeitung und freiwillige Freigaben bleiben getrennt.

### Geburtstag teilen

1. Geburtstag ist optional.
2. Die Freigabe ist standardmäßig aus.
3. Direkt am Schalter steht: wer Tag und Monat sieht, zu welchem Zweck und dass das Geburtsjahr verborgen bleibt.
4. Vor dem Aktivieren ist eine bestätigte Familienverbindung nötig.
5. Der Server speichert Textversion, Zeitpunkt, Konto, Kind-ID und Status der Entscheidung.
6. Widerruf ist an derselben Stelle möglich und beendet neue Zugriffe sofort.
7. Cache, Benachrichtigungen und abgeleitete Ansichten werden beim Widerruf bereinigt.

### Erinnerungen und externe Dienste

- Erinnerungen sind pro Kanal freiwillig und standardmäßig aus.
- Vor dem Öffnen von WhatsApp oder Google Kalender sieht der Nutzer, welche Termindaten übertragen werden.
- Die App sendet nichts automatisch an diese Dienste.
- Eine spätere OAuth-Verbindung benötigt eine eigene, widerrufbare Freigabe mit kleinsten Berechtigungen.

### Fotos nach dem MVP

- eigener Ablauf pro Album/PlayDate, bevor ein Upload möglich ist
- nachweisbare Zustimmung aller erforderlichen Sorgeberechtigten
- kein Zwang und keine Kopplung an die normale PlayDate-Nutzung
- Widerruf stoppt Zugriff und löst den vereinbarten Löschablauf aus
- erneute Prüfung bei neuem Zweck oder neuem Empfängerkreis

**Übungsfreigabe erteilt.** Texte und Abläufe gelten als fachliche Grundlage der Übung. Bei realer Nutzung müssten Nachweisumfang und Vertretungsberechtigung fachkundig bestätigt werden.

## 5. Vorgeschlagene Speicher- und Löschfristen

| Datenart | Vorschlag | Auslöser / technische Regel | Status |
| --- | --- | --- | --- |
| aktives Konto und Familienprofil | bis Kontolöschung | Löschauftrag entfernt Produktivdaten sofort aus der Nutzung | für Übung festgelegt |
| Kindprofil/Geburtstag | bis Entfernung des Kindes oder Kontolöschung | Freigabewiderruf beendet fremden Zugriff sofort | für Übung festgelegt |
| zukünftiges PlayDate | bis Termin plus 90 Tage | danach löschen oder nur auf ausdrücklichen Wunsch archivieren | für Übung festgelegt |
| abgelehnte/abgelaufene Einladung | 30 Tage | automatischer Löschjob | für Übung festgelegt |
| Einladungstoken | höchstens 7 Tage oder bis Nutzung/Widerruf | Token danach ungültig und löschen | für Übung festgelegt |
| Erinnerungsauftrag | 7 Tage nach Zustellung/Termin | Inhalt löschen; nur minimales Fehlerereignis behalten | für Übung festgelegt |
| Sicherheitsprotokoll | 90 Tage, begründete Vorfälle höchstens 180 Tage | rollenbeschränkter automatischer Löschjob | für Übung festgelegt |
| Einwilligungsnachweis | Dauer der Freigabe plus drei Jahre als Übungsannahme | getrennt vom sichtbaren Profil speichern | für Übung festgelegt |
| Backups | rollierend höchstens 30 Tage | verschlüsselt; Löschung greift beim Überschreiben | für Übung festgelegt |
| Fotos nach dem MVP | noch festzulegen, Vorschlag Termin plus 90 Tage | Albumfrist sichtbar und widerrufbar | nicht im MVP |

Die Fristen sind für das Übungskonzept festgelegt. Für einen echten Betrieb müssten Produktverantwortung, Betrieb und Rechtsberatung sie neu bestätigen und die automatische Löschung testen.

## 6. Anbieter und Drittlandtransfers

| Empfänger / Anbieter | Daten und Rolle | Region / Transfer | Entscheidung |
| --- | --- | --- | --- |
| Clerk, Inc. | Authentifizierung; laut DPA grundsätzlich Auftragsverarbeiter, für bestimmte Account Information eigener Verantwortlicher | USA; DPA nennt EU–US Data Privacy Framework und ersatzweise SCC | DPA abschließen, aktuelle Unterauftragsverarbeiter und Transfer Impact Assessment prüfen; keine Kindprofildaten an Clerk senden |
| zukünftiges Hosting | App, API, Datenbank | noch nicht gewählt | EU/EWR-Anbieter, AVV, TOM, Lösch-/Backupkonzept und Unterauftragsverarbeiter vor Phase 2 auswählen |
| zukünftiger E-Mail-/Push-Dienst | Erinnerungen | noch nicht gewählt | erst nach Anbieterprüfung und Opt-in anbinden |
| WhatsApp/Meta | vom Nutzer bewusst geteilter Einladungstext | externer Dienst; Empfänger entscheidet über Übergabe | nur nach Vorschau und Nutzeraktion; keine automatische Übertragung |
| Google Kalender | vom Nutzer bewusst übergebene Termindaten | externer Dienst | nur nach Vorschau und Nutzeraktion; OAuth nicht im MVP |
| Google Fonts | bisher IP-/Browserabruf beim Seitenstart | externer Aufruf | entfernt; Systemschrift statt Laufzeitabruf |
| GitHub und Entwicklungswerkzeuge | Quellcode, keine Produktivdaten | Entwicklungsbetrieb | keine echten Nutzer-, Kinder- oder Zugangsdaten einchecken |

**Übungsprüfung abgeschlossen.** Clerk und die geplanten Datenflüsse sind erfasst. Ein realer Betrieb benötigte zusätzlich abgeschlossene Verträge, aktuelle Subprozessorprüfung, konkretes Hosting und eine erneute Transferbewertung.

## 7. Muster einer Datenschutzinformation

Für das Übungsprojekt bleibt der Betreiber absichtlich als Platzhalter erkennbar. Vor einer echten Veröffentlichung müssten alle Platzhalter ersetzt und der Text rechtlich geprüft werden.

### Verantwortlicher

`[Vollständiger Name / Unternehmen]`

`[ladungsfähige Anschrift]`

`[E-Mail-Adresse]`

`[Telefon, falls vorgesehen]`

### Verarbeitung in PlayDate

PlayDate verarbeitet Kontodaten zur Anmeldung, Familien- und Kindprofile zur privaten Organisation, Termindaten zur Planung von PlayDates sowie technische Sicherheitsdaten. Kinder erhalten keine eigenen Konten. Inhalte sind nicht öffentlich und werden nur mit ausdrücklich verbundenen oder eingeladenen Familien geteilt. Zwecke, Rechtsgrundlagen, Empfänger, Speicherdauer und Betroffenenrechte müssen anhand der finalen Tabellen dieses Dokuments übernommen werden.

Clerk wird für die Anmeldung eingesetzt. Bei einem bewusst ausgelösten Teilen an WhatsApp oder Google Kalender werden die vorher angezeigten Daten an den vom Nutzer gewählten externen Dienst übergeben. Systemschriftarten werden lokal verwendet; es findet kein Google-Fonts-Aufruf statt.

Betroffene können Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch verlangen sowie Einwilligungen jederzeit für die Zukunft widerrufen. Außerdem besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde. Konkrete Kontaktstelle und zuständige Behörde sind nach Sitz des Verantwortlichen einzutragen.

### Noch einzutragen

- Verantwortlicher und gegebenenfalls Datenschutzbeauftragter
- endgültige Rechtsgrundlagen und Interessenabwägungen
- Hosting, Datenbank, Benachrichtigungsdienste und Empfänger
- konkrete Fristen und automatisierte Löschabläufe
- vollständige Clerk-/Drittlandinformation
- Betroffenenprozess und zuständige Aufsichtsbehörde
- Stand/Version der Information

## 8. Muster eines Impressums

Die Anbieterkennzeichnung hängt von Betreiberform und Angebot ab. Vor Veröffentlichung ist zu klären, ob und welche Pflichten insbesondere nach § 5 DDG sowie weiteren Vorschriften gelten.

`[Name / Firma und Rechtsform]`

`[Vertretungsberechtigte Person]`

`[vollständige ladungsfähige Anschrift]`

`[E-Mail-Adresse und weiterer unmittelbarer Kontaktweg]`

`[Register, Registernummer, USt-ID und Aufsicht, falls einschlägig]`

`[inhaltlich Verantwortlicher, falls einschlägig]`

**Veröffentlichung gesperrt**, bis Betreiberangaben vollständig und rechtlich geprüft sind.

## 9. Vorprüfung Datenschutz-Folgenabschätzung

### Risikofaktoren

- Betroffene sind Kinder und damit besonders schutzbedürftig.
- Termine, Beziehungen und Treffpunkte können Alltag und soziales Umfeld sichtbar machen.
- Ein Verbindungsfehler kann Daten fremder Familien offenlegen.
- Geplante Fotos erhöhen Umfang, Dauer und mögliche Folgen deutlich.
- Ein späterer Pilot verarbeitet Daten mehrerer Familien regelmäßig, auch wenn er zunächst klein bleibt.

### Vorläufiges Ergebnis

Für den lokalen Prototyp werden keine Produktivdaten freigegeben. Vor einem Pilot mit echten Daten wird vorsorglich eine formelle Datenschutz-Folgenabschätzung empfohlen. Spätestens bei Fotos, größerer Reichweite, systematischer Auswertung oder weiteren sensiblen Daten ist die Prüfung erneut durchzuführen. Die endgültige Entscheidung und Begründung muss fachkundig dokumentiert werden.

**Status:** Für die Übung wird festgelegt, dass vor jeder realen Nutzung vorsorglich eine formelle DSFA-Prüfung erforderlich wäre. Damit ist die Übungsentscheidung dokumentiert, aber keine reale DSFA durchgeführt.

## 10. Bedrohungsmodell

### Schutzwerte und Grenzen

Zu schützen sind Konten, Familienbeziehungen, Kinderprofile, Geburtstage, Termine, Treffpunkte, Einwilligungen, Einladungslinks und Löschaufträge. Vertrauensgrenzen liegen zwischen Browser und API, API und Datenbank, PlayDate und Clerk, PlayDate und externen Teilen-Zielen sowie zwischen zwei Familien.

| Bedrohung | Folge | Risiko | Notwendige Maßnahme |
| --- | --- | --- | --- |
| manipulierte ID / IDOR | fremde Familien- oder Termindaten sichtbar | kritisch | Autorisierung jeder Ressource und Beziehung auf dem Server; Negativtests |
| gestohlener oder weitergeleiteter Einladungslink | unberechtigter Zugriff | hoch | Token-Hash, kurze Laufzeit, Login, Empfängerbindung, Widerruf und Rate Limit |
| Kontoübernahme | Zugriff auf sämtliche Familiendaten | kritisch | sichere Clerk-Konfiguration, MFA-Option, Sitzungswiderruf, Warnung bei Auffälligkeiten |
| XSS oder bösartige Eingabe | Daten-/Tokenabfluss | hoch | Ausgabe escapen, CSP, Validierung, keine HTML-Injektion, Sicherheitstests |
| verlorenes gemeinsam genutztes Gerät | lokale Daten sichtbar | hoch | Backend statt `localStorage`, kurze Sitzungen, Abmelden, kein privater API-Cache |
| überladener WhatsApp-/Kalendertext | unnötige Weitergabe | hoch | Datenvorschau, minimale Standardfelder, bewusste Nutzeraktion |
| falsche Geburtstagsfreigabe | Kinderdaten bei falscher Familie | hoch | Freigabe aus, bestätigte Verbindung, Empfängeranzeige, sofortiger Widerruf |
| Support-/Adminmissbrauch | interner Datenzugriff | hoch | Least Privilege, Vier-Augen-Regel für Sonderzugriff, Audit und Schulung |
| unvollständige Löschung / Backups | Daten bleiben zu lange | hoch | Löschjobs, Backup-Frist, Wiederherstellungs- und Löschtests |
| Service-Worker-Cache privater API-Daten | Offline-Zugriff durch falsches Konto | hoch | nur statische App-Dateien cachen; `/api` und `private`/`no-store` ausschließen |
| Abhängigkeit oder Anbieter kompromittiert | Konto-/Metadatenabfluss | hoch | Anbieterprüfung, Updates, CSP, minimale Daten, Incident-Prozess |
| massenhaftes Raten von Einladungen | Ausspähung / Missbrauch | hoch | kryptografische Tokens, Rate Limit, Monitoring ohne Inhaltslogs |
| Fotozugriff ohne gültige Einwilligung | schwerer Eingriff in Kinderrechte | kritisch | Fotos nicht im MVP; später serverseitige Einwilligungs- und Empfängerprüfung |

### Freigabebedingung

Kein Pilot mit echten Kinderdaten, bevor alle kritischen Maßnahmen umgesetzt und mit Berechtigungs-, Lösch- und Angriffstests nachgewiesen sind.

## 11. Abschluss der Übungsphase

- [x] MVP-Scope als Übungsgrundlage festgelegt
- [x] Rollen- und Berechtigungsmatrix erstellt
- [x] mögliche Rechtsgrundlagen als Übung bewertet
- [x] Einwilligungsabläufe für die Übung festgelegt
- [x] Speicher- und Löschfristen als Übungsannahmen festgelegt
- [x] bekannte Anbieter und Drittlandtransfers erfasst
- [x] Datenschutzinformation und Impressum als Muster erstellt
- [x] DSFA-Vorprüfung und Übungsentscheidung dokumentiert
- [x] Bedrohungsmodell dokumentiert

Erst bei einer geplanten echten Veröffentlichung würden Betreiberangaben, Rechtsprüfung, Verträge, Hosting, DSFA, technische Löschtests und formelle Abnahmen zu neuen verpflichtenden Aufgaben. Sie sind kein offener Bestandteil dieses Übungsprojekts.

## 12. Primärquellen für die fachkundige Prüfung

- [DSGVO im EUR-Lex-Portal](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [Datenschutzkonferenz der deutschen Aufsichtsbehörden](https://www.datenschutzkonferenz-online.de/)
- [TDDDG](https://www.gesetze-im-internet.de/ttdsg/)
- [§ 5 DDG – Allgemeine Informationspflichten](https://www.gesetze-im-internet.de/ddg/__5.html)
- [Clerk Data Processing Addendum](https://clerk.com/legal/dpa)
- [Clerk Unterauftragsverarbeiter](https://clerk.com/legal/subprocessors)

Quellen und Anbieterbedingungen müssen bei der finalen Freigabe erneut auf Aktualität geprüft werden.
