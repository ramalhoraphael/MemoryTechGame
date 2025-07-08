import { useEffect, useState } from "react";
import Carta from "../Carta/index.jsx";
import "./Mesa.css";
import gerarBaralho from "./gerarBaralho.js";

export default function Mesa() {
  //Estados
  const [baralho, setBaralho] = useState(gerarBaralho);
  const [tentativas, setTentativas] = useState(0);
  const [idPrimeiraCarta, setIdPrimeiraCarta] = useState(null);
  const [naipeDaJogada, setNaipeDaJogada] = useState("");
  const [naipesCombinados, setNaipesCombinados] = useState([]);
  const [bloqueado, setBloqueado] = useState(false);

  //Auxiliares
  function virarCarta(idCarta) {
    const novoBaralho = baralho.map((carta) => {
      if (carta.id === idCarta) return { ...carta, virada: !carta.virada };
      else return carta;
    });
    setBaralho(novoBaralho);
  }
  function revelarCarta(id) {
    virarCarta(id);
  }
  function encobrirCartas(id1) {
    setBloqueado(true);
    setTimeout(() => {
      virarCarta(id1);
      virarCarta(idPrimeiraCarta);
      setBloqueado(false);
    }, 1500);
  }
  function restarJogada() {
    setIdPrimeiraCarta(null);
    setNaipeDaJogada("");

    return;
  }

  //Principal
  const inspecionarCarta = (idDaCartaClicada, naipeDaCartaClicada) => {
    //Parte1: Conferência inicial
    {
      //Não permite uma terceira carta ser clicada
      if (bloqueado) return;

      //A carta clicada já está combinada?
      if (naipesCombinados.includes(naipeDaCartaClicada)) return;

      //A carta clicada não está combinada, mas é a 1a carta da tentativa?
      if (idDaCartaClicada === idPrimeiraCarta) return;
    }

    //Parte2: Virar a carta
    {
      revelarCarta(idDaCartaClicada);
    }

    //Parte 3(Final):Conferência de Jogada
    {
      //Primeira carta da jogada?
      if (naipeDaJogada === "") {
        setNaipeDaJogada(naipeDaCartaClicada);
        setIdPrimeiraCarta(idDaCartaClicada);
        console.log("finalizando primeira carta");
        return;
      }
      //Segunda carta, verificar combinação
      {
        //Combina?
        if (naipeDaJogada === naipeDaCartaClicada) {
          console.log("🎉 Par encontrado!");
          {
            setNaipesCombinados((prev) => [...prev, naipeDaJogada]);
          }
          restarJogada();

          //Não combina?
        } else {
          console.log("❌ Não é par!");
          encobrirCartas(idDaCartaClicada); //idPrimeiraCarta esta no state
          restarJogada();
          setTentativas((prev) => prev + 1);

          return;
        }
      }
    }
  };

  return (
    <div className="mesa">
      <div>Tentativas {tentativas}</div>
      <div>ID 1ª Carta {idPrimeiraCarta}</div>
      <div>Naipe da Jogada {naipeDaJogada}</div>
      <div className="carta-grid">
        {baralho.map((carta) => {
          return (
            <Carta
              key={carta.id}
              naipe={carta.naipe}
              virada={carta.virada}
              aoClicar={() => inspecionarCarta(carta.id, carta.naipe)}
            />
          );
        })}
      </div>
    </div>
  );
}
