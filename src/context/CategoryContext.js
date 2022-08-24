import { createContext, useState } from "react";

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const [category, setCategory] = useState("study");

  const ctgs = [
    { study: "#689fcc" },
    { work: "#dda675" },
    { reading: "#ef745f" },
    { writing: "#8ddfb5" },
    { workout: "#c8e067" },
    { meditation: "#e074d6" },
  ];

  const [categories, setCategories] = useState(ctgs);

  const addCtg = (ctgToAdd) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const newCtgObject = { [ctgToAdd]: `#${randomColor}` };
    setCategories((categories) => [...categories, newCtgObject]);
  };

  const removeCtg = (ctgToBeRemoved) => {
    setCategories(categories.filter((obj) => !(ctgToBeRemoved in obj)));
  };

  return (
    <CategoryContext.Provider
      value={{
        category,
        setCategory,
        categories,
        addCtg,
        removeCtg,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
