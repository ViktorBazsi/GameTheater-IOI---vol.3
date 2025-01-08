import { useState } from "react";
import GamePathForm from "../components/GamePathForm";

export default function GamePathPage() {
  // eslint-disable-next-line no-unused-vars
  const [gamePaths, setGamePaths] = useState([]);

  return (
    <div className="min-h-screen bg-logo-pattern bg-cover bg-center bg-fixed flex flex-col items-center">
      <GamePathForm setGamePath={setGamePaths} />
    </div>
  );
}
