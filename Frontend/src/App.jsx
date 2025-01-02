import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// PAGES
import MainPageLanding from "./pages/MainPageLanding";
import MainPageLoggedIn from "./pages/MainPageLoggedIn";
import Header from "./components/Header";
import AdminQuestionPage from "./pages/AdminQuestionsPage";

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
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
