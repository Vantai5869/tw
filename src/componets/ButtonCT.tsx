import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";
import { colors } from "../constants/colors";
import { GradientView } from "./GradientView";

interface Props {
  onPress?: () => void;
  textButton: string;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  styleText?: StyleProp<TextStyle>;
  gradientColor?: string[];
  styleBackground?: StyleProp<TextStyle>;
  icon?: any;
  styleBorder?: StyleProp<ViewStyle>;
}

const ButtonGradient = React.memo((props: Props) => (
  <TouchableOpacity
    {...props}
    disabled={props.loading}
    activeOpacity={0.8}
    onPress={props.onPress}
    style={[styles.viewButton, props.styleBorder]}
  >
    <GradientView
      color={props.gradientColor}
      style={[styles.button, props.style]}
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
    </GradientView>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  viewButton: {
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    borderRadius: 10,
    // paddingVertical: 14,
  },
  title: { textAlign: "center" },
  fl: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ButtonGradient;
