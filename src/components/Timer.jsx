import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from "styled-components";
import CategoryContext from "../context/CategoryContext";
import SettingsContext from "../context/SettingsContext";
import { useContext, useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../helper_functions";

function Timer({
  // key,
  key2,
  timer,
  isRunning,
  setIsRunning,
  animate,
  size = 280,
  setCategoryModalToggle,
}) {
  const [key, setKey] = useState(key2);
  const { category } = useContext(CategoryContext);
  const { autoRunSwitch } = useContext(SettingsContext);
  const { sessionsCount } = useContext(SettingsContext);
  const [sessionCounter, setSessionCounter] = useState(1);
  const [breakStatus, setBreakStatus] = useState(false);
  const [text, setText] = useState("Start to focus");
  const [duration, setDuration] = useState(timer);

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

  const timerCompletedHandler = () => {
    if (autoRunSwitch) {
      if (!breakStatus) {  //if it was focus time (not break)
        //count the session to the context (for stats)
      } else {
        if (sessionCounter < sessionsCount) {
          setSessionCounter(sessionCounter + 1);
        }
        else if (sessionCounter == sessionsCount) {
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
        return { shouldRepeat: true };
      }
    }
  };

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <StyledTimerContentWrapper>
        <div className="textWrapper">
          {autoRunSwitch && (
            <div className="sessions">
              {`${sessionCounter}/${sessionsCount} - `}
            </div>
          )}
          <div className="text">{text}</div>
        </div>

        <div className="value">{`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds
          }`}</div>
        <div className="categoryWrapper" onClick={categoryHandler}>
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
          key={key}
          isPlaying={animate}
          duration={duration}
          size={size}
          colors={["#2275a5dc"]}
          strokeLinecap={"square"}
          strokeWidth={8}
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
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
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
