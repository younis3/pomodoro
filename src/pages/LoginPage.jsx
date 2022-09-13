import styled from "styled-components";
import GoogleIcon from "@mui/icons-material/Google";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext, useRef, useState, useEffect } from "react";
import { auth } from "../firebase";
import { useUpdateEffect } from "react-use";

const LoginPage = () => {
  const { emailPasswordLogin, googleSignIn, firebaseErrorMsg } = useContext(AuthContext);
  const [passVisible, setPassVisible] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const errorRef = useRef();

  //skip on first run after rerender
  useUpdateEffect(() => {
    setErrorMsg(firebaseErrorMsg);
  }, [firebaseErrorMsg]);

  useEffect(() => {
    if (errorMsg.length) {
      errorRef.current.classList.remove("hide"); //show error
    } else {
      errorRef.current.classList.add("hide");
    }
  }, [errorMsg]);

  const emailRef = useRef();
  const passwordRef = useRef();

  const passVisibleHandler = (e) => {
    setPassVisible(!passVisible);
  };

  useEffect(() => {
    passVisible ? (passwordRef.current.type = "text") : (passwordRef.current.type = "password");
  }, [passVisible]);

  const defaultLoginHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    if (email === "") {
      setErrorMsg("Error: Insert Email");
      return emailRef.current.focus();
    } else if (password === "") {
      setErrorMsg("Error: Insert Password");
      return passwordRef.current.focus();
    }
    setErrorMsg("");
    emailPasswordLogin(auth, email, password);
  };

  const loginWithGoogleHandler = (e) => {
    e.preventDefault();
    googleSignIn();
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
            <input type={"email"} placeholder={"Email"} ref={emailRef} maxLength={36} required />
            <div className="passInputWrapper">
              <input
                type={"password"}
                placeholder={"Password"}
                ref={passwordRef}
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

            <button onClick={defaultLoginHandler}>Sign In</button>
            <p className="error" ref={errorRef}>
              {errorMsg}
            </p>
            <h4 style={{ marginTop: "3vh" }}>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </h4>
            <StyledDivider>
              <h3 className="leftLine"> ________________ </h3>
              <h2>or</h2>
              <h3 className="rightLine"> ________________ </h3>
            </StyledDivider>
            <h4>
              <div className="google">
                <button onClick={loginWithGoogleHandler}>
                  <GoogleIcon style={{ paddingRight: "6px" }} />
                  Sign In with Google
                </button>
              </div>
            </h4>
          </StyledForm>
        </StyledFormContainer>
      </StyledOuter>
    </div>
  );
};

export default LoginPage;
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
  /* background-color: #3b393962; */
  background-color: #4a4a4a79;
  opacity: 0.9;
  padding: 36px 14px;
  border: 1px solid #1c18184b;
  box-shadow: 0 0 22px 2px rgba(0, 0, 0, 0.38);
  /* border: 1px solid #ffffff89; */
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

  .hide {
    display: none;
  }

  input {
    width: 98%;
    padding: 12px;
    margin: 12px;
    background-color: #ffffff11;
    /* border: 1px solid #dedede7d; */
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
    margin-bottom: 2.5vh;
    color: #ffffff;
    &:focus {
      outline: none !important;
      border: 1px solid #63e7de7a;
      box-shadow: 0 0 5px #719ece;
    }
    input {
      border: none;
      padding: 12px;
      margin: 0;
      padding-left: 12px;
    }
    input[type="password"] {
      font-size: 16px;
    }
    .eyeBtnWrapper {
      color: #ffffffbf;
      background-color: #ffffff13;
      padding: 10px 14px;
      outline: none !important;
      border: none;
      font-size: 20px;
      cursor: pointer;
    }
  }

  button {
    padding: 8px 6px;
    width: 98%;
    margin-top: 2vh;
    margin-bottom: 2vh;
    font-size: 18px;
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
    /* color: #fff; */
    background-color: #d14f4f18;
    color: #eba8a8de;
    font-weight: 500;
    font-size: smaller;
    padding: 8px 6px;
    width: 98%;
  }
  h4 {
    font-size: smaller;
    color: #f5f5f5c1;
    a {
      color: #ffffff;
    }
    .google {
      padding-left: 8px;
      padding-right: 8px;
      text-align: center;
      button {
        width: 100%;
        padding-right: 22px;
        padding-left: 22px;
        display: inline-flex;
        align-items: center;
        color: #ffffff;
        font-size: 13px;
      }
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

const StyledDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2px;
  margin-top: 1.3vh;
  margin-bottom: 0.3vh;
  .leftLine {
    background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #fff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    display: inline-block;
    font-size: 8px;
    padding: 2px;
  }
  h2 {
    color: whitesmoke;
    font-size: 16px;
    padding: 2px;
  }
  .rightLine {
    background-image: linear-gradient(90deg, #fff 0%, rgba(0, 0, 0, 0));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    display: inline-block;
    font-size: 8px;
    text-align: center;
    padding: 2px;
  }
`;
