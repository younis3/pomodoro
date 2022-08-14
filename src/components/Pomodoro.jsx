import { useState, useEffect } from "react";

import Timer from "./Timer";
import styled from "styled-components";

import { useContext } from "react";
import SettingsContext from "../context/SettingsContext";
//icons
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import TuneIcon from "@mui/icons-material/Tune";
import PauseIcon from "@mui/icons-material/Pause";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import SettingsModal from "./SettingsModal";
import SoundsModal from "./SoundsModal";

function Pomodoro({ timer, animate, size }) {
  const [key, setKey] = useState(0);
  const [animation, setAnimation] = useState(false);
  const [pauseBtn, setPauseBtn] = useState(false);
  const [playBtn, setPlayBtn] = useState(true);
  const [stopBtn, setStopBtn] = useState(false);
  const [disableSettings, setDisableSettings] = useState(false);

  const { focusDuration } = useContext(SettingsContext);
  const TIMER = focusDuration * 60;

  const [settingsToggle, setSettingsToggle] = useState(false);
  const [soundModalToggle, setSoundModalToggle] = useState(false);

  const pause = () => {
    setPauseBtn(false);
    setPlayBtn(true);
    setStopBtn(true);
    setAnimation(false);
  };

  const play = () => {
    setPauseBtn(true);
    setPlayBtn(false);
    setStopBtn(false);
    setAnimation(true);
  };

  const stop = () => {
    setPauseBtn(false);
    setPlayBtn(true);
    setStopBtn(false);
    setKey((prevKey) => prevKey + 1);
  };

  const disableSettingsHandler = () => {
    if (playBtn && !stopBtn) {
      setDisableSettings(false);
    } else {
      setDisableSettings(true);
    }
  };

  const settingsHandler = () => {
    setSettingsToggle(true);
    disableSettingsHandler();
  };

  const soundsBtnHandler = () => {
    setSoundModalToggle(true);
    disableSettingsHandler();
  };

  return (
    <div>
      <StyledHeader>
        <h1>Pomodoro Plus</h1>
        <h3>Stay Focused. Stay Productive</h3>
        <h4 className="lstinHeader">Developed By Y3.</h4>
      </StyledHeader>

      <UpperButtonsDiv>
        <button onClick={soundsBtnHandler}>
          <MusicNoteIcon fontSize="inherit" />
        </button>
        <button onClick={settingsHandler}>
          <TuneIcon fontSize="inherit" />
        </button>
      </UpperButtonsDiv>

      <Timer key2={key} timer={TIMER} animate={animation} />

      <DownButtonsDiv>
        {pauseBtn && (
          <button onClick={pause}>
            <PauseIcon fontSize="inherit" />
          </button>
        )}
        {playBtn && (
          <button onClick={play}>
            <PlayCircleOutlineIcon fontSize="inherit" />
          </button>
        )}
        {stopBtn && (
          <button onClick={stop}>
            <StopCircleIcon fontSize="inherit" />
          </button>
        )}
      </DownButtonsDiv>

      {settingsToggle && (
        <SettingsModal
          setSettingsToggle={setSettingsToggle}
          disableStngs={disableSettings}
        />
      )}
      {soundModalToggle && (
        <SoundsModal
          setSoundModalToggle={setSoundModalToggle}
          disableStngs={disableSettings}
        />
      )}
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
    color: whitesmoke;
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
    color: whitesmoke;
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
