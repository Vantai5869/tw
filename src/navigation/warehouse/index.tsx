import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import Notification from "../../view/notification";
import { NavigatorName, ScreenNames } from "../screen";
import { colors } from "../../constants/colors";
import i18n from "../../locale/index";
import Warehouse from "../../view/warehouse";
import AllProduct from "../../view/warehouse/allProduct";
import WareHouseIndustryProduct from "../../view/warehouse/wareHouseIndustryProduct/WareHouseIndustryProduct";
import ButtonBackNew from "../../componets/ButtonBackNew";
import Profile from "../../view/profile";
import Products from "../../view/warehouse/products_entering_outofstock";

const Stack = createStackNavigator();

function WareHouseTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigatorName.WareHouse}
        component={Warehouse}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("warehouse_management"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => <></>,
        }}
      />
      <Stack.Screen
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
      <Stack.Screen
        name={ScreenNames.ProductWFilter}
        component={Products}
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
      <Stack.Screen
        name={ScreenNames.ProductByIndustry}
        component={WareHouseIndustryProduct}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("product_by_industry"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
      <Stack.Screen
        name={ScreenNames.Profile}
        component={Profile}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: false,
          headerTitle: i18n.t("retailer_infomation"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigation.goBack()} />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomColor: colors.c_e0e0e0,
    // borderBottomWidth: 1,
  },
  headerTitleStyle: {
    color: colors.c_333333,
    fontSize: 18,
  },
});

export default WareHouseTab;
