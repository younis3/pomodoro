import React from "react";
import Timer from "../Components/Timer";
import styled from "styled-components";

function Pomodoro({ key = 1, timer = 20, animate = true, size = 380 }) {
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <PomodoroContainer>
        <h1>hi Pomodoro</h1>
        <Timer />
      </PomodoroContainer>
    </div>
  );
}

export default Pomodoro;


//styles
const PomodoroContainer = styled.div`
  background-color: #353434;
  height: 100vh;
`;
