import { useState, useEffect } from "react";
import QuestionForm from "../components/QuestionForm";
import QuestionsGrid from "../components/QuestionsGrid"; // Importáljuk a new komponens

import questionService from "../services/question.service"; // Importáljuk a service fájlt

export default function QuestionUploadPage() {
  const [questions, setQuestions] = useState([]);

  // Lekérés a backendről
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await questionService.listQuestions(); // Hívás a listQuestions funkcióra
        setQuestions(fetchedQuestions); // Adatok beállítása
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-logo-pattern bg-cover bg-center bg-fixed flex flex-col items-center">
      <QuestionForm setQuestion={setQuestions} />
      {/* Kérdések kártyák megjelenítése a kiszervezett komponens segítségével */}
      <QuestionsGrid questions={questions} setQuestions={setQuestions} />{" "}
      {/* Add át a setQuestions függvényt */}
    </div>
  );
}
