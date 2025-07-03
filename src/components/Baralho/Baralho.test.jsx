import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Baralho from "./index";

vi.mock("../Carta", () => ({
  default: ({ naipe, virada, aoClicar }) => (
    <div
      data-testid="carta"
      data-naipe={naipe}
      data-virada={virada}
      onClick={aoClicar}
    >
      {virada ? naipe : "❔"}
    </div>
  ),
}));

describe("Componente Baralho", () => {
  const quantidadeCartas = 20;
  let viradaMock, aoClicarMock;

  beforeEach(() => {
    viradaMock = {};
    aoClicarMock = vi.fn();
  });

  it("renderiza a quantidade correta de cartas", () => {
    render(
      <Baralho
        quantidadeCartas={quantidadeCartas}
        reset={0}
        virada={viradaMock}
        aoClicar={aoClicarMock}
      />
    );
    const cartas = screen.getAllByTestId("carta");
    expect(cartas).toHaveLength(quantidadeCartas);
  });

  it("transmite os dados corretos para cada carta", () => {
    viradaMock = { a: true, b: false, c: true };
    render(
      <Baralho
        quantidadeCartas={quantidadeCartas}
        reset={0}
        virada={viradaMock}
        aoClicar={aoClicarMock}
      />
    );
    const cartas = screen.getAllByTestId("carta");
    expect(cartas.length).toBe(quantidadeCartas);
  });

  it("aciona aoClicar corretamente ao clicar em uma carta", () => {
    render(
      <Baralho
        quantidadeCartas={quantidadeCartas}
        reset={0}
        virada={viradaMock}
        aoClicar={aoClicarMock}
      />
    );
    const cartas = screen.getAllByTestId("carta");
    fireEvent.click(cartas[0]);
    expect(aoClicarMock).toHaveBeenCalledTimes(1);
  });

  it("recria o baralho quando o reset muda", () => {
    const { rerender } = render(
      <Baralho
        quantidadeCartas={quantidadeCartas}
        reset={0}
        virada={viradaMock}
        aoClicar={aoClicarMock}
      />
    );
    const primeirasIds = screen
      .getAllByTestId("carta")
      .map((el) => el.getAttribute("data-naipe"));

    rerender(
      <Baralho
        quantidadeCartas={quantidadeCartas}
        reset={1}
        virada={viradaMock}
        aoClicar={aoClicarMock}
      />
    );
    const novasIds = screen
      .getAllByTestId("carta")
      .map((el) => el.getAttribute("data-naipe"));

    expect(primeirasIds).toEqual(novasIds);
  });
});
