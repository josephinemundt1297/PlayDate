import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div className="empty-state" role="status">
      <span><Icon /></span>
      <div><strong>{title}</strong><p>{children}</p></div>
    </div>
  );
}
