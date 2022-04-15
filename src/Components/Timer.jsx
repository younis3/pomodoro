import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from 'styled-components';

function Timer({ key = 1, timer = 20, animate = true, size = 380 }) {
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <TimerContainer>
        <CountdownCircleTimer
          key={key}
          isPlaying={animate}
          duration={timer}
          size={size}
          colors={["#A30000"]}
          strokeLinecap={"square"}
          strokeWidth={25}
          trailColor="#151932"
          onComplete={() => {
            // stopAnimate()
          }}
        >
          {children}
        </CountdownCircleTimer>
      </TimerContainer>
    </div>
  );
}

export default Timer;


//styles
const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  color: red;
`

