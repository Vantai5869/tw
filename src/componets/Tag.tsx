import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { IconHome31, IconOffice } from "../constants/icons";
import { translate } from "../locale/index";
interface TProduct {
  label: string;
  isSelect?: boolean;
  onSelect?: () => void;
  type?: string;
  isValue?: boolean;
  numberOfLines?: number
}
export default function TagIconLabel(props: TProduct) {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      {props.type === "home" ? (
        <View style={props.isSelect ? styles.tags : styles.tagsNoPick}>
          <View style={styles.iconPadding}>
            <IconHome31 stroke={colors.primary} />
          </View>
          <View>
            <Text style={styles.text}>{translate(props.label)}</Text>
          </View>
        </View>
      ) : (
        <View style={props.isSelect ? styles.tags : styles.tagsNoPick}>
          <View style={styles.iconPadding}>
            <IconOffice stroke={colors.primary} />
          </View>
          <View>
            <Text style={styles.text}>{translate(props.label)}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  tags: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 44,
    // width: (Dimensions.get("window").width - 110) / 2,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: colors.c_secondary,
    borderWidth: 1,
    borderColor: colors.primary,
    marginRight: 10,
  },
  tagsNoPick: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 44,
    // width: (Dimensions.get("window").width - 110) / 2,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: colors.c_ffffff,
    borderWidth: 1,
    borderColor: colors.c_000_01,
    marginRight: 10,
  },
  contentt: {},
  boxSortTag: {
    marginLeft: 5,
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
  colorText: {},
  viewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
    color: colors.c_3A3A3C,
  },
  iconPadding: {
    paddingRight: 10,
  },
});
