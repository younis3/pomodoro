import styled from "styled-components";
import { useContext, useEffect } from "react";
import SoundContext from "../context/SoundContext"; 

//Icons
import CloseIcon from "@mui/icons-material/Close";
import ForestIcon from "@mui/icons-material/Forest";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WaterIcon from "@mui/icons-material/Water";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const SoundsModal = ({setSoundModalToggle}) => {
  const {chosenSound} = useContext(SoundContext);
  const {setChosenSound} = useContext(SoundContext);



  const closeSoundModalHandler = () => {
    setSoundModalToggle(false);
  };

  const clickSoundHandler = (e) => {
    const val = e.target.dataset.id;
    setChosenSound(val);
  };

  const applyHandler = () => {
    closeSoundModalHandler();
  };
  return (
    <div>
      <StyledModal>
        <StyledModalBorder>
          <StyledTitle>Ambient Sound</StyledTitle>
          <StyledCloseBtn onClick={closeSoundModalHandler}>
            <CloseIcon fontSize="inherit" />
          </StyledCloseBtn>
          <StyledIconsContainer>
            <StyledIconContainer
              className={chosenSound === "none" ? "clickedItem" : ""}
              data-id="none"
              onClick={clickSoundHandler}
            >
              <StyledMUIIconWrapper>
                <VolumeOffIcon sx={{ fontSize: 48 }} />
                <StyledLabel>None</StyledLabel>
              </StyledMUIIconWrapper>
            </StyledIconContainer>

            <StyledIconContainer
              className={chosenSound === "forest" ? "clickedItem" : ""}
              data-id="forest"
              onClick={clickSoundHandler}
            >
              <StyledMUIIconWrapper>
                <ForestIcon sx={{ fontSize: 48 }} />
                <StyledLabel>Forest</StyledLabel>
              </StyledMUIIconWrapper>
            </StyledIconContainer>

            <StyledIconContainer
              className={chosenSound === "rain" ? "clickedItem" : ""}
              data-id="rain"
              onClick={clickSoundHandler}
            >
              <StyledMUIIconWrapper>
                <FilterDramaIcon sx={{ fontSize: 48 }} />
                <StyledLabel>Rain</StyledLabel>
              </StyledMUIIconWrapper>
            </StyledIconContainer>

            <StyledIconContainer
              className={chosenSound === "thunder" ? "clickedItem" : ""}
              data-id="thunder"
              onClick={clickSoundHandler}
            >
              <StyledMUIIconWrapper>
                <ThunderstormIcon sx={{ fontSize: 48 }} />
                <StyledLabel>Thunder</StyledLabel>
              </StyledMUIIconWrapper>
            </StyledIconContainer>

            <StyledIconContainer
              className={chosenSound === "ocean" ? "clickedItem" : ""}
              data-id="ocean"
              onClick={clickSoundHandler}
            >
              <StyledMUIIconWrapper>
                <WaterIcon sx={{ fontSize: 48 }} />
                <StyledLabel>Ocean</StyledLabel>
              </StyledMUIIconWrapper>
            </StyledIconContainer>

            <StyledIconContainer
              className={chosenSound === "night" ? "clickedItem" : ""}
              data-id="night"
              onClick={clickSoundHandler}
            >
              <StyledMUIIconWrapper>
                <NightsStayIcon sx={{ fontSize: 48 }} />
                <StyledLabel>Night</StyledLabel>
              </StyledMUIIconWrapper>
            </StyledIconContainer>

            <StyledIconContainer
              className={chosenSound === "fire" ? "clickedItem" : ""}
              data-id="fire"
              onClick={clickSoundHandler}
            >
              <StyledMUIIconWrapper>
                <LocalFireDepartmentIcon sx={{ fontSize: 48 }} />
                <StyledLabel>Fire</StyledLabel>
              </StyledMUIIconWrapper>
            </StyledIconContainer>

            <StyledIconContainer
              className={chosenSound === "relax" ? "clickedItem" : ""}
              data-id="relax"
              onClick={clickSoundHandler}
            >
              <StyledMUIIconWrapper>
                <SelfImprovementIcon sx={{ fontSize: 48 }} />
                <StyledLabel>Relax</StyledLabel>
              </StyledMUIIconWrapper>
            </StyledIconContainer>
          </StyledIconsContainer>

        </StyledModalBorder>
      </StyledModal>
    </div>
  );
};

export default SoundsModal;
//
//
//
//
//
/****************** styles ******************/
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
  height: 60%;
  width: 90%;
  border: solid 2px rgba(104, 104, 104, 0.432);
  background-color: rgba(83, 83, 83, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 5px;
  @media only screen and (max-width: 850px) {
    height: 70%;
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

const StyledTitle = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 17%;
  color: white;
  padding: 10px;
  font-size: 20px;
`;

const StyledIconsContainer = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 6vh;
  padding-right: 10px;
  padding-left: 10px;
  margin-left: 8px;
`;

const StyledIconContainer = styled.li`
  touch-action: none;

  text-align: center;
  color: #fcfcfcd3;
  padding: 8px;
  margin-top: 14px;
  margin-bottom: 14px;
  margin-left: 10px;
  margin-right: 10px;
  &&:hover {
    cursor: pointer;
    background-color: #97969647;
  }
  &.clickedItem {
    background-color: #9796966e;
  }
  @media only screen and (max-width: 850px) {
    margin-top: 14px;
    margin-bottom: 14px;
    margin-left: 4px;
    margin-right: 4px;
  }
`;

const StyledMUIIconWrapper = styled.div`
  pointer-events: none;
  touch-action: none;
`;

const StyledLabel = styled.div`
  color: white;
`;

