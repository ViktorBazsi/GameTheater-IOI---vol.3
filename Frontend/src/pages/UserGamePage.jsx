/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import userPathService from "../services/userPath.service";
import questionService from "../services/question.service"; // Új import

export default function UserGamePage() {
  const { user } = useContext(AuthContext); // A bejelentkezett felhasználó adatainak elérése
  const [questionData, setQuestionData] = useState(null);
  const [question, setQuestion] = useState(null); // A kérdés adatait tároló állapot
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionData = async () => {
      if (user?.username) {
        // Ellenőrzés, hogy van-e bejelentkezett felhasználó
        try {
          const data = await userPathService.getUserPathByUserName(
            user.username
          );
          setQuestionData(data);

          // A questionNr alapján kérjük le a kérdést
          const questionData = await questionService.getQuestionByNumber(
            data.questionNr
          );
          setQuestion(questionData);
        } catch (err) {
          setError("Hiba történt az adatok betöltésekor.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setError("Nem található bejelentkezett felhasználó.");
        setLoading(false);
      }
    };

    fetchQuestionData();
  }, [user]);

  if (loading) {
    return <div className="text-center mt-10">Adatok betöltése...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-logo-pattern bg-cover bg-center bg-fixed flex flex-col items-center p-4 ">
      {question && (
        <div className="bg-purple-950 bg-opacity-55 p-6 rounded-lg shadow-lg max-w-xl w-full text-white mt-80 hover:scale-105 transtion duration-500 hover:bg-opacity-85">
          <h2 className="text-xl font-bold mb-4">
            {question.question} {/* Kérdés megjelenítése */}
          </h2>
          <ul className="space-y-4">
            {question.answers?.map(
              (
                answer // Figyelembe kell venni, hogy a 'answers' lehet undefined
              ) => (
                <li
                  key={answer.id}
                  className="p-4 border rounded-md hover:bg-purple-950 bg-opacity-70 transition duration-500 cursor-pointer hover:scale-110"
                >
                  <p className="font-medium">{answer.answer}</p>
                  <p className="text-sm text-yellow-500 mt-2">
                    Réka: {answer.resultReka} | Domi: {answer.resultDomi} |
                    Kata: {answer.resultKata}
                  </p>
                  <p className="text-sm text-yellow-500 mt-1">
                    Következő kérdés: {answer.nextQuestNr}
                  </p>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
