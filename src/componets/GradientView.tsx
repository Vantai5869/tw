import React from "react";
import { ViewProps } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../constants/colors";

type Props = React.PropsWithChildren<{ color?: string[] } & ViewProps>;

export const GradientView = (props: Props) => {
  return (
    <LinearGradient
      colors={props.color ? props.color : colors.gradientNext}
      // start={{ x: 0, y: 0.75 }}
      // end={{ x: 1, y: 0.25 }}
      {...props}
    >
      {props.children}
    </LinearGradient>
  );
};
