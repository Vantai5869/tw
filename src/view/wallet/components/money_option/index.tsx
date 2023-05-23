import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { formatNumber } from "../../recharge";
interface Props {
  data?: any;
  setChecked: (value: number) => void;
  color: string[];
  textColor: string;
}
const MoneyOption: React.FC<Props> = ({
  data,
  setChecked,
  color,
  textColor,
}) => {
  const handlePress = (value: any) => {
    setChecked(value);
  };
  return (
    <TouchableOpacity onPress={() => handlePress(data)}>
      <LinearGradient
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        colors={color}
        style={{ borderRadius: 9, padding: 1.5 }}
      >
        <View style={styles.wrapper}>
          <Text style={[styles.value, { color: textColor }]}>
            {formatNumber(data.value)}
          </Text>
          {/* </LinearGradient> */}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default MoneyOption;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 0,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 14,
    // margin: 2,
    backgroundColor: "white",
    // borderRadius: 5,
  },
  value: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
    // margin: 4,
    // paddingHorizontal: 6,
    textAlign: "center",
    // backgroundColor: "white",
    // color: colors.c_FC832D,
    // fontSize: 12,
  },
});
