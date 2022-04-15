import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from "styled-components";

function Timer({
  key = 1,
  timer = 240,
  animate = true,
  size = 380,
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
          key={key}
          isPlaying={animate}
          duration={timer}
          size={size}
          colors={["#9c2929"]}
          strokeLinecap={"square"}
          strokeWidth={25}
          trailColor="#11121d29"
          onComplete={() => {
            // stopAnimate()
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
`;

const StyledTimerContentWrapper = styled.div`
  .text {
    font-size: 28px;
  }
  .value {
    padding: 10px;
    font-size: 98px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    &:hover{
      cursor: pointer;
    }
  }
  .categoryWrapper {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    &:hover{
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
    font-size: 26px;
  }
`;
