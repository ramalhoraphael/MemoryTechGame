import "./Baralho.css";
import { gerarBaralho } from "./gerarBaralho";
import { useMemo } from "react";
import Carta from "../Carta"; // ajuste o caminho se necessário

export default function Baralho({ quantidadeCartas, reset, virada, aoClicar }) {
  const cartas = useMemo(
    () => gerarBaralho(quantidadeCartas),
    [quantidadeCartas, reset]
  );

  return (
    <div className="baralho">
      {cartas.map((carta) => (
        <Carta
          key={carta.id}
          naipe={carta.naipe}
          virada={virada[carta.id]}
          aoClicar={() => aoClicar(carta.id)}
        />
      ))}
    </div>
  );
}
