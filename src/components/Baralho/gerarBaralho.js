import { nanoid } from "nanoid";

import emojisDisponiveis from "./naipes.json" assert { type: "json" };

export function gerarBaralho(quantidadeCartas) {
  if (quantidadeCartas % 2 !== 0) {
    throw new Error("A quantidade de cartas deve ser um numero par");
  }

  const quantidadeNaipes = quantidadeCartas / 2;
  const emojisSelecionados = emojisDisponiveis.slice(0, quantidadeNaipes);

  const cartas = emojisSelecionados.flatMap((emoji) => [
    { naipe: emoji, id: nanoid(), virada: false },
    { naipe: emoji, id: nanoid(), virada: false },
  ]);

  return cartas;
}
