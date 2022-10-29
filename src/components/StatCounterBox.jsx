import { useEffect } from "react";
import styled from "styled-components";

const StatCounterBox = ({ sessions, minutes }) => {
  useEffect(() => {
    counter("countSessions", 0, sessions, 300);
    counter("countHours", 0, Math.floor(minutes / 60), 300);
    counter("countMinutes", 0, minutes, 700);
  }, [minutes]);

  const counter = (id, start, end, duration) => {
    //counter animation
    const obj = document.getElementById(id);
    let current = start;
    const range = end - start;
    if (range === 0) {
      obj.innerText = 0;
      return;
    }
    let increment;
    if (id === "countMinutes") {
      if (end > 700) {
        //if minutes more than 700 finish animation faster
        increment = end > start ? 5 : -1;
      } else {
        increment = end > start ? 3 : -1;
      }
    } else {
      increment = end > start ? 1 : -1;
    }
    const step = Math.abs(Math.floor(duration / range));
    const timer = setInterval(() => {
      current += increment;
      obj.innerText = current;
      if (current >= end) {
        obj.innerText = end;
        clearInterval(timer);
      }
    }, step);
  };

  return (
    <div>
      <StyledCounterBoxWrapper>
        <StyledCounter>
          <h3>
            Sessions <p id="countSessions">0</p>
          </h3>
        </StyledCounter>

        <StyledCounter>
          <h3>
            Hours <p id="countHours">0</p>
          </h3>
        </StyledCounter>

        <StyledCounter>
          <h3>
            Minutes <p id="countMinutes">0</p>
          </h3>
        </StyledCounter>
      </StyledCounterBoxWrapper>
    </div>
  );
};

export default StatCounterBox;
//
//
//
//
//
/****************** styles ******************/
const StyledCounterBoxWrapper = styled.div`
  /* height: 10vh; */
  width: 50vw;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media only screen and (max-width: 650px) {
    width: 96vw;
  }
`;

const StyledCounter = styled.div`
  margin: 12px;
  padding: 16px;
  display: flex;
  border: 2px solid #52535439;
  opacity: 0.88;
  background-color: #6363633d;
`;
