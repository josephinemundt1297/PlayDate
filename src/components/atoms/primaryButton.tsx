import type { ButtonHTMLAttributes, ReactNode } from "react";
// Unser Standard-Button: gleiche Optik, aber alle normalen Button-Props bleiben nutzbar.
export function PrimaryButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button className={`btn btn-primary primary-button ${className}`} {...props}>
      {children}
    </button>
  );
}
