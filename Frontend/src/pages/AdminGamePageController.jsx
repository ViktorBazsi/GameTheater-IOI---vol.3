import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gamePathService from "../services/gamePath.service";

const AdminGamePageController = () => {
  const { id } = useParams(); // Az URL-ből lekérjük az ID-t
  const navigate = useNavigate(); // Navigáció használata
  const [gamePath, setGamePath] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGamePath = async () => {
      try {
        setLoading(true);
        const data = await gamePathService.getGamePathById(id); // Backend kérés az ID alapján
        setGamePath(data);
      } catch (error) {
        console.error("Failed to fetch game path data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGamePath();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Betöltés...</p>
      </div>
    );
  }

  if (!gamePath) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Nem található a játék!</p>
      </div>
    );
  }

  const handleExit = () => {
    navigate(-1); // Vissza az előző oldalra
  };

  return (
    <div className="mx-auto p-6 pt-20 bg-logo-pattern bg-cover bg-center bg-fixed">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-500">
          Admin oldal: {gamePath.name}
        </h1>
        <button
          onClick={handleExit}
          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
        >
          Kilépés
        </button>
      </div>

      <div className="bg-white bg-opacity-30  rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-yellow-600">
          Játék részletei
        </h2>
        <p className="text-lg text-yellow-500">
          <strong>ID:</strong> {gamePath.id}
        </p>
        <p className="text-lg text-yellow-500">
          <strong>Létrehozva:</strong>{" "}
          {new Date(gamePath.createdAt).toLocaleString()}
        </p>
        <p className="text-lg text-yellow-500">
          <strong>Jelenlegi kérdés:</strong> {gamePath.questionNr}
        </p>
        <p className="text-lg text-yellow-500">
          <strong>Következő kérdés:</strong> {gamePath.nextQuestion}
        </p>
      </div>

      <div className="bg-white bg-opacity-30 rounded-lg shadow-lg p-6 space-y-4 mt-6">
        <h2 className="text-2xl font-semibold text-yellow-600">
          Felhasználók eredményei
        </h2>
        <p className="text-lg text-yellow-500">
          <strong>Réka eredménye:</strong> {gamePath.resRekaAll}
        </p>
        <p className="text-lg text-yellow-500">
          <strong>Domi eredménye:</strong> {gamePath.resDomiAll}
        </p>
        <p className="text-lg text-yellow-500">
          <strong>Kata eredménye:</strong> {gamePath.resKataAll}
        </p>
      </div>

      <div className="bg-white bg-opacity-30 rounded-lg shadow-lg p-6 space-y-4 mt-6">
        <h2 className="text-2xl font-semibold text-yellow-600">
          Felhasználói utak
        </h2>
        {gamePath.userpaths && gamePath.userpaths.length > 0 ? (
          <ul className="space-y-3">
            {gamePath.userpaths.map((userPath) => (
              <li
                key={userPath.id}
                className="p-4 bg-purple-100 bg-opacity-40 rounded-lg shadow-sm"
              >
                <p className="text-lg text-yellow-500">
                  <strong>Felhasználónév:</strong> {userPath.username}
                </p>
                <p className="text-lg text-yellow-500">
                  <strong>Jelenlegi kérdés:</strong> {userPath.questionNr}
                </p>
                <p className="text-lg text-yellow-500">
                  <strong>Következő kérdés:</strong> {userPath.nextQuestion}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-yellow-500">Nincsenek felhasználók.</p>
        )}
      </div>
    </div>
  );
};

export default AdminGamePageController;
