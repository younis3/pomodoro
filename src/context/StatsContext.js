import { createContext, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const StatsContext = createContext();

export const StatsContextProvider = ({ children }) => {
  return <StatsContext.Provider value={{}}>{children}</StatsContext.Provider>;
};

export default StatsContext;
