import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { IconAngleDown } from "../../../constants/icons";
import { colors } from "../../../constants/colors";

interface IProp {
  onPress: () => void;
  lable: string;
  style?: any;
  textColor?: string;
}

export default function DropdowInput(prop: IProp) {
  return (
    <TouchableOpacity
      style={[styles.inputDropdown, prop.style]}
      onPress={prop.onPress}
    >
      <Text
        style={{ color: prop.textColor ? prop.textColor : colors.c_667085 }}
      >
        {prop.lable}
      </Text>
      <IconAngleDown
        style={{ marginLeft: 14 }}
        width={17}
        fill={colors.c_7B7B80}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inputDropdown: {
    backgroundColor: colors.c_ffffff,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.c_d0D5dd,
  },
});
