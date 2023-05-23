import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { colors } from "../constants/colors";
import { IconCheckDone } from "../constants/icons";
import { translate } from "../locale/index";
interface TProduct {
  label: string;
  isSelect?: boolean;
  onSelect: (id: any) => void;
  group?: string;
  id?: string;
}
export default function TagGroupLabel(props: TProduct) {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.tags}>
        <View style={styles.group}>
          <Text> {props.group}</Text>
        </View>
        {props.isSelect ? (
          <View style={styles.checkDone}>
            <View style={styles.textView}>
              <Text style={styles.textDone}>{props.label}</Text>
            </View>
            <View>
              <IconCheckDone stroke={colors.primary} />
            </View>
          </View>
        ) : (
          <View style={styles.textView}>
            <Text style={styles.text}>{props.label}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  tags: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    width: Dimensions.get("window").width,
    backgroundColor: colors.c_ffffff,
    borderBottomWidth: 1,
    borderColor: colors.c_000_01,
  },

  boxSortTag: {
    width: 12,
    height: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  iconClose: {
    width: 18,
    height: 18,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: colors.c_3A3A3C,
  },
  textDone: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: colors.primary,
  },
  group: { width: Dimensions.get("window").width * 0.1, paddingLeft: 10 },
  textView: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkDone: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
});
