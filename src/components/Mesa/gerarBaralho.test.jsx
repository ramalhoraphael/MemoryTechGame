import gerarBaralho from "./gerarBaralho";

describe("Função gerarBaralho", () => {
  it("deve retornar um array com o dobro do número de emojis", () => {
    const baralho = gerarBaralho();
    expect(baralho.length % 2).toBe(0);
  });

  it("cada carta deve ter propriedades id, naipe e virada", () => {
    const baralho = gerarBaralho();
    expect(baralho[0]).toHaveProperty("id");
    expect(baralho[0]).toHaveProperty("naipe");
    expect(baralho[0]).toHaveProperty("virada");
  });

  it("deve embaralhar as cartas (com alta chance de ordem diferente)", () => {
    const baralho1 = gerarBaralho().map((c) => c.naipe);
    const baralho2 = gerarBaralho().map((c) => c.naipe);
    expect(baralho1).not.toEqual(baralho2);
  });
});
