import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from "styled-components";
import CategoryContext from "../context/CategoryContext";
import SettingsContext from "../context/SettingsContext";
import { useContext, useState, useEffect } from "react";
import { capitalizeFirstLetter, getTodayDateWithHour } from "../helper_functions";
import SoundContext from "../context/SoundContext";
import alertAudio from "../assets/audios/cell-phone-dbl-beep-notification-83306.mp3";
import { useUpdateEffect } from "react-use";
import AppStateContext from "../context/AppStateContext";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";

function Timer({
  timerKey,
  setKey,
  timer,
  isRunning,
  setIsRunning,
  animate,
  size = 290,
  setCategoryModalToggle,
  breakStatus,
  setBreakStatus,
}) {
  const { category } = useContext(CategoryContext);
  const { autoRunSwitch } = useContext(SettingsContext);
  const { sessionsCount } = useContext(SettingsContext);
  const [sessionCounter, setSessionCounter] = useState(1);
  const [text, setText] = useState("Start to focus");
  const { sound } = useContext(SoundContext);
  const { chosenSound } = useContext(SoundContext);
  const [playAlert, setPlayAlert] = useState(false);

  const alertSound = new Audio(alertAudio);
  const { SetTimerState } = useContext(AppStateContext);

  useEffect(() => {
    SetTimerState(animate);
  }, [animate]);

  useEffect(() => {
    if (isRunning === "stopped") {
      setText("Start to focus");
    } else {
      if (breakStatus) {
        setText("Take a break");
      } else {
        setText("Stay focused");
      }
    }
  }, [isRunning, breakStatus]);

  const categoryHandler = () => {
    setCategoryModalToggle(true);
  };

  useUpdateEffect(() => {
    //same as useEffect but skips first run (react-use library)
    if (isRunning === "running") {
      if (chosenSound !== "none") {
        sound.pause();
      }
      alertSound.play();
      setTimeout(() => {
        if (chosenSound !== "none") {
          sound.play();
        }
      }, 8000);
    } else if (isRunning === "stopped") {
      sound.pause();
      alertSound.play();
    }
  }, [playAlert]);

  const timerCompletedHandler = () => {
    if (!breakStatus) {
      // if it was focus time
      const auth = getAuth();
      if (auth) {
        if (auth.currentUser) {
          // add session to db if user signed in
          console.log(auth.currentUser.displayName);
          addSessionToDatabase(auth.currentUser);
        }
      }
    }
    setPlayAlert(!playAlert);
    if (autoRunSwitch) {
      if (!breakStatus) {
        //if it was focus time (not break)
        //count the session to the context (for stats)
      } else {
        if (sessionCounter < sessionsCount) {
          setSessionCounter(sessionCounter + 1);
        } else if (sessionCounter == sessionsCount) {
          //if user finished all sessions
          setSessionCounter(1);
          setIsRunning("stopped");
          setBreakStatus(false);
          setKey((prevKey) => prevKey + 1);
          return { shouldRepeat: false };
        }
      }
      setBreakStatus(!breakStatus);
      return { shouldRepeat: true };
    } else {
      //if autoRun Switch is turned off
      setBreakStatus(!breakStatus);
      if (breakStatus) {
        setIsRunning("stopped");
        setKey((prevKey) => prevKey + 1);
        return { shouldRepeat: false };
      } else {
        //count the session to the context (for stats)
        return { shouldRepeat: true };
      }
    }
  };

  const addSessionToDatabase = async (user) => {
    const userDocReference = doc(db, "users", user.uid);
    try {
      await updateDoc(userDocReference, {
        sessionsCount: increment(1), //firestore method to increment numeric values
        sessions: arrayUnion({
          sessionCtg: category.ctg,
          sessionDate: getTodayDateWithHour(),
          sessionDuration: timer,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <StyledTimerContentWrapper>
        <div className="textWrapper">
          {autoRunSwitch && (
            <div className="sessions">{`${sessionCounter}/${sessionsCount} - `}</div>
          )}
          <div className="text">{text}</div>
        </div>

        <div className="value">{`${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`}</div>
        <div className="categoryWrapper" onClick={categoryHandler} disabled={breakStatus}>
          <StyledCategoryBtn color={category.color} />
          <div className="category">{capitalizeFirstLetter(category.ctg)}</div>
        </div>
      </StyledTimerContentWrapper>
    );
  };

  return (
    <div>
      <StyledTimerContainer>
        <CountdownCircleTimer
          key={timerKey}
          isPlaying={animate}
          // duration={timer * 60}
          duration={timer}
          size={size}
          colors={["#58a5d2dd"]}
          strokeLinecap={"square"}
          strokeWidth={7}
          trailColor="#11121d0"
          onComplete={timerCompletedHandler}
        >
          {children}
        </CountdownCircleTimer>
      </StyledTimerContainer>
    </div>
  );
}

export default Timer;
//
//
//
//
//
/****************** styles ******************/
const StyledTimerContainer = styled.div`
  display: flex;
  justify-content: center;
  color: #2b2b2ce4;
  margin-bottom: 3vh;
`;

const StyledTimerContentWrapper = styled.div`
  .textWrapper {
    display: flex;
    justify-content: center;
  }
  .sessions {
    color: whitesmoke;
    font-size: 18px;
  }
  .text {
    margin-left: 2vw;
    color: whitesmoke;
    font-size: 18px;
  }
  .value {
    color: whitesmoke;
    padding: 12px;
    font-size: 70px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    &:hover {
      cursor: pointer;
    }
  }
  .categoryWrapper {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
  }
  .categoryWrapper[disabled] {
    pointer-events: none;
    opacity: 0.4;
  }

  .category {
    color: whitesmoke;
    font-size: 22px;
  }
`;

const StyledCategoryBtn = styled.button`
  background-color: ${(props) => props.color || "#d5c8c8"};
  border-radius: 50%;
  border: none;
  width: 11px;
  height: 11px;
  margin-right: 10px;
`;
