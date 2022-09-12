//--
export const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

export const getTodayDate = () => {
  return new Date(Date.now()).toLocaleString().split(",")[0];
};

export const getTodayDateWithHour = () => {
  return new Date(Date.now()).toLocaleString();
};

export const hasNumber = (input) => {
  return /\d/.test(input);
};
