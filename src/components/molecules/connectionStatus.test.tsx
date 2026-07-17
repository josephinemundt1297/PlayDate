import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ConnectionStatus } from "./connectionStatus";

describe("ConnectionStatus", () => {
  it("meldet einen Offline-Zustand verständlich", () => {
    Object.defineProperty(navigator, "onLine", { configurable: true, value: true });
    render(<ConnectionStatus />);
    expect(screen.queryByText(/offline/i)).not.toBeInTheDocument();
    Object.defineProperty(navigator, "onLine", { configurable: true, value: false });
    act(() => window.dispatchEvent(new Event("offline")));
    expect(screen.getByRole("status")).toHaveTextContent("offline");
  });
});
