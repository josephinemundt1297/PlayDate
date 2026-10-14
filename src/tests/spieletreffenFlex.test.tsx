import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SpieletreffenFlex } from "../components/organisms/spieletreffenFlex";

describe("SpieletreffenFlex", () => {
  it("zeigt bei einer leeren Liste einen hilfreichen nächsten Schritt", () => {
    render(<SpieletreffenFlex dates={[]} onDelete={vi.fn()} onInvite={vi.fn()} onCalendar={vi.fn()} />);
    expect(screen.getByRole("status")).toHaveTextContent("erstes Treffen");
  });
});
