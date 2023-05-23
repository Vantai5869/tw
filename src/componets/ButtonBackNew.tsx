import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { icons } from "../constants/icons";

interface Props {
  tintColor?: string;
  style?: any;
  title?: String;
  icon?: any;
  login?: any;
  onPress?: () => void;
}

const ButtonBackNew = React.memo((props: Props) => (
  <TouchableOpacity style={styles.btBack} onPress={props.onPress}>
    {props.title ? (
      <Text children="x" style={styles.title} />
    ) : (
      <>
        <Image
          source={props.icon ? props.icon : icons.ICON_LEFT}
          style={[styles.icon, props.style]}
          resizeMode="contain"
        />
      </>
    )}
  </TouchableOpacity>
));

const styles = {
  btBack: {
    padding: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 18,
  },
  title: {
    marginLeft: 15,
  },
};

export default ButtonBackNew;
