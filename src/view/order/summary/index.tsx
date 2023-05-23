import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InputSearch from "../../../componets/InputSearchCT";
import { colors } from "../../../constants/colors";
import { IconWatch } from "../../../constants/icons";
import i18n from "../../../locale";
import { DIMENSIONS } from "./../../../common/utils";

interface Props {
  Status?: string;
  props?: any;
  item?: any;
}
const SummaryOrder: React.FC<Props> = () => {
  return (
    <View style={styles.viewCtn}>
      <View style={styles.viewXn}>
        <View style={styles.viewLeftXn}>
          <IconWatch width={24} height={24} fill={colors.c_a3a3a3} />
          <Text style={styles.textXn}>{i18n.t("order_waiting")}</Text>
        </View>
        <View style={styles.numberXn}>
          <Text style={styles.textNumberXn}>5</Text>
        </View>
      </View>
      <View style={styles.viewFl}>
        <View style={styles.viewLeftFl}>
          <Text style={styles.textCb}>{i18n.t("order_prepares")}</Text>
          <View style={styles.numberCb}>
            <Text style={styles.textNumberXn}>5</Text>
          </View>
        </View>
        <View style={styles.viewLeftDg}>
          <Text style={styles.textCb}>{i18n.t("order_delivering")}</Text>
          <View>
            <View style={styles.numberDg}>
              <Text style={styles.textNumberXn}>5</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.viewFl}>
        <View style={styles.viewLeftDh}>
          <Text style={styles.textCb}>{i18n.t("order_delete")}</Text>
          <View style={styles.numberBh}>
            <Text style={styles.textNumberXn}>5</Text>
          </View>
        </View>
        <View style={styles.viewLeftDgs}>
          <Text style={styles.textCb}>{i18n.t("delivered")}</Text>
          <View style={styles.numberDgs}>
            <Text style={styles.textNumberXn}>5</Text>
          </View>
        </View>
      </View>
      <View style={styles.mgt15}>
        <InputSearch
          placeholder={i18n.t("search order")}
          onChangeText={handleSearch}
          value={valueSearch}
        />
      </View>
      {returnTab()}
    </View>
  );
};
export default SummaryOrder;
const styles = StyleSheet.create({
  viewCtn: {
    paddingTop: 38,
    backgroundColor: colors.c_ffffff,
  },
  viewXn: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 19,
    paddingVertical: 15,
    alignContent: "center",
    backgroundColor: colors.c_f1fff5,
    borderRadius: 8,
    marginBottom: 8,
    marginHorizontal: 24,
  },
  viewLeftXn: {
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textXn: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.c_1f1f1f,
  },
  numberXn: {
    width: 24,
    height: 24,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: colors.c_a6ba1a,
    alignItems: "center",
    justifyContent: "center",
  },
  numberCb: {
    width: 24,
    height: 24,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: colors.c_007AFF,
    alignItems: "center",
    justifyContent: "center",
  },
  numberDg: {
    width: 24,
    height: 24,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: colors.c_FC832D,
    alignItems: "center",
    justifyContent: "center",
  },
  numberBh: {
    width: 24,
    height: 24,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: colors.c_ff3b30,
    alignItems: "center",
    justifyContent: "center",
  },
  numberDgs: {
    width: 24,
    height: 24,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: colors.c_5AC8FA,
    alignItems: "center",
    justifyContent: "center",
  },
  textNumberXn: {
    fontWeight: "500",
    fontSize: 14,
    color: colors.c_ffffff,
  },
  viewFl: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  viewLeftFl: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: colors.c_eaf4ff,
    borderRadius: 8,
    width: (DIMENSIONS.width - 55) / 2,
    alignItems: "center",
  },
  viewLeftDg: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: colors.c_fff4e6,
    borderRadius: 8,
    width: (DIMENSIONS.width - 55) / 2,
    alignItems: "center",
  },
  viewLeftDh: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: colors.c_fff2f1,
    borderRadius: 8,
    width: (DIMENSIONS.width - 55) / 2,
    alignItems: "center",
  },
  viewLeftDgs: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: colors.c_e9f8ff,
    borderRadius: 8,
    width: (DIMENSIONS.width - 55) / 2,
    alignItems: "center",
  },
  textCb: {
    fontWeight: "500",
    color: colors.c_1f1f1f,
    fontSize: 14,
  },
  wrapTab: {
    paddingVertical: 22,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  scrollTab: {
    // borderBottomWidth: 2,
    // borderBottomColor: colors.c_D7D7D7,
  },
  itemTab: {
    paddingBottom: 18,
    paddingHorizontal: 4,
    marginRight: 18,
    marginBottom: -2,
  },
  activeTab: {
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.c_667403,
    borderStyle: "solid",
  },
  txtActiveTabs: {},
  txtTab: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    color: "#636366",
    textAlign: "center",
  },
  txtActiveTab: { color: colors.primary },
  mgt15: {
    marginTop: 15,
    paddingHorizontal: 24,
  },
  viewCards: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    marginTop: 30,
    marginBottom: 30,
    paddingBottom: 6,
  },
  itemCards: {
    paddingTop: 6,
  },
});
