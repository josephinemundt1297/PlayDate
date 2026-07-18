import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";

const formMock = vi.hoisted(() => ({
  navigate: vi.fn(),
  connections: [{
    id: "contact-1",
    familyName: "Familie Kontakt",
    children: [{ name: "Noah", birthday: "" }],
    status: "Verbunden",
  }],
}));
vi.mock("@clerk/clerk-react", () => ({ useUser: () => ({ user: { id: "user-1" } }) }));
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => formMock.navigate,
  Link: ({ children }: { children: ReactNode }) => <a href="/">{children}</a>,
}));
vi.mock("../../hooks/usePlayDates", () => ({ readPlayDates: () => [], playDatesStorageKey: () => "playdates-test" }));
vi.mock("../../hooks/useFamilyProfile", () => ({ readFamilyProfile: () => ({ familyName: "Muster", children: [
  { id: "1", name: "Mila", birthday: "", shareBirthday: false },
  { id: "2", name: "Lina", birthday: "", shareBirthday: false },
] }) }));
vi.mock("../../hooks/useFamilyConnections", () => ({
  readFamilyConnections: () => formMock.connections,
}));
import { PlayDateForm } from "./playDateForm";

describe("PlayDateForm", () => {
  it("blockiert unvollständige Angaben mit einer Fehlermeldung", async () => {
    render(<PlayDateForm />);
    await userEvent.click(screen.getByRole("button", { name: "PlayDate erstellen" }));
    expect(screen.getByRole("alert")).toHaveTextContent("prüfe deine Angaben");
    expect(formMock.navigate).not.toHaveBeenCalled();
  });
  it("speichert ein vollständiges PlayDate", async () => {
    render(<PlayDateForm />);
    await userEvent.type(screen.getByLabelText(/Titel/), "Treffen im Park");
    await userEvent.click(screen.getByRole("checkbox", { name: "Mila" }));
    await userEvent.click(screen.getByRole("checkbox", { name: "Lina" }));
    await userEvent.click(screen.getByRole("checkbox", { name: /Noah/ }));
    await userEvent.type(screen.getByLabelText("Eigener Name 1"), "Emma");
    await userEvent.type(screen.getByLabelText("Datum"), "2027-08-20");
    await userEvent.type(screen.getByLabelText("Uhrzeit"), "15:00");
    await userEvent.type(screen.getByLabelText("Treffpunkt"), "Stadtpark");
    await userEvent.click(screen.getByRole("button", { name: "PlayDate erstellen" }));
    const stored = JSON.parse(localStorage.getItem("playdates-test") ?? "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].children).toEqual(["Mila", "Lina"]);
    expect(stored[0].friends).toEqual(["Noah", "Emma"]);
    expect(formMock.navigate).toHaveBeenCalledWith({ to: "/" });
  });

  it("erklärt den Weg zur Kontaktverwaltung, wenn noch niemand verbunden ist", () => {
    formMock.connections = [];
    render(<PlayDateForm />);

    expect(screen.getByText("Noch keine Kontakte verbunden.", { exact: false })).toBeVisible();
    expect(screen.getByRole("link", { name: "Kontakte verbinden" })).toBeVisible();
  });
});
