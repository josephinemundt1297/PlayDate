import type { ReactNode } from "react";

type formStepProps = {
  number: number;
  title: string;
  description: string;
  children: ReactNode;
};

// Dieser Baustein teilt lange Formulare in kleine, gut lesbare Etappen.
// Eine echte section mit Überschrift hilft dabei nicht nur optisch, sondern auch Screenreadern.
export function FormStep({ number, title, description, children }: formStepProps) {
  const headingId = `form-step-${number}`;

  return (
    <section className="form-step full" aria-labelledby={headingId}>
      <header className="form-step-heading">
        <span aria-hidden="true">{number}</span>
        <div>
          <h2 id={headingId}>{title}</h2>
          <p>{description}</p>
        </div>
      </header>
      <div className="form-step-flex">{children}</div>
    </section>
  );
}
