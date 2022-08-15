import { createContext, useState, useEffect } from "react";

//Sounds
import forestSound from "../assets/audios/forest-sounds-free.mp3";
import rainSound from "../assets/audios/rainfall-sound-effect-free.mp3";
import thunderSound from "../assets/audios/thunder-rain-sound.mp3";
import oceanSound from "../assets/audios/ocean-waves-crashing-sound-effect.mp3";
import nightSound from "../assets/audios/night-sounds-loop.mp3";
import fireSound from "../assets/audios/Fire-flame-sound-effect.mp3";
import relaxSound from "../assets/audios/relaxing-tone.mp3";


const SoundContext = createContext();

export const SoundContextProvider = ({ children }) => {

    const [chosenSound, setChosenSound] = useState("none");

    const sounds = {
        "none": null,
        "forest": forestSound,
        "rain": rainSound,
        "thunder": thunderSound,
        "ocean": oceanSound,
        "night": nightSound,
        "fire": fireSound,
        "relax": relaxSound
    };
    const [sound, setSound] = useState(new Audio(sounds[chosenSound]));

    useEffect(() => {
        sound.pause();
        setSound(new Audio(sounds[chosenSound]));
        sound.loop = true;
    }, [chosenSound])

    return (
        <SoundContext.Provider value={{ chosenSound, setChosenSound, sound}}>
            {children}
        </SoundContext.Provider>
    )
};


export default SoundContext;
