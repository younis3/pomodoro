import styled, { keyframes } from "styled-components";

const StatCounterBox = ({ sessions, minutes }) => {
  return (
    <div>
      <StyledCounterBoxWrapper>
        <StyledCounter>
          <h3>
            Sessions <p>{sessions}</p>
          </h3>
        </StyledCounter>

        <StyledCounter>
          <h3>
            Hours <p>{(minutes / 60).toFixed()}</p>
          </h3>
        </StyledCounter>

        <StyledCounter>
          <h3>
            Minutes <p>{minutes}</p>
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
  margin: 10px;
  padding: 16px;
  display: flex;
  border: 2px solid #5452523a;

  background-color: #6760603b;
`;
