# SpielZeit – gezielter Browsercheck

**Datum:** 20. Oktober 2026  
**Stand:** Commit `362a39f` und zugehöriger lokaler Produktions-Build  
**Kontext:** persönlicher Lern- und Prüfnachweis mit technischer Prüfunterstützung; keine offizielle Bewertung des DCI oder der IHK.

## Umfang und Testaufbau

Geprüft wurden der neue asynchrone Terminabruf und ausgewählte Kernabläufe im verfügbaren ChatGPT-Prüfbrowser. Die Anmeldung erfolgte über einen echten Clerk-Testlogin. Familien- und Termininhalte waren ausschließlich erfunden.

Die Entwicklungsansicht lief auf `http://127.0.0.1:5174/`. Sie hatte einen vom üblichen Port getrennten lokalen Speicher. Für kontrollierte Antworten wurden zusätzliche lokale HTTP-Server mit demselben unveränderten Produktions-Build verwendet:

| Adresse | Kontrollierte Antwort |
| --- | --- |
| `http://127.0.0.1:5185/` | HTTP 503 für die Demo-JSON-Datei; anschließend erfolgreiche Antwort nach Freigabe im Testserver |
| `http://127.0.0.1:5186/` | erfolgreiche leere JSON-Liste `[]` |
| `http://127.0.0.1:5187/` | um fünf Sekunden verzögerte Antwort mit den allgemeinen Beispielterminen |

Die Testserver veränderten nur ihre Antworten auf `/demoSpieletreffen.json`. Anwendungscode, CSS und Projektdateien wurden für die Browserprüfung nicht angepasst. Die getrennten Origins verhinderten, dass der bereits gespeicherte Terminstand den erstmaligen Abruf übersprang. Screenshots enthielten ausschließlich erfundene Trainingsinhalte und wurden als vorläufige lokale Prüfarbeitsdateien außerhalb des Repositorys gespeichert.

## Beobachtete Ergebnisse

| Prüfung | Ergebnis |
| --- | --- |
| Nicht angemeldete Ansicht | Loginansicht statt privater Termininhalte sichtbar |
| Erstmaliger erfolgreicher Terminabruf | alle drei allgemeinen Beispieltermine als vorhandene Karten sichtbar |
| Verzögerter Abruf | „Spieletreffen werden geladen …“ im Terminbereich sichtbar; danach erscheinen die Karten |
| HTTP-Fehler | verständliche Fehlermeldung mit Schaltfläche „Erneut versuchen“ sichtbar |
| Erneuter Versuch | nach erfolgreicher Testserverantwort verschwinden Fehlermeldung und Schaltfläche; die Terminkarten erscheinen |
| Leere Antwort | vorhandener Leerzustand „Noch kein Spieletreffen geplant“ sichtbar |
| Reload der leeren Liste | Leerzustand bleibt erhalten |
| Reload nach erfolgreichem Laden | Beispielkarten bleiben vorhanden |
| Familienprofil speichern | mit deaktivierter Geburtstagsfreigabe ohne Geburtstag erfolgreich; Voreinstellung verursacht den unten dokumentierten Fehler |
| Termin erstellen | erfundener zukünftiger Termin wird gespeichert und unter „Alle ansehen“ angezeigt |
| Termin bearbeiten | Formular enthält nach Reload den vorhandenen Termin; geänderter Treffpunkt wird gespeichert |
| Direkter erneuter Bearbeitungsaufruf | geänderter Treffpunkt weiterhin vorhanden |
| Kalenderdialog | erstellter Termin und geänderter Treffpunkt sichtbar; Datum in deutscher Darstellung |
| Dialog per Escape schließen | Dialog schließt, Fokus kehrt zum auslösenden Terminbutton zurück |
| Fehlerkonsole der normalen Entwicklungsansicht | beim abschließenden Abruf keine erfassten Konsolenfehler |

