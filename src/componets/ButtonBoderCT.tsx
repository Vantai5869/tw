import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
} from "react-native";
import { colors } from "../constants/colors";

interface Props {
  onPress?: () => void;
  textButton: string;
  boderColor?: any;
  loading?: boolean;
  styleText: any;
  style?: any;
}

const ButtonBoder = React.memo((props: Props) => (
  <TouchableOpacity
    {...props}
    disabled={props.loading}
    activeOpacity={0.8}
    onPress={props.onPress}
    style={[{ ...styles.button, borderColor: props.boderColor }, props.style]}
  >
    {props.loading ? (
      <ActivityIndicator animating color={colors.c_ffffff} />
    ) : (
      <Text style={[styles.title, props.styleText]}>{props.textButton}</Text>
    )}
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.c_ffffff,
    paddingVertical: 14,
    borderWidth: 1,
    paddingHorizontal: 22,
  },
  title: { textAlign: "center" },
});

export default ButtonBoder;
