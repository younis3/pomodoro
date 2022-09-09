import styled from "styled-components";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useRef } from "react";
import AuthContext from "../context/AuthContext";
import { auth } from "../firebase";

const SignUpPage = () => {
  const { emailPasswordSignUp } = useContext(AuthContext);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const regUserHandler = (e) => {
    e.preventDefault();
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    emailPasswordSignUp(auth, firstName, lastName, email, password);
  };
  return (
    <div>
      <StyledOuter>
        <StyledFormContainer>
          <StyledBackBtnWrapper>
            <Link to="/" style={{ textDecoration: "none" }}>
              <StyledCloseBtn>
                <CloseIcon style={{ color: "white", fontSize: "inherit" }} />
              </StyledCloseBtn>
            </Link>
          </StyledBackBtnWrapper>
          <StyledForm>
            <input type={"text"} placeholder={"First Name"} ref={firstNameRef} />
            <input type={"text"} placeholder={"Last Name"} ref={lastNameRef} />
            <input type={"email"} placeholder={"Email"} ref={emailRef} />
            <input type={"password"} placeholder={"Password"} ref={passwordRef} />
            <input type={"password"} placeholder={"Confirm Password"} ref={confirmPasswordRef} />
            <button onClick={regUserHandler}>Sign Up</button>
            <h4 style={{ marginTop: "2vh" }}>
              Already have an account? <Link to="/login">Sign In</Link>
            </h4>
          </StyledForm>
        </StyledFormContainer>
      </StyledOuter>
    </div>
  );
};

export default SignUpPage;
//
//
//
//
//
/****************** styles ******************/
const StyledOuter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 100vh;
`;

const StyledFormContainer = styled.div`
  position: relative;
  margin-top: -1vh;
  width: 600px;
  background-color: #3b393962;
  opacity: 0.9;
  padding: 36px 14px;
  border: 1px solid #ffffff89;
  @media (max-width: 650px) {
    width: 88vw;
    margin-top: -3vh;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6vh;

  input {
    width: 98%;
    padding: 9px;
    margin: 8px;
    background-color: #ffffff11;
    border: 1px solid #dedede7d;
    color: #ffffff;
    font-size: 16px;
    &:focus {
      outline: none !important;
      border: 1px solid #63e7de7a;
      box-shadow: 0 0 5px #719ece;
    }
  }

  button {
    padding: 4px 12px;
    margin-top: 2vh;
    margin-bottom: 2vh;
    font-size: 20px;
    color: rgb(255, 255, 255);
    background-color: rgb(29, 24, 28);
    border: none;
    border-radius: 2px;
    cursor: pointer;
    opacity: 0.8;
    &:hover {
      background-color: rgb(86, 116, 161);
    }
  }
  h4 {
    font-size: smaller;
    color: #f5f5f5c1;
    a {
      color: #ffffff;
    }
  }
`;

const StyledBackBtnWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
  position: absolute;
  right: 4.8%;
  top: 3%;
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