Die bestehenden 98 Unit- und Komponententests ergänzen diesen Browsernachweis. Sie prüfen unter anderem Netzwerk-/JSON-/Strukturfehler, beschädigten lokalen Speicher, Abbruch und Datumsrandfälle. Diese Fälle wurden nicht sämtlich zusätzlich im Browser provoziert.

## Offene Bedienprobleme

| ID | Priorität | Beobachtung | Nächster Schritt |
| --- | --- | --- | --- |
| BROWSER-001 | Hoch | Ein neues Kind hat die Geburtstagsfreigabe vorausgewählt. Speichern ohne optionalen Geburtstag wird mit einer Fehlermeldung blockiert. | Freigabe standardmäßig deaktivieren und den echten Standardwert im Formulartest verwenden. |
| BROWSER-002 | Hoch, behoben | Nach erstmaligem Speichern des Familienprofils blieb „Code erzeugen“ deaktiviert. | Profil wird jetzt über Props weitergegeben. Komponententest und erneuter Browsercheck bestätigen die sofortige Aktualisierung ohne Reload. |
| BROWSER-003 | Mittel | Die Startseite zeigt die drei ältesten Termine, darunter vergangene Beispiele. Der neu erstellte zukünftige Termin erscheint erst in der vollständigen Liste. | Für die Startseite fachlich zwischen zukünftigen Terminen und Verlauf unterscheiden. |
| BROWSER-004 | Mittel | Der Kalenderdialog benötigt in schmalen Ansichten horizontales Scrollen; Teile seiner Detailkarten sind zunächst abgeschnitten. | Nur das responsive Dialoglayout gezielt korrigieren und anschließend erneut prüfen. |
| BROWSER-005 | Hoch | Das geöffnete Planungsformular läuft auf schmalen Bildschirmen über und enthält überhohe Feldbereiche. Bei gemessenen 304 CSS-Pixeln Seitenbreite beträgt der scrollbare Inhalt etwa 521 Pixel; Feldgruppen sind etwa 362 Pixel breit und einfache Feldbereiche 256 Pixel hoch. | Mobile Flex-Basis und Mindestbreiten der Feldgruppen gezielt korrigieren; bestehende Farben und Desktopgestaltung erhalten. |
| BROWSER-006 | Hoch | Auch im mobilen Familienformular bleiben Feldgruppen und dynamische Eingabezeilen nebeneinander und können über den Rand ragen. Zusätzlich wurde ein beim Scrollen verschwindender Header gemeldet. Im lokalen Ausgangstest blieb der vorhandene Sticky-Header allerdings sichtbar. | Familiengruppen mobil stapeln, Eingaben schrumpfbar halten und den Header über feste Positionierung mit entsprechendem Platz im Seitenrahmen absichern. |

Beim Dialog wurden Viewport-Vorgaben von 240, 320, 375, 768, 1024 und 1280 verwendet. Die tatsächlichen gemessenen CSS-Breiten waren wegen der Skalierung des Prüfbrowsers etwa 218, 291, 341, 698, 931 und 1164. In der schmalen Ansicht mit ungefähr 341 CSS-Pixeln war der Dialog innen etwa 298 Pixel breit, sein Inhalt aber etwa 501 Pixel. Dies belegt den Überlauf; es ist kein vollständiger Nachweis für exakt die sechs vorgeschriebenen CSS-Breiten. Die vorübergehende Viewport-Einstellung wurde anschließend zurückgesetzt.

Nach Präzisierung des gemeldeten Größenproblems wurde auch `/new` geprüft. `.form-step-flex` wechselt auf schmalen Ansichten zu `flex-direction: column`, während die Kindbereiche `flex: 1 1 16rem` behalten. Die Basis bezieht sich dadurch auf die Höhe. Zusätzlich verhindern Mindestbreiten beziehungsweise nebeneinander angeordnete Inhalte das vollständige Schrumpfen einzelner Feldgruppen. Die obigen Messwerte dokumentieren den vorhandenen Fehler; eine Korrektur wurde noch nicht vorgenommen.

