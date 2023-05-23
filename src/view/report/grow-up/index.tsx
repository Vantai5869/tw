import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DIMENSIONS } from "../../../common/utils";
import { colors } from "../../../constants/colors";
import Chart from "./chart";
import { translate } from "./../../../locale/index";
import handleLogin from "./../../../redux/service/Authen/login";
import Filter from "./filter";

const FILTER_TABS = [
  {
    id: "1",
    label: translate("Số lượng bán theo ngành hàng"),
  },
  {
    id: "2",
    label: translate("Số lượng bán theo sản phẩm"),
  },
  {
    id: "3",
    label: translate("Doanh thu"),
  },
];
const GrowUp = ({ ...props }) => {
  const [tab, setTab] = useState<string>("1");
  const onHandleTab = (id: string) => {
    setTab(id);
  };
  const Tab = () => {
    return (
      <View style={[styles.wrapTab]}>
        <View
          //   horizontal
          //   showsHorizontalScrollIndicator={false}
          style={styles.scrollTab}
        >
          {FILTER_TABS?.map((t) => (
            <View style={tab === t.id && styles.txtActiveTabs}>
              <TouchableOpacity
                key={t.id}
                style={[styles.itemTab, tab === t.id && styles.activeTab]}
                onPress={() => onHandleTab(t.id)}
              >
                <Text
                  style={[styles.txtTab, tab === t.id && styles.txtActiveTab]}
                >
                  {t.label}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      {Tab()}
      <View style={{ marginBottom: 16 }}>
        <Filter tab={tab} />
      </View>
      <Chart />
    </ScrollView>
  );
};
export default GrowUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  wrapTab: {
    paddingVertical: 22,
    paddingHorizontal: 24,
    marginBottom: 10,
    backgroundColor: "white",
  },
  scrollTab: {
    height: 50,
    width: DIMENSIONS.width - 48,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
  },
  txtActiveTabs: {},
  itemTab: {
    height: "100%",
    width: (DIMENSIONS.width - 48) / 3,
    marginBottom: -2,
    borderBottomWidth: 2,
    borderBottomColor: colors.c_AEAEB2,
    justifyContent: "center",
  },
  activeTab: {
    width: (DIMENSIONS.width - 48) / 3,
    marginBottom: -2,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    borderStyle: "solid",
    justifyContent: "center",
  },
  txtTab: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    color: "#636366",
    textAlign: "center",
    alignItems: "center",
  },
  txtActiveTab: { color: colors.primary },
});
