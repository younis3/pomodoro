import { createContext, useState, useEffect } from "react";

const SettingsContext = createContext();

//get settings values from local storage
const getFocusDuration = () => {
  if (localStorage.getItem(`focusDuration`) === null) {
    const focusD = 20;
    localStorage.setItem(`focusDuration`, JSON.stringify(focusD));
    return focusD;
  } else {
    return JSON.parse(localStorage.getItem("focusDuration"));
  }
};

const getBreakDuration = () => {
  if (localStorage.getItem(`breakDuration`) === null) {
    const breakD = 12;
    localStorage.setItem(`breakDuration`, JSON.stringify(breakD));
    return breakD;
  } else {
    return JSON.parse(localStorage.getItem("breakDuration"));
  }
};

const getSessionsCount = () => {
  if (localStorage.getItem(`sessionsNum`) === null) {
    const sessionNum = 4;
    localStorage.setItem(`sessionsNum`, JSON.stringify(sessionNum));
    return sessionNum;
  } else {
    return JSON.parse(localStorage.getItem("sessionsNum"));
  }
};

const getSwitchValue = () => {
  if (localStorage.getItem(`switchValue`) === null) {
    const switchVal = false;
    localStorage.setItem(`switchValue`, JSON.stringify(switchVal));
    return switchVal;
  } else {
    return JSON.parse(localStorage.getItem("switchValue"));
  }
};

export const SettingsContextProvider = ({ children }) => {
  const [focusDuration, setFocusDuration] = useState(getFocusDuration);
  const [breakDuration, setBreakDuration] = useState(getBreakDuration);
  const [sessionsCount, setSessionsCount] = useState(getSessionsCount);
  const [autoRunSwitch, setAutoRunSwitch] = useState(getSwitchValue);

  useEffect(() => {
    localStorage.setItem("focusDuration", JSON.stringify(focusDuration));
  }, [focusDuration]);

  useEffect(() => {
    localStorage.setItem("breakDuration", JSON.stringify(breakDuration));
  }, [breakDuration]);

  useEffect(() => {
    localStorage.setItem("sessionsNum", JSON.stringify(sessionsCount));
  }, [sessionsCount]);

  useEffect(() => {
    localStorage.setItem("switchValue", JSON.stringify(autoRunSwitch));
  }, [autoRunSwitch]);

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
