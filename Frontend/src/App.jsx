import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// PAGES
import MainPageLanding from "./pages/MainPageLanding";
import MainPageLoggedIn from "./pages/MainPageLoggedIn";
import Header from "./components/Header";
import AdminQuestionPage from "./pages/AdminQuestionsPage";
import AdminGamePage from "./pages/AdminGamePage";
import UserGamePage from "./pages/UserGamePage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<MainPageLanding />} />
            <Route path="/signedIn" element={<MainPageLoggedIn />} />
            <Route path="/question" element={<AdminQuestionPage />} />
            <Route path="/newGame" element={<AdminGamePage />} />
            <Route path="/currentGame" element={<UserGamePage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
