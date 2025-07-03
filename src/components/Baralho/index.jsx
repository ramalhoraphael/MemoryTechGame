import "./Baralho.css";

export default function Baralho({ cartas }) {
  return (
    <div className="baralho">
      {cartas.map((carta) => (
        <div key={carta.id} className="carta">
          {carta.virada ? carta.naipe : "❔"}
        </div>
      ))}
    </div>
  );
}
