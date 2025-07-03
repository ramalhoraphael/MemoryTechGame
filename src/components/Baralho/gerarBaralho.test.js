import { describe, it, expect } from "vitest";
import { gerarBaralho } from "./gerarBaralho.js";

describe("Função gerarBaralho", () => {
  it("gera a quantidade correta de cartas", () => {
    const baralho = gerarBaralho(20);
    expect(baralho).toHaveLength(20);
  });

  it("cada emoji aparece exatamente duas vezes", () => {
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
    });
  });

  it("lança erro para quantidade inválida (ímpar ou menor que 4)", () => {
    expect(() => gerarBaralho(3)).toThrow();
    expect(() => gerarBaralho(5)).toThrow();
  });

  it("embaralha as cartas (ordem diferente entre execuções)", () => {
    const primeira = gerarBaralho(20).map((c) => c.naipe);
    const segunda = gerarBaralho(20).map((c) => c.naipe);
    const diferentes = primeira.some((emoji, i) => emoji !== segunda[i]);
    expect(diferentes).toBe(true);
  });
});
