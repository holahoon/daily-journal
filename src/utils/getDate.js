const YEAR = "YEAR";
const MONTH = "MONTH";
const DATE = "DATE";
const DAY = "DAY";
const HOUR = "HOUR";
const MINUTE = "MINUTE";
const TERM = "TERM";

export const getDate = (dateType) => {
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

  const d = new Date();

  switch (dateType) {
    case YEAR:
      return d.getUTCFullYear();
    case MONTH:
      return monthArray[d.getUTCMonth()];
    case DATE:
      return d.getUTCDate();
    case DAY:
      return dayArray[d.getDay()];
    case HOUR:
      return d.getHours() > 12 ? `0${d.getHours() - 12}` : `${d.getHours()}`;
    case MINUTE:
      return `${d.getMinutes()}`;
    case TERM:
      return d.getHours() < 12 ? "AM" : "PM";
    default:
      return d;
  }
};
