import React, { useEffect, useRef } from "react";
import {
  Image,
  Platform,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../constants/colors";
import { icons } from "../constants/icons";
import { isAndroid } from "../constants/untils";

type TInputSeaerch = {
  viewInput?: any;
  value?: string;
  isFocus?: boolean;
  inputStyle?: StyleProp<TextStyle>;
} & TextInputProps;

export default function InputSearch(props: TInputSeaerch) {
  const ref = useRef<TextInput>(null);

  useEffect(() => {
    if (props.isFocus) {
      setTimeout(() => ref?.current?.focus(), 200);
    }
  }, [props.isFocus]);

  const valLength = props.value?.length || 0;

  return (
    <View style={[styles.container, props.viewInput]}>
      <Image
        style={styles.icon}
        source={icons.ICON_SEARCH}
        resizeMode="contain"
      />
      {props.isFocus && isAndroid ? (
        <TextInput
          ref={ref}
          style={[styles.textInput, props.inputStyle]}
          placeholder="Nhập từ khoá tìm kiếm"
          value={props.value}
          numberOfLines={1}
          returnKeyType="next"
          selection={{
            start: valLength,
            end: valLength,
          }}
          {...props}
        />
      ) : (
        <TextInput
          ref={ref}
          style={[styles.textInput, props.inputStyle]}
          placeholder="Nhập từ khoá tìm kiếm"
          value={props.value}
          numberOfLines={1}
          {...props}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.c_ffffff,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    paddingVertical: Platform.OS === "ios" ? 0 : 0,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 14.3,
  },
  textInput: {
    fontWeight: "400",
    fontSize: 14,
    height: 43,
    overflow: "hidden",
    flex: 1,
  },
});
