import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import ListAltIcon from '@mui/icons-material/ListAlt';

const CategoryModal = ({ setCategoryModalToggle }) => {

    const closeCategoryModalHandler = () => {
        setCategoryModalToggle(false);
    };

    const chooseCtgHandler = (ctg) => {
        // console.log(ctg);
        closeCategoryModalHandler();
    };

    return (
        <div>
            <StyledModal>
                <StyledModalBorder>
                    <StyledCloseBtn onClick={closeCategoryModalHandler}>
                        <CloseIcon fontSize="inherit" />
                    </StyledCloseBtn>
                    <StyledEditBtn >
                        <ListAltIcon fontSize="inherit" />
                    </StyledEditBtn>
                    <StyledTitle>
                        Focus Category
                    </StyledTitle>

                    <StyledCtgWrapper>
                        <StyledCtg onClick={()=>chooseCtgHandler("study")}>
                            <StyledCtgCircle className="study"/>
                            <StyledCtgLabel>Study</StyledCtgLabel>
                        </StyledCtg>
                        <StyledCtg onClick={()=>chooseCtgHandler("work")}>
                            <StyledCtgCircle className="work" />
                            <StyledCtgLabel>Work</StyledCtgLabel>
                        </StyledCtg>
                        <StyledCtg onClick={()=>chooseCtgHandler("reading")}>
                            <StyledCtgCircle className="reading"/>
                            <StyledCtgLabel>Reading</StyledCtgLabel>
                        </StyledCtg>
                        <StyledCtg onClick={()=>chooseCtgHandler("writing")}>
                            <StyledCtgCircle className="writing"/>
                            <StyledCtgLabel>Writing</StyledCtgLabel>
                        </StyledCtg>
                        <StyledCtg onClick={()=>chooseCtgHandler("workout")}>
                            <StyledCtgCircle className="workout"/>
                            <StyledCtgLabel>Workout</StyledCtgLabel>
                        </StyledCtg>
                        <StyledCtg onClick={()=>chooseCtgHandler("meditation")}>
                            <StyledCtgCircle className="meditation"/>
                            <StyledCtgLabel>Meditation</StyledCtgLabel>
                        </StyledCtg>
                    </StyledCtgWrapper>

                </StyledModalBorder>
            </StyledModal>
        </div>
    )
}

export default CategoryModal
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
  width: 65%;
  border: solid 2px rgba(104, 104, 104, 0.432);
  background-color: rgb(83, 83, 83,0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 5px;
  @media only screen and (max-width: 850px) {
    height: 70%;
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

const StyledEditBtn = styled.button`
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
  right: 19%;
  &:hover {
    background-color: rgb(86, 116, 161);
  }
`;

const StyledTitle = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: 3.6%;
  left: 6%;
  color: white;
  padding: 10px;
  font-size: 20px;
`;

const StyledCtgWrapper = styled.div`
    margin-top: 13vh;
    display: block;
`;

const StyledCtg = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 3.8vh;
    margin-left: 4vw;
    cursor: pointer;
`;

const StyledCtgCircle = styled.button`
    background-color: white;
    border-radius: 50%;
    border: none;
    width: 11px;
    height: 11px;
    margin-right: 12px;
    margin-top:1vh;
    &.study{
        background-color: #689fcc;
    }
    &.work{
        background-color: #dda675;
    }
    &.reading{
        background-color: #ef745f;
    }
    &.writing{
        background-color: #8ddfb5;
    }
    &.workout{
        background-color: #c8e067;
    }
    &.meditation{
        background-color: #e074d6;
    }
`;

const StyledCtgLabel = styled.h3`
    color: white;
    &:hover {
        color: #fffdfdb5;
    }
`;