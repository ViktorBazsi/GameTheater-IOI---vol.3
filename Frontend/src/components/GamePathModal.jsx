/* eslint-disable react/prop-types */

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router navigáció
import gamePathService from "../services/gamePath.service"; // Az új kérdéshez kapcsolódó service

const Modal = ({ gamePath, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Navigáció használata

  const handleSave = async (values) => {
    try {
      setLoading(true);

      // GamePath frissítése
      await gamePathService.updateGamePath(gamePath.id, {
        gameName: values.updatedGamePath,
      });

      // GamePath frissítése
      await onSave(); // A prop-on keresztül meghívjuk a frissítést

      onClose(); // Modal bezárása
    } catch (error) {
      console.error("Failed to save data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGamePath = async () => {
    try {
      setLoading(true);

      // Kérdés törlése
      await gamePathService.deleteGamePath(gamePath.id);
    } catch (error) {
      console.error("Failed to delete gamePath:", error);
    } finally {
      setLoading(false);
      await onSave(); // A kérdések frissítése a szülő komponensben
      onClose(); // Modal bezárása
    }
  };

  const handleNavigateToAdminPage = () => {
    navigate(`/api/gamePath/${gamePath.id}`); // Dinamikus navigáció az adott gamePath.id-re
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">
          Játék nevének szerkesztése
        </h2>
        <Formik
          initialValues={{
            updatedGamePath: gamePath?.gameName || "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.updatedGamePath) {
              errors.updatedGamePath = "A játék neve nem lehet üres!";
            }
            return errors;
          }}
          onSubmit={handleSave}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="updatedGamePath"
                  className="block text-sm font-medium text-gray-700"
                >
                  Játék neve
                </label>
                <Field
                  type="text"
                  id="updatedGamePath"
                  name="updatedGamePath"
                  className="w-full p-2 mt-1 border rounded"
                />
                <ErrorMessage
                  name="updatedGamePath"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  {loading ? "Mentek éppen..." : "Mentés"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Bezárás
                </button>
                <button
                  type="button"
                  onClick={handleDeleteGamePath}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                >
                  Játék törlése
                </button>
                <button
                  type="button"
                  onClick={handleNavigateToAdminPage} // Navigáció gomb
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Admin oldal
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Modal;
