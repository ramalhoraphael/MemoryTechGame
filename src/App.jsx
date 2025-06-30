import { useState } from "react";
import Carta from "./components/Carta";

function App() {
  const [virada, setVirada] = useState(false);

  const alternarVirada = () => {
    setVirada(!virada);
    console.info("era pra virar");
  };
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      className="carta-app"
    >
      <Carta emoji="💻" virada={virada} aoClicar={alternarVirada} />
    </div>
  );
}
export default App;
