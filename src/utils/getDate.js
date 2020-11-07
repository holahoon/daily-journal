const YEAR = "YEAR";
const MONTH = "MONTH";
const DATE = "DATE";
const DAY = "DAY";
const HOUR = "HOUR";
const MINUTE = "MINUTE";
const TERM = "TERM";

const currentTime = new Date();

export const getDate = (dateToUse = currentTime, dateType) => {
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  switch (dateType) {
    case YEAR:
      return `${dateToUse.getFullYear()}`;
    case MONTH:
      return `${monthArray[dateToUse.getMonth()]}`;
    case DATE:
      return `${dateToUse.getDate()}`;
    case DAY:
      return `${dayArray[dateToUse.getDay()]}`;
    case HOUR:
      return dateToUse.getHours() < 12
        ? `${dateToUse.getHours()}`
        : `${dateToUse.getHours() - 12}`;
    case MINUTE:
      return dateToUse.getMinutes() < 10
        ? `0${dateToUse.getMinutes()}`
        : `${dateToUse.getMinutes()}`;
    case TERM:
      return dateToUse.getHours() < 12 ? "AM" : "PM";
    default:
      return dateToUse;
  }
};
