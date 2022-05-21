import React from "react";
import { useState, useEffect } from "react";

import Timer from "../components/Timer";
import styled from "styled-components";
import InputSlider from "../components/InputSlider";

//icons
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import TuneIcon from "@mui/icons-material/Tune";
import PauseIcon from "@mui/icons-material/Pause";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StopCircleIcon from "@mui/icons-material/StopCircle";

function Pomodoro({ key = 1, timer = 20, animate = true, size = 380 }) {

  const TIMER = 60;
  const [animation, setAnimation] = useState(true);
  const [time, setTime] = useState(0);
  const [pauseBtn, setPauseBtn] = useState(true);
  const [playBtn, setPlayBtn] = useState(false);
  const [stopBtn, setStopBtn] = useState(false);

  useEffect(()=> {
    setTime(TIMER);
  }, [stopBtn])
  


  const pause = () => {
    setPauseBtn(false);
    setPlayBtn(true);
    setStopBtn(true);
    setAnimation(false)
  }

  const play = () => {
    setPauseBtn(true);
    setPlayBtn(false);
    setStopBtn(false);
    setAnimation(true)
  }

  const stop = () => {
    setPauseBtn(true);
    setPlayBtn(false);
    setStopBtn(false);
    setTime(TIMER);
  }

 

  return (
    <div>
      <StyledHeader>
        <h1>Pomodoro Plus</h1>
        <h3>Stay Focused. Stay Productive</h3>
        <h4 className="lstinHeader">Developed By Y3.</h4>
      </StyledHeader>

      <UpperButtonsDiv>
        <button>
          <MusicNoteIcon fontSize="inherit" />
        </button>
        <button>
          <TuneIcon fontSize="inherit" />
        </button>
      </UpperButtonsDiv>

      <Timer
        animate={animation}
        timer = {time}
      />

      <InputSlider />

      <DownButtonsDiv>
        {pauseBtn && <button onClick={pause}>
          <PauseIcon fontSize="inherit" />
        </button>}
        {playBtn && <button onClick={play}><PlayCircleOutlineIcon fontSize="inherit" /></button>}
        {stopBtn && <button onClick={stop}><StopCircleIcon fontSize="inherit" /></button>}
      </DownButtonsDiv>
    </div>
  );
}

export default Pomodoro;
//
//
//
//
//
/****************** styles ******************/

const StyledHeader = styled.header`
  color: #373e5fb9;
  h1 {
    padding-top: 6vh;
  }
  h3 {
    color: #000000a9;
  }
  .lstinHeader {
    margin-bottom: 10vh;
  }
`;

const UpperButtonsDiv = styled.div`
  margin-bottom: 6vh;
  display: flex;
  justify-content: center;
  button {
    font-size: 44px;
    border: none;
    padding: 3px;
    margin-left: 40px;
    margin-right: 40px;
    background: none;
    &:hover {
      cursor: pointer;
    }
  }
`;

const DownButtonsDiv = styled.div`
  margin-top: 4vh;
  display: flex;
  justify-content: center;
  button {
    font-size: 80px;
    border: none;
    padding: 3px;
    margin-left: 40px;
    margin-right: 40px;
    background: none;
    &:hover {
      cursor: pointer;
    }
  }
`;
