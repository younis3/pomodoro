import "./App.css";
import { SettingsContextProvider } from "./context/SettingsContext";
import { SoundContextProvider } from "./context/SoundContext";
import { CategoryContextProvider } from "./context/CategoryContext";
import { AuthContextProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import StatsPAge from "./pages/StatsPage";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
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
      </AuthContextProvider>
    </div>
  );
}

export default App;
