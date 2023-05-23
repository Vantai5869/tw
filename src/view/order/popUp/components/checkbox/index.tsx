import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../../constants/colors";

interface Props {
  //   setChecked: (i: boolean) => void;F
  setValue: (type: string) => void;
  //   checked: boolean;
  data: string;
  value: string;
}
export const CheckboxShip: React.FC<Props> = ({ setValue, data, value }) => {
  const [checked, setChecked] = useState(false);
  const handleCheck = (type: string) => {
    setChecked(!checked);
    setValue(type);
  };
  return (
    <TouchableOpacity style={styles.choosen} onPress={() => handleCheck(data)}>
      <View
        style={[
          styles.checkbox,
          { backgroundColor: value == data ? "green" : "white" },
        ]}
      ></View>
      <Text style={styles.data}>{data}</Text>
    </TouchableOpacity>
  );
};
export const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 100,
    marginRight: 9,
  },
  choosen: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  data: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 22,
    color: colors.c_3A3A3C,
  },
});
