import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  StyleProp,
  TextStyle,
  KeyboardTypeOptions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { colors } from "../constants/colors";
import { IconClose } from "../constants/icons";

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
  placeholderTextColor?: string;
  deleteAll?: () => void;
  showDelete?: boolean;
  autoFocus?: boolean;
}

export default function Input(props: TInput) {
  const [selections, setSelections] = useState<any>(null);
  const focusRef = useRef(null);

  useEffect(() => {
    if (props.autoFocus) {
      Platform.OS === "ios"
        ? focusRef?.current?.focus()
        : setTimeout(() => focusRef?.current?.focus(), 100);
    }
  }, [props.autoFocus]);
  const onBlurs = () => {
    // setValues(props.value);
    if (props.autoFirst) {
      setSelections({ start: 0, end: 0 });
    }
  };
  const onFocus = () => {
    if (props.autoFirst) {
      setSelections({
        start: props.value?.length,
        end: props.value?.length,
      });
    }
  };
  return (
    <View style={props.styleView}>
      {props.title ? (
        <View style={styles.textTitle}>
          <Text style={styles.title}>{props.title}</Text>
          {props.required ? <Text style={styles.textRequire}>*</Text> : null}
        </View>
      ) : null}
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
          },
          styles.inputView,
          !!props?.errorText && styles.hasError,
          props.styleInput,
        ]}
      >
        <TextInput
          onPressIn={() => setSelections(null)}
          selection={selections}
          onBlur={() => onBlurs()}
          onFocus={() => onFocus()}
          // selection={{ start: 0 }}
          // autoFocus={props.autoFocus}
          ref={focusRef}
          value={props.value}
          placeholderTextColor={
            props.placeholderTextColor
              ? props.placeholderTextColor
              : colors.c_A3A3A3
          }
          style={[
            styles.input,
            // !!props?.errorText && styles.hasError,
            props.styleInput,
          ]}
          placeholder={props.placeholder}
          onChangeText={(e) => {
            props.onChangeText(e);
            setSelections(null);
          }}
          keyboardType={props.keyboardType || "default"}
          maxLength={props.maxLength}
        />
        {props.showDelete ? (
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => props.deleteAll()}
          >
            <IconClose width={10} height={10} />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
      {props.errorText ? (
        <View style={styles.viewError}>
          <Text style={styles.txtError}>{props.errorText}</Text>
        </View>
      ) : (
        <View style={styles.viewError} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.c_ffffff,
    paddingVertical: 10,
    paddingHorizontal: 18,
    fontSize: 16,
    width: "90%",
  },
  inputView: {
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.c_ffffff,
    paddingHorizontal: 0,
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
