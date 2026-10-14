import { fireEvent, render, screen } from "@testing-library/react";
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
vi.mock("../hooks/useSpieletreffen", () => ({ readSpieletreffen: () => [], spieletreffenStorageKey: () => "spieletreffen-test" }));
vi.mock("../hooks/useFamilyProfile", () => ({ readFamilyProfile: () => ({ familyName: "Muster", children: [
  { id: "1", name: "Mila", birthday: "", shareBirthday: false },
  { id: "2", name: "Lina", birthday: "", shareBirthday: false },
] }) }));
vi.mock("../hooks/useFamilyConnections", () => ({
  readFamilyConnections: () => formMock.connections,
}));
import { SpieletreffenForm } from "../components/organisms/spieletreffenForm";

describe("SpieletreffenForm", () => {
  it("blockiert unvollständige Angaben mit einer Fehlermeldung", async () => {
    render(<SpieletreffenForm />);
    await userEvent.click(screen.getByRole("button", { name: "Spieletreffen erstellen" }));
    expect(screen.getByRole("alert")).toHaveTextContent("prüfe deine Angaben");
    expect(formMock.navigate).not.toHaveBeenCalled();
  });
  it("speichert ein vollständiges Spieletreffen", async () => {
    render(<SpieletreffenForm />);
    fireEvent.change(screen.getByLabelText(/Titel/), { target: { value: "Treffen im Park" } });
    await userEvent.click(screen.getByRole("checkbox", { name: "Mila" }));
    await userEvent.click(screen.getByRole("checkbox", { name: "Lina" }));
    await userEvent.click(screen.getByRole("checkbox", { name: /Noah/ }));
    fireEvent.change(screen.getByLabelText("Eigener Name 1"), { target: { value: "Emma" } });
    fireEvent.change(screen.getByLabelText("Datum"), { target: { value: "2027-08-20" } });
    fireEvent.change(screen.getByLabelText("Uhrzeit"), { target: { value: "15:00" } });
    fireEvent.change(screen.getByLabelText("Treffpunkt"), { target: { value: "Stadtpark" } });
    await userEvent.click(screen.getByRole("checkbox", { name: "24 Stunden vorher erinnern" }));
    await userEvent.click(screen.getByRole("checkbox", { name: "Auch per E-Mail erinnern" }));
    await userEvent.click(screen.getByRole("button", { name: "Spieletreffen erstellen" }));
    const stored = JSON.parse(localStorage.getItem("spieletreffen-test") ?? "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].children).toEqual(["Mila", "Lina"]);
    expect(stored[0].friends).toEqual(["Noah", "Emma"]);
    expect(stored[0].reminder).toBe("Keine");
    expect(stored[0].emailReminder).toBe(true);
    expect(formMock.navigate).toHaveBeenCalledWith({ to: "/" });
  });

  it("erklärt den Weg zur Kontaktverwaltung, wenn noch niemand verbunden ist", () => {
    formMock.connections = [];
    render(<SpieletreffenForm />);

    expect(screen.getByText("Noch keine Kontakte verbunden.", { exact: false })).toBeVisible();
    expect(screen.getByRole("link", { name: "Kontakte verbinden" })).toBeVisible();
  });

  it("verknüpft die Hilfetexte semantisch mit den Auswahlgruppen", () => {
    render(<SpieletreffenForm />);

    expect(
      screen.getByRole("group", { name: "Welche Kinder kommen mit?" }),
    ).toHaveAccessibleDescription("Du kannst ein oder mehrere Kinder auswählen.");
    expect(
      screen.getByRole("group", { name: "Trifft sich mit" }),
    ).toHaveAccessibleDescription(
      "Wähle verbundene Kontakte aus oder ergänze eigene Namen.",
    );
  });
});
