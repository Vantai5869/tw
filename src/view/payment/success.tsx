import { CommonActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Button from "../../componets/Button";
import { colors } from "../../constants/colors";
import { MEDIA } from "../../constants/media";
import { translate } from "../../locale";
import { NavigatorName } from "../../navigation/screen";
import {
  GetDetailOrder,
  selectOrderImport,
} from "../../redux/slice/Sales/order-import";
import { OrderImportType } from "../../redux/type/Sales/order-import";

export default function PaymentSuccess({ ...props }) {
  const insets = useSafeAreaInsets();
  const { loading, newOrder } = useSelector(selectOrderImport);

  const [orderList, setOrderList] = useState<string[]>();

  useEffect(() => {
    const newOrderList = newOrder?.listRetailerOrders?.map(
      (el: OrderImportType) => el?.orderNumber || ""
    ) || [newOrder?.paymentID || ""];
    if (newOrderList?.length > 0) {
      setOrderList(newOrderList);
    }
  }, [newOrder]);

  const handleClick = () => {
    props.navigation.popToTop();
  };

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ paddingTop: 40 }}>
            <View style={styles.flexCenter}>
              <Image source={MEDIA.IMAGE_LOGO} style={styles.logo} />
              <Image
                source={MEDIA.PAYMENT_SUCCESS_SUPPLIER}
                style={styles.icon}
              />
            </View>
            <View style={{ paddingHorizontal: 60 }}>
              <Text style={styles.txtTitle}>
                {translate("thank_you_for_buying")}
              </Text>
              <Text style={styles.txtCodeLabel}>{translate("your_order")}</Text>

              <View style={styles.flexCenter}>
                <View style={styles.viewCode}>
                  <Text style={styles.txtCode}>
                    {orderList && orderList?.length > 0
                      ? orderList?.join(", ")
                      : newOrder?.paymentID}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 10 }}
        >
          <Button
            textButton={translate("continue_buy")}
            styleBackground={styles.btnContinue}
            styleText={styles.btnTextContinue}
            onPress={handleClick}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.c_ffffff,
    flex: 1,
  },
  flexCenter: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapImage: {},
  logo: { width: 111, height: 85, marginBottom: 30 },
  icon: { width: 232, height: 232, marginBottom: 30 },
  txtTitle: {
    fontSize: 19,
    lineHeight: 21,
    color: colors.primary,
    fontWeight: "600",
    textAlign: "center",
  },
  txtCodeLabel: {
    fontSize: 18,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 10,
    color: colors.c_434343,
  },
  viewCode: {
    borderRadius: 6,
    backgroundColor: colors.c_blue,
    paddingHorizontal: 17,
    paddingVertical: 8,
    marginTop: 15,
  },
  txtCode: { fontSize: 14, lineHeight: 17, color: colors.primary },
  btnContinue: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  btnTextContinue: { color: colors.primary },
});
