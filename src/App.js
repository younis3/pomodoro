import './App.css';
import Pomodoro from './components/Pomodoro';
import { SettingsContextProvider } from "./context/SettingsContext";


function App() {
  return (
    <div className="App">

      <SettingsContextProvider>
        <Pomodoro/>
        </SettingsContextProvider>
    </div>
  );
}

export default App;
