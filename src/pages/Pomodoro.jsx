import React from "react";
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

      <Timer />

      <InputSlider />

      <DownButtonsDiv>
        <button>
          <PauseIcon fontSize="inherit" />
        </button>
        {/* <button><PlayCircleOutlineIcon fontSize="inherit"/></button> */}
        {/* <button><StopCircleIcon fontSize="inherit"/></button> */}
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
  color: #464d72ba;
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
