import { createContext, useEffect, useState } from "react";

const AppStateContext = createContext();

export const AppStateContextProvider = ({ children }) => {
  const [timerState, SetTimerState] = useState(false);

  return (
    <AppStateContext.Provider value={{ timerState, SetTimerState }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateContext;
