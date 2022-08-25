import styled from "styled-components";
import { Slider } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import SettingsContext from "../context/SettingsContext";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const SettingsModal = ({ setSettingsToggle, disableStngs }) => {
  const closeSettingsModalHandler = () => {
    setSettingsToggle(false);
  };
  const { focusDuration } = useContext(SettingsContext);
  const { setFocusDuration } = useContext(SettingsContext);
  const { breakDuration } = useContext(SettingsContext);
  const { setBreakDuration } = useContext(SettingsContext);
  const { sessionsCount } = useContext(SettingsContext);
  const { setSessionsCount } = useContext(SettingsContext);
  const { autoRunSwitch } = useContext(SettingsContext);
  const { setAutoRunSwitch } = useContext(SettingsContext);

  const handleSwitch = () => {
    setAutoRunSwitch(!autoRunSwitch);
  };

  const resetHandler = () => {
    setFocusDuration(50);
    setBreakDuration(10);
    setSessionsCount(4);
  };

  return (
    <div>
      <StyledModal>
        <StyledModalBorder>
          <StyledCloseBtn onClick={closeSettingsModalHandler}>
            <CloseIcon fontSize="inherit" />
          </StyledCloseBtn>

          <StyledFocusTitle>Focus Duration (min)</StyledFocusTitle>
          <StyledFocusDuration>{focusDuration}</StyledFocusDuration>
          <StyledSliderDiv className="focus">
            <StyledSlider
              key={`slider${focusDuration * 2}`}
              valueLabelDisplay="auto"
              aria-label="duration"
              defaultValue={focusDuration}
              step={5}
              min={10}
              max={120}
              track={"normal"}
              onChangeCommitted={(_, newValue) => setFocusDuration(newValue)}
              disabled={disableStngs} //if it's running disable updating the settings
            />
          </StyledSliderDiv>

          <StyledBreakTitle>Break Duration (min)</StyledBreakTitle>
          <StyledBreakDuration>{breakDuration}</StyledBreakDuration>

          <StyledSliderDiv className="break">
            <StyledSlider
              key={`slider${breakDuration * 2}`}
              valueLabelDisplay="auto"
              aria-label="duration"
              defaultValue={breakDuration}
              step={5}
              min={5}
              max={30}
              track={"normal"}
              onChangeCommitted={(_, newValue) => setBreakDuration(newValue)}
              disabled={disableStngs} //if it's running disable updating the settings
            />
          </StyledSliderDiv>

          <StyledSwitchWrapper>
            <FormControlLabel
              control={
                <Switch
                  checked={autoRunSwitch}
                  onChange={handleSwitch}
                  disabled={disableStngs}
                />
              }
              label="Autorun Sessions"
            />
          </StyledSwitchWrapper>

          <StyledSessionsTitle>Sessions</StyledSessionsTitle>
          <StyledSessionsCount>{sessionsCount}</StyledSessionsCount>

          <StyledSliderDiv className="sessions">
            <StyledSlider
              key={`slider${sessionsCount * 2}`}
              valueLabelDisplay="auto"
              aria-label="count"
              defaultValue={sessionsCount}
              step={1}
              min={2}
              max={12}
              track={"normal"}
              onChangeCommitted={(_, newValue) => setSessionsCount(newValue)}
              disabled={disableStngs || !autoRunSwitch} //if it's running disable updating the settings
            />
          </StyledSliderDiv>
          {!disableStngs && (
            <StyledResetBtn onClick={resetHandler}>
              Reset to Default
            </StyledResetBtn>
          )}
          {disableStngs && (
            <StyledErrorP>
              You can't change values while session is running!
            </StyledErrorP>
          )}
        </StyledModalBorder>
      </StyledModal>
    </div>
  );
};

export default SettingsModal;
//
//
//
//
//
/****************** styles ******************/
const StyledSlider = styled(Slider)({
  color: "#5c5c5c",
  height: 38,
  "& .MuiSlider-track": {
    border: "2px solid white",
    backgroundColor: "#dbdbdb",
    color: "#dbdbdb",
  },
  "& .MuiSlider-thumb": {
    height: 18,
    width: 18,
    color: "#dbdbdb",
    backgroundColor: "#dbdbdb",
    border: "12px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 18,
    fontWeight: 600,
    background: "unset",
    padding: 2,
    width: 50,
    height: 50,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#8d8f92",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const StyledModal = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0%;
  top: 0%;
  z-index: 999;
  backdrop-filter: blur(7px);
  filter: drop-shadow(8px 5px 2px #0000001c);
`;

const StyledModalBorder = styled.div`
  /* height: 60%; */
  height: 80%;
  width: 65%;
  border: solid 2px rgba(104, 104, 104, 0.432);
  background-color: rgb(83, 83, 83, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 5px;
  @media only screen and (max-width: 850px) {
    height: 80%;
    width: 90%;
  }
`;

const StyledCloseBtn = styled.button`
  padding: 6px;
  padding-top: 10px;
  padding-left: 11px;
  padding-right: 11px;
  font-size: 26px;
  color: rgb(255, 255, 255);
  background-color: rgb(29, 24, 28);
  border: none;
  border-radius: 2px;
  cursor: pointer;
  opacity: 0.8;
  position: absolute;
  top: 3%;
  right: 3%;
  &:hover {
    background-color: rgb(86, 116, 161);
  }
`;

const StyledSliderDiv = styled.div`
  position: absolute;
  left: 4%;
  width: 92%;
  margin: auto;
  padding: auto;
  &.focus {
    top: 24%;
  }
  &.break {
    top: 46%;
  }
  &.sessions {
    top: 76%;
  }
`;

const StyledFocusTitle = styled.div`
  color: white;
  font-size: 16px;
  position: absolute;
  top: 17%;
  left: 4%;
`;

const StyledFocusDuration = styled.div`
  color: white;
  font-size: 18px;
  position: absolute;
  top: 17%;
  right: 6%;
`;

const StyledBreakTitle = styled.div`
  color: white;
  font-size: 16px;
  position: absolute;
  top: 39%;
  left: 4%;
`;

const StyledBreakDuration = styled.div`
  position: absolute;
  color: white;
  font-size: 18px;
  top: 39%;
  right: 6%;
`;

const StyledSwitchWrapper = styled.div`
  color: whitesmoke;
  opacity: 0.9;
  position: absolute;
  top: 62%;
`;

const StyledSessionsTitle = styled.div`
  color: white;
  font-size: 16px;
  position: absolute;
  top: 69%;
  left: 4%;
`;

const StyledSessionsCount = styled.div`
  position: absolute;
  color: white;
  font-size: 18px;
  top: 69%;
  right: 6%;
`;

const StyledResetBtn = styled.button`
  position: absolute;
  border: none;
  padding: 8px;
  background-color: #ffffffb5;
  color: #303030ac;
  font-weight: 600;
  font-size: 16px;
  top: 88%;
  &:hover {
    background-color: #d6d3d378;
    color: #ffffffb5;
    cursor: pointer;
  }
`;

const StyledErrorP = styled.p`
  position: absolute;
  font-size: 16px;
  color: #ffffffae;
  top: 89%;
  @media (max-width: 850px) {
    font-size: 14px;
  }
`;
