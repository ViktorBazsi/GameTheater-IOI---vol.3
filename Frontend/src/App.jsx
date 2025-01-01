import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// PAGES
import MainPageLanding from "./pages/MainPageLanding";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<MainPageLanding />} />
            <Route path="/signedIn" element={<MainPageLanding />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
