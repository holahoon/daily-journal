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

  const currentTime = new Date();

  switch (dateType) {
    case YEAR:
      return currentTime.getUTCFullYear();
    case MONTH:
      return monthArray[currentTime.getUTCMonth()];
    case DATE:
      return currentTime.getUTCDate();
    case DAY:
      return dayArray[currentTime.getDay()];
    case HOUR:
      let currentHours = currentTime.getHours();
      currentHours = ("0" + currentHours).slice(-2);
      return currentHours < 12 ? currentHours : currentHours - 12;
    case MINUTE:
      return currentTime.getMinutes() < 10
        ? `0${currentTime.getMinutes()}`
        : `${currentTime.getMinutes()}`;
    case TERM:
      return currentTime.getHours() < 12 ? "AM" : "PM";
    default:
      return currentTime;
  }
};
