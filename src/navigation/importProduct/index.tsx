import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { DIMENSIONS } from "../../common/utils";
import ButtonBack from "../../componets/ButtonBack";
import ButtonBackNew from "../../componets/ButtonBackNew";
import { colors } from "../../constants/colors";
import i18n, { translate } from "../../locale";
import LoadRegister from "../../view/authen/loadRegister";
import Login from "../../view/authen/login";
import Register from "../../view/authen/register";
import RegisterStatus from "../../view/authen/registerStatus";
import Cart from "../../view/cart";
import ImportProducts from "../../view/importProduct";
import DetailOrder from "../../view/importProduct/detail";
import Purchase from "../../view/importProduct/purchase";
import SearchCategory from "../../view/importProduct/purchase/filter-product/search-category";
import Filter from "../../view/importProduct/purchase/filter/Filter";
import ReviewOrder from "../../view/importProduct/rating";
import Payment from "../../view/payment";
import PaymentSuccess from "../../view/payment/success";
import Splash from "../../view/splash";
import OnBoarding from "../../view/splash/onBoarding";
import { navigationRef } from "../navigate";
import Profile from "../../view/profile";
import { NavigatorName, ScreenNames } from "../screen";
import SettingProfile from "../../view/profile/settingProfile";
import DeliveryAddress from "../../view/profile/address";
import GrowUp from "../../view/report/grow-up";
import Report from "../../view/report";
import BestSellerProductsRp from "../../view/report/bestSellerProductsRp";
import OrderRp from "../../view/report/orderRp";
import RateedProduct from "../../view/report/rated-product";
import CanceledProduct from "./../../view/report/canceled-product";
import CreateNewAddress from "../../view/profile/address/create_new_address";
import EditProfile from "../../view/profile/editProfile";

const Navigation = createStackNavigator();

function ImportProductNavigator() {
  return (
    <Navigation.Navigator>
      <Navigation.Screen
        name={NavigatorName.ImportProduct}
        component={ImportProducts}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Navigation.Screen
        name={ScreenNames.Perchase}
        component={Purchase}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("purchase"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigationRef.goBack()} />
          ),
        }}
      />
      <Navigation.Screen
        name={ScreenNames.Filter}
        component={Filter}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("filter"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigationRef.goBack()} />
          ),
        }}
      />
      <Navigation.Screen
        name={ScreenNames.Cart}
        component={Cart}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("cart"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigationRef.goBack()} />
          ),
        }}
      />
      <Navigation.Screen
        name={ScreenNames.Payment}
        component={Payment}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("payment"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigationRef.goBack()} />
          ),
        }}
      />
      <Navigation.Screen
        name={ScreenNames.SearchCategory}
        component={SearchCategory}
        options={() => ({
          headerShown: true,
          headerTitle: i18n.t("purchase"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigationRef.goBack()} />
          ),
        })}
      />
      <Navigation.Screen
        name={ScreenNames.PaymentSuccess}
        component={PaymentSuccess}
        options={() => ({
          headerShown: false,
        })}
      />
      <Navigation.Screen
        name={ScreenNames.OrderDetail}
        component={DetailOrder}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("Thông tin nhập hàng"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigationRef.goBack()} />
          ),
        }}
      />
      <Navigation.Screen
        name={ScreenNames.RateOrderImportScreen}
        component={ReviewOrder}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerTitle: translate("rating_order_import"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigationRef.goBack()} />
          ),
        }}
      />

      <Navigation.Screen
        name={ScreenNames.CreateNewAddress}
        component={CreateNewAddress}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("new_address"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew
              style={styles.icon}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Navigation.Screen
        name={ScreenNames.EditProfile}
        component={EditProfile}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("edit_distributor_info"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigation.goBack()} />
          ),
        })}
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
    fontWeight: "700",
  },
  icon: {
    width: 18,
    height: 18,
  },
});
export default ImportProductNavigator;
