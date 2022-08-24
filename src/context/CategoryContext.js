import { createContext, useState } from "react";

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const ctgs = [
    { ctg: "study", color: "#689fcc" },
    { ctg: "work", color: "#dda675" },
    { ctg: "reading", color: "#ef745f" },
    { ctg: "writing", color: "#8ddfb5" },
    { ctg: "workout", color: "#c8e067" },
    { ctg: "meditation", color: "#e074d6" },
  ];

  const [categories, setCategories] = useState(ctgs);
  const [category, setCategory] = useState(categories[0]);

  const addCtg = (ctgToAdd) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if (categories.find((obj) => obj.ctg === ctgToAdd)) {
      alert("Category already exists!");
      return;
    }
    const newCtgObject = { ctg: `${ctgToAdd}`, color: `#${randomColor}` };
    setCategories((categories) => [...categories, newCtgObject]);
  };

  const removeCtg = (ctgToBeRemoved) => {
    if (category.ctg === ctgToBeRemoved) {
      alert("Can't remove category while it's being used");
      return;
    }
    setCategories(categories.filter((obj) => obj.ctg !== ctgToBeRemoved));
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
