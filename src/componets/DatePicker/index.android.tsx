import React from "react";
import DateTimePicker, {
  AndroidNativeProps,
} from "@react-native-community/datetimepicker";
import { View } from "react-native";
import { DatePickerProps } from "./interface";

const DatePicker: React.FC<DatePickerProps > = React.memo(
  ({ visible, onToggle, onChange, value, ...props }) => {
    return visible ? (
      <View style={{ backgroundColor: "#fff" }}>
        <DateTimePicker
          value={value || new Date()}
          {...props}
          onChange={(e, data) => {
            if (onToggle) {
              onToggle();
            }
            if (data) {
              onChange(data);
            }
          }}
        />
      </View>
    ) : null;
  }
);

DatePicker.defaultProps = {
  value: new Date(),
};

export default DatePicker;
