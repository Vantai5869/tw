import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { NavigatorName, ScreenNames } from "../screen";
import { colors } from "../../constants/colors";
import i18n from "../../locale/index";
import Order from "../../view/order/index";
import OrderDetail from "../../view/order/detail";
import ButtonBack from "../../componets/ButtonBack";
import ButtonBackNew from "../../componets/ButtonBackNew";

const Stack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigatorName.Order}
        component={Order}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("Order Management"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name={ScreenNames.OrderDetailOD}
        component={OrderDetail}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("order_detail"),
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

export default ProfileStackScreen;
