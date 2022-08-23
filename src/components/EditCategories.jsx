import styled from "styled-components";
import { ctgStyles as CTG_STYLE } from "../helper_files/categories";
import { categories } from "../helper_files/categories";

//icons
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const EditCategories = () => {
  const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };
  return (
    <div>
      <StyledInputWrapper>
        <StyledInput type={"text"} id="addCtg" placeholder="Add New Category" />
        <StyledInputBtn>
          <AddBoxIcon fontSize="inherit" />
        </StyledInputBtn>
      </StyledInputWrapper>

      <StyledCategoriesWrapper>
        {categories?.map((el) => {
          const ctg = Object.keys(el)[0];
          return (
            <StyledCtgWrapper key={ctg}>
              <StyledCtg>
                <StyledCtgCircle className={ctg} />
                <StyledCtgLabel>{capitalizeFirstLetter(ctg)}</StyledCtgLabel>
              </StyledCtg>
              <StyledCtgBtns>
                <FavoriteBorderIcon fontSize="inherit" />
                <RemoveCircleOutlineIcon fontSize="inherit" />
              </StyledCtgBtns>
            </StyledCtgWrapper>
          );
        })}
      </StyledCategoriesWrapper>
    </div>
  );
};

export default EditCategories;
//
//
//
//
//
/****************** styles ******************/
const StyledInputWrapper = styled.div`
  position: fixed;
  top: 14%;
  text-align: left;
  margin-left: 5vw;
`;

const StyledInput = styled.input`
  color: whitesmoke;
  font-size: 18px;
  padding: 2px;
  padding-left: 4px;
  width: 30vw;
  outline: none;
  border: none;
  border-bottom: 2px solid white;
  background-color: transparent;
  @media only screen and (max-width: 650px) {
    width: 56vw;
  }
`;

const StyledInputBtn = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  padding-top: 1px;
  font-size: 30px;
  margin-left: 2vw;
  cursor: pointer;
  &:hover {
    color: #dcd3d3;
  }
`;

//----------------------------------

const StyledCategoriesWrapper = styled.ul`
  width: 90vw;
  height: 60vh;
  overflow: hidden;
  overflow-y: scroll;
  margin-top: 13vh;
  display: flex;
  flex-direction: column;
  &&.hide {
    display: none;
  }
`;

const StyledCtgWrapper = styled.li`
  margin-bottom: 2.4vh;
  display: flex;
  justify-content: space-between;
  width: 60vw;
  @media only screen and (max-width: 650px) {
    width: 90vw;
  }
`;

const StyledCtg = styled.div`
  display: flex;
  flex-direction: row;
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
  margin-top: 1vh;
  ${CTG_STYLE}
`;

const StyledCtgLabel = styled.h3`
  color: white;
  &:hover {
    color: #fffdfdb5;
  }
`;

const StyledCtgBtns = styled.div`
  color: white;
  cursor: pointer;
  font-size: 25px;
  padding-right: 3px;
  & * {
    //accessing children styles of this parent div
    margin-left: 4vw;
    &:hover {
      color: #dad4d4c7;
    }
  }
`;
