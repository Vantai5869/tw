import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors } from "../constants/colors";

interface TInput {
  value?: string | null | any;
  placeholder: string;
  onChangeText: (value: string) => void;
  styleView?: any;
  errorText?: string;
  title?: string;
  numberOfLine?: number;
}

export default function InputLine(props: TInput) {
  return (
    <TouchableOpacity style={[props.styleView]}>
      {props.title ? (
        <Text style={styles.title}>{props.title}</Text>
      ) : (
        <View></View>
      )}
      <TextInput
        value={props.value}
        placeholderTextColor={colors.c_A3A3A3}
        style={[styles.input, !!props?.errorText && styles.hasError]}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        multiline={true}
        numberOfLines={props.numberOfLine ? props.numberOfLine : undefined}
      />
      {props.errorText ? (
        <View style={styles.viewError}>
          <Text style={styles.txtError}>{props.errorText}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    backgroundColor: colors.c_ffffff,
    fontSize: 16,
  },
  styleView: {
    borderWidth: 1,
    borderColor: "red",
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
    color: colors.c_7B7B80,
    marginBottom: 8,
  },
});
