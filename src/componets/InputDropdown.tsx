import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from "react-native";
import { colors } from "../constants/colors";
import { icons } from "../constants/icons";

interface Props {
  value?: string;
  label: string;
  placeholder?: string;
  style?: object;
  onChange?: () => void;
  show: boolean;
  errorText?: string | number | undefined;
  required?: boolean;
  textStyle?: Object;
  styleLabel?: StyleProp<TextStyle>;
}

const InputDropdown = React.memo((props: Props) => {
  return (
    <View>
      <Text style={[styles.label, props.styleLabel]}>
        {props.label}
        {props.required ? <Text style={styles.textRequire}>*</Text> : null}
      </Text>
      <TouchableOpacity
        onPress={props.onChange}
        style={[
          props.style,
          styles.view,
          !!props?.errorText && styles.hasError,
        ]}
        activeOpacity={0.8}
      >
        <View style={styles.content}>
          <View style={styles.input}>
            <Text
              style={[
                styles.placeholder,
                !!props.value && { color: colors.c_48484A },
                props.textStyle,
              ]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {props.value || props.placeholder}
            </Text>
          </View>
          <Image
            source={props.show ? icons.ICON_ARROW_DOWN : icons.ICON_ARROW_DOWN}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      {props.errorText ? (
        <View style={styles.viewError}>
          <Text style={styles.txtError}>{props.errorText}</Text>
        </View>
      ) : (
        <View style={styles.paddingNoError} />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  viewLeft: {
    justifyContent: "center",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonEye: {
    justifyContent: "center",
    width: 25,
    height: 25,
  },
  viewLabel: {
    position: "absolute",
    top: -11,
    left: 22,
    zIndex: 2,
    paddingHorizontal: 4,
    justifyContent: "center",
    alignContent: "center",
    height: 22,
    backgroundColor: colors.c_ffffff,
  },
  label: {
    fontWeight: "500",
    fontSize: 15,
    color: colors.c_7B7B80,
    marginBottom: 8,
  },
  view: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.c_000_012,
    position: "relative",
  },
  placeholder: { fontSize: 14, color: colors.c_A5A5A5, fontWeight: "400" },
  hasError: {
    borderWidth: 1,
    borderColor: "red",
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    fontSize: 14,
    color: colors.c_A5A5A5,
    fontWeight: "400",
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  viewError: {
    marginTop: 8,
    marginBottom: 12,
  },
  txtError: {
    fontSize: 12,
    lineHeight: 14,
    color: "red",
  },
  textRequire: {
    color: colors.light_red,
  },
  paddingNoError: {
    paddingBottom: 20,
  },
});

export default InputDropdown;
