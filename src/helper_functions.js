//--
export const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

export const getTodayDate = () => {
  return new Date(Date.now()).toLocaleString().split(",")[0];
};

// export const getTodayDateWithHour = () => {
//   return new Date(Date.now()).toLocaleString();
// };

export const getTodayDateWithHour = () => {
  return (
    getTodayDate() +
    " " +
    new Date(Date.now()).toLocaleString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};

export const hasNumber = (input) => {
  return /\d/.test(input);
};

export const validateOnlyLetters = (input) => {
  return /^[A-Za-z]*$/.test(input);
};

export const validateNoCharacters = (input) => {
  return /^[A-Za-z0-9 ]+$/.test(input);
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
