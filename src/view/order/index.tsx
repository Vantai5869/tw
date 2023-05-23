import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ImageHeaderScrollView,
  TriggeringView,
} from "react-native-image-header-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DIMENSIONS } from "../../common/utils";
import InputSearch from "../../componets/InputSearchCT";
import { colors } from "../../constants/colors";
import { IconWatch } from "../../constants/icons";
import i18n, { translate } from "../../locale";
import { ScreenNames } from "../../navigation/screen";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  GetOrder,
  GetSummaryOrders,
  selectOrderByRetailer,
} from "../../redux/slice/Order/retailer-order";
import CardProductOrder from "./cardProductOrder";
import CardSearch from "./cardSearch/index";

export const ORDER_TABS = [
  {
    id: "2",
    label: translate("order_waiting"),
  },
  {
    id: "3",
    label: translate("order_prepares"),
  },
  {
    id: "4",
    label: translate("order_delivering"),
  },
  {
    id: "5",
    label: translate("delivered"),
  },
  {
    id: "0",
    label: translate("order_delete"),
  },
];

const Order = ({ ...props }) => {
  const isFocused = useIsFocused();
  const [tab, setTab] = useState<string>("2");
  const [valueSearch, setValueSearch] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const { orderSummary } = useAppSelector(selectOrderByRetailer);
  const [loadmore, setLoadmore] = useState(false);
  const [refreshing, setRefresing] = useState(false);
  const [listHeight, setListHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const onHandleTab = (id: string) => {
    setValueSearch("");
    setSearch("");
    setTab(id);
  };
  useEffect(() => {
    if (isFocused == true) {
      dispatch(GetSummaryOrders({}));
      setLoadmore(false);
    }
  }, [isFocused]);

  const insets = useSafeAreaInsets();

  const returnTab = (isFixed?: boolean) => {
    return (
      <View
        style={[
          styles.wrapTab,
          isFixed && { paddingTop: 10, backgroundColor: "white" },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollTab}
        >
          {ORDER_TABS?.map((t) => (
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
        </ScrollView>
      </View>
    );
  };

  const handleSearch = (value: string) => {
    setValueSearch(value);
  };
  const handlePress = () => {
    setSearch(valueSearch);
  };

  const isCloseToBottom = (e: any) => {
    if (
      e.nativeEvent.contentOffset.y.toFixed(0) ===
      (listHeight - scrollViewHeight).toFixed(0)
    ) {
      // const next = skip + 10;
      setLoadmore(true);
    }
  };
  return (
    <View style={styles.container}>
      <ImageHeaderScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
        maxHeight={355}
        minHeight={50}
        renderForeground={() => (
          <View style={styles.viewCtn}>
            <TouchableOpacity
              style={styles.viewXn}
              onPress={() => onHandleTab("2")}
            >
              <View style={styles.viewLeftXn}>
                <IconWatch width={24} height={24} fill={colors.c_a3a3a3} />
                <Text style={styles.textXn}>{i18n.t("order_waiting")}</Text>
              </View>
              <View style={styles.numberXn}>
                <Text style={styles.textNumberXn}>
                  {orderSummary?.waitAccept ? orderSummary?.waitAccept : 0}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.viewFl}>
              <TouchableOpacity
                style={styles.viewLeftFl}
                onPress={() => onHandleTab("3")}
              >
                <Text style={styles.textCb}>{i18n.t("order_prepares")}</Text>
                <View style={styles.numberCb}>
                  <Text style={styles.textNumberXn}>
                    {orderSummary?.preparing ? orderSummary?.preparing : 0}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.viewLeftDg}
                onPress={() => onHandleTab("4")}
              >
                <Text style={styles.textCb}>{i18n.t("order_delivering")}</Text>
                <View>
                  <View style={styles.numberDg}>
                    <Text style={styles.textNumberXn}>
                      {orderSummary?.shipping ? orderSummary?.shipping : 0}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.viewFl}>
              <TouchableOpacity
                style={styles.viewLeftDh}
                onPress={() => onHandleTab("0")}
              >
                <Text style={styles.textCb}>{i18n.t("order_delete")}</Text>
                <View style={styles.numberBh}>
                  <Text style={styles.textNumberXn}>
                    {orderSummary?.cancelled ? orderSummary?.cancelled : 0}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.viewLeftDgs}
                onPress={() => onHandleTab("5")}
              >
                <Text style={styles.textCb}>{i18n.t("delivered")}</Text>
                <View style={styles.numberDgs}>
                  <Text style={styles.textNumberXn}>
                    {orderSummary?.delivered ? orderSummary?.delivered : 0}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.mgt15}>
              <InputSearch
                placeholder={i18n.t("search order")}
                onChangeText={(e) => handleSearch(e)}
                value={valueSearch}
                onPress={handlePress}
              />
            </View>
            {returnTab()}
          </View>
        )}
        renderFixedForeground={() => returnTab(true)}
        maxOverlayOpacity={1}
        minOverlayOpacity={1}
        onScroll={(e) => {
          isCloseToBottom(e);
        }}
        onContentSizeChange={(contentWidth, contentHeight) => {
          if (!loadmore) {
            setListHeight(contentHeight);
          }
        }}
        onLayout={(e) => {
          const { height } = e.nativeEvent.layout;
          if (!loadmore) {
            setScrollViewHeight(height);
          }
        }}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      >
        <ScrollView style={{ flex: 1 }}>
          <CardProductOrder
            status={tab}
            props={props}
            code={search}
            loadmore={loadmore}
            setLoadmore={(e) => setLoadmore(e)}
          />
        </ScrollView>
      </ImageHeaderScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    backgroundColor: colors.c_FFF4E6,
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
    // marginBottom: 10,
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
    borderBottomColor: colors.primary,
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

export default Order;
