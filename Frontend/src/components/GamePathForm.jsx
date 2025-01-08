import { ErrorMessage, Field, Form, Formik } from "formik";
import gamePathService from "../services/gamePath.service";

// eslint-disable-next-line react/prop-types
export default function GamePathForm({ setGamePath }) {
  const initialValues = { gameName: "" };

  const handleCreate = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.gameName);

    console.log(values.gameName);

    try {
      const newGamePath = await gamePathService.createGamePath(formData);

      // Új kérdés hozzáadása és lista rendezése
      setGamePath((prev) => {
        const updatedGamePaths = [
          ...(Array.isArray(prev) ? prev : []),
          newGamePath,
        ];
        return updatedGamePaths.sort((a, b) => a.number - b.number); // Sorrend rendezése number alapján
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
      <h2 className="font-bold text-xk text-white text-xl mb-6">Új játék:</h2>
      <Formik
        initialValues={initialValues}
        // Ide lehetne validation-t feltölteni
        onSubmit={handleCreate}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field
                type="text"
                name="gameName"
                placeholder="A játék neve"
                className="w-full border p-2 rounded  text-blue-800"
              />
              <ErrorMessage
                name="gameName"
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
