import { useState } from "react";
import LoginForm from "../components/LoginForm";

export default function MainPageLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="h-screen bg-bg1-pattern bg-cover bg-center">
      <div className="h-full flex flex-col justify-end items-center text-white text-center">
        <button
          className="border-2 text-white px-4 py-2 rounded-lg hover:scale-110 transition duration-700 mb-48"
          onClick={toggleModal}
        >
          BELÉPÉS
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center justify-center bg-white bg-opacity-5 p-6 rounded-lg shadow-lg text-black w-1/2 relative h-3/4">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-white text-xl font-bold hover:scale-125 transition duration-700 "
            >
              ×
            </button>
            <LoginForm />
          </div>
        </div>
      )}
    </div>
  );
}
