import React, {createContext, useState} from "react";

export const SettingsContext = createContext();

export const SettingsContextProvider = (props) => {

    const [pomodoro, setPomodoro] = useState(0);
    const [duration, setDuration] = useState({});
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

    const updateDuration = (updateSettings) => {
        setDuration(updateSettings);
    }

    return (
        <SettingsContext.Provider value={{stopTimer, updateDuration}}>
            {props.children}
        </SettingsContext.Provider>
    )
}