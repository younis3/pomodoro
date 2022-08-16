import {createContext, useState} from "react";

const SettingsContext = createContext();

export const SettingsContextProvider = ({children}) => {

    const [focusDuration, setFocusDuration] = useState(50);
    const [breakDuration, setBreakDuration] = useState(10);

    return (
        <SettingsContext.Provider value={{focusDuration, breakDuration, setFocusDuration, setBreakDuration}}>
            {children}
        </SettingsContext.Provider>
    )
};

export default SettingsContext;