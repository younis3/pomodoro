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

function Pomodoro({ timer, animate, size }) {

  const TIMER = 120;
  const [key, setKey] = useState(0);
  const [animation, setAnimation] = useState(false);
  const [pauseBtn, setPauseBtn] = useState(false);
  const [playBtn, setPlayBtn] = useState(true);
  const [stopBtn, setStopBtn] = useState(false);
  

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
    setAnimation(true);

  }

  const stop = () => {
    setPauseBtn(false);
    setPlayBtn(true);
    setStopBtn(false);
    setKey(prevKey => prevKey + 1); 
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
        key2={key}
        timer = {TIMER}
        animate={animation}
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
  color: #d1d1d1b9;
  h1 {
    padding-top: 5vh;
    color: #f4f4f5db;

  }
  .lstinHeader {
    margin-bottom: 8vh;
  }
`;

const UpperButtonsDiv = styled.div`
  margin-bottom: 5vh;
  display: flex;
  justify-content: center;
  button {
    color:whitesmoke;
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
  margin-top: 3.4vh;
  display: flex;
  justify-content: center;
  button {
    color:whitesmoke;
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
