import { createContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsContextProvider = ({ children }) => {
  const [focusDuration, setFocusDuration] = useState(20);
  const [breakDuration, setBreakDuration] = useState(12);
  const [sessionsCount, setSessionsCount] = useState(4);
  const [autoRunSwitch, setAutoRunSwitch] = useState(false);

  return (
    <SettingsContext.Provider
      value={{
        focusDuration,
        breakDuration,
        setFocusDuration,
        setBreakDuration,
        sessionsCount,
        setSessionsCount,
        autoRunSwitch,
        setAutoRunSwitch,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
