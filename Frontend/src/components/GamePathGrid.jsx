/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../components/GamePathModal"; // ENNEK MAJD EGY MÁSIK OLDALRA KÉNE VEZETNIE, AMI MAJD AZ ADMIN PAGE LESZ!
import gamePathService from "../services/gamePath.service"; // A kérdéseket kezelő service

const GamePathsGrid = ({ gamePaths, setGamePaths }) => {
  const [selectedGamePath, setSelectedGamePath] = useState(null);

  const handleCardClick = (gamePath) => {
    setSelectedGamePath(gamePath); // Modalban megjeleníteni a kiválasztott kérdést
  };

  const handleCloseModal = () => {
    setSelectedGamePath(null);
  };

  // Kérdések újratöltése a backendről
  const refreshGamePaths = async () => {
    try {
      const updatedGamePaths = await gamePathService.listGamePaths(); // Feltételezve, hogy van egy kérdéseket lekérő metódus
      setGamePaths(updatedGamePaths); // A kérdések frissítése
      setSelectedGamePath(null); // Modal állapotának nullázása
    } catch (error) {
      console.error("Failed to refresh questions:", error);
    }
  };

  return (
    <>
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mt-8">
        {gamePaths.length > 0 ? (
          gamePaths.map((gamePath) => (
            <div
              key={gamePath.id}
              className="bg-purple-950 bg-opacity-70 rounded-lg p-6 flex flex-col transform transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleCardClick(gamePath)} // Kártya kattintás esemény
            >
              <h3 className="text-lg font-semibold text-yellow-500 mb-4 text-end">
                {`Név: ${gamePath.name}`}
              </h3>
              <h3 className="text-lg font-semibold text-yellow-500 mb-4 text-end">
                {`Jelenlegi kérdés: ${gamePath.questionNr}`}
              </h3>
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">
                {`Réka eredménye: ${gamePath.resRekaAll}`}
              </h3>
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">
                {`Domi eredménye: ${gamePath.resDomiAll}`}
              </h3>
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">
                {`Kata eredménye: ${gamePath.resKataAll}`}
              </h3>
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">
                {`Következő kérdés: ${gamePath.nextQuestion}`}
              </h3>
              {gamePath.userPaths && gamePath.userPaths.length > 0 ? (
                <ul className="space-y-2">
                  {gamePath.userPaths.map((userPath) => (
                    <li
                      key={userPath.id}
                      className="bg-purple-200 bg-opacity-30 p-3 text-yellow-500 rounded-lg border border-gray-300"
                    >
                      {userPath.userName}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-yellow-500">No players available</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-yellow-500">Loading players...</p>
        )}
      </div>

      {selectedGamePath && (
        <Modal
          gamePath={selectedGamePath}
          onClose={handleCloseModal}
          onSave={refreshGamePaths} // Átadjuk a frissítő függvényt a Modalnak
        />
      )}
    </>
  );
};

export default GamePathsGrid;
