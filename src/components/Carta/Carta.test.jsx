import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Carta from ".";

describe("Componente Carta", () => {
  it("deve exibir o naipe 💻 se estiver virada", () => {
    render(<Carta naipe="💻" virada={true} aoClicar={() => {}} />);
    expect(screen.getByText("💻")).toBeInTheDocument();
  });
  it("deve exibir ❓ se estiver não virada", () => {
    render(<Carta naipe="💻" virada={false} aoClicar={() => {}} />);
    expect(screen.getByText("❓")).toBeInTheDocument();
  });
  it("deve disparar ao clicar na carta", () => {
    const funcaoMocada = vi.fn(); //funcao falsa (mockada)
    render(<Carta naipe="💻" virada={true} aoClicar={funcaoMocada} />);
    screen.getByText("💻").click(); //simula click na carta
    expect(funcaoMocada).toHaveBeenCalled();
  });
  it("deve ter a classe 'virada'se virada for true", () => {
    render(<Carta naipe="💻" virada={true} aoClicar={() => {}} />);
    const elemento = screen.getByTestId("carta-rotativa");
    expect(elemento.classList.contains("virada")).toBe(true);
  });
  it("não deve ter a classe 'virada' se virada for false", () => {
    render(<Carta naipe="💻" virada={false} aoClicar={() => {}} />);
    const elemento = screen.getByTestId("carta-rotativa");
    expect(elemento.classList.contains("virada")).toBe(false);
  });
});
