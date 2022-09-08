import styled, { keyframes } from "styled-components";
import { useState } from "react";
import EditCategories from "./EditCategories";

//icons
import CloseIcon from "@mui/icons-material/Close";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ReplyIcon from "@mui/icons-material/Reply";

import { useContext, useRef } from "react";
import CategoryContext from "../context/CategoryContext";
import { capitalizeFirstLetter } from "../helper_functions";

const CategoryModal = ({ setCategoryModalToggle, breakStatus }) => {
  const [editCtgToggle, setEditCtgToggle] = useState(false);
  const { setCategory } = useContext(CategoryContext);
  const { categories } = useContext(CategoryContext);

  const modalBorderRef = useRef();
  const closeBtnRef = useRef();
  const editBtnRef = useRef();
  const backBtnRef = useRef();
  const categoriesRef = useRef();

  const closeCategoryModalHandler = () => {
    setCategoryModalToggle(false);
  };

  const editCategoryModalHandler = () => {
    modalBorderRef.current.classList.remove("back");
    modalBorderRef.current.classList.add("editModal");
    closeBtnRef.current.classList.add("hide");
    editBtnRef.current.classList.add("hide");
    categoriesRef.current.classList.add("hide");
    backBtnRef.current.classList.remove("hide");
    setEditCtgToggle(true);
  };

  const backBtnHandler = () => {
    modalBorderRef.current.classList.remove("editModal");
    modalBorderRef.current.classList.add("back");
    closeBtnRef.current.classList.remove("hide");
    editBtnRef.current.classList.remove("hide");
    categoriesRef.current.classList.remove("hide");
    backBtnRef.current.classList.add("hide");
    setEditCtgToggle(false);
  };

  const chooseCtgHandler = (selectedCtg) => {
    if (breakStatus) {
      alert("Woops! You can't change the category in break time!");
      return;
    }
    const objToSet = categories.find((obj) => obj.ctg === selectedCtg);
    setCategory(objToSet);
    closeCategoryModalHandler();
  };

  return (
    <div>
      <StyledModal>
        <StyledModalBorder ref={modalBorderRef}>
          <StyledCloseBtn ref={closeBtnRef} onClick={closeCategoryModalHandler}>
            <CloseIcon fontSize="inherit" />
          </StyledCloseBtn>
          <StyledEditBtn ref={editBtnRef} onClick={editCategoryModalHandler}>
            <ListAltIcon fontSize="inherit" />
          </StyledEditBtn>
          <StyledBackBtn
            ref={backBtnRef}
            className="hide"
            onClick={backBtnHandler}
          >
            <ReplyIcon fontSize="inherit" />
          </StyledBackBtn>
          <StyledTitle>Focus Categories</StyledTitle>

          <StyledCtgWrapper ref={categoriesRef}>
            {categories
              ?.filter((el) => el.fav == true)
              ?.map((el) => {
                //view only the five favorite categories
                const ctg = el.ctg;
                const colorValue = el.color;
                return (
                  <StyledCtg key={ctg} onClick={() => chooseCtgHandler(ctg)}>
                    <StyledCtgCircle color={colorValue} />
                    <StyledCtgLabel>
                      {capitalizeFirstLetter(ctg)}
                    </StyledCtgLabel>
                  </StyledCtg>
                );
              })}
          </StyledCtgWrapper>

          {editCtgToggle && <EditCategories />}
        </StyledModalBorder>
      </StyledModal>
    </div>
  );
};

export default CategoryModal;
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

const enlargeModalSizeAnimation = keyframes`
 0% { height: 65%; width: 85%; }
 100% { height: 100%; width: 100%; }
`;

const reduceModalSizeAnimation = keyframes`
 0% { height: 100%; width: 100%; }
 100% { height: 65%; width: 85%; }
`;

const StyledModalBorder = styled.div`
  height: 65%;
  width: 85%;
  border: solid 2px rgba(104, 104, 104, 0.432);
  background-color: rgb(83, 83, 83, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 5px;
  @media only screen and (max-width: 650px) {
    padding-right: 5vw;
  }
  &&.editModal {
    animation-name: ${enlargeModalSizeAnimation};
    animation-duration: 0.3s;
    -webkit-animation-fill-mode: forwards; /* Chrome 16+, Safari 4+ */
    -moz-animation-fill-mode: forwards; /* FF 5+ */
    -o-animation-fill-mode: forwards; /* Not implemented yet */
    -ms-animation-fill-mode: forwards; /* IE 10+ */
    animation-fill-mode: forwards;
  }
  &&.back {
    animation-name: ${reduceModalSizeAnimation};
    animation-duration: 0.2s;
    -webkit-animation-fill-mode: forwards; /* Chrome 16+, Safari 4+ */
    -moz-animation-fill-mode: forwards; /* FF 5+ */
    -o-animation-fill-mode: forwards; /* Not implemented yet */
    -ms-animation-fill-mode: forwards; /* IE 10+ */
    animation-fill-mode: forwards;
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
  &&.hide {
    display: none;
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
  right: 3%;
  margin-right: 58px;
  &:hover {
    background-color: rgb(86, 116, 161);
  }
  &&.hide {
    display: none;
  }
`;

const StyledBackBtn = styled.button`
  position: absolute;
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
  top: 3%;
  right: 8%;
  &:hover {
    background-color: rgb(86, 116, 161);
  }
  &&.hide {
    display: none;
  }
  @media only screen and (max-width: 650px) {
    right: 8%;
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
  &&.hide {
    display: none;
  }
`;

const StyledCtg = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 3.8vh;
  margin-left: 4vw;
  cursor: pointer;
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
  &:hover {
    color: #fffdfdb5;
  }
`;
