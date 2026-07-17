import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";

const formMock = vi.hoisted(() => ({ navigate: vi.fn() }));
vi.mock("@clerk/clerk-react", () => ({ useUser: () => ({ user: { id: "user-1" } }) }));
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => formMock.navigate,
  Link: ({ children }: { children: ReactNode }) => <a href="/">{children}</a>,
}));
vi.mock("../../hooks/usePlayDates", () => ({ readPlayDates: () => [], playDatesStorageKey: () => "playdates-test" }));
vi.mock("../../hooks/useFamilyProfile", () => ({ readFamilyProfile: () => ({ familyName: "Muster", children: [{ id: "1", name: "Mila", birthday: "", shareBirthday: false }] }) }));
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
    await userEvent.selectOptions(screen.getByLabelText("Dein Kind"), "Mila");
    await userEvent.type(screen.getByLabelText("Trifft sich mit"), "Noah");
    await userEvent.type(screen.getByLabelText("Datum"), "2027-08-20");
    await userEvent.type(screen.getByLabelText("Uhrzeit"), "15:00");
    await userEvent.type(screen.getByLabelText("Treffpunkt"), "Stadtpark");
    await userEvent.click(screen.getByRole("button", { name: "PlayDate erstellen" }));
    expect(JSON.parse(localStorage.getItem("playdates-test") ?? "[]")).toHaveLength(1);
    expect(formMock.navigate).toHaveBeenCalledWith({ to: "/" });
  });
});
