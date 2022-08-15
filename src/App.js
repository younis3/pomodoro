import './App.css';
import Pomodoro from './components/Pomodoro';
import { SettingsContextProvider } from "./context/SettingsContext";
import { SoundContextProvider } from "./context/SoundContext";


function App() {
  return (
    <div className="App">
      <SoundContextProvider>
        <SettingsContextProvider>
          <Pomodoro />
        </SettingsContextProvider>
      </SoundContextProvider>
    </div>
  );
}

export default App;
