import styled from "styled-components";

//icons
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { useContext } from "react";
import CategoryContext from "../context/CategoryContext";
import { capitalizeFirstLetter } from "../helper_functions";

const EditCategories = () => {
  const { categories } = useContext(CategoryContext);
  const { addCtg } = useContext(CategoryContext);
  const { removeCtg } = useContext(CategoryContext);

  const addCategoryHandler = (e) => {
    e.preventDefault();
    let input = e.target.querySelector("input").value;
    if (input.trim() === "") {
      //in case user types empty spaces
      e.target.querySelector("input").focus();
      return;
    }
    addCtg(input.toLowerCase());
    e.target.querySelector("input").value = ""; //empty input field after adding new category
  };

  const removeCtgHandler = (ctg) => {
    if (window.confirm(`Delete ${ctg}!?`)) {
      removeCtg(ctg);
    }
  };

  return (
    <div>
      <StyledInputWrapper>
        <form id="input" onSubmit={(e) => addCategoryHandler(e)}>
          <StyledInput
            type={"text"}
            id="addCtg"
            maxLength={15}
            placeholder="Add New Category"
          />
          <StyledInputBtn>
            <AddBoxIcon fontSize="inherit" />
          </StyledInputBtn>
        </form>
      </StyledInputWrapper>

      <StyledCategoriesWrapper>
        {categories?.map((el) => {
          const ctg = el.ctg;
          const colorValue = el.color;

          return (
            <StyledCtgWrapper key={ctg}>
              <StyledCtg>
                <StyledCtgCircle color={colorValue} />
                <StyledCtgLabel>{capitalizeFirstLetter(ctg)}</StyledCtgLabel>
              </StyledCtg>
              <StyledCtgBtns>
                <FavoriteBorderIcon fontSize="inherit" />
                <RemoveCircleOutlineIcon
                  onClick={() => removeCtgHandler(ctg)}
                  fontSize="inherit"
                />
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
`;

const StyledCtgBtns = styled.div`
  color: white;
  cursor: pointer;
  font-size: 25px;
  padding-right: 3px;
  & * {
    //accessing children styles of this parent div
    &:hover {
      color: #dad4d4c7;
    }
    margin-left: 2vw;
    @media only screen and (max-width: 650px) {
      margin-left: 4vw;
    }
  }
`;

const StyledCtgCircle = styled.button`
  background-color: ${(props) => props.color || "#d5c8c8"};
  border-radius: 50%;
  border: none;
  width: 11px;
  height: 11px;
  margin-right: 12px;
  margin-top: 1vh;
`;

const StyledCtgLabel = styled.h3`
  color: white;
`;
