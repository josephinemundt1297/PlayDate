import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";

const clerkState = vi.hoisted(() => ({ signedIn: false, loading: false }));
vi.mock("@clerk/clerk-react", () => ({
  ClerkLoading: ({ children }: { children: ReactNode }) => clerkState.loading ? children : null,
  ClerkLoaded: ({ children }: { children: ReactNode }) => clerkState.loading ? null : children,
  SignedIn: ({ children }: { children: ReactNode }) => clerkState.signedIn ? children : null,
  SignedOut: ({ children }: { children: ReactNode }) => clerkState.signedIn ? null : children,
  SignInButton: ({ children }: { children: ReactNode }) => children,
}));
import { AuthGate } from "./authGate";

describe("AuthGate", () => {
  it("versteckt private Inhalte ohne Anmeldung", () => {
    clerkState.signedIn = false;
    render(<AuthGate><div>Privater Termin</div></AuthGate>);
    expect(screen.queryByText("Privater Termin")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sicher anmelden" })).toBeInTheDocument();
  });
  it("zeigt während Clerk lädt die verspielte Ladeanzeige", () => {
    clerkState.loading = true;
    render(<AuthGate><div>Privat</div></AuthGate>);
    expect(screen.getByRole("status")).toHaveTextContent("Spielplatz");
    clerkState.loading = false;
  });
  it("zeigt private Inhalte nach der Anmeldung", () => {
    clerkState.signedIn = true;
    render(<AuthGate><div>Privater Termin</div></AuthGate>);
    expect(screen.getByText("Privater Termin")).toBeInTheDocument();
  });
});
