import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const showLoginModal = () => {
    setModalType("login");
    setIsModalOpen(true);
  };

  return (
    <header className="fixed top-0 left-0 w-full text-white py-4 px-24 flex justify-between">
      <div className="flex gap-4 px-3 py-2 text-xl font-bold">
        {/* <div className="text-yellow-500 drop-shadow-[0_0_10px_rgba(255,223,0,0.8)] hover:text-yellow-500 transform transition duration-700 hover:scale-110">
          Kedvelések:
          <div className="flex justify-center items-center text-2xl text-yellow-500 font-bold drop-shadow-[0_0_10px_rgba(255,223,0,0.8)]">
            {`${user.totalLikes}`}
          </div>
        </div> */}

        <h1 className="cursor-default">Üdvözlünk a játékSzínházban</h1>
        {user && (
          <div className="hover:text-white transform transition duration-700 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-default">{`${user.username}!`}</div>
        )}
      </div>
      <nav className="flex gap-4 items-center">
        {user ? (
          <>
            <Link
              to="/signedIn"
              className="rounded-md px-3 py-2 hover:border-2  hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transform transition duration-300 hover:scale-110"
            >
              {/* {" "} */}
              Profilod
            </Link>
            <Link
              to="/isgnedIn"
              className="rounded-md px-3 py-2 hover:border-2  hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transform transition duration-300 hover:scale-110 "
            >
              {/* {" "} */}
              Eddigi játékaid
            </Link>
            {user.isAdmin && (
              <>
                <Link
                  to="/question" //ezeket még mind meg kell majd csinálni!
                  className="rounded-md px-3 py-2 hover:border-2 hover:border-yellow-500 hover:text-yellow-500 hover:drop-shadow-[0_0_10px_rgba(255,223,0,0.8)] transform transition duration-300 hover:scale-110"
                >
                  Kérdések
                </Link>
                <Link
                  to="/answer" //ezeket még mind meg kell majd csinálni!
                  className="rounded-md px-3 py-2 hover:border-2 hover:border-yellow-500 hover:text-yellow-500 hover:drop-shadow-[0_0_10px_rgba(255,223,0,0.8)] transform transition duration-300 hover:scale-110"
                >
                  Válaszok
                </Link>
                <Link
                  to="/newGame" //ezeket még mind meg kell majd csinálni!
                  className="rounded-md px-3 py-2 hover:border-2 hover:border-yellow-500 hover:text-yellow-500 hover:drop-shadow-[0_0_10px_rgba(255,223,0,0.8)] transform transition duration-300 hover:scale-110"
                >
                  Új játék
                </Link>
              </>
            )}
            <button
              className="rounded-md px-3 py-2 hover:border-2 hover:border-red-500 hover:text-red-500 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transform transition duration-300 hover:scale-110"
              onClick={handleLogout}
            >
              Kijelentkezés
            </button>
          </>
        ) : (
          <div
            to="/loginBw"
            className="rounded-md px-3 py-2 hover:bg-green-800
            transform transition duration-300 hover:scale-110"
            onClick={showLoginModal}
          >
            {/* {" "}
            Belépés */}
          </div>
        )}
      </nav>
    </header>
  );
}
