import { createContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth, loginWithGoogle } from "../firebase";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter, getTodayDate } from "../helper_functions";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import { ctgs_default } from "../values";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  let navigate = useNavigate();

  const updateCurUserLocalStorage = (userObj = {}) => {
    if (localStorage.getItem(`curUser`) === null) {
      localStorage.setItem(`curUser`, JSON.stringify(userObj));
    } else {
      localStorage.setItem(`curUser`, JSON.stringify(userObj));
    }
  };

  const getCurUserLocalStorage = () => {
    if (localStorage.getItem(`curUser`) !== null) {
      return JSON.parse(localStorage.getItem("curUser"));
    } else {
      return {};
    }
  };

  const googleSignIn = () => {
    setPersistence(auth, browserLocalPersistence)
      .then(async () => {
        try {
          const result = await loginWithGoogle();
          updateCurUserLocalStorage(result.user);
          console.log("User signed in");

          try {
            // add user to db if it doesn't exist yet
            await setDoc(doc(db, "users", result.user.uid), {
              uid: result.user.uid,
              email: result._tokenResponse.email,
              firstName: capitalizeFirstLetter(result._tokenResponse.firstName),
              lastName: capitalizeFirstLetter(result._tokenResponse.lastName),
              dateCreated: getTodayDate(),
              chosenCtg: "study",
              categories: ctgs_default,
              sessionsCount: 0,
              sessions: [],
            });
            navigate("/");
          } catch (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
          }
        } catch (error) {
          const errorMessage = error.message;
          console.log(errorMessage);
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const emailPasswordSignUp = async (auth, firstName, lastName, email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      updateCurUserLocalStorage(result.user);
      // console.log(result);
      // user added to authinticated users (not the db)

      try {
        // add user to db
        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          email: email,
          firstName: capitalizeFirstLetter(firstName),
          lastName: capitalizeFirstLetter(lastName),
          dateCreated: getTodayDate(),
          chosenCtg: "study",
          categories: ctgs_default,
          sessionsCount: 0,
          sessions: [],
        });
      } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
      }
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  const emailPasswordLogin = async (auth, email, password) => {
    setPersistence(auth, browserLocalPersistence)
      .then(async () => {
        try {
          const result = await signInWithEmailAndPassword(auth, email, password);
          updateCurUserLocalStorage(result.user);
          console.log(result.user);
          console.log("User signed in");

          // console.log(result);
          navigate("/");
        } catch (error) {
          const errorMessage = error.message;
          console.log(errorMessage);
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const logout = async () => {
    try {
      await signOut(auth);
      //user signed out
      updateCurUserLocalStorage({});
      window.location.reload(false); //refresh app and remove current states
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        emailPasswordSignUp,
        emailPasswordLogin,
        logout,
        getCurUserLocalStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
