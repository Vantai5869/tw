import React, { ReactNode, useEffect, useState } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../constants/colors";
import { IconCheckbox, icons } from "../constants/icons";

interface Props {
  checked: boolean;
  label?: string;
  onPress: (data: boolean) => void;
  typeRadio: boolean;
  style?: StyleProp<ViewStyle>;
  node?: ReactNode;
  styleNode?: StyleProp<ViewStyle>;
  styleLabel?: StyleProp<TextStyle>;
  size?: "small";
  disable?: boolean;
  required?: boolean;
  styleRadio?: StyleProp<ViewStyle>;
}

export const CheckBox = React.memo<Props>((props) => {
  const [isChecked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  return (
    <TouchableOpacity
      onPress={() => {
        if (props.disable) {
          return false;
        } else {
          if (props.required) {
            if (isChecked) {
            } else {
              setChecked((prev) => !prev);
              props.onPress(isChecked);
            }
          } else {
            setChecked((prev) => !prev);
            if (isChecked) {
              props.onPress(!isChecked);
            } else {
              props.onPress(isChecked);
            }
          }
        }
      }}
      activeOpacity={1}
      style={[styles.wrapCheckbox, { alignItems: "center" }, props.style]}
    >
      {isChecked ? (
        props.typeRadio ? (
          <View style={[styles.btnRadio, styles.wrapActive, props.styleRadio]}>
            <View style={styles.checked}></View>
          </View>
        ) : (
          <IconCheckbox width={18} height={18} />
        )
      ) : (
        <View
          style={[
            styles.box,
            props.typeRadio && styles.btnRadio,
            props.typeRadio && props.styleRadio,
          ]}
        ></View>
      )}
      {props.node ? (
        <View style={[styles.boxRight, props.styleNode]}>{props.node}</View>
      ) : null}
      {props.label ? (
        <Text style={[styles.labelView, props.styleLabel]}>{props.label}</Text>
      ) : null}
    </TouchableOpacity>
  );
});

// export default CheckBox;

const styles = StyleSheet.create({
  wrapCheckbox: {
    flexDirection: "row",
  },
  box: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: colors.c_8E8E93,
    backgroundColor: colors.c_ffffff,
  },
  icon: {
    width: 18,
    height: 18,
  },

  btnRadio: {
    width: 20,
    height: 20,
    borderRadius: 20,
    padding: 3,
    borderWidth: 2,
    borderColor: colors.c_919191,
    marginTop: 3,
  },
  wrapActive: {
    borderColor: colors.primary,
  },
  checked: {
    backgroundColor: colors.primary,
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  boxRight: {
    paddingLeft: 18,
  },
  labelView: {
    paddingLeft: 14,
    fontSize: 12,
    lineHeight: 16,
    color: colors.c_636366,
    flex: 1,
  },
});
