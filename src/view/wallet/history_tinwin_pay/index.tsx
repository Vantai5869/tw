import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../constants/colors";
import PayAction from "../components/pay_action";

const DATA = [
  {
    id: 1,
    action: 1,
    value: "100000",
    time: "21-04-2022 11:37",
    type: 1,
  },
  {
    id: 2,
    action: 2,
    value: "100000",
    time: "21-04-2022 11:37",
    type: 2,
  },
  {
    id: 3,
    action: 2,
    value: "100000",
    time: "21-04-2022 11:37",
    type: 2,
  },
  {
    id: 4,
    action: 2,
    value: "100000",
    time: "21-04-2022 11:37",
    type: 2,
  },
  {
    id: 5,
    action: 1,
    value: "100000",
    time: "21-04-2022 11:37",
    type: 1,
  },
  {
    id: 6,
    action: 1,
    value: "100000",
    time: "21-04-2022 11:37",
    type: 1,
  },
];
function HistoryTinWinPay() {
  return (
    <ScrollView style={styles.container}>
      {DATA.map((item) => (
        <View key={item.id} style={styles.itemWrapper}>
          <PayAction data={item} />
        </View>
      ))}
    </ScrollView>
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.c_ffffff,
    paddingHorizontal: 26,
    paddingVertical: 10,
  },
  itemWrapper: {
    // marginBottom: 32,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: colors.c_f9f9f9,
  },
});
export default HistoryTinWinPay;
