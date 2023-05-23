import { BaseProps } from "@react-native-community/datetimepicker";
export type DatePickerProps = {
  visible?: boolean;
  onToggle?: () => void;
  value?: Date;
  onChange: (data: Date | undefined) => void;
} & Omit<BaseProps, "onChange" | "value">;
