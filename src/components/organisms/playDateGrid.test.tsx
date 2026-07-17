import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PlayDateGrid } from "./playDateGrid";

describe("PlayDateGrid", () => {
  it("zeigt bei einer leeren Liste einen hilfreichen nächsten Schritt", () => {
    render(<PlayDateGrid dates={[]} onDelete={vi.fn()} onInvite={vi.fn()} onCalendar={vi.fn()} />);
    expect(screen.getByRole("status")).toHaveTextContent("erstes Treffen");
  });
});
