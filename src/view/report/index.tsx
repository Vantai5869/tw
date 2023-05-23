import React, { useEffect } from "react";
import Chart from "./grow-up/chart";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { IconAngleRight, IconArrowRight } from "../../constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { ScreenNames } from "../../navigation/screen";
import { navigationRef } from "../../navigation/navigate";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  GetCategoryWareHouse,
  GetListProductWareHouse,
  selectProductWarehouse,
} from "../../redux/slice/warehouses/products-warehouse";
import i18n from "../../locale";

interface RPItemProp {
  id: number;
  label: string;
}

interface Prop {
  item: RPItemProp;
  props: any;
}
const ReportItem: React.FC<Prop> = ({ item, props }) => {
  const gotoScreen = (screenId: number) => {
    if (screenId === 1)
      navigationRef.navigate(ScreenNames.BestSellerProductsRp as never);
    if (screenId === 2) navigationRef.navigate(ScreenNames.OrderRp as never);
    if (screenId === 3) navigationRef.navigate(ScreenNames.GrowUp as never);
    if (screenId === 4)
      navigationRef.navigate(ScreenNames.RatedProduct as never);
    if (screenId === 5)
      navigationRef.navigate(ScreenNames.CanceledProduct as never);
  };
  return (
    <TouchableOpacity
      style={styles.reportItem}
      onPress={() => gotoScreen(item.id)}
    >
      <Text style={styles.rpItemText}>{item.label}</Text>
      <IconAngleRight
        stroke={colors.c_3A3A3C}
        fill={colors.c_3A3A3C}
        width={17}
      />
    </TouchableOpacity>
  );
};
export default function Report(props: any) {
  const dataList = [
    {
      id: 1,
      label: i18n.t("bestsell_rp"),
    },
    {
      id: 2,
      label: i18n.t("order_rp"),
    },
    {
      id: 3,
      label: i18n.t("growth_rp"),
    },
    {
      id: 4,
      label: i18n.t("rated_rp"),
    },
    {
      id: 5,
      label: i18n.t("cancel_rp"),
    },
  ];
  const dispatch = useAppDispatch();

  // const { category } = useAppSelector(selectProductWarehouse)
  useEffect(() => {
    dispatch(GetCategoryWareHouse({}));
  }, []);
  useEffect(() => {
    dispatch(
      GetListProductWareHouse({
        SortField: 2,
        SortType: 0,
      })
    );
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {dataList.map((item) => (
          <ReportItem item={item} props={props} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: colors.c_ffffff,
  },

  reportItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingRight: 6.5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  rpItemText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22,
    color: colors.c_3A3A3C,
  },
  itemIcon: {
    width: 7.5,
  },
});
