import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppErrorBoundary } from "./appErrorBoundary";

function BrokenView(): never { throw new Error("Testfehler"); }

describe("AppErrorBoundary", () => {
  it("zeigt statt einer leeren Seite einen verständlichen Fehlerzustand", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(<AppErrorBoundary><BrokenView /></AppErrorBoundary>);
    expect(screen.getByRole("alert")).toHaveTextContent("durcheinandergeraten");
    expect(screen.getByRole("button", { name: /neu laden/i })).toBeInTheDocument();
  });
});
