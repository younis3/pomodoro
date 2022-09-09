import Pomodoro from "../components/Pomodoro";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const urlLocation = useLocation().pathname;

  return (
    <div style={{ display: `${urlLocation === "/" ? "" : "none"}` }}>
      {/* hiding component - kind of 'unmounting' the timer component without
       actually unmouting it to prevent rerendering */}
      <Pomodoro />
    </div>
  );
};

export default HomePage;
