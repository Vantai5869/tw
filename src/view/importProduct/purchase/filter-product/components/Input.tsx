import React from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import { colors } from "../../../../../constants/colors";

interface TInput {
  value?: string | any;
  placeholder: string;
  onChangeText: (value: string) => void;
  styleView?: any;
  errorText?: string;
  title?: string;
  styleInput?: StyleProp<TextStyle>;
  required?: boolean;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  autoFirst?: boolean;
}

const Input = React.forwardRef<TextInput, TInput>((props, ref) => {
  return (
    <View style={props.styleView}>
      {props.title ? (
        <View style={styles.textTitle}>
          <Text style={styles.title}>{props.title}</Text>
          {props.required ? <Text style={styles.textRequire}>*</Text> : null}
        </View>
      ) : null}
      <TextInput
        ref={ref}
        value={props.value || undefined}
        placeholderTextColor={colors.c_A3A3A3}
        style={[
          styles.input,
          !!props?.errorText && styles.hasError,
          props.styleInput,
        ]}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType || "default"}
        maxLength={props.maxLength}
      />
      {props.errorText ? (
        <View style={styles.viewError}>
          <Text style={styles.txtError}>{props.errorText}</Text>
        </View>
      ) : (
        <View style={styles.viewError} />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.c_ffffff,
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.c_000_012,
  },
  hasError: {
    borderWidth: 1,
    borderColor: "red",
  },
  viewError: {
    marginTop: 8,
    marginBottom: 10,
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

export default Input;