### Vorprüfung eines mobilen CSS-Vorschlags

Eine zusätzliche lokale Prüfansicht auf Port 5190 lieferte denselben gebauten App-Code aus und ergänzte ausschließlich beim Ausliefern der CSS-Datei einen vorgeschlagenen Korrekturblock. Projekt-CSS und Komponenten wurden dafür nicht geändert. Der Vorschlag setzt die Flex-Basis in mobilen Spalten zurück, erlaubt schmale Feldgruppen, stapelt Formularbereiche und ordnet dynamische Eingaben mit ihrem Entfernen-Button in zwei Spalten an. Ein fester Header erhält einen gleich hohen Platzhalter im Seitenrahmen.

Die Viewport-Vorgaben wurden anhand der tatsächlichen DOM-Breite nachjustiert. Sowohl `/families` als auch `/new` hatten bei exakt 240, 320, 375, 768, 1024 und 1280 CSS-Pixeln eine Seitenbreite ohne horizontalen Überlauf. In der Planungsansicht war der Titelbereich bei 375 Pixeln etwa 107 statt der vorher künstlich vorgegebenen 256 Pixel hoch. Nach 800 Pixeln Scrollen lag die Oberkante des festen Headers weiterhin bei 0; das Menü ließ sich öffnen. Die temporäre Viewport-Einstellung wurde zurückgesetzt.

Diese Vorprüfung belegt den Vorschlag, noch keine Behebung im Repository. Nach manueller Übernahme sind Prüfkette und Browsercheck erneut nötig. Mehrere dynamische Kinder-/Kontaktzeilen und zusätzliche Themes wurden in dieser Vorprüfung nicht vollständig geprüft. Die vorhandene Geburtstagsfreigabe blieb unverändert.

## Grenzen und Entscheidung

### Folgeprüfung der Profilweitergabe

Im anschließenden lokalen Arbeitsstand wurde `FamilyConnections` auf ein Profil-Prop umgestellt. Die Familienseite gibt ihren aktuellen gespeicherten Profil-State weiter; der zweite eigene `useFamilyProfile`-Aufruf im Verbindungsbereich entfällt. Ein neuer Komponententest prüft aktualisierte Props und das an die Einladungserzeugung übergebene Profil. Die vollständige Prüfkette besteht nun mit 99 Tests in 29 Testdateien.

Ein frischer angemeldeter Demo-Stand auf `http://127.0.0.1:5175/families` bestätigt: Vor dem Speichern ist „Code erzeugen“ deaktiviert, unmittelbar nach dem Speichern eines erfundenen Profils aktiv. Es erfolgte kein Reload und es wurde kein Einladungscode erzeugt. BROWSER-002 ist damit behoben und erneut geprüft. Die Geburtstagsfreigabe wurde für diesen Test manuell ausgeschaltet; BROWSER-001 bleibt offen.

Der gezielte Browsercheck bestätigt den neuen asynchronen Frontend-Datenfluss einschließlich sichtbarer Zustände sowie das Erstellen, Bearbeiten und Wiederöffnen eines Termins. Er ist kein erfolgreicher Durchlauf der vollständigen Playwright-Matrix und keine vollständige Prüfung aller Funktionen, Themes, Browser, Geräte, Tastaturabläufe oder Screenreader. Der lokale Erfolg beim direkten Seitenaufruf belegt keine korrekte Netlify-Konfiguration.

Der Datenfluss kann als umgesetzter und geprüfter Lernnachweis dokumentiert werden. Die Anwendung insgesamt bleibt ein Frontend-Prototyp mit offenen Bedien- und Bereitstellungsproblemen. Die Feststellungen sind vor der Abgabe zu priorisieren; es gibt keine Freigabe für echte personenbezogene Daten oder Produktivbetrieb.
