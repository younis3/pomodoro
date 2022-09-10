import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import AuthContext from "../context/AuthContext";

const ProtectedRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { getCurUserLocalStorage } = useContext(AuthContext);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        auth.currentUser = user;
        if (auth.currentUser) {
          // user signed in
          setIsLoggedIn(true);
        }
      } else {
        // not signed in
        setIsLoggedIn(false);
      }
    });
  });

  let user = getCurUserLocalStorage();
  if (isLoggedIn || Object.keys(user).length) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
