import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from "styled-components";
import CategoryContext from "../context/CategoryContext";
import { useContext } from "react";
// import {ctgStyles as CTG_STYLE} from '../helper_files/categories';

function Timer({
  key,
  key2,
  timer,
  isRunning,
  animate,
  size = 280,
  setCategoryModalToggle,
}) {
  const { category } = useContext(CategoryContext);

  const categoryHandler = () => {
    setCategoryModalToggle(true);
  };

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <StyledTimerContentWrapper>
        <div className="text">
          {isRunning == "running" ? "Stay focused" : "Start to focus"}
        </div>
        <div className="value">{`${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`}</div>
        <div className="categoryWrapper" onClick={categoryHandler}>
          <StyledCategoryBtn className={category} />
          <div className="category">{category}</div>
        </div>
      </StyledTimerContentWrapper>
    );
  };

  return (
    <div>
      <StyledTimerContainer>
        <CountdownCircleTimer
          key={key2}
          isPlaying={animate}
          duration={timer}
          size={size}
          colors={["#2275a5dc"]}
          strokeLinecap={"square"}
          strokeWidth={8}
          trailColor="#11121d0"
          onComplete={() => {
            return { shouldRepeat: false };
          }}
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
  .text {
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
  border-radius: 50%;
  border: none;
  width: 11px;
  height: 11px;
  margin-right: 10px;
`;
