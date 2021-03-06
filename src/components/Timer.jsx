import React from "react";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from "styled-components";

function Timer({
  key,
  key2,
  timer,
  animate,
  size = 280,
  category = "study",
}) {

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <StyledTimerContentWrapper>
        <div className="text">Remaining</div>
        <div className="value">{`${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`}</div>
        <div className="categoryWrapper">
          <button className="categoryBtn"></button>
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
            return { shouldRepeat: false}
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
    color:whitesmoke;
    font-size: 26px;
  }
  .value {
    color:whitesmoke;
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
  .categoryBtn {
    background-color: #689fcc;
    border-radius: 50%;
    border: none;
    width: 11px;
    height: 11px;
    margin-right: 10px;
  }
  .category {
    color:whitesmoke;
    font-size: 22px;
  }
`;
