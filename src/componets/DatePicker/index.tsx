import React from "react";
import { DatePickerProps } from "./interface";
import {
  AndroidNativeProps,
  IOSNativeProps,
} from "@react-native-community/datetimepicker";

type Common =
  | Omit<AndroidNativeProps, "onChange" | "value">
  | Omit<IOSNativeProps, "onChange" | "value">;

const DatePicker: React.FC<DatePickerProps & Common> = React.memo(() => {
  return null;
});

export default DatePicker;
