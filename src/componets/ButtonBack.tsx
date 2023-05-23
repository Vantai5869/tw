import React, { ReactNode } from "react";
import {
  Image,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { icons } from "../constants/icons";

interface Props {
  tintColor?: string;
  style?: any;
  title?: String;
  icon?: any;
  login?: any;
  onPress?: () => void;
  viewStyle?: StyleProp<ViewStyle>;
  leftIcon?: ReactNode;
}

const ButtonBack = React.memo((props: Props) => (
  <TouchableOpacity
    style={[styles.btBack, props.viewStyle]}
    onPress={props.onPress}
  >
    {props.title ? (
      <Text children={props.title} style={styles.title} />
    ) : (
      <>
        {props.leftIcon ? (
          props.leftIcon
        ) : (
          <Image
            source={props.icon ? props.icon : icons.ICON_BACK}
            style={[styles.icon, props.style, { tintColor: props.tintColor }]}
            resizeMode="contain"
          />
        )}
      </>
    )}
  </TouchableOpacity>
));

const styles = {
  btBack: {
    // padding: 5,
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: "#fff",
    marginLeft: 16,
  },
  title: {
    marginLeft: 15,
  },
};

export default ButtonBack;
