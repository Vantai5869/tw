import moment from "moment";
import { Alert, Dimensions as RNDimensions } from "react-native";
import { TagType } from "../constants/type.interface";
import { translate } from "../locale";

export const DIMENSIONS = {
  width: RNDimensions.get("window").width,
  height: RNDimensions.get("window").height,
};

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isVietnamesePhoneNumber = (str: string) => {
  const regex = /([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
  if (regex.test(str)) {
    return true;
  }
  return false;
};

export const groupByKey = (array: any[], key: any) =>
  array.reduce((hash, obj) => {
    if (obj[key] === undefined) return hash;
    return Object.assign(hash, {
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    });
  }, {});

export const removeTagHTML = (string: string) => {
  if (string && string !== "") {
    const string1 = string.replace(/(<([^>]+)>)/gi, "");
    const string2 = string1.replace(/&nbsp/g, "");
    const string3 = string2.replace(/;/g, "");
    const string4 = string3.replace(/\[[^\]]*?\]/g, "");
    return string4;
  }
  return "";
};

export const formatDate = (date: any, format = "DD/MM/YYYY") =>
  date ? moment(date).format(format) : "";

export const formatNumber = (number: number | string, sperator?: string) => {
  return number
    ? number
        ?.toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${sperator || ","}`)
    : "0";
};

export const getMessage = (error: any) => {
  const mess =
    error?.data?.error?.message ||
    error?.error?.code ||
    error?.error_description ||
    error?.error?.message ||
    error?.message ||
    "Bad request";

  const keys = ["InvalidPassword", "Invalid Password"];
  if (keys.includes(mess)) {
    return translate(mess);
  }
  return mess;
};

export const getIds = (data?: TagType[]) => {
  return data?.map((el: TagType) => el.id) || [];
};

export const resetFormatNumber = (value: string) => {
  return value ? Number(value.replace(/\./g, "")) : 0;
};

export const validateNumber = (val: string) => {
  const re = /^[0-9]{0,}$/;
  return re.test(String(val).toLowerCase());
};

export const onComing = () => {
  Alert.alert("Coming Soon");
  return true;
};
export const numFormatter = (num: number) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
};
