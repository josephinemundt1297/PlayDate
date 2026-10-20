import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { familyProfile } from "../domain/family";
import { FamilyConnections } from "../components/organisms/familyConnections";

const connectionMock = vi.hoisted(() => ({
  generateInvitation: vi.fn(),
}));

vi.mock("../hooks/useFamilyConnections", () => ({
  useFamilyConnections: () => ({
    connections: [],
    save: vi.fn(),
    activeInvitation: null,
    connectionMessage: "",
    generateInvitation: connectionMock.generateInvitation,
    redeemInvitation: vi.fn(),
  }),
}));

describe("FamilyConnections", () => {
  it("verwendet ein aktualisiertes Profil sofort ohne Reload", () => {
    const { rerender } = render(
      <FamilyConnections
        profile={{ familyName: "", children: [] }}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Code erzeugen" }),
    ).toBeDisabled();

    const profile: familyProfile = {
      familyName: "Demo Familie",
      children: [
        {
          id: "demo-kind",
          name: "Demo",
          birthday: "",
          shareBirthday: false,
        },
      ],
    };

    rerender(<FamilyConnections profile={profile} />);

    const button = screen.getByRole("button", {
      name: "Code erzeugen",
    });

    expect(button).toBeEnabled();

    fireEvent.click(button);

    expect(connectionMock.generateInvitation).toHaveBeenCalledWith(profile);
  });
});