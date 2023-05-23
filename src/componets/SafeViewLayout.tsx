import React from "react";
import { SafeAreaView, StyleProp, ViewStyle } from "react-native";

type Props = React.PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

const SafeViewLayout: React.FC<Props> = ({ ...props }) => {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: "white" }, props.style]}>
      {props.children}
    </SafeAreaView>
  );
};

export default SafeViewLayout;
