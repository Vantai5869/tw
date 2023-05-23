import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { DIMENSIONS } from "../../common/utils";
import ButtonBackNew from "../../componets/ButtonBackNew";
import { colors } from "../../constants/colors";
import i18n from "../../locale";
import { navigationRef } from "../navigate";
import DeliveryAddress from "../../view/profile/address";
import Profile from "../../view/profile";
import { ScreenNames } from "../screen";
import SettingProfile from "../../view/profile/settingProfile";
import GrowUp from "../../view/report/grow-up";
import Report from "../../view/report";
import CanceledProduct from "../../view/report/canceled-product";
import OrderRp from "../../view/report/orderRp";
import BestSellerProductsRp from "../../view/report/bestSellerProductsRp";
import RateedProduct from "../../view/report/rated-product";
const Navigation = createStackNavigator();

function ReportNavigator() {
  return (
    <Navigation.Navigator initialRouteName="Report">
      <Navigation.Screen
        name={ScreenNames.Report}
        component={Report}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("report"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigationRef.goBack()} />
          ),
        }}
      />
      <Navigation.Screen
        name={ScreenNames.CanceledProduct}
        component={CanceledProduct}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("cancel_rp"),
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.c_EAF4FF },
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigationRef.goBack()} />
          ),
        }}
      />
      <Navigation.Screen
        name={ScreenNames.OrderRp}
        component={OrderRp}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("order_rp"),
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigationRef.goBack()} />
          ),
        }}
      />
      <Navigation.Screen
        name={ScreenNames.GrowUp}
        component={GrowUp}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("growth_rp"),
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigation.goBack()} />
          ),
        })}
      />

      <Navigation.Screen
        name={ScreenNames.BestSellerProductsRp}
        component={BestSellerProductsRp}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("bestsell_rp"),
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.c_EAF4FF },
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigationRef.goBack()} />
          ),
        }}
      />
      <Navigation.Screen
        name={ScreenNames.RatedProduct}
        component={RateedProduct}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("rated_rp"),
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.c_EAF4FF },
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigationRef.goBack()} />
          ),
        }}
      />
    </Navigation.Navigator>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: DIMENSIONS.width / 4,
    height: 60,
    marginLeft: 10,
  },
  headerStyle: {
    shadowColor: "transparent",
  },
  headerTitleStyle: {
    color: colors.c_1F1F1F,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
  },
});
export default ReportNavigator;
