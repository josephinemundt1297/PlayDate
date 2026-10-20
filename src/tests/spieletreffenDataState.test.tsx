import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SpieletreffenDataState } from "../components/molecules/spieletreffenDataState";

describe("SpieletreffenDataState", () => {
  it("zeigt beim Laden eine verständliche Statusmeldung", () => {
    render(
      <SpieletreffenDataState loading error="" onRetry={vi.fn()}>
        <p>Terminkarten</p>
      </SpieletreffenDataState>,
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "Spieletreffen werden geladen",
    );
    expect(screen.queryByText("Terminkarten")).not.toBeInTheDocument();
  });

  it("zeigt einen Fehler und ermöglicht einen erneuten Versuch", () => {
    const retry = vi.fn();

    render(
      <SpieletreffenDataState
        loading={false}
        error="Die Termine konnten nicht geladen werden."
        onRetry={retry}
      >
        <p>Terminkarten</p>
      </SpieletreffenDataState>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Die Termine konnten nicht geladen werden.",
    );

    fireEvent.click(screen.getByRole("button", { name: "Erneut versuchen" }));

    expect(retry).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Terminkarten")).not.toBeInTheDocument();
  });

  it("gibt den erfolgreichen Inhalt ohne zusätzliches Layout-Element aus", () => {
    const { container } = render(
      <SpieletreffenDataState loading={false} error="" onRetry={vi.fn()}>
        <section aria-label="Bisherige Terminkarten">
          Vorhandener Inhalt
        </section>
      </SpieletreffenDataState>,
    );

    expect(container.firstElementChild).toBe(
      screen.getByRole("region", { name: "Bisherige Terminkarten" }),
    );
    expect(container.children).toHaveLength(1);
  });
});
