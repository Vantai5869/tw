import { Platform } from "react-native";

export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,16}$/
);

export const LIMIT_QUATITY = 999999;
export const CLIENT_AUTH = {
  client_id: "Mobile_Retailer",
  client_secret: "1q2w3e*",
};

export const DateFomart = {
  fulltime: "DD-MM-YYYY HH:mm",
  fulltimeSlash: "DD/MM/YYYY HH:mm",
};
export const ONLY_NUMBERR = /^\d*(\.\d+)?$/;

export const NO_SPECIAL_CHARACTER = /^[a-zA-Z0-9_ ]{0,100}$/;
export const VNP_REGEX = /((09|03|07|08|05)+([0-9]{8})\b)/;
export const LINK_WEBSITE =
  /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
export const MAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";

export const QUANTITY = 1;
