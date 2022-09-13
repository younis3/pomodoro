import { createContext, useState } from "react";
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

  const [firebaseErrorMsg, setFirebaseErrorMsg] = useState("");

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
              name: capitalizeFirstLetter(result.user.displayName),
              dateCreated: getTodayDate(),
              chosenCtg: "study",
              categories: ctgs_default,
              sessionsCount: 0,
              sessions: [],
              tasks: [],
            });
            navigate("/");
          } catch (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
          }
        } catch (error) {
          const errorMessage = error.message.slice(10);
          console.log(errorMessage);
          setFirebaseErrorMsg(errorMessage);
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const emailPasswordSignUp = async (auth, name, email, password) => {
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
          name: capitalizeFirstLetter(name),
          dateCreated: getTodayDate(),
          chosenCtg: "study",
          categories: ctgs_default,
          sessionsCount: 0,
          sessions: [],
          tasks: [],
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
          const errorMessage = error.message.slice(10);
          console.log(errorMessage);
          console.log("XX");
          if (errorMessage === "Error (auth/wrong-password).") {
            setFirebaseErrorMsg("Error: Wrong Password!");
          } else if (errorMessage === "Error (auth/user-not-found).") {
            setFirebaseErrorMsg("Error: User Not Found!");
          } else if (errorMessage === "Error (auth/invalid-email).") {
            setFirebaseErrorMsg("Error: Invalid Email!");
          } else {
            setFirebaseErrorMsg(errorMessage);
          }
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
        firebaseErrorMsg,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
