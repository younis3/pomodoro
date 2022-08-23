export let categories = [
  { study: "#689fcc" },
  { work: "#dda675" },
  { reading: "#ef745f" },
  { writing: "#8ddfb5" },
  { workout: "#c8e067" },
  { meditation: "#e074d6" },
];

export const addCtg = (ctgToAdd) => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const newCtgObject = { [ctgToAdd]: `#${randomColor}` };
  categories.push(newCtgObject);
};

export const removeCtg = (ctgToBeRemoved) => {
  categories = categories.filter((obj) => !(ctgToBeRemoved in obj));
};

let ctgColors = () => {
  let string = "";
  /*
  make a style string for each element in the categories array above
  then return the whole string to be placed as a CSS variable (classNames)
  */
  categories?.map((ctgObject) => {
    const key = Object.keys(ctgObject)[0];
    const value = ctgObject[key];
    string += `
    &.${key}{
      background-color: ${value};
    }
    `;
  });
  return string;
};

export let ctgStyles = `
    ${ctgColors()}
`;
