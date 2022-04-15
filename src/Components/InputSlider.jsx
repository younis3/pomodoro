import React from "react";
import styled from "styled-components";
import { Slider } from "@mui/material/";

const InputSlider = ({ defValue = 50, step = 5, min = 10, max = 120 }) => {
  return (
    <div>
      <StyledSliderDiv>
        <StyledSlider
          valueLabelDisplay="auto"
          aria-label="duration"
          defaultValue={defValue}
          step={step}
          min={min}
          max={max}
          track={"normal"}
        />
      </StyledSliderDiv>
    </div>
  );
};

export default InputSlider;
//
//
//
//
//
/****************** styles ******************/
const StyledSliderDiv = styled.div`
  margin: auto;
  padding: auto;
  width: 20%;
`;

const StyledSlider = styled(Slider)({
  color: "#5c5c5c",
  height: 38,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 26,
    width: 26,
    backgroundColor: "#dbdbdb",
    border: "2px solid currentColor",
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
    background: "unset",
    padding: 2,
    width: 46,
    height: 46,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#445569",
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
