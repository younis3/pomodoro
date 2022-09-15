import { createContext, useEffect, useState } from "react";

const AppStateContext = createContext();

export const AppStateContextProvider = ({ children }) => {
  const [timerState, SetTimerState] = useState(false);
  const [breakStatus, setBreakStatus] = useState(false);
  const [sessionCounter, setSessionCounter] = useState(1);
  const [timerDuration, setTimerDuration] = useState(0);

  const changeBreakStatus = (boolean) => {
    setBreakStatus(boolean);
  };

  const changeSessionCounter = (val) => {
    setSessionCounter(val);
  };

  const changeTimerDuration = (duration) => {
    setTimerDuration(duration);
  };

  return (
    <AppStateContext.Provider
      value={{
        timerState,
        SetTimerState,
        breakStatus,
        changeBreakStatus,
        sessionCounter,
        changeSessionCounter,
        timerDuration,
        changeTimerDuration,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateContext;
