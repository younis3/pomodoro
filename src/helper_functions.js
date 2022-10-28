import { Timestamp } from "firebase/firestore";
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

// export const getTodayDateWithHour = () => {
//   return (
//     getTodayDate() +
//     ", " +
//     new Date(Date.now()).toLocaleString(navigator.language, {
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   );
// };

export const getTodayDateWithHour = () => {
  let date = new Date();
  date = new Date(date.getTime());
  return date
    .toLocaleString()
    .split("T")[0]
    .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
};

export const convertDate = (d) => {
  let date;
  if (typeof d == "string") {
    date = new Date(d);
    if (!(date instanceof Date && !isNaN(date))) {
      //if failed to convert to Date return original string
      return d;
    }
  } else {
    //else if it's TimeStamp Object
    const timeStamp = new Timestamp(d.seconds, d.nanoseconds);
    date = timeStamp.toDate();
  }
  // return date;
  return date;
};

export const convertDateToStringWithHour = (d) => {
  if (!(d instanceof Date && !isNaN(d))) {
    //if failed to convert to Date return original date string
    return d.toString();
  }
  let date = new Date(d.getTime());
  return date
    .toLocaleString()
    .split("T")[0]
    .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
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
