import styled from "styled-components";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { auth } from "../firebase";
import { hasNumber, validateOnlyLetters, validateEmail } from "../helper_functions";

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
    const firstName = firstNameRef.current.value.trim();
    if (firstName === "") {
      setErrorMsg("First Name can't be empty");
      firstNameRef.current.classList.add("notValid");
      return firstNameRef.current.focus();
    } else if (firstName.length > 15) {
      setErrorMsg("First Name too long");
      firstNameRef.current.classList.add("notValid");
      return firstNameRef.current.focus();
    } else if (!validateOnlyLetters(firstName)) {
      setErrorMsg("First Name is not valid! (must contain only letters without spaces)");
      firstNameRef.current.classList.add("notValid");
      return firstNameRef.current.focus();
    }
    setErrorMsg("");
    firstNameRef.current.classList.remove("notValid");
    setFirstNameState(firstName);
  };

  const lasttNameHandler = (e) => {
    const lastName = lastNameRef.current.value.trim();
    if (lastName === "") {
      setErrorMsg("Last Name can't be empty");
      lastNameRef.current.classList.add("notValid");
      return lastNameRef.current.focus();
    } else if (lastName.length > 15) {
      setErrorMsg("Last Name too long");
      lastNameRef.current.classList.add("notValid");
      return lastNameRef.current.focus();
    } else if (!validateOnlyLetters(lastName)) {
      setErrorMsg("Last Name is not valid! (must contain only letters without spaces)");
      lastNameRef.current.classList.add("notValid");
      return lastNameRef.current.focus();
    }
    setErrorMsg("");
    lastNameRef.current.classList.remove("notValid");
    setLastNameState(lastName);
  };

  const emailHandler = (e) => {
    const email = emailRef.current.value.trim();
    if (email === "") {
      setErrorMsg("Email is required!");
      emailRef.current.classList.add("notValid");
      return emailRef.current.focus();
    } else if (!validateEmail(email)) {
      setErrorMsg("Email is not valid!!");
      emailRef.current.classList.add("notValid");
      return emailRef.current.focus();
    }
    setErrorMsg("");
    emailRef.current.classList.remove("notValid");
    setEmailState(email);
  };

  const passwordHandler = (e) => {
    const password = passwordRef.current.value.trim();
    if (password === "") {
      setErrorMsg("Password is required!");
      passwordRef.current.classList.add("notValid");
      return passwordRef.current.focus();
    } else if (password.length < 6 || password.length > 20) {
      setErrorMsg("Password must be 6-20 characters long!");
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
    const confirmPassword = confirmPasswordRef.current.value.trim();
    if (
      confirmPassword.length < confirmPasswordRef.current.minLength ||
      confirmPassword.length > confirmPasswordRef.current.maxLength
    ) {
      confirmPasswordRef.current.classList.add("notValid");
      setErrorMsg(
        `Confirm Password must be ${confirmPasswordRef.current.minLength}-${confirmPasswordRef.current.maxLength} characters long!`
      );
      return confirmPasswordRef.current.focus();
    }
    if (confirmPassword === passwordState) {
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
      if (firstNameRef.current.classList.contains("notValid")) {
        setErrorMsg("First Name is not valid");
        return firstNameRef.current.focus();
      } else if (lastNameRef.current.classList.contains("notValid")) {
        setErrorMsg("Last Name is not valid");
        return lastNameRef.current.focus();
      } else if (emailRef.current.classList.contains("notValid")) {
        setErrorMsg("Emailis not valid");
        return emailRef.current.focus();
      } else if (passwordRef.current.classList.contains("notValid")) {
        setErrorMsg("Password is not valid");
        return passwordRef.current.focus();
      } else if (confirmPasswordRef.current.classList.contains("notValid")) {
        setErrorMsg("Confirm Password doesn't match");
        return confirmPasswordRef.current.focus();
      }

      if (errorMsg === "") {
        const confirmPassword = confirmPasswordRef.current.value.trim();
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
            <div className="labelWrapper">
              <span>*</span>
              <label>First Name</label>
            </div>
            <input
              type={"text"}
              placeholder={"‎"} //a workaround to prevent chrome autocomplete since it doesn't support autocomplete off
              ref={firstNameRef}
              onChange={firstNameHandler}
              autoComplete={"off"}
              maxLength={15}
              required
            />
            <div className="labelWrapper">
              <span>*</span>
              <label>Last Name</label>
            </div>
            <input
              type={"text"}
              placeholder={"‎"}
              ref={lastNameRef}
              onChange={lasttNameHandler}
              maxLength={15}
              required
            />
            <div className="labelWrapper">
              <span>*</span>
              <label>Email</label>
            </div>
            <input type={"email"} ref={emailRef} onChange={emailHandler} required />
            <div className="labelWrapper">
              <span>*</span>
              <label>Password</label>
            </div>
            <input
              type={"password"}
              ref={passwordRef}
              onChange={passwordHandler}
              minLength={6}
              maxLength={20}
              required
            />
            <div className="labelWrapper">
              <span>*</span>
              <label>Confirm Password</label>
            </div>
            <input
              type={"password"}
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

  .labelWrapper {
    display: flex;
    width: 99%;
    margin-bottom: -4px;
    span {
      color: #ee5c4f9c;
      padding-right: 2px;
      justify-content: center;
      align-items: center;
    }
    label {
      font-size: small;
      color: #f5f5f597;
    }
  }

  input {
    width: 98%;
    padding: 7px;
    margin: 6px;
    margin-bottom: 2.4vh;
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
