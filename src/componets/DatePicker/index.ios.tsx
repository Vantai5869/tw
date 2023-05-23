import DateTimePicker, {
  IOSNativeProps,
} from "@react-native-community/datetimepicker";
import React from "react";
import { Button, Modal, TouchableWithoutFeedback, View } from "react-native";
import { DatePickerProps } from "./interface";

const DatePicker: React.FC<DatePickerProps & IOSNativeProps> = React.memo(
  ({ visible, onToggle, onChange, value, ...props }) => {
    return (
      <Modal visible={visible} animationType="fade" transparent>
        <TouchableWithoutFeedback
          onPress={() => {
            if (onToggle) {
              onToggle();
            }
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            <View style={{ backgroundColor: "#fff", marginBottom: 0 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  title="Done"
                  onPress={() => {
                    if (onToggle) {
                      onToggle();
                    }
                  }}
                />
              </View>
              <DateTimePicker
                value={value || new Date()}
                {...props}
                onChange={(e: any, data: any) => {
                  onChange(data);
                }}
                display="spinner"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
);

DatePicker.defaultProps = {
  value: new Date(),
};

export default DatePicker;
