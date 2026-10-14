import { ShieldCheck, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type safetyPageItem = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export function SafetyPage({
  eyebrow,
  title,
  notice,
  sectionTitle,
  items,
  footer,
}: {
  eyebrow: string;
  title: string;
  notice: string;
  sectionTitle: string;
  items: safetyPageItem[];
  footer?: ReactNode;
}) {
  return (
    <div className="page-wrap safety-page">
      <header className="safety-header">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </header>
      <div className="alert alert-warning safety-notice" role="note">
        <ShieldCheck />
        <span>{notice}</span>
      </div>
      <section className="safety-content" aria-labelledby="safety-section-title">
        <h2 id="safety-section-title">{sectionTitle}</h2>
        <div className="safety-flex">
          {items.map(({ icon: Icon, title: itemTitle, text }) => (
            <article className="card bg-base-100 safety-card" key={itemTitle}>
              <Icon />
              <div><h3>{itemTitle}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>
      {footer && <section className="card bg-base-100 safety-footer">{footer}</section>}
    </div>
  );
}
