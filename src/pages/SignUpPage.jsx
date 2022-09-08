import styled from "styled-components";
import { Link } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
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
          <StyledForm>
            <input
              type={"text"}
              placeholder={"First Name"}
              ref={firstNameRef}
            />
            <input type={"text"} placeholder={"Last Name"} ref={lastNameRef} />
            <input type={"email"} placeholder={"Email"} ref={emailRef} />
            <input
              type={"password"}
              placeholder={"Password"}
              ref={passwordRef}
            />
            <input
              type={"password"}
              placeholder={"Confirm Password"}
              ref={confirmPasswordRef}
            />
            <button onClick={regUserHandler}>Sign Up</button>
            <h4 style={{ marginTop: "3vh" }}>
              Already have an account? <Link to="/login">Sign In</Link>
            </h4>
          </StyledForm>
        </StyledFormContainer>
        <StyledContinue>
          <Link to="/" style={{ textDecoration: "none" }}>
            <ReplyIcon style={{ color: "white", fontSize: "46px" }} />
            <h3>Continue using the app without signing up!</h3>
          </Link>
        </StyledContinue>
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
  margin-top: -3vh;
  width: 600px;
  background-color: #3b393962;
  opacity: 0.9;
  padding: 36px 14px;
  border: 1px solid #ffffff89;
  @media (max-width: 650px) {
    width: 88vw;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    width: 98%;
    padding: 10px;
    margin: 9px;
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
    margin-top: 1vh;
    font-size: smaller;
    color: #f5f5f5c1;
    a {
      color: #ffffff;
    }
  }
`;

const StyledContinue = styled.div`
  margin-top: 7vh;
  opacity: 0.8;
  width: 100%;
  &:hover {
    cursor: pointer;
  }
  h3 {
    color: whitesmoke;
    opacity: 0.7;
    font-size: small;
    &:hover {
      color: #98daee;
    }
  }
`;
