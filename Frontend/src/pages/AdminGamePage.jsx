import { useEffect, useState } from "react";
import GamePathForm from "../components/GamePathForm";
import GamePathsGrid from "../components/GamePathGrid";

import gamePathService from "../services/gamePath.service";

export default function GamePathPage() {
  const [gamePaths, setGamePaths] = useState([]);

  useEffect(() => {
    const fetchGamePaths = async () => {
      try {
        const fetchedGamePaths = await gamePathService.listGamePaths();
        setGamePaths(fetchedGamePaths);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchGamePaths();
  }, []);

  return (
    <div className="min-h-screen bg-logo-pattern bg-cover bg-center bg-fixed flex flex-col items-center">
      <GamePathForm setGamePath={setGamePaths} />
      <GamePathsGrid gamePaths={gamePaths} setGamePaths={setGamePaths} />{" "}
    </div>
  );
}
