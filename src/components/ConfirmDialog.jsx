import styled from "styled-components";

const ConfirmDialog = ({
  setConfirmStopToggle,
  setPauseBtn,
  setPlayBtn,
  setStopBtn,
  setKey,
  setIsRunning,
}) => {
  const closeDialogHandler = () => {
    setConfirmStopToggle(false);
  };

  const stopTimerHandler = () => {
    // setPauseBtn(false);
    // setPlayBtn(true);
    // setStopBtn(false);
    setKey((prevKey) => prevKey + 1);
    setIsRunning("stopped");
    setConfirmStopToggle(false);
  };

  return (
    <div>
      <StyledDialog>
        <StyledDialogBorder>
          <StyledTitle>Stop the session!?</StyledTitle>
          <StyledBtnsWrapper>
            <StyledBtn onClick={closeDialogHandler}>Cancel</StyledBtn>
            <StyledBtn onClick={stopTimerHandler}>Stop</StyledBtn>
          </StyledBtnsWrapper>
        </StyledDialogBorder>
      </StyledDialog>
    </div>
  );
};

export default ConfirmDialog;
//
//
//
//
//
/****************** styles ******************/
const StyledDialog = styled.div`
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

const StyledDialogBorder = styled.div`
  height: 30%;
  width: 40%;
  border: solid 2px rgba(104, 104, 104, 0.432);
  background-color: rgba(83, 83, 83, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 5px;
  @media only screen and (max-width: 850px) {
    height: 26%;
    width: 70%;
  }
`;

const StyledTitle = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 24%;
  color: white;
  padding: 10px;
  font-size: 20px;
`;

const StyledBtnsWrapper = styled.div`
  position: absolute;
  display: flex;
  margin-top: 6vh;
  justify-content: space-around;
`;

const StyledBtn = styled.div`
  border: none;
  margin: 12px;
  padding: 4px;
  color: #68b6bf;
  font-weight: 900;
  font-size: 16px;
  &:hover {
    color: #ffffffb5;
    cursor: pointer;
  }
`;
