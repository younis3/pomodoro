import "./App.css";
import { SettingsContextProvider } from "./context/SettingsContext";
import { SoundContextProvider } from "./context/SoundContext";
import { CategoryContextProvider } from "./context/CategoryContext";
import { AuthContextProvider } from "./context/AuthContext";
import { AppStateContextProvider } from "./context/AppStateContext";
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
        <AppStateContextProvider>
          <CategoryContextProvider>
            <SoundContextProvider>
              <SettingsContextProvider>
                <Navbar />
                <HomePage />
                <Routes>
                  <Route path="/restart" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/stats" element={<StatsPAge />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </SettingsContextProvider>
            </SoundContextProvider>
          </CategoryContextProvider>
        </AppStateContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
