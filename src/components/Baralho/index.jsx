import { nanoid } from "nanoid";

import emojisDisponiveis from "./emojis.json" assert { type: "json" };

export default function gerarBaralho(quantidadeCartas) {
  if (quantidadeCartas % 2 !== 0 && quantidadeCartas < 4) {
    throw new Error(
      "A quantidade de cartas deve ser um numero par maior ou igual a 4"
    );
  }

  const quantidadeNaipes = quantidadeCartas / 2;
  const emojisSelecionados = emojisDisponiveis.slice(0, quantidadeNaipes);

  const cartas = emojisSelecionados.flatMap((emoji) => [
    { naipe: emoji, id: nanoid(), virada: false },
    { naipe: emoji, id: nanoid(), virada: false },
  ]);

  //Fisher-Yates - https://www.youtube.com/watch?v=tLxBwSL3lPQ
  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }

  return cartas;
}
