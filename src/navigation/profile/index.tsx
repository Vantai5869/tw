import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { DIMENSIONS } from "../../common/utils";
import ButtonBackNew from "../../componets/ButtonBackNew";
import { colors } from "../../constants/colors";
import i18n, { translate } from "../../locale";
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
import AddressSelect from "../../view/profile/address/address_select";
import ReportNavigator from "../report";
import EditProfile from "../../view/profile/editProfile";
import LanguagesSettingScreen from "../../view/profile/settingProfile/language";
import ButtonBack from "../../componets/ButtonBack";

const Navigation = createStackNavigator();

function ProfileNavigator() {
  return (
    <Navigation.Navigator initialRouteName="Profile">
      <Navigation.Screen
        name="Profile"
        component={Profile}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Navigation.Screen
        name={ScreenNames.SettingProfile}
        component={SettingProfile}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerTitle: i18n.t("Detail"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigationRef.goBack()} />
          ),
        }}
      />
      <Navigation.Screen
        name={ScreenNames.EditProfile}
        component={EditProfile}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerTitle: i18n.t("Detail"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigationRef.goBack()} />
          ),
        }}
      />
      <Navigation.Screen
        name={ScreenNames.DeliveryAddress}
        component={DeliveryAddress}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("delivery_address"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <Navigation.Screen
        name={ScreenNames.ReportNavigator}
        component={ReportNavigator}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: colors.c_ffffff,
          },
          headerTitleAlign: "center",
          headerTitle: "Đăng ký đại lý",
        })}
      />
      <Navigation.Screen
        name={ScreenNames.AddressSelect}
        component={AddressSelect}
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
        name={ScreenNames.Language}
        component={LanguagesSettingScreen}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerStyle: {
            shadowColor: "transparent",
          },
          headerTitleAlign: "center",
          headerTitle: translate("language"),
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => <ButtonBack onPress={() => navigation.goBack()} />,
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
    lineHeight: 22,
    fontWeight: "700",
  },
  icon: {
    width: 18,
    height: 18,
  },
});
export default ProfileNavigator;
