import "./App.css";
import Pomodoro from "./components/Pomodoro";
import { SettingsContextProvider } from "./context/SettingsContext";
import { SoundContextProvider } from "./context/SoundContext";
import { CategoryContextProvider } from "./context/CategoryContext";

function App() {
  return (
    <div className="App">
      <CategoryContextProvider>
        <SoundContextProvider>
          <SettingsContextProvider>
            <Pomodoro />
          </SettingsContextProvider>
        </SoundContextProvider>
      </CategoryContextProvider>
    </div>
  );
}

export default App;
