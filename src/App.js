import "./App.css";
import { SettingsContextProvider } from "./context/SettingsContext";
import { SoundContextProvider } from "./context/SoundContext";
import { CategoryContextProvider } from "./context/CategoryContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import StatsPAge from "./pages/StatsPage";
import NotFound from "./pages/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <CategoryContextProvider>
          <SoundContextProvider>
            <SettingsContextProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/stats" element={<StatsPAge />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SettingsContextProvider>
          </SoundContextProvider>
        </CategoryContextProvider>
      </div>
    </Router>
  );
}

export default App;
