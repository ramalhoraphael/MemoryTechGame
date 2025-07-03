import { describe, it, expect } from "vitest";
import { gerarBaralho } from "./gerarBaralho.js";

describe("Função gerarBaralho", () => {
  it("gera a quantidade correta de cartas", () => {
    const baralho = gerarBaralho(20);
    expect(baralho).toHaveLength(20);
  });

  it("cada naipe aparece exatamente duas vezes", () => {
    const baralho = gerarBaralho(20);
    const contagem = {};
    baralho.forEach((carta) => {
      contagem[carta.naipe] = (contagem[carta.naipe] || 0) + 1;
    });
    Object.values(contagem).forEach((qtd) => {
      expect(qtd).toBe(2);
    });
  });

  it("todas as cartas têm id, naipe e virada", () => {
    const baralho = gerarBaralho(20);
    baralho.forEach((carta) => {
      expect(carta).toHaveProperty("id");
      expect(carta).toHaveProperty("naipe");
      expect(carta).toHaveProperty("virada");
      expect(typeof carta.id).toBe("string");
      expect(typeof carta.naipe).toBe("string");
      expect(carta.virada).toBe(false);
    });
  });

  it("lança erro se a quantidade de cartas for ímpar", () => {
    expect(() => gerarBaralho(5)).toThrow(
      "A quantidade de cartas deve ser um numero par"
    );
  });

  it("não embaralha as cartas (ordem previsível)", () => {
    const primeira = gerarBaralho(20).map((c) => c.naipe);
    const segunda = gerarBaralho(20).map((c) => c.naipe);
    expect(primeira).toEqual(segunda);
  });
});
