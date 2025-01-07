/* eslint-disable react/prop-types */
import { Formik, Field, Form, FieldArray } from "formik";
import { useState } from "react";
import questionService from "../services/question.service"; // Az új kérdéshez kapcsolódó service
import answerService from "../services/answer.service"; // Az új válaszokhoz kapcsolódó service

const Modal = ({ question, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);

  const handleSave = async (values) => {
    try {
      setLoading(true);

      // Kérdés frissítése
      await questionService.updateQuestion(question.id, {
        question: values.updatedQuestion,
      });

      // Válaszok mentése (create vagy update)
      const answerRequests = values.updatedAnswers.map((answer) => {
        const answerData = {
          answer: answer.updatedAnswer,
          resultReka: answer.resultReka,
          resultDomi: answer.resultDomi,
          resultKata: answer.resultKata,
          nextQuestNr: answer.nextQuestNr,
          relQuestionNr: question.number, // Kapcsolódó kérdés száma
          uploaderId: "currentUserId", // A bejelentkezett felhasználó id-ja
        };

        // Ha válasznak van id-ja, frissítjük, ha nincs, akkor új választ adunk hozzá
        if (answer.id && answer.id.length > 6) {
          // Ellenőrizni, hogy nem egy ideiglenes id-t kaptunk
          return answerService.updateAnswer(answer.id, answerData);
        } else {
          // Ha ideiglenes id-t kapott, akkor nem küldjük el
          return answerService.addAnswer(answerData); // Új válasz létrehozása
        }
      });

      // Válaszok mentése (create vagy update)
      await Promise.all(answerRequests);

      // Kérdések frissítése
      onSave(); // A prop-on keresztül meghívjuk a frissítést

      onClose(); // Modal bezárása
    } catch (error) {
      console.error("Failed to save data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnswer = async (id) => {
    try {
      setLoading(true);

      // Válasz törlése
      await answerService.deleteAnswer(id);

      // Válasz eltávolítása a válaszok listájából (onSave hívása)
      onSave(); // A kérdések frissítése a szülő komponensben
      onClose(); // Modal bezárása
    } catch (error) {
      console.error("Failed to delete answer:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async () => {
    try {
      setLoading(true);

      // Kérdés törlése
      await questionService.deleteQuestion(question.id);

      // Minden kapcsolódó válasz törlése
      await Promise.all(
        question.answers.map((answer) => answerService.deleteAnswer(answer.id))
      );

      // Kérdés eltávolítása a kérdések listájából (onSave hívása)
      await onSave(); // A kérdések frissítése a szülő komponensben
      onClose(); // Modal bezárása
    } catch (error) {
      console.error("Failed to delete question and answers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Kérdés szerkesztése</h2>
        <Formik
          initialValues={{
            updatedQuestion: question.question,
            updatedAnswers: Array.isArray(question.answers)
              ? question.answers.map((answer) => ({
                  ...answer,
                  updatedAnswer: answer.answer,
                }))
              : [], // Ha nincs válasz, akkor üres tömb
          }}
          onSubmit={handleSave}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div>
                <textarea
                  name="updatedQuestion"
                  value={values.updatedQuestion}
                  onChange={(e) =>
                    setFieldValue("updatedQuestion", e.target.value)
                  }
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Answers:</h3>
              <FieldArray
                name="updatedAnswers"
                render={(arrayHelpers) => (
                  <>
                    {values.updatedAnswers.map((answer, index) => (
                      <div key={answer.id} className="mb-2">
                        <Field
                          name={`updatedAnswers[${index}].updatedAnswer`}
                          type="text"
                          className="w-full p-2 border rounded mb-2"
                          placeholder="Answer text"
                        />
                        <div className="flex justify-between">
                          <div className="w-1/3">
                            <label>Réka</label>
                            <Field
                              name={`updatedAnswers[${index}].resultReka`}
                              type="number"
                              className="w-full p-2 border rounded mb-2"
                              placeholder="Reka's result"
                            />
                          </div>
                          <div className="w-1/3">
                            <label>Domi</label>
                            <Field
                              name={`updatedAnswers[${index}].resultDomi`}
                              type="number"
                              className="w-full p-2 border rounded mb-2"
                              placeholder="Domi's result"
                            />
                          </div>
                          <div className="w-1/3">
                            <label>Kata</label>
                            <Field
                              name={`updatedAnswers[${index}].resultKata`}
                              type="number"
                              className="w-full p-2 border rounded mb-2"
                              placeholder="Kata's result"
                            />
                          </div>
                        </div>
                        <Field
                          name={`updatedAnswers[${index}].nextQuestNr`}
                          type="number"
                          className="w-full p-2 border rounded mb-2"
                          placeholder="Next question number"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteAnswer(answer.id)} // Válasz törlés
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Kérdés törlése
                        </button>
                      </div>
                    ))}
                    <div className="mb-4">
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            id: Math.random().toString(36).substring(7), // Id generálása új válaszhoz
                            relQuestionNr: question.number,
                            updatedAnswer: "",
                            resultReka: 0,
                            resultDomi: 0,
                            resultKata: 0,
                            nextQuestNr: "",
                            uploaderId: "currentUserId", // A bejelentkezett felhasználó id-ja
                          })
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Válasz hozzáadása
                      </button>
                    </div>
                  </>
                )}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                {loading ? "Mentek éppen..." : "Mentés"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Bezárás
              </button>
              <button
                type="button"
                onClick={handleDeleteQuestion} // Kérdés törlés
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Kérdés törlése
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Modal;
