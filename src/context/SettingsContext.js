import {createContext, useState} from "react";

const SettingsContext = createContext();

export const SettingsContextProvider = ({children}) => {

    const [pomodoro, setPomodoro] = useState(0);
    const [focusDuration, setFocusDuration] = useState(50);
    const [breakDuration, setBreakDuration] = useState(10);
    const [animate, setAnimate] = useState(false);

    const startTimer = () => {
        setAnimate(true);
    }

    const pauseTimer = () => {
        setAnimate(false);
    }

    const stopTimer = () => {
        setAnimate(false);
    }


    return (
        <SettingsContext.Provider value={{stopTimer, focusDuration, breakDuration, setFocusDuration, setBreakDuration}}>
            {children}
        </SettingsContext.Provider>
    )
};

export default SettingsContext;