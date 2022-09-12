import styled from "styled-components";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import CloseIcon from "@mui/icons-material/Close";
import AuthContext from "../context/AuthContext";
import { useContext, useRef, useState } from "react";
import { auth } from "../firebase";

const LoginPage = () => {
  const { googleSignIn } = useContext(AuthContext);
  const { emailPasswordLogin } = useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState("");
  const errorRef = useRef();

  const emailRef = useRef();
  const passwordRef = useRef();

  const defaultLoginHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    emailPasswordLogin(auth, email, password);
    // console.log(emailPasswordLogin(auth, email, password));
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
            <input type={"email"} placeholder={"Email"} ref={emailRef} />
            <input type={"password"} placeholder={"Password"} ref={passwordRef} />
            <button onClick={defaultLoginHandler}>Sign In</button>
            <p className="error" ref={errorRef}>
              {errorMsg}
            </p>
            <h4 style={{ marginTop: "2.8vh" }}>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </h4>
            <StyledDivider>
              <h3 className="leftLine"> _____________ </h3>
              <h2>or</h2>
              <h3 className="rightLine"> _____________ </h3>
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
    padding: 12px;
    margin: 12px;
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
    .google {
      padding-left: 5px;
      padding-right: 5px;
      text-align: center;
      button {
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

const StyledDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2px;
  margin-top: 1vh;
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
