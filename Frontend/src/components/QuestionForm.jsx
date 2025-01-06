import { ErrorMessage, Field, Form, Formik } from "formik";
import questionService from "../services/question.service";
import { userValidationSchemaForQuestion } from "../schema/userValidationSchema";

// eslint-disable-next-line react/prop-types
export default function QuestionForm({ setQuestion }) {
  const initialValues = { number: "", question: "" };

  const handleCreate = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("number", values.number);
    formData.append("question", values.question);

    console.log(values.number);
    console.log(values.question);

    try {
      const newQuestion = await questionService.addQuestion(formData);

      // Új kérdés hozzáadása és lista rendezése
      setQuestion((prev) => {
        const updatedQuestions = [
          ...(Array.isArray(prev) ? prev : []),
          newQuestion,
        ];
        return updatedQuestions.sort((a, b) => a.number - b.number); // Sorrend rendezése number alapján
      });

      alert("Sikeres feltöltés");
      resetForm();
    } catch (error) {
      console.log("Hiba történt:", error);
      if (error.response) {
        console.log("Backend válasz:", error.response.data);
        alert(
          `Hiba a backendről: ${error.response.data.error || "Ismeretlen hiba"}`
        );
      } else {
        console.log("Hibaüzenet:", error.message);
        alert("Nem sikerült kapcsolatot létesíteni a szerverrel.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-1/2 mx-aut mt-32 mb-12 bg-purple-950 p-5 rounded-md bg-opacity-70">
      <h2 className="font-bold text-xk text-white text-xl mb-6">Új kérdés:</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={userValidationSchemaForQuestion}
        onSubmit={handleCreate}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field
                type="number"
                name="number"
                placeholder="Kérdés száma"
                className="w-full border p-2 rounded  text-blue-800"
              />
              <ErrorMessage
                name="number"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <Field
                component="textarea"
                name="question"
                placeholder="A kérdés"
                className="w-full border p-2 rounded  text-blue-800"
              />
              <ErrorMessage
                name="question"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="border-2 bg-purple-500 bg-opacity-25 my-5 py-5 px-4 w-3/4 rounded-md text-white text-lg font-bold hover:border-yellow-500 hover:text-purple-950 transform transition duration-300 hover:scale-110 hover:bg-yellow-500 hover:bg-opacity-85"
              >
                Feltöltés
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
