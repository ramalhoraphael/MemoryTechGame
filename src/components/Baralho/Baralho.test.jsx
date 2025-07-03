import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Baralho from ".";

beforeEach(() => {
  cleanup(); // Garante que o DOM está limpo entre os testes
});

describe("Componente Baralho", () => {
  it("renderiza a quantidade correta das cartas", () => {
    const cartasMock = [
      { id: "1", naipe: "💻", virada: false },
      { id: "2", naipe: "💻", virada: false },
      { id: "3", naipe: "🚀", virada: false },
      { id: "4", naipe: "🚀", virada: false },
    ];
    render(<Baralho cartas={cartasMock} />);
    const cartasRenderizadas = screen.getAllByText("❔");
    expect(cartasRenderizadas).toHaveLength(cartasMock.length);
  });

  it("mostra ❔ quando a carta está virada para baixo", () => {
    render(<Baralho cartas={[{ id: "1", naipe: "🪝", virada: false }]} />);
    const cartas = screen.getAllByText("❔");
    expect(cartas).toHaveLength(1);
  });

  it("mostra o emoji correto quando a carta está virada para cima", () => {
    render(<Baralho cartas={[{ id: "1", naipe: "🪝", virada: true }]} />);
    expect(screen.getByText("🪝")).toBeInTheDocument();
  });
});
