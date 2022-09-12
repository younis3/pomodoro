import styled from "styled-components";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { auth } from "../firebase";
import { hasNumber } from "../helper_functions";

const SignUpPage = (e) => {
  const { emailPasswordSignUp } = useContext(AuthContext);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [errorMsg, setErrorMsg] = useState("");
  const errorRef = useRef();

  const [firstNameState, setFirstNameState] = useState("");
  const [lastNameState, setLastNameState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  //handle real time validations (onChange events)
  const firstNameHandler = (e) => {
    const firstName = firstNameRef.current.value;
    if (firstName === "") {
      setErrorMsg("First name can't be empty");
      firstNameRef.current.classList.add("notValid");
      return firstNameRef.current.focus();
    } else if (firstName.length > 15) {
      setErrorMsg("First name too long");
      firstNameRef.current.classList.add("notValid");
      return firstNameRef.current.focus();
    } else if (hasNumber(firstName)) {
      setErrorMsg("First name can't contain any numbers");
      firstNameRef.current.classList.add("notValid");
      return firstNameRef.current.focus();
    }
    setErrorMsg("");
    firstNameRef.current.classList.remove("notValid");
    setFirstNameState(firstName);
  };

  const lasttNameHandler = (e) => {
    const lastName = lastNameRef.current.value;
    if (lastName === "") {
      setErrorMsg("Last name can't be empty");
      lastNameRef.current.classList.add("notValid");
      return lastNameRef.current.focus();
    } else if (lastName.length > 15) {
      setErrorMsg("Last name too long");
      lastNameRef.current.classList.add("notValid");
      return lastNameRef.current.focus();
    } else if (hasNumber(lastName)) {
      setErrorMsg("Last name can't contain any numbers");
      lastNameRef.current.classList.add("notValid");
      return lastNameRef.current.focus();
    }
    setErrorMsg("");
    lastNameRef.current.classList.remove("notValid");
    setLastNameState(lastName);
  };

  const emailHandler = (e) => {
    const email = emailRef.current.value;
    if (email === "") {
      setErrorMsg("Email is required!");
      emailRef.current.classList.add("notValid");
      return emailRef.current.focus();
    }
    setErrorMsg("");
    emailRef.current.classList.remove("notValid");
    setEmailState(email);
  };

  const passwordHandler = (e) => {
    const password = passwordRef.current.value;
    if (password === "") {
      setErrorMsg("Password is required!");
      passwordRef.current.classList.add("notValid");
      return passwordRef.current.focus();
    } else if (password.length < 6 || password.length > 20) {
      setErrorMsg("Password must be between 6 and 20 characters long!");
      passwordRef.current.classList.add("notValid");
      return passwordRef.current.focus();
    } else if (!hasNumber(password)) {
      setErrorMsg("Password must contain at least one number!");
      passwordRef.current.classList.add("notValid");
      return passwordRef.current.focus();
    }
    setErrorMsg("");
    passwordRef.current.classList.remove("notValid");
    setPasswordState(password);
  };

  const confirmPasswordHandler = (e) => {
    if (confirmPasswordRef.current.value === passwordState) {
      errorRef.current.innerHTML = "";
      confirmPasswordRef.current.classList.remove("notValid");
    }
  };

  const regUserHandler = (e) => {
    e.preventDefault();
    if (
      firstNameState !== "" &&
      lastNameState !== "" &&
      emailState !== "" &&
      passwordState !== ""
    ) {
      if (errorMsg === "") {
        const confirmPassword = confirmPasswordRef.current.value;
        if (confirmPassword !== passwordState) {
          errorRef.current.innerHTML = "Error: Passwords do not match!";
          confirmPasswordRef.current.classList.add("notValid");
          return confirmPasswordRef.current.focus();
        } else {
          //all validations passed and passwords match
          emailPasswordSignUp(auth, firstNameState, lastNameState, emailState, passwordState);
        }
      }
    } else {
      setErrorMsg("All fields are required!");
    }
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
          <StyledForm onSubmit={regUserHandler}>
            <input
              type={"text"}
              placeholder={"First Name"}
              ref={firstNameRef}
              onChange={firstNameHandler}
              maxLength={15}
              required
            />
            <input
              type={"text"}
              placeholder={"Last Name"}
              ref={lastNameRef}
              onChange={lasttNameHandler}
              maxLength={15}
              required
            />
            <input type={"email"} placeholder={"Email"} ref={emailRef} onChange={emailHandler} />
            <input
              type={"password"}
              placeholder={"Password"}
              ref={passwordRef}
              onChange={passwordHandler}
              minLength={6}
              maxLength={20}
              required
            />
            <input
              type={"password"}
              placeholder={"Confirm Password"}
              ref={confirmPasswordRef}
              onChange={confirmPasswordHandler}
              minLength={6}
              maxLength={20}
              required
            />
            <input type="submit" value={"Sign Up"} />
            <p className="error" ref={errorRef}>
              {errorMsg !== "" ? `Error: ${errorMsg}` : ""}
            </p>
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
  .notValid {
    border: 1px solid #ff535379;
    &:focus {
      outline: none !important;
      border: 1px solid #ff535379;
      box-shadow: 0 0 5px #e59b2b;
    }
  }
  input[type="submit"] {
    width: 40%;
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
  .error {
    color: #fb8989;
    font-weight: 500;
    font-size: smaller;
    /* background-color: #e50e0e46; */
    padding: 4px 8px;
    width: 80%;
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
