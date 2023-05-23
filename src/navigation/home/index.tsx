import React from "react";
import { StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { DIMENSIONS } from "../../common/utils";
import { colors } from "../../constants/colors";
import HomePage from "../../view/home";
import { NavigatorName, ScreenNames } from "../screen";
import i18n from "../../locale";
import Profile from "../../view/profile";
import ButtonBackNew from "../../componets/ButtonBackNew";
import SettingProfile from "../../view/profile/settingProfile";
import DeliveryAddress from "../../view/profile/address/index";
import SearchHome from "../../view/home/searchHome";
import SearchCategory from "../../view/importProduct/purchase/filter-product/search-category";
import Cart from "../../view/cart";
import { navigationRef } from "../navigate";
import Recharge from "../../view/wallet/recharge";
import HistoryTinWinPay from "../../view/wallet/history_tinwin_pay";
import AllProduct from "../../view/warehouse/allProduct";
import SupplierScreen from "../../view/home/supplier";
import ModalSearchSupplier from "../../view/home/supplier/header/ModalSearchByText";
import PaymentSuccess from "../../view/payment/success";
import Payment from "../../view/payment";
import SearchScreen from "../../view/home/supplier/search-screen";
import TopupSuccess from "../../view/wallet/recharge/success";

const Navigation = createStackNavigator();

function HomeTab() {
  return (
    <Navigation.Navigator>
      <Navigation.Screen
        name={NavigatorName.Home}
        component={HomePage}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: false,
        })}
      />
      <Navigation.Screen
        name={ScreenNames.SearchHome}
        component={SearchHome}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: false,
        })}
      />
      <Navigation.Screen
        name={ScreenNames.ModalSearchSupplier}
        component={ModalSearchSupplier}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: false,
        })}
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
        name={ScreenNames.RechargeWallet}
        component={Recharge}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerStyle: {
            shadowColor: "transparent",
          },
          headerTitleAlign: "center",
          headerTitle: i18n.t("topupTinwinWallet"),
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <Navigation.Screen
        name={ScreenNames.TopupSuccess}
        component={TopupSuccess}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: false,
          title: "",
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <Navigation.Screen
        name={ScreenNames.HistoryTinWinPay}
        component={HistoryTinWinPay}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerStyle: {
            shadowColor: "transparent",
          },
          headerTitleAlign: "center",
          headerTitle: "Lịch sử giao dịch Ví",
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <Navigation.Screen
        name={ScreenNames.SupplierScreen}
        component={SupplierScreen}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: false,
        })}
      />
      <Navigation.Screen
        name={ScreenNames.AllProduct}
        component={AllProduct}
        options={({ navigation, route }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t(route?.params?.title),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <Navigation.Screen
        name={ScreenNames.Payment}
        component={Payment}
        options={({ navigation, route }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("payment"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigationRef.goBack()} />
            // <Text>hehe</Text>
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
        name={ScreenNames.SearchScreen}
        component={SearchScreen}
        options={() => ({
          headerShown: false,
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
    // borderBottomColor: colors.c_e0e0e0,
    // borderBottomWidth: 1,
  },
  headerTitleStyle: {
    color: colors.c_333333,
    fontSize: 18,
  },
});
export default HomeTab;
