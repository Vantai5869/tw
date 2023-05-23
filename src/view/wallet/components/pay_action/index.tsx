import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../constants/colors";
import { formatNumber } from "../../recharge";
interface Props {
  data?: any;
}
const PayAction: React.FC<Props> = ({ data }) => {
  const chooseAction = () => {
    switch (data.action) {
      case 1:
        return {
          action: "Nạp tiền vào ví",
          value: `+${data.value}`,
          textColor: colors.c_34C759,
        };
      case 2:
        return {
          action: "Thanh toán",
          value: `-${data.value}`,
          textColor: colors.c_3A3A3C,
        };
    }
  };
  const chooseType = () => {
    switch (data.type) {
      case 1:
        return "(Ngân Hàng)";
      case 2:
        return "(QR Code)";
    }
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.actionWrapper}>
        <Text style={styles.textAction}>{chooseAction()?.action}</Text>
        <Text style={styles.textTime}>{data.time}</Text>
      </View>
      <View style={styles.valueWrapper}>
        <Text style={[styles.textValue, { color: chooseAction()?.textColor }]}>
          {formatNumber(chooseAction()!!.value)}vnđ
        </Text>
        <Text style={[styles.textTime, { textAlign: "right" }]}>
          {chooseType()}
        </Text>
      </View>
    </View>
  );
};
export default PayAction;
export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
  actionWrapper: {},
  textAction: {
    color: colors.c_3A3A3C,
    fontSize: 16,
    lineHeight: 22,
  },
  textTime: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 22,
    color: colors.c_AEAEB2,
  },
  valueWrapper: {},
  textValue: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: "right",
  },
});
