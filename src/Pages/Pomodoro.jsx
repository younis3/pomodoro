import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function Pomodoro({ key = 1, timer = 20, animate = true, size = 380 }) {
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <h1>hi Pomodoro</h1>
      <div className="timer-wapprer">
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
      </div>
    </div>
  );
}

export default Pomodoro;
