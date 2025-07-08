import emojis from "./emojis.json";

function embaralhar(array) {
  const copia = [...array];
  for (let i = 0; i < copia.length; i++) {
    let aleatorio = Math.random();
    // console.log(aleatorio);
    const j = Math.floor(aleatorio * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}
export default function gerarBaralho() {
  const pares = [...emojis, ...emojis];
  const embaralhados = embaralhar(pares);
  return embaralhados.map((emoji, index) => ({
    id: index,
    naipe: emoji,
    virada: false,
  }));
}
