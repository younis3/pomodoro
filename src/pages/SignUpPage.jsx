import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { auth } from "../firebase";
import { hasNumber, validateNoCharacters, validateEmail } from "../helper_functions";
import { useUpdateEffect } from "react-use";

const SignUpPage = (e) => {
  const { emailPasswordSignUp, firebaseErrorMsg } = useContext(AuthContext);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [errorMsg, setErrorMsg] = useState("");
  const errorRef = useRef();

  const [nameState, setnameState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  const [passVisible, setPassVisible] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);

  //skip on first run after rerender
  useUpdateEffect(() => {
    setErrorMsg(firebaseErrorMsg);
  }, [firebaseErrorMsg]);

  const passVisibleHandler = (e) => {
    setPassVisible(!passVisible);
  };

  const confirmPassVisibleHandler = (e) => {
    setConfirmPassVisible(!confirmPassVisible);
  };

  useEffect(() => {
    passVisible ? (passwordRef.current.type = "text") : (passwordRef.current.type = "password");
    confirmPassVisible
      ? (confirmPasswordRef.current.type = "text")
      : (confirmPasswordRef.current.type = "password");
  }, [passVisible, confirmPassVisible]);

  //handle real time validations (onChange events)
  const nameHandler = (e) => {
    const name = nameRef.current.value.trim();
    if (name === "") {
      setErrorMsg("Name can't be empty");
      nameRef.current.classList.add("notValid");
      return nameRef.current.focus();
    } else if (name.length > nameRef.current.maxLength) {
      setErrorMsg("Name too long");
      nameRef.current.classList.add("notValid");
      return nameRef.current.focus();
    } else if (!validateNoCharacters(name)) {
      setErrorMsg("Name is not valid! \n (Allowed: Alphabets A-Z, Numbers and Space)");
      nameRef.current.classList.add("notValid");
      return nameRef.current.focus();
    }
    setErrorMsg("");
    nameRef.current.classList.remove("notValid");
    setnameState(name);
  };

  const emailHandler = (e) => {
    const email = emailRef.current.value.trim();
    if (email === "") {
      setErrorMsg("Email is required!");
      emailRef.current.classList.add("notValid");
      return emailRef.current.focus();
    }
    if (!validateEmail(email)) {
      setErrorMsg("Email is not valid!");
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
    setErrorMsg("");
    confirmPasswordRef.current.classList.remove("notValid");
  };

  const regUserHandler = (e) => {
    e.preventDefault();
    if (nameState !== "" && emailState !== "" && passwordState !== "") {
      if (nameRef.current.classList.contains("notValid")) {
        setErrorMsg("Name is not valid");
        return nameRef.current.focus();
      } else if (emailRef.current.classList.contains("notValid")) {
        setErrorMsg("Email is not valid");
        return emailRef.current.focus();
      } else if (passwordRef.current.classList.contains("notValid")) {
        setErrorMsg("Password is not valid");
        return passwordRef.current.focus();
      }

      if (errorMsg === "") {
        const confirmPassword = confirmPasswordRef.current.value.trim();
        if (confirmPassword !== passwordState) {
          errorRef.current.innerHTML = "Error: Passwords do not match!";
          confirmPasswordRef.current.classList.add("notValid");
          return confirmPasswordRef.current.focus();
        } else {
          //all validations passed and passwords match
          emailPasswordSignUp(auth, nameState, emailState, passwordState);
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
              <label>Name</label>
            </div>
            <input
              type={"text"}
              placeholder={"‎"} //a workaround to prevent chrome autocomplete since it doesn't support autocomplete off
              ref={nameRef}
              onChange={nameHandler}
              autoComplete={"off"}
              maxLength={25}
              required
            />

            <div className="labelWrapper">
              <span>*</span>
              <label>Email</label>
            </div>
            <input type={"email"} ref={emailRef} onChange={emailHandler} maxLength={36} required />
            <div className="labelWrapper">
              <span>*</span>
              <label>Password</label>
            </div>
            <div className="passInputWrapper">
              <input
                type={"password"}
                ref={passwordRef}
                onChange={passwordHandler}
                minLength={6}
                maxLength={20}
                required
              />
              <span className="eyeBtnWrapper">
                {passVisible && (
                  <RemoveRedEyeIcon fontSize="inherit" onClick={passVisibleHandler} />
                )}
                {!passVisible && (
                  <VisibilityOffIcon fontSize="inherit" onClick={passVisibleHandler} />
                )}
              </span>
            </div>

            <div className="labelWrapper">
              <span>*</span>
              <label>Confirm Password</label>
            </div>
            <div className="passInputWrapper">
              <input
                type={"password"}
                ref={confirmPasswordRef}
                onChange={confirmPasswordHandler}
                minLength={6}
                maxLength={20}
                required
              />
              <span className="eyeBtnWrapper">
                {confirmPassVisible && (
                  <RemoveRedEyeIcon fontSize="inherit" onClick={confirmPassVisibleHandler} />
                )}
                {!confirmPassVisible && (
                  <VisibilityOffIcon fontSize="inherit" onClick={confirmPassVisibleHandler} />
                )}
              </span>
            </div>

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
  background-color: #4a4a4a79;
  opacity: 1;
  padding: 36px 14px;
  border: 1px solid #1c18184b;
  box-shadow: 0 0 22px 2px rgba(0, 0, 0, 0.38);

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
    padding: 9px;
    margin: 6px;
    margin-bottom: 3vh;
    background-color: #ffffff13;
    border: 1px solid #dedede7d;
    color: #ffffff;
    font-size: 16px;
    border: none;

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

  .passInputWrapper {
    display: flex;
    width: 98%;
    margin: 6px;
    margin-bottom: 2.6vh;
    color: #ffffff;
    &:focus {
      outline: none !important;
      border: 1px solid #63e7de7a;
      box-shadow: 0 0 5px #719ece;
    }
    input {
      border: none;
      padding: 8px;
      margin: 0;
      font-size: 14px;
      padding-left: 7px;
    }
    input[type="password"] {
      font-size: 16px;
    }
    .eyeBtnWrapper {
      color: #ffffffbf;
      background-color: #ffffff13;
      padding: 8px 14px;
      outline: none !important;
      border: none;
      font-size: 18px;
      cursor: pointer;
    }
  }

  input[type="submit"] {
    width: 98%;
    padding: 8px 10px;
    margin-top: 2vh;
    margin-bottom: 2vh;
    font-size: 18px;
    color: rgb(255, 255, 255);
    background-color: rgb(28, 24, 28);
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
    padding: 4px 8px;
    width: 90%;
    white-space: pre-line;
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
  padding: 4px;
  padding-top: 8px;
  padding-left: 9px;
  padding-right: 9px;
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
