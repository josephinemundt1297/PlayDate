import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const familyMock = vi.hoisted(() => ({ save: vi.fn() }));
vi.mock("../../hooks/useFamilyProfile", () => ({
  useFamilyProfile: () => ({ profile: { familyName: "", children: [] }, sharedBirthdays: [], save: familyMock.save }),
}));
vi.mock("../../domain/family", async (original) => {
  const module = await original<typeof import("../../domain/family")>();
  return { ...module, newChild: () => ({ id: "kind-1", name: "", birthday: "", shareBirthday: false }) };
});
import { FamiliesPage } from "./familiesPage";

describe("FamiliesPage", () => {
  it("speichert ein gültiges Familienprofil", async () => {
    render(<FamiliesPage />);
    await userEvent.type(screen.getByLabelText("Familienname"), "Muster");
    await userEvent.type(screen.getByLabelText("Vorname Kind 1"), "Mila");
    await userEvent.click(screen.getByRole("button", { name: "Familie speichern" }));
    expect(familyMock.save).toHaveBeenCalledWith(expect.objectContaining({ familyName: "Muster" }));
  });
  it("zeigt bei ungültigen Angaben eine verständliche Meldung", async () => {
    render(<FamiliesPage />);
    await userEvent.click(screen.getByRole("button", { name: "Familie speichern" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Familienprofil");
    expect(familyMock.save).not.toHaveBeenCalled();
  });
});
