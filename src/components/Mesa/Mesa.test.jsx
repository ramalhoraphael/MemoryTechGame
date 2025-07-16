// Mesa.test.jsx
import { render, fireEvent, screen } from "@testing-library/react";
import Mesa from "./index";
import { describe, test } from "vitest";

describe("Componente Mesa", () => {
  test("renderiza título e botão Resetar", () => {
    render(<Mesa />);
    expect(screen.getByText("🧠 MemoryTech Game")).toBeInTheDocument();
    expect(screen.getByText("Resetar")).toBeInTheDocument();
  });

  test("renderiza cartas após iniciar", () => {
    render(<Mesa />);
    const cartas = screen.getAllByTestId("carta-rotativa");
    expect(cartas.length).toBeGreaterThan(0);
  });

  test("clica em duas cartas diferentes e verifica se viram", () => {
    render(<Mesa />);
    const cartas = screen.getAllByTestId("carta-rotativa");
    fireEvent.click(cartas[0]);
    fireEvent.click(cartas[1]);
    expect(cartas[0].className).toMatch(/virada|carta-interna-rotativo/);
  });

  test("botão resetar reinicia o jogo", () => {
    render(<Mesa />);
    const cartasAntes = screen.getAllByTestId("carta-rotativa");
    fireEvent.click(cartasAntes[0]);
    fireEvent.click(screen.getByText("Resetar"));
    const cartasDepois = screen.getAllByTestId("carta-rotativa");
    expect(cartasDepois.length).toEqual(cartasAntes.length);
  });
});
