import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { colors } from "../constants/colors";
import { IconEyeOpen, icons } from "../constants/icons";

interface TInputPassword {
  value?: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  styleView?: any;
  errorText?: string;
  title?: string;
  required?: boolean;
}

export default function InputPassword(props: TInputPassword) {
  const [isShowPassword, setIsShowPassword] = useState(true);
  const handleShowPass = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <View>
      <View style={styles.textTitle}>
        <Text style={styles.title}>{props.title}</Text>
        {props.required ? <Text style={styles.textRequire}>*</Text> : null}
      </View>
      <View
        style={[
          styles.container,
          props.styleView,
          !!props?.errorText && styles.hasError,
        ]}
      >
        <TextInput
          value={props?.value}
          placeholderTextColor={colors.c_A3A3A3}
          style={[
            styles.input,
            Platform.OS === "android" && styles.inputAndroid,
          ]}
          secureTextEntry={isShowPassword}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
        />
        <TouchableOpacity onPress={handleShowPass}>
          {isShowPassword ? (
            <Image
              source={icons.ICON_EYE_OFF}
              style={styles.icon}
              resizeMode="contain"
            />
          ) : (
            <IconEyeOpen width={20} height={20} stroke={colors.c_8E8E93} />
          )}
        </TouchableOpacity>
      </View>
      {props.errorText ? (
        <View style={styles.viewError}>
          <Text style={styles.txtError}>{props.errorText}</Text>
        </View>
      ) : (
        <View style={styles.viewError}></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: colors.c_ffffff,
    borderRadius: 10,
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.12)",
  },
  input: {
    width: "90%",
    borderRadius: 10,
    fontSize: 16,
    color: colors.c_000000,
  },
  inputAndroid: {
    height: 50,
  },
  hasError: {
    borderWidth: 1,
    borderColor: "red",
  },
  icon: {
    width: 22,
    height: 22,
  },
  viewError: {
    marginTop: 5,
    marginBottom: 20,
  },
  txtError: {
    fontSize: 12,
    lineHeight: 14,
    color: "red",
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.c_7B7B80,
    marginBottom: 8,
  },
  textTitle: {
    flexDirection: "row",
  },
  textRequire: {
    color: colors.light_red,
  },
});
