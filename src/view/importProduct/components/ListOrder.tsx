import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../../constants/colors";
import {
  IconShoppingCartPlus,
  ShoppingCartCacnelSVG,
} from "../../../constants/icons";
import { translate } from "../../../locale";
import {
  GetOrderImport,
  selectOrderImport,
} from "../../../redux/slice/Sales/order-import";
import OrderItem from "./OrderItem";

interface Props {
  Status?: string;
}
export const ListOrder: React.FC<Props> = ({ Status }) => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(selectOrderImport);

  useEffect(() => {
    dispatch(
      GetOrderImport({
        skip: 0,
        take: 50,
        Status,
      })
    );
  }, [Status]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={{ marginVertical: 25 }}
      />
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        {orders?.items && orders?.items?.length > 0 ? (
          <>
            {orders?.items?.map((item) => {
              return (
                <View key={item?.id}>
                  <OrderItem order={item} status={Status || "1"} />
                </View>
              );
            })}
          </>
        ) : (
          <View style={styles.cartArea}>
            <View style={styles.cartImage}>
              <IconShoppingCartPlus width={32} height={30} />
            </View>
            <Text style={styles.contentCart}>{translate("no_orders")}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 23,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  wrapItem: {},
  titleNew: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 17,
    borderBottomColor: colors.c_f3f4f6,
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  titleNewLeft: {
    flexDirection: "row",
    flex: 1,
    paddingRight: 30,
  },
  titleNewIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
    borderRadius: 22,
    backgroundColor: colors.c_F3F3F3,
  },
  titleNewText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.c_48484A,
    flex: 1,
  },
  inforOrder: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 9,
    alignItems: "center",
    marginBottom: 20,
    // paddingHorizontal: 24,
  },
  inforOrderLeft: {
    flexDirection: "row",
    flex: 1,
  },
  inforOrderMa: {
    paddingHorizontal: 8.5,
    paddingVertical: 5,
    backgroundColor: colors.c_blue,
    borderRadius: 4,
    marginRight: 9,
    width: "50%",
  },
  inforOrderMaText: {
    fontSize: 10,
    fontWeight: "400",
    color: colors.c_667403,
  },
  inforOrderTime: {
    fontSize: 10,
    fontWeight: "400",
    color: colors.c_a3a3a3,
    alignSelf: "center",
  },
  inforOrderStatus: {
    fontSize: 10,
    fontWeight: "400",
    color: colors.c_007AFF,
  },
  cartArea: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  cartImage: {
    backgroundColor: colors.c_blue,
    borderRadius: 100,
    marginTop: 31,
    width: 52,
    height: 52,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  contentCart: {
    marginTop: 20,
    fontSize: 18,
  },
});
