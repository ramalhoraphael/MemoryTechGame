import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Carta from ".";

describe("Componente Carta", () => {
  it("deve exibir o emoji 💻 se estiver virada", () => {
    render(<Carta emoji="💻" virada={true} aoClicar={() => {}} />);
    expect(screen.getByText("💻")).toBeInTheDocument();
  });
  it("deve exibir ❓ se estiver não virada", () => {
    render(<Carta emoji="💻" virada={false} aoClicar={() => {}} />);
    expect(screen.getByText("❓")).toBeInTheDocument();
  });
  it("deve dispara ao clicar na carta", () => {
    const funcaoMocada = vi.fn(); //funcao falsa (mockada)
    render(<Carta emoji="💻" virada={true} aoClicar={funcaoMocada} />);
    screen.getByText("💻").click(); //simula click na carta
    expect(funcaoMocada).toHaveBeenCalled();
  });
});
