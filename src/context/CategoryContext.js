import { createContext, useState, useEffect } from "react";
import { ctgs_default } from "../values";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const [curUser, setCurUser] = useState(null);
  const [categories, setCategories] = useState(ctgs_default);
  const [category, setCategory] = useState(ctgs_default[0]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        auth.currentUser = user;
        setCurUser(auth.currentUser);
      }
    });
  }, [curUser]);

  useEffect(() => {
    getCtgArray()
      .then((res) => {
        // console.log(res);
        setCategories(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth.currentUser]);

  useEffect(() => {
    getChosenCtg()
      .then((res) => {
        // console.log(res);
        setCategory(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth.currentUser]);

  const getCtgArray = async () => {
    if (curUser) {
      //if signed in get data from firestore db, otherwise from local storage
      const userDocReference = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(userDocReference);
      if (docSnap.exists()) {
        const data = docSnap.data();
        let dataArr = [];
        if (data.categories) {
          dataArr = docSnap.data().categories;
        }
        return dataArr;
      } else {
        console.log("No such document!");
        return null;
      }
    } else {
      //not signed in - get data from local storage
      if (localStorage.getItem(`categories`) === null) {
        localStorage.setItem(`categories`, JSON.stringify(ctgs_default));
        return ctgs_default;
      } else {
        return JSON.parse(localStorage.getItem("categories"));
      }
    }
  };

  const getChosenCtg = async () => {
    if (curUser) {
      const userDocReference = doc(db, "users", curUser.uid);
      const docSnap = await getDoc(userDocReference);
      if (docSnap.exists()) {
        const data = docSnap.data();
        let chosenCtg = ctgs_default[0];
        if (data.chosenCtg) {
          chosenCtg = docSnap.data().chosenCtg;
        } else {
          await updateDoc(userDocReference, {
            chosenCtg: ctgs_default[0],
          });
        }
        return chosenCtg;
      } else {
        console.log("No such document!");
        return {};
      }
    } else {
      if (localStorage.getItem(`ChosenCategory`) === null) {
        localStorage.setItem(`ChosenCategory`, JSON.stringify(ctgs_default[0]));
        return ctgs_default[0];
      } else {
        return JSON.parse(localStorage.getItem("ChosenCategory"));
      }
    }
  };

  const updateCategoriesDatabase = async (categories) => {
    const userDocReference = doc(db, "users", curUser.uid);
    const docSnap = await getDoc(userDocReference);

    if (docSnap.exists()) {
      await updateDoc(userDocReference, {
        categories: categories,
      });
    } else {
      console.log("No such document!");
    }
  };

  const updateChosenCtgDatabase = async (category) => {
    const userDocReference = doc(db, "users", curUser.uid);
    const docSnap = await getDoc(userDocReference);

    if (docSnap.exists()) {
      await updateDoc(userDocReference, {
        chosenCtg: category,
      });
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (curUser) {
      updateCategoriesDatabase(categories);
    } else {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories]);

  useEffect(() => {
    if (curUser) {
      updateChosenCtgDatabase(category);
    } else {
      localStorage.setItem("ChosenCategory", JSON.stringify(category));
    }
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
    //save object changes (fav/unfav) to db if user is signed in, otherwise to local storage
    if (curUser) {
      updateCategoriesDatabase(categories);
    } else {
      localStorage.setItem("categories", JSON.stringify(categories));
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
