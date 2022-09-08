import { createContext } from "react";
import { loginWithGoogle } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  let navigate = useNavigate();
  const googleSignIn = async () => {
    try {
      const result = await loginWithGoogle();
      try {
        // add user to db if it doesn't exist yet
        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          firstName: result._tokenResponse.firstName,
          lastName: result._tokenResponse.lastName,
          email: result._tokenResponse.email,
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
  };

  const emailPasswordSignUp = async (
    auth,
    firstName,
    lastName,
    email,
    password
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
      // user added to authinticated users (not the db)

      try {
        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          firstName: firstName,
          lastName: lastName,
          email: email,
        });
        try {
          await signOut(auth);
          //user signed out
          navigate("/login");
        } catch (error) {
          const errorMessage = error.message;
          console.log(errorMessage);
        }
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
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      navigate("/");
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      //user signed out
      navigate("/");
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{ googleSignIn, emailPasswordSignUp, emailPasswordLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
