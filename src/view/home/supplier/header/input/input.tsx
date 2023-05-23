import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  StyleProp,
  TextStyle,
  KeyboardTypeOptions,
} from "react-native";
import { colors } from "../../../../../constants/colors";

interface TInput {
  value?: string | null;
  placeholder: string;
  onChangeText: (value: string) => void;
  styleView?: any;
  errorText?: string;
  title?: string;
  styleInput?: StyleProp<TextStyle>;
  required?: boolean;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
}

const Input = React.forwardRef<TextInput, TInput>((props, ref) => {
  return (
    <View style={props.styleView}>
      {props.title ? (
        <View style={styles.titleView}>
          <Text style={styles.title}>{props.title}</Text>
          {props.required ? <Text style={styles.required}>*</Text> : null}
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
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.c_ffffff,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.12)",
  },
  hasError: {
    borderWidth: 1,
    borderColor: "red",
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
  title: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    color: colors.c_7B7B80,
    marginBottom: 8,
  },
  required: {
    color: colors.c_FF3B30,
  },
  titleView: {
    flexDirection: "row",
  },
});
export default Input;
