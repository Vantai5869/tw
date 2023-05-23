import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  StyleProp,
  TextStyle,
  ViewStyle,
  View,
} from "react-native";
import { colors } from "../constants/colors";

interface Props {
  onPress?: () => void;
  textButton: string;
  loading?: boolean;
  styleBackground?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  activeOpacity?: number;
  style?: any;
  icon?: any;
}

const Button = React.memo((props: Props) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={props.loading}
      activeOpacity={props.activeOpacity || 0.8}
      onPress={props.onPress}
      style={[styles.button, props.styleBackground]}
    >
      {props.loading ? (
        <ActivityIndicator animating color={colors.c_ffffff} />
      ) : (
        <View style={props.icon ? styles.fl : null}>
          {props?.icon && props.icon}
          <Text style={[styles.title, props.styleText]}>
            {props.textButton}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  title: { textAlign: "center" },
  fl: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Button;
