import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import { auth } from "../firebase";
import AuthContext from "../context/AuthContext";
import AppStateContext from "../context/AppStateContext";

const Navbar = () => {
  const urlLocation = useLocation().pathname;

  const [isLoggedIn, setIsloggedIn] = useState(false);
  const userName = "Y3";

  const navRef = useRef();
  const pomodoroRef = useRef();
  const statsRef = useRef();

  const { logout } = useContext(AuthContext);
  const { timerState } = useContext(AppStateContext);

  useEffect(() => {
    !auth.currentUser ? setIsloggedIn(false) : setIsloggedIn(true);
  }, [auth.currentUser]);

  useEffect(() => {
    switch (urlLocation) {
      case "/login":
      case "/signup":
        navRef.current.classList.add("hide");
        break;
      case "/":
        navRef.current.classList.remove("hide");
        statsRef.current.classList.remove("clicked");
        pomodoroRef.current.classList.add("clicked");
        break;
      case "/stats":
        navRef.current.classList.remove("hide");
        pomodoroRef.current.classList.remove("clicked");
        statsRef.current.classList.add("clicked");
        break;
      default:
        navRef.current.classList.remove("hide");
        pomodoroRef.current.classList.remove("clicked");
        statsRef.current.classList.remove("clicked");
    }
  }, [urlLocation]);

  const signoutHandler = () => {
    if (timerState) {
      //in case timer is currently running, ask the user to confirm signing out
      if (window.confirm(`Warning: Signing out will reset the countdown timer`)) {
        logout();
      }
      return;
    }
    logout();
  };

  return (
    <StyledNavWrapper>
      <StyledNav ref={navRef}>
        {urlLocation !== "/login" && (
          <div className="leftContainer">
            {!isLoggedIn && (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <li className="navItem">Sign In</li>
              </Link>
            )}
            {isLoggedIn && <h4 className="welcome">Welcome {userName}!</h4>}
            {isLoggedIn && (
              <li className="navItem" id="logout" onClick={signoutHandler}>
                Sign Out
              </li>
            )}
          </div>
        )}
        <div className="rightContainer">
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className="navItem" ref={pomodoroRef}>
              Pomodoro
            </li>
          </Link>
          <Link to="/stats" style={{ textDecoration: "none" }}>
            <li className="navItem" ref={statsRef}>
              Stats
            </li>
          </Link>
        </div>
      </StyledNav>
    </StyledNavWrapper>
  );
};

export default Navbar;
//
//
//
//
//
/****************** styles ******************/
const StyledNavWrapper = styled.div`
  .hide {
    display: none;
  }
`;

const StyledNav = styled.ul`
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100vw;
  z-index: 99;
  border: none;
  /* background-image: linear-gradient(
    180deg,
    hsl(270deg 3% 15%) 0%,
    hsl(270deg 2% 16%) 7%,
    hsl(270deg 2% 17%) 16%,
    hsl(270deg 1% 17%) 26%,
    hsl(270deg 1% 18%) 39%,
    hsl(270deg 1% 19%) 53%,
    hsl(270deg 1% 20%) 69%,
    hsl(270deg 0% 21%) 86%,
    hsl(0deg 0% 22%) 100%
  ); */
  background-color: transparent;
  opacity: 0.8;
  padding: 14px 18px;
  .navItem {
    list-style: none;
    color: #f5f5f5e2;
    font-weight: 600;
    &:hover {
      cursor: pointer;
      color: #71aefd;
    }
  }
  .rightContainer {
    display: flex;
    padding-top: 3px;
    padding-bottom: 3px;
    .navItem {
      margin-left: 3vw;
      /* border-bottom: 0.5px solid #ffffff73; */
    }
  }
  .leftContainer {
    display: flex;
    background-color: #4e51555d;
    padding-left: 12px;
    padding-right: 2px;
    padding-top: 3px;
    padding-bottom: 3px;
    .navItem {
      padding-left: 2px;
      padding-right: 10px;
    }
    .welcome {
      color: #f5f5f5bc;
      font-size: smaller;
      font-weight: 400;
      padding-top: 1px;
    }
    #logout {
      color: #fff;
      padding-left: 2vw;
      font-size: smaller;
      &:hover {
        cursor: pointer;
        color: #71aefd;
      }
    }
  }
  .hide {
    display: none;
  }
  .clicked {
    color: #7d9cd2;
    border-bottom: 1px solid #7d9cd2cf;
  }
`;