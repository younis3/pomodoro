import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import { auth, db } from "../firebase";
import AuthContext from "../context/AuthContext";
import AppStateContext from "../context/AppStateContext";
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const urlLocation = useLocation().pathname;

  const navRef = useRef();
  const pomodoroRef = useRef();
  const statsRef = useRef();

  const { logout } = useContext(AuthContext);
  const { timerState } = useContext(AppStateContext);

  const [userName, setUserName] = useState("");

  const { getCurUserLocalStorage } = useContext(AuthContext);
  let user = getCurUserLocalStorage();
  let userObjLength = Object.keys(user).length;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        auth.currentUser = user;
        if (auth.currentUser) {
          //user signed in
          if (userName === "") {
            getUserName(auth.currentUser.uid);
          }
        }
      }
    });
  });

  const getUserName = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const dataStr = docSnap.data().name;
      const name = dataStr?.split(" ")[0];
      setUserName(name);
    } else {
      console.log("No such document!");
    }
  };

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
            {!auth.currentUser && (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <li className="navItem"> Sign In </li>
              </Link>
            )}
            {/* {!auth.currentUser && !userObjLength && <h4 className="welcome">loading...</h4>} */}
            {auth.currentUser && <h4 className="welcome">Welcome {userName}!</h4>}
            {auth.currentUser && (
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
  opacity: 0.9;
  padding: 16px 18px;
  margin-top: 0.5vh;
  .navItem {
    padding-top: 1px;
    padding-bottom: 1px;
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
