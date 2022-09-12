import { createContext, useState, useEffect } from "react";
import { ctgs_default } from "../values";

const CategoryContext = createContext();

const getCtgArray = () => {
  if (localStorage.getItem(`categories`) === null) {
    localStorage.setItem(`categories`, JSON.stringify(ctgs_default));
    return ctgs_default;
  } else {
    return JSON.parse(localStorage.getItem("categories"));
  }
};

const getChosenCtg = () => {
  if (localStorage.getItem(`ChosenCategory`) === null) {
    localStorage.setItem(`ChosenCategory`, JSON.stringify(ctgs_default[0]));
    return ctgs_default[0];
  } else {
    return JSON.parse(localStorage.getItem("ChosenCategory"));
  }
};

export const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState(getCtgArray);
  const [category, setCategory] = useState(getChosenCtg);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("ChosenCategory", JSON.stringify(category));
  }, [category]);

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
    //save object changes (fav/unfav) to local storage
    localStorage.setItem("categories", JSON.stringify(categories));
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
