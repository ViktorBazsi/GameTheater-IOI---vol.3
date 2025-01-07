/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../components/QuestionModal"; // Importáld a modal komponenst
import questionService from "../services/question.service"; // A kérdéseket kezelő service

const QuestionsGrid = ({ questions, setQuestions }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleCardClick = (question) => {
    setSelectedQuestion(question); // Modalban megjeleníteni a kiválasztott kérdést
  };

  const handleCloseModal = () => {
    setSelectedQuestion(null);
  };

  // Kérdések újratöltése a backendről
  const refreshQuestions = async () => {
    try {
      const updatedQuestions = await questionService.listQuestions(); // Feltételezve, hogy van egy kérdéseket lekérő metódus
      setQuestions(updatedQuestions); // A kérdések frissítése
      setSelectedQuestion(null); // Modal állapotának nullázása
    } catch (error) {
      console.error("Failed to refresh questions:", error);
    }
  };

  return (
    <>
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mt-8">
        {questions.length > 0 ? (
          questions.map((question) => (
            <div
              key={question.id}
              className="bg-purple-950 bg-opacity-70 rounded-lg p-6 flex flex-col transform transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleCardClick(question)} // Kártya kattintás esemény
            >
              <h3 className="text-lg font-semibold text-yellow-500 mb-4 text-end">
                {question.number}
              </h3>
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">
                {question.question}
              </h3>
              {question.answers && question.answers.length > 0 ? (
                <ul className="space-y-2">
                  {question.answers.map((answer) => (
                    <li
                      key={answer.id}
                      className="bg-purple-200 bg-opacity-30 p-3 text-yellow-500 rounded-lg border border-gray-300"
                    >
                      {answer.answer}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-yellow-500">No answers available</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-yellow-500">Loading questions...</p>
        )}
      </div>

      {selectedQuestion && (
        <Modal
          question={selectedQuestion}
          onClose={handleCloseModal}
          onSave={refreshQuestions} // Átadjuk a frissítő függvényt a Modalnak
        />
      )}
    </>
  );
};

export default QuestionsGrid;
