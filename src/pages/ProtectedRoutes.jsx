import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

const ProtectedRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoutes;
