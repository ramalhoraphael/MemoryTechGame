import { useState } from "react";
import "./Carta.css";

export default function Carta({ emoji, virada, aoClicar }) {
  return (
    <div className="carta-externa-fixo" onClick={aoClicar}>
      <div className={`carta-interna-rotativo ${virada ? "virada" : ""}`}>
        <div className="carta-frente">{emoji}</div>
        <div className="carta-verso">❓</div>
      </div>
    </div>
  );
}
