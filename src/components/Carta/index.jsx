import "./Carta.css";

export default function Carta({ naipe, virada, aoClicar }) {
  return (
    <div className="carta-externa-fixo" onClick={aoClicar}>
      <div
        className={`carta-interna-rotativo ${virada ? "virada" : ""}`}
        data-testid={`carta-rotativa`}
      >
        <div className="carta-frente">{naipe}</div>
        <div className="carta-verso">❓</div>
      </div>
    </div>
  );
}
