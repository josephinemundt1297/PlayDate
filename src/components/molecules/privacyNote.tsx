import { Check } from "lucide-react";
// Der Datenschutzhinweis ist ein eigenes Molecule, damit er auf mehreren Seiten gleich bleibt.
export function PrivacyNote() {
  return (
    <section className="alert privacy-note">
      <span>
        <Check />
      </span>
      <div>
        <strong>Deine Familie. Eure Daten.</strong>
        <p>
          Fotos, Kommentare und Kontakte sind nur für eingeladene Familien
          sichtbar. Einwilligungen können jederzeit widerrufen werden.
        </p>
      </div>
      <a href="#datenschutz">Datenschutz</a>
    </section>
  );
}
