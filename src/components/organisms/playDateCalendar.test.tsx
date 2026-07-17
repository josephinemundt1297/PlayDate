import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { playDate } from "../../domain/playdates";
import { PlayDateCalendar } from "./playDateCalendar";

const date: playDate = {
  id: 1,
  title: "Abenteuer im Stadtpark",
  child: "Mila",
  friend: "Noah",
  date: "2026-07-18",
  time: "15:00",
  location: "Volkspark",
  bring: "Picknickdecke",
  status: "Bestätigt",
  color: "mint",
};

describe("PlayDateCalendar", () => {
  it("zeigt Termine samt Status im passenden Monat", () => {
    render(
      <PlayDateCalendar
        dates={[date]}
        initialMonth={new Date(2026, 6, 1, 12)}
        onEdit={vi.fn()}
      />,
    );

    expect(screen.getByRole("heading", { name: "Juli 2026" })).toBeInTheDocument();
    expect(screen.getAllByText(date.title)).toHaveLength(2);
    expect(screen.getByText("Bestätigt")).toBeInTheDocument();
  });

  it("wechselt per Tastatur-bedienbarem Button in den nächsten Monat", async () => {
    render(
      <PlayDateCalendar
        dates={[date]}
        initialMonth={new Date(2026, 6, 1, 12)}
        onEdit={vi.fn()}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Nächster Monat" }));
    expect(screen.getByRole("heading", { name: "August 2026" })).toBeInTheDocument();
  });
});
