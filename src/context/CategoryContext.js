import { createContext, useState } from "react";

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const ctgs = [
    { ctg: "study", color: "#689fcc", fav: true },
    { ctg: "work", color: "#dda675", fav: true },
    { ctg: "reading", color: "#ef745f", fav: true },
    { ctg: "writing", color: "#8ddfb5", fav: true },
    { ctg: "workout", color: "#c8e067", fav: true },
    { ctg: "meditation", color: "#e074d6", fav: false },
  ];

  const [categories, setCategories] = useState(ctgs);
  const [category, setCategory] = useState(categories[0]);

  const addCtg = (ctgToAdd) => {
    if (categories.find((obj) => obj.ctg === ctgToAdd)) {
      alert("Category already exists!");
      return;
    }
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const newCtgObject = {
      ctg: `${ctgToAdd}`,
      color: `#${randomColor}`,
      fav: false,
    };
    setCategories((categories) => [...categories, newCtgObject]);
  };

  const removeCtg = (ctgToBeRemoved) => {
    if (category.ctg === ctgToBeRemoved) {
      alert("Can't remove category while it's being used");
      return;
    }
    setCategories(categories.filter((obj) => obj.ctg !== ctgToBeRemoved));
  };

  const toggleFav = (ctg) => {
    let count = 0;
    categories.forEach((categoryObj) => {
      if (categoryObj.fav) {
        count++;
      }
    });

    const ctgIndex = categories.findIndex((obj) => obj.ctg === ctg);

    if (categories[ctgIndex].fav) {
      if (category.ctg === ctg) {
        alert("Can't unfavorite category while it's being used");
      } else {
        categories[ctgIndex].fav = false;
      }
    } else {
      if (count < 5) {
        categories[ctgIndex].fav = true;
      } else {
        alert("Maximum number of 5 favorite categories reached");
      }
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        category,
        setCategory,
        categories,
        addCtg,
        removeCtg,
        toggleFav,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
