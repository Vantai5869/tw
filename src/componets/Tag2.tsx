import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleProp,
  TextStyle,
} from "react-native";
import { colors } from "../constants/colors";
import { MEDIA } from "../constants/media";
import { IconClosePrimary, IconStar } from "../constants/icons";
import { icons } from "../constants/icons";
import { formatNumber } from "../common/utils";
interface TProduct {
  label: string;
  isValue: boolean;
  onSelect: () => void;
  numberOfLines?: number;
  styleText?: StyleProp<TextStyle>;
}
export default function TagSearch(props: TProduct) {
  return (
    <TouchableOpacity style={styles.tags} onPress={() => props?.onSelect?.()}>
      <Text
        style={[styles.contentt, styles.colorText, props.styleText]}
        numberOfLines={props.numberOfLines}
      >
        {props.label}
      </Text>
      {props.isValue ? (
        <View style={styles.boxSortTag}>
          <IconClosePrimary width={11} height={11} />
        </View>
      ) : (
        <View></View>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  tags: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.c_blue,
    marginTop: 2.5,
    marginBottom: 2.5,
    marginLeft: 3,
    marginRight: 3,
    paddingLeft: 11,
    paddingRight: 11,
  },
  contentt: {},
  boxSortTag: {
    marginLeft: 5,
    width: 12,
    height: 12,
    // backgroundColor: "rgba(252, 131, 45, 0.1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  iconClose: {
    width: 18,
    height: 18,
    // color: "rgba(252, 131, 45, 1)",
  },
  colorText: {
    color: colors.c_3A3A3C,
  },
});
