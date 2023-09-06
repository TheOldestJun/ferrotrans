import { PERIOD } from "./constants";
import moment from "moment";

export const capitalize = (str) => {
  return (str && str[0].toUpperCase() + str.slice(1)) || "";
};

export const storeCorrectDate = (date) => {
  return new Date(
    Date.parse(date.toUTCString()) - date.getTimezoneOffset() * 60000
  ).toDateString();
};

export const formatDate = (str, lang) => {
  let locale = "";
  switch (lang) {
    case "ua":
      locale = "uk-UA";
      break;
    case "ru":
      locale = "ru-RU";
      break;
    case "pl":
      locale = "pl-PL";
      break;
    default:
      locale = "en-GB";
  }
  const date = new Date(str);
  return date.toLocaleString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getPeriodData = (data) => {
  let lastDate = moment().subtract(PERIOD, "days");
  let currentData = [];
  for (let d of data) {
    if (
      moment(d.dateCreated).isAfter(lastDate) ||
      moment(d.dateCreated).isSame(lastDate)
    ) {
      currentData.push(d);
    }
  }
  return currentData;
};

export const countAverage = (data) => {
  let sum = 0;
  let divider = 0;
  for (let d of data) {
    sum += d.amount;
    divider++;
  }
  const result = parseFloat((sum / divider).toFixed(2));
  return result;
};
