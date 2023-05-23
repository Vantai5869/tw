import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../constants/colors";
import { DotIcon } from "../../../../constants/icons";

interface Props {
  index: number;
  value: number;
  year: number;
}
const Popup: React.FC<Props> = ({ index, value, year }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.date}>{`T${index + 1}/${year}`}</Text>
      <View style={styles.value}>
        <DotIcon />
        <Text style={styles.txtValue}>{value.toString() + " SP"}</Text>
      </View>
      <Text style={styles.content}>Sản phẩm đã bán</Text>
    </View>
  );
};
export default Popup;

const styles = StyleSheet.create({
  wrapper: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.c_ffffff,
  },
  value: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 14.52,
    color: colors.c_48484A,
  },
  txtValue: {
    marginLeft: 4,
    fontWeight: "600",
    fontSize: 14,
    color: colors.c_FEB336,
  },
  content: {
    fontWeight: "600",
    fontSize: 10,
    lineHeight: 12.1,
    color: colors.c_8E8E93,
  },
});
