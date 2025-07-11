import { useEffect, useState } from "react";
import Carta from "../Carta/index.jsx";
import "./Mesa.css";
import gerarBaralho from "./gerarBaralho.js";

export default function Mesa() {
  //Estados
  const [baralho, setBaralho] = useState(gerarBaralho);
  // const [tentativas, setTentativas] = useState(0);
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
    // setTentativas((prev) => prev + 1);
    setTimeout(() => {
      virarCarta(id1);
      virarCarta(idPrimeiraCarta);
      setBloqueado(false);
    }, 1500);
  }
  function limparJogada() {
    setIdPrimeiraCarta(null);
    setNaipeDaJogada("");
    return;
  }
  function resetar() {
    setBaralho(gerarBaralho());
    // setTentativas(0);
    setIdPrimeiraCarta(null);
    setNaipeDaJogada("");
    setNaipesCombinados([]);
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
          {
            setNaipesCombinados((prev) => [...prev, naipeDaJogada]);
          }
          limparJogada();
          //Não combina?
        } else {
          encobrirCartas(idDaCartaClicada); //idPrimeiraCarta esta no state
          limparJogada();

          return;
        }
      }
    }
  };

  return (
    <div className="mesa">
      <div className="cabecalho">
        <div>🧠 MemoryTech Game</div>
        <div className="botao-resetar" onClick={resetar}>
          Resetar
        </div>
        {/* <div className="cabecalho-item">Tentativas: {tentativas}</div> */}
      </div>
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
