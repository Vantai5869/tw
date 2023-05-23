import React from "react";
import { Image, StyleSheet, View, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../constants/colors";
import { icons, IconSearch } from "../constants/icons";

interface TInputSeaerch {
  viewInput?: any;
  value?: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  onPress: () => any;
}

export default function InputSearch(props: TInputSeaerch) {
  return (
    <View style={[styles.container, props.viewInput]}>
      <TextInput
        value={props.value}
        style={styles.textInput}
        placeholderTextColor={colors.c_A3A3A3}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        onEndEditing={props.onPress}
      />
      <TouchableOpacity onPress={props.onPress}>
        <IconSearch width={18} height={18} fill={colors.c_7B7B80} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: colors.c_ffffff,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    paddingHorizontal: 20,
    borderWidth: 1,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 14.3,
  },
  textInput: {
    width: "90%",
    height: 43,
    fontSize: 16,
    color: colors.c_7B7B80,
  },
});
