import { useState } from "react";

import QuestionForm from "../components/QuestionForm";

export default function QuestionUploadPage() {
  const [question, setQuestion] = useState([]);
  return (
    <div className="h-screen bg-logo-pattern bg-cover bg-center flex justify-center">
      <QuestionForm setQuestion={setQuestion} />
    </div>
  );
}
